// Dependencies
// =============================================================
const express = require("express");
const path = require("path");
const fs = require('fs');

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Notes (DATA)
// =============================================================
const notes = [];
let noteId = "";

// Routes
// =============================================================
app.use(express.static(path.join(__dirname, 'Develop/public')));
// Basic route that sends the user first to the AJAX Page
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "./Develop/public/index.html"));
});

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "./Develop/public/notes.html"));
});

// Displays all notes
app.get("/api/notes", function (req, res) {
  const data = fs.readFileSync('./Develop/db/db.json', 'utf-8');
  return res.json(data);
});
// Create New note - takes in JSON input
app.post("/api/notes", function (req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  const dataValue = fs.readFileSync('./Develop/db/db.json', 'utf-8');
  notes.length = 0;
  if (dataValue.length) {
    JSON.parse(dataValue).forEach(element => {
      notes.push(element);
    });
  }
  const maxId = notes.map(ele => ele.id);
  if (maxId.length != 0) {
    req.body.id = Math.max(...maxId) + 1;
  }
  else {
    req.body.id = 1;
  }
  const newNote = req.body;
  notes.push(newNote);
  const noteJson = JSON.stringify(notes);
  fs.writeFileSync('./Develop/db/db.json', noteJson);
  res.json(true);
});
// delete note - takes in JSON input
app.delete("/api/notes/:id", function (req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  const dataValue = (fs.readFileSync('./Develop/db/db.json', 'utf-8'));
  notes.length = 0;
  if (dataValue.length) {
    JSON.parse(dataValue).forEach(element => {
      notes.push(element);
    });
  }
  notes.forEach(element => {
    if (element.id == req.params.id) {
      notes.pop(element);
    }
  });
  const noteUpdate = JSON.stringify(notes);
  fs.writeFileSync('./Develop/db/db.json', noteUpdate);
  res.json(true);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
