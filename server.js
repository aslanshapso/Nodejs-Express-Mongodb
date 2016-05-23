console.log('May Node be with you');

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

var db

MongoClient.connect('mongodb://qouteDB:a1s2d3f4g5@ds011903.mlab.com:11903/startquets', function(err, database) {
  if (err) return console.log(err)
  db = database
  app.listen(3000, function() {
    console.log('listening on 3000')
  })
})

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/', function(req, res) {
  db.collection('quotes').find().toArray(function(err, result) {
    if (err) return console.log(err)
    res.render('index.ejs', {quotes: result})
  })
})

app.post('/quotes', function(req, res) {
  db.collection('quotes').save(req.body, function(err, result) {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})

app.put('/quotes', function(req, res) {
  db.collection('quotes')
  .findOneAndUpdate({name: 'Yoda'}, {
    $set: {
      name: req.body.name,
      quote: req.body.quote
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, function(err, result) {
    if (err) return res.send(err)
    res.send(result)
  })
})

app.delete('/quotes', function(req, res) {
  db.collection('quotes').findOneAndDelete({name: req.body.name}, function(err, result) {
    if (err) return res.send(500, err)
    res.send('A darth vadar quote got deleted')
  })
})