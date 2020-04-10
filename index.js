const express = require('express');
const path = require('path');
const generatePassword = require('password-generator');

const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Put all API endpoints under '/api'
app.get('/api/passwords', (req, res) => {
  const count = 5;

  // Generate some passwords
  const passwords = Array.from(Array(count).keys()).map(i =>
    generatePassword(12, false)
  )

  // Return them as json
  res.json(passwords);

  console.log(`Sent ${count} passwords`);
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

/*---------------------------------------------------------------------------*/

//              START MYSQL CODE

/*---------------------------------------------------------------------------*/

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  //password: 'root',
  database: 'solotravelertest',
  //insecureAuth : true,
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

var urlGetUser = "/api/getLogged";
app.get(urlGetUser, (req, res) => {
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

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Password generator listening on ${port}`);