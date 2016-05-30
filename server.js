var express = require('express');
var app = express();
var fs = require("fs");


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
       var user = data[req.params.id]
       console.log( user );
       res.end( JSON.stringify(user));
   });
})

app.get('/addUser/:id/:name/:phone/:profession', function (req, res) {
   // First read existing users.
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
       data = JSON.parse( data );
       var newUser = JSON.parse("{ \"name\" : \""+req.params.name+"\",\"phone\":\""+req.params.phone+"\",\"profession\":\""+req.params.profession+"\",\"id\":\""+req.params.id+"\"}");

       data["contact"+req.params.id] = newUser;
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
