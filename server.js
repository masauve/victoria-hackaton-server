var express = require('express');
var app = express();
var fs = require("fs");

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/listContacts', function (req, res) {
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
       console.log( data );
       res.end( data );
   });
})

app.get('/contact/:id', function (req, res) {
   // First read existing users.
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
       users = JSON.parse( data );
       var user = users.data[req.params.id];
       console.log( user );
       res.end( JSON.stringify(user));
   });
})

app.get('/addUser/:id/:name/:phone/:profession', function (req, res) {
   // First read existing users.
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
       data = JSON.parse( data );
       var newUser = JSON.parse("[\""+req.params.name+"\",\""+req.params.phone+"\",\""+req.params.profession+"\",\""+req.params.id+"\"]");
       data.data.push(newUser);
       console.log( data );
       fs.writeFile( __dirname + "/" + "users.json", JSON.stringify(data));
       res.end( "contact added");
   });

})

var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

})
