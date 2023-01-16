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

const server = http.createServer(async(request, response) => {
  response.statusCode = 200;
  response.setHeader('Content-Type', 'text/plain');
  response.setHeader('Access-Control-Allow-Origin', '*');
  const url = new URL(request.url || '', `http://${request.headers.host}`);
});


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

// aus der Textarea mit der ID "kommentare" den Wert auslesen 
const text = document.getElementById('kommentare').value;
// den Wert an den Server senden
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

// wert an die MongoDB senden
const db = mongoClient.db('kommentare');
const collection = db.collection('kommentare');
await collection.insertOne({ text });


startServer();







