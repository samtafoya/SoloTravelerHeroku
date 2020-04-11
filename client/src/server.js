const express = require('express');
const mysql = require('mysql');

//const PORT = process.env.PORT || 3000;
const PORT = 3000;

// initialize app
const app = express();

const connection = mysql.createConnection({
    host: 'localhost',

    user: 'root',

    //password: 'password',
    password: 'root',
    
    database: 'solotraveler',
    //insecureAuth : true,
});


app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});


var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

var urlGetHello = "/api/hello";
app.get(urlGetHello, (req, res) => {
    var str = urlGetHello + " (GET) " + "just called";
    console.log(str);
    res.send({ express: str });
});

/*---------------------------------------------------------------------------*/

//              CODE FOR SIGN INS

/*---------------------------------------------------------------------------*/

var urlGetLogin = "/api/login";   // <-- Being used in ValidatedLoginForm.js
app.post(urlGetLogin, function (req, res) {

    // Get sent data.
    var email = req.body.post;
    var pass_word = req.body.pass;

    console.log(pass_word);

    var sql = 'INSERT INTO account (email, pass_word, first_name, last_name, age, main_trait) VALUES (?)';
    var values = [email, pass_word, req.body.first_name, req.body.last_name, req.body.age, req.body.trait];

    // Do a MySQL query for email.
    var query = mysql.format(sql, [values]);

    connection.query(query, function (err, result) {
        if (err) {
            console.log(err);
        }

    });

    var str = sql+ " (POST) " + "just called " + JSON.stringify(req.body);
    console.log(email);
    res.send({ express: str });
});

var urlGetLogged = "/api/getLogged";
app.get(urlGetLogged, (req, res) => {
    var sqlString = "SELECT first_name FROM account";
    connection.query(sqlString,
        function (err, rows, fields) {
            if (err) {
                console.log(err);
            }

            console.log('The reponse is: ', rows);
            var jString = JSON.stringify(rows);

            res.send(JSON.parse(jString));
        });
});

/*---------------------------------------------------------------------------*/

//                  CODE FOR TRAITS

/*---------------------------------------------------------------------------*/

var urlGetTrait = "/api/trait";
app.get(urlGetTrait, (req, res) => {
    var sqlString = "SELECT * FROM traits";
    connection.query(sqlString,
        function (err, rows, fields) {
            if (err) {
                console.log(err);
            }

            console.log('The reponse is: ', rows);
            var jString = JSON.stringify(rows);

            res.send(JSON.parse(jString));
        });
});

/*---------------------------------------------------------------------------*/

//                  CODE FOR BLOGS

/*---------------------------------------------------------------------------*/

/*
var urlGetBlog = "/api/blog";   // <-- Being used in blog.js
app.post(urlGetBlog, function (req, res) {

    // Get sent data.
    var blog = req.body.blogText;

    // figure out how to determine if someone is logged in

    // Do a MySQL query.
    var query = mysql.format('INSERT INTO blogs (user, name, body) VALUES ("user", "name5", ?)', blog);

    //var test = mysql.format('INSERT INTO account (id, first_name) SET ?, ?', user, user);

    connection.query(query, function (err, result) {
        if (err) {
            console.log(err);
        }
    });

    var str = urlGetBlog + " (POST) " + "just called " + req.body;
    console.log(str);
    console.log(blog);
    res.send({ express: req.body.blogText });
});
*/

var urlGetBlog = "/api/blog";   // <-- Being used in blog.js
app.post(urlGetBlog, function (req, res) {
    try {
    // Get sent data.
    var blog = req.body.blogText;
    var nameV = req.body.nameV;
    var userV = req.body.userV;

    //console.log("req.body: '" + req.body + "'");
    //console.log("user: '" + userV + "'; name: '" + nameV + "'; blog: '" + blog + "'");

    // Do a MySQL query.
    var sqlStr = 'INSERT INTO blogs (user, name, body) VALUES (?)';
    var values = [userV, nameV, blog];

    //console.log("vals " + values[0]);

    var query = mysql.format(sqlStr, [values]);
    //console.log("query: '" + query + "'");

    //var test = mysql.format('INSERT INTO account (id, first_name) SET ?, ?', user, user);

    connection.query(query, function (err, result) {
        if (err) {
            console.log(err);
        }
    });

    var str = urlGetBlog + " (POST) " + "just called " + req.body;
    console.log(str);
    console.log(blog);
    res.send({ express: req.body.blogText });
    }
    catch(e) {
    //res.send({ express: e.message });
    res.send({express: 'an error occurred in api/blog (POST)'});
    }
});

var urlGetAllPosts = "/api/allposts";
app.get(urlGetAllPosts, (req, res) => {
    var sqlString = "SELECT * FROM blogs";
    connection.query(sqlString,
        function (err, rows, fields) {
            if (err) {
                console.log(err);
            }

            console.log('The reponse is: ', rows);
            var jString = JSON.stringify(rows);

            res.send(rows);
        });
});

/*---------------------------------------------------------------------------*/

//                  CODE FOR USERS

/*---------------------------------------------------------------------------*/

var urlGetUsers = "/api/users";
app.get(urlGetUsers, (req, res) => {
    var name = req.body.currentUser;
    var sqlString = "SELECT concat(first_name, '   +   ', email) FROM account";
    //var query = mysql.format(sqlString, name);
    connection.query(sqlString,
        function (err, rows, fields) {
            if (err) {
                console.log(err);
            }

            console.log('The reponse is: ', rows);
            var jString = JSON.stringify(rows);

            res.send(JSON.parse(jString));
        });
});

var urlGetUser = "/api/usersTraits";
app.get(urlGetUser, (req, res) => {
    var twoSqlString =  "SELECT main_trait FROM account"

    connection.query(twoSqlString,
        function (err, rows, fields) {
            if (err) {
                console.log(err);
            }

            console.log('2 The reponse is: ', rows);
            var jString = JSON.stringify(rows);

            res.send(JSON.parse(jString));
        }
    );
});

/*---------------------------------------------------------------------------*/

//                  CODE FOR SERVER

/*---------------------------------------------------------------------------*/

// start server
app.listen(PORT, () => {
    console.log('App running on port ' + PORT);
});
