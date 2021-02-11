// Dependencies
// =============================================================
const express = require("express");
const path = require("path");
const fs=require('fs');

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.port || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Star Wars Characters (DATA)
// =============================================================
// const characters = [
//   {
//     routeName: "yoda",
//     name: "Yoda",
//     role: "Jedi Master",
//     age: 900,
//     forcePoints: 2000
//   }
// ];

// Routes
// =============================================================
app.use(express.static(path.join(__dirname, '/public')));
// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

// Displays all notes
app.get("/api/notes", function(req, res) {
  const data=fs.readFileSync('./db/db.json','utf-8');
  console.log(data);
  return res.json(data);
});

// // Displays a single character, or returns false
// app.get("/api/characters/:character", function(req, res) {
//   const chosen = req.params.character;

//   console.log(chosen);

//   for (const i = 0; i < characters.length; i++) {
//     if (chosen === characters[i].routeName) {
//       return res.json(characters[i]);
//     }
//   }

//   return res.json(false);
// });

// // Create New Characters - takes in JSON input
// app.post("/api/characters", function(req, res) {
//   // req.body hosts is equal to the JSON post sent from the user
//   // This works because of our body parsing middleware
//   const newCharacter = req.body;

//   // Using a RegEx Pattern to remove spaces from newCharacter
//   // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
//   newCharacter.routeName = newCharacter.name.replace(/\s+/g, "").toLowerCase();

//   console.log(newCharacter);

//   characters.push(newCharacter);

//   res.json(newCharacter);
// });

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
