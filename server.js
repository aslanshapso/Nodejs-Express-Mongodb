console.log('May Node be with you');

const express = require('express');
const bodyParser= require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient;


var db

MongoClient.connect('mongodb://qouteDB:a1s2d3f4g5@ds011903.mlab.com:11903/startquets', function(err, database) {
  if (err) return console.log(err)
  db = database
  app.listen(3000, function() {
    console.log('listening on 3000')
  })
})

// The urlencoded method within body-parser tells
// body-parser to extract data from the <form> element 
//and add them to the body property in the request object.
app.use(bodyParser.urlencoded({extended: true}))


// app.listen(3000, function() {
//   console.log('listening on 3000')
// })


app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html')
  // Note: __dirname is the path to your current working directory. Try logging it and see what you get!
  // Mine was '/Users/zellwk/Projects/demo-repos/crud-express-mongo' for this app.
})


// app.post('/quotes', function(req, res) {
 
//   console.log(req.body)
// })
app.post('/quotes', function(req, res) {
  db.collection('quotes').save(req.body, function(err, result) {
    if (err) return console.log(err);

    console.log('saved to database');
    res.redirect('/');
  })
})
// ES5 - without arrow just function and block open
// app.get('/', function(req, res) {
//   res.send('Hello World')
// })

// ES6 - First off, I’m replacing the function() with the ES6 arrow function
// app.get('/', (req, res) => {
//   res.send('Hello World')
// })
// Note: request and response are usually written as req and res respectively.