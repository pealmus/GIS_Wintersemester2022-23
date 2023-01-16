const http = require('http');
const mongodb = require("mongodb")

const hostname = '127.0.0.1'; // localhost
const port = 3000;
const url = 'mongodb://localhost:27017'; // für lokale MongoDB
const mongoClient = new mongodb.MongoClient(url);


async function startServer() {
  // connect to database
  await mongoClient.connect();
  // listen for requests
  server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });
}

const server = http.createServer((request, response) => {
  response.statusCode = 200;
  response.setHeader('Content-Type', 'text/plain');
  response.end('Hello World');
});
const text = document.getElementById('kommentare').value;

fetch('/comments', {
    method: 'POST',
    body: JSON.stringify({ text }),
    headers: { 'Content-Type': 'application/json' }
})
.then(res => res.json())
.then(comment => {
    localStorage.setItem('comment', comment);
    const p = document.getElementById('kommentar');
    p.innerHTML = comment;
});

startServer();

const express = require('express');
const MongoClient = require('mongodb').MongoClient;
/*const app = express();*/
const dbName = 'Kommentare';

app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/pages/videos/video1.html');
});

app.post('/submit', (req, res) => {
    const comment = req.body.comment;
    localStorage.setItem('comment', comment);
    MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
        if (err) {
            console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
        }
        console.log('Connected...');
        const db = client.db(dbName);
        const collection = db.collection('comments');
        collection.insertOne({ comment: comment }, (err, res) => {
            console.log(`Comment added: ${comment}`);
            client.close();
        });
    });
    res.redirect('/');
});

app.get('/comments', (req, res) => {
    MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
        if (err) {
            console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
        }
        console.log('Connected...');
        const db = client.db(dbName);
        const collection = db.collection('comments');
        collection.find({}).toArray((err, comments) => {
            if (err) throw err;
            res.send(comments);
            client.close();
        });
    });
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const uri = "mongodb+srv://<username>:<password>@cluster.mongodb.net/Kommentare";
let client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

app.post('/kommentare', (req, res) => {
  const kommentar = req.body.kommentar;
  collection.insertOne({kommentar}, (err, result) => {
    res.send(result);
  });
});

app.get('/kommentare', (req, res) => {
  collection.find({}).toArray((err, result) => {
    res.send(result);
  });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});

