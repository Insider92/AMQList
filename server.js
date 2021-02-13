const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()

// New instance of express
const app = express()
// New instance of mongo client
const mongodb = require('mongodb')
// Helper for the creaton of an ID in mongo db
const ObjectID = mongodb.ObjectID

// Name of the collection
const SONGS_COLLECTION = 'songsJL'

// letiables for mongo db
let songs
let database

// Express middleware
app.use(bodyParser.json())
app.use(cors())


// Start connection to mongo db
mongodb.MongoClient.connect(process.env.DB_CONSTRING, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
    .then(client => {
        database = client.db('AMQList')
        songs = database.collection(SONGS_COLLECTION)
        console.log('Connected to Database')
    })
    .catch(error => console.error(error))


// Start the server
app.listen(3000, function () {
    console.log('listening on 3000')
})


/**
 * Example JSON Object in Mongo db
 * 
 *  { 
 *   "name": "DREAM SOLISTER", 
 *   "artist": "TRUE",
 *   "anime": "Hibike Euphonium", 
 *   "tags":["Kapelle", "Laut", "idk"], 
 *   "alias":["K", "Kapelle", "l", "Laut", "idk"]
 *  }
 */

app.get('/api/songs', (request, response) => {
    database.collection(SONGS_COLLECTION).find(async (error, songsEntity) => {
        if (error) {
            manageError(response, error.message, "Failed to get song entries.")
        } else {
            const songs = await songsEntity.toArray()
            response.send(songs);
        }
    })
})

app.get('/api/songs/:id', (request, response) => {

    // Mongo db id needs this properties, exp. 6026bbb000231f2f381fbe95
    if (request.params.id.length > 24 || request.params.id.length < 24) {
        manageError(response, "Invalid song id", "ID must be a single String of 12 bytes or a string of 24 hex characters.", 400);
        return
    }
    
    database.collection(SONGS_COLLECTION).findOne({ _id: new ObjectID(request.params.id) }, async (error, song) => {
        if (error) {
            manageError(response, error.message, "Failed to get song entries.")
        } else {
            response.send(song);
        }
    })
})


// Create one song creation
app.post("/api/songs", (request, response) => {
    const song = request.body;

    if (!song.name) {
        manageError(response, "Invalid name input", "song name is mandatory.", 400);
        return
    }
    if (!song.anime) {
        manageError(response, "Invalid anime input", "Anime name is mandatory.", 400);
        return
    }

    database.collection(SONGS_COLLECTION).insertOne(song, function (error, mongoDbAnswer) {
        if (error) {
            manageError(response, error.message, "Failed to create song entry.");
        } else {
            response.status(201).json(mongoDbAnswer.ops[0]);
        }
    })

});

// Delete one song
app.delete("/api/songs/:id", (request, response) => {

    // Mongo db id needs this properties, exp. 6026bbb000231f2f381fbe95
    if (request.params.id.length > 24 || request.params.id.length < 24) {
        manageError(response, "Invalid song id", "ID must be a single String of 12 bytes or a string of 24 hex characters.", 400);
        return
    }

    database.collection(SONGS_COLLECTION).deleteOne({ _id: new ObjectID(request.params.id) }, function (error) {
        if (error) {
            manageError(response, error.message, "Failed to delete song.");
        } else {
            response.status(200).json(request.params.id);
        }
    });

});

// Update one song
app.put("/api/songs/:id", (request, response) => {

    const song = request.body;

    // Mongo db id needs this properties, exp. 6026bbb000231f2f381fbe95
    if (request.params.id.length > 24 || request.params.id.length < 24) {
        manageError(response, "Invalid song id", "ID must be a single String of 12 bytes or a string of 24 hex characters.", 400);
    }

    if (!song.name) {
        manageError(response, "Invalid name input", "song name is mandatory.", 400);
        return
    }
    if (!song.artist) {
        manageError(response, "Invalid artist input", "artist name is mandatory.", 400);
        return
    }
    if (!song.anime) {
        manageError(response, "Invalid anime input", "anime name is mandatory.", 400);
        return
    }

    database.collection(SONGS_COLLECTION).findOneAndUpdate({ _id: new ObjectID(request.params.id) },
        { $set: song },
        { upsert: true }
        , function (error) {
            if (error) {
                manageError(response, error.message, "Failed to update song.");
            } else {
                response.status(200).json(request.params.id);
            }
        });
});


// Errors handler.
function manageError(response, reason, message, code) {
    console.log("Error: " + reason);
    response.status(code || 500).json({ "error": message });
}