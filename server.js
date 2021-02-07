const express = require('express')
require('dotenv').config()
const bodyParser= require('body-parser')
const app = express()
const MongoClient = require('mongodb').MongoClient

MongoClient.connect(process.env.DB_CONSTRING , (err, client) => {
    if (err) return console.error(err)
    console.log('Connected to Database')
  })

app.use(bodyParser.urlencoded({ extended: true }))

app.listen(3000, function() {
    console.log('listening on 3000')
})

app.get('/', function(req, res) {                   // ('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')         //...
})                                                  //})

app.post('/quotes', (req, res) => {
    console.log(req.body)
  })

