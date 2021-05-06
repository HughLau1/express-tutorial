var express = require('express');
var app = express();
// var bodyParser = require('body-parser');
// // for parsing application/json
// app.use(bodyParser.json()); 
// // for parsing application/xwww-
// app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }))
//form-urlencoded
var multer = require('multer');
var upload = multer();

// for parsing multipart/form-data
app.use(upload.array()); 
app.use(express.static('public'));
var cookieParser = require('cookie-parser');
app.use(cookieParser())
var session = require('express-session');
app.use(session({secret: "Shh, its a secret!",     
                  resave: true,
                  saveUninitialized: true
}));
app.set('view engine', 'pug');
app.set('views','./views');
app.use(express.static('public'));

// var Users = [];
// app.get('/signup', function(req, res){
//    res.render('signup');
// });
// app.post('/signup', function(req, res){
//    if(!req.body.id || !req.body.password){
//       res.status("400");
//       res.send("Invalid details!");
//    } else {
//       Users.filter(function(user){
//          if(user.id === req.body.id){
//             res.render('signup', {
//                message: "User Already Exists! Login or choose another user id"});
//          }
//       });
//       var newUser = {id: req.body.id, password: req.body.password};
//       Users.push(newUser);
//       req.session.user = newUser;
//       res.redirect('/protected_page');
//    }
// });

//Sessions
app.get('/', function(req, res){
   if(req.session.page_views){
      req.session.page_views++;
      res.send("You visited this page " + req.session.page_views + " times");
   } else {
      req.session.page_views = 1;
      res.send("Welcome to this page for the first time!");
   }
});

// //cookies
// app.get('/', function(req, res){
//    res.cookie('name', 'express').send('cookie set'); //Sets name = express
//    //on client side console.log(document.cookie);
//    //on server side
//    console.log('Cookies: ', req.cookies);
// });

// mongoose stores pugs data
// var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/my_db',
// {useNewUrlParser:true}, 
// { useUnifiedTopology: true });
// // const Person  = require('../models/Person');
// var personSchema = mongoose.Schema({
//    name: String,
//    age: Number,
//    nationality: String
// });
// var Person = mongoose.model("Person", personSchema);
// app.get('/', function(req, res){
//    res.render('form');
// });
// app.post('/', function(req, res){
//    console.log(req.body);
//    res.send("recieved your request!");
// });
// app.get('/person', function(req, res){
//    res.render('person');
// });
// app.post('/person', function(req, res){
//    var personInfo = req.body; //Get the parsed information
   
//    if(!personInfo.name || !personInfo.age || !personInfo.nationality){
//       res.render('show_message', {
//          message: "Sorry, you provided worng info", type: "error"});
//    } else {
//       var newPerson = new Person({
//          name: personInfo.name,
//          age: personInfo.age,
//          nationality: personInfo.nationality
//       });
		
//       newPerson.save(function(err, Person){
//          if(err)
//             res.render('show_message', {message: "Database error", type: "error"});
//          else
//             res.render('show_message', {
//                message: "New person added", type: "success", person: personInfo});
//       });
//    }
// });

//rendering pugs
// app.get('/first_template', function(req, res){
//    res.render('first_view');
// });
// app.get('/dynamic_view', function(req, res){
//    res.render('dynamic', {
//       name: "TutorialsPoint", 
//       url:"http://www.tutorialspoint.com"
//    });
// });
// app.get('/components', function(req, res){
//    res.render('content');
// });
// app.get('/testimg', function(req, res){
//    res.render('testingImage');
// });

// //middleware
// app.use('/things', function(req, res, next){
//    console.log("A request for things received at " + Date.now());
//    next();
// });
// // Route handler that sends the response
// app.get('/things', function(req, res){
//    res.send('Things');
// });
// // First middleware before response is sent
// app.use(function(req, res, next){
//    console.log("Start");
//    next();
// });
// //Route handler
// app.get('/', function(req, res, next){
//    res.send("Middle");
//    next();
// });
// app.use('/', function(req, res){
//    console.log('End');
// });

// express.router
var thingsRouter = require('./router/things.js');
//both index.js and things.js should be in same directory
app.use('/things', thingsRouter);

// app.get('/', function(req, res){
//    res.send("Main Menu!");
// });
app.get('/hello', function(req, res){
   res.send("Hello World!");
});
app.post('/hello', function(req, res){
   res.send("You just called the post method at '/hello'!\n");
});
app.all('/test', function(req, res){
   res.send("HTTP method doesn't have any effect on this route!");
});

app.get('/:id', function(req, res){
   res.send('The id you specified is ' + req.params.id);
});
app.get('/things/:name/:id', function(req, res) {
   res.send('id: ' + req.params.id + ' and name: ' + req.params.name);
});
app.get('/things/:id([0-9]{5})', function(req, res){
   res.send('id: ' + req.params.id);
});
app.get('*', function(req, res){
   res.send('Sorry, this is an invalid URL.');
});

app.listen(3000);