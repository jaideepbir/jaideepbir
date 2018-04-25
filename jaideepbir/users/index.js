var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var expressValidator = require('express-validator');
var mongo = require('mongojs');
// var db = mongo('172.17.0.2:27017/jaideepdb', ['users']);
var db = mongo('mongodb://jaideep:yrals1234@ds235169.mlab.com:35169/jaideepdb', ['users']);
var app = express();

const port = 80; 

/*
var logger = function(req, res, next){
    console.log('Logging...');
    next();
}
app.use(logger);
*/

// Vew Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Set Static Path
app.use(express.static(path.join(__dirname, 'public')));

// Global Vars
app.use(function(req, res, next){
    res.locals.errors = null;
    next();
});

// Express Validator Middleware
app.use(expressValidator({
    // middlewareOptions
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.')
        , root = namespace.shift()
        , formParam = root;

        while(namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param: formParam,
            msg: msg,
            value: value
        };
    }
}));

/*
var people = [
    {
    first_name: 'Isabbel',
    last_name: 'Bir',
    age: 5.5
},
{
    first_name: 'Riaan',
    last_name: 'Bir',
    age: 3.5
},
{
    first_name: 'Elina',
    last_name: 'Bir',
    age: 1.5
}
];
*/
var pageTitle = 'People';

app.get('/', function(req, res){
    // var title = 'Children'
    db.users.find(function(err, docs){
        res.render('index', {
            pageTitle, 
            docs
        });
    });
    // res.send('Hello Seema & Jaideep World');
    // res.json(people);
});

app.post('/people/add', function(req, res){
    req.checkBody('first_name', 'First Name is required.').notEmpty();
    req.checkBody('last_name', 'Last Name is required.').notEmpty();
    req.checkBody('email', 'Email is required.').notEmpty(); 
    req.checkBody('age', 'Age is required.').notEmpty(); 

    var errors = req.validationErrors();

    if(errors){
        // res.redirect('index');
        db.users.find(function(err, docs){
            res.render('index', {
        //     res.redirect('index', {
                pageTitle, 
                docs,
                errors
            }); 
        });   
        console.log('Errors!');
    } else {
        var newPerson = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            age: req.body.age
        };
        console.log(newPerson);
        db.users.insert(newPerson, function(err, result){
            if (err){
                console.log(err);
            }
            res.redirect('/');
        });
        console.log('Success!');
    }    
});

app.delete('/users/delete:id', function(req, res){
    db.users.remove({'email': req.params.id}, function(err, result){
         if (err){
             console.log(err);
         } 
         res.redirect('/');
     });
});

app.listen(port, function(){
    console.log('Server Started at: %s', port);
})