const express = require('express')
require('dotenv').config()
const bodyParser= require('body-parser')
const app = express()
const MongoClient = require('mongodb').MongoClient
let songs
let db

MongoClient.connect(process.env.DB_CONSTRING, {
  useUnifiedTopology: true
})
.then(client => {
  console.log('Connected to Database')
  db = client.db('AMQList')
  songs = db.collection('songs')
})
.catch(error => console.error(error))

app.use(bodyParser.urlencoded({ extended: true }))

app.listen(3000, function() {
    console.log('listening on 3000')
})

app.get('/', (req, res) => {                   // ('/', (req, res) => {
  cursor = db.collection('quotes').find()
  console.log(cursor)
  res.sendFile(__dirname + '/index.html')         //...
})                                                  //})

app.post('/quotes', (req, res) => {
  songs.insertOne(req.body)
  .then(result => {
    res.redirect('/')
  })
  .catch(error => console.error(error))
  })

