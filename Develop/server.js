// Dependencies
// =============================================================
const express = require("express");
const path = require("path");
const fs=require('fs');
const { isNullOrUndefined } = require("util");

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.port || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Notes (DATA)
// =============================================================
const notes=[];
let noteId="";

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
  // console.log(data);
  // for(x in data) {
  //      notes.push(x);
  // }
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
// Create New note - takes in JSON input
app.post("/api/notes", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  const dataValue=(fs.readFileSync('./db/db.json','utf-8'));
  notes.length=0;
  if(dataValue.length)
  {
    JSON.parse(dataValue).forEach(element => {
    notes.push(element);
  });
}
  console.log(notes);
  const maxId=notes.map(ele=>ele.id);
  console.log(maxId.length);
  if(maxId.length!=0)
  {
    req.body.id=Math.max(...maxId)+1;
  }
  else
  {
    req.body.id=1;
  //  console.log("Node id"+nodeId);
  }
  //req.body.id=parseInt(noteId);
  const newNote=req.body;
  notes.push(newNote);
  console.log(notes);
const noteJson=JSON.stringify(notes);
 fs.writeFileSync('./db/db.json',noteJson);
  res.json(true);
});
// delete note - takes in JSON input
app.delete("/api/notes/:id", function(req, res) {
  console.log(req.params.id);
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
   const dataValue=(fs.readFileSync('./db/db.json','utf-8'));
 notes.length=0;
  if(dataValue.length)
  {
    JSON.parse(dataValue).forEach(element => {
    notes.push(element);
  });
}
notes.forEach(element => {
  if(element.id==req.params.id)
  {
    notes.pop(element);
  }
});
//   console.log(notes);
//   const maxId=notes.map(ele=>ele.id);
//   console.log(maxId.length);
//   if(maxId.length!=0)
//   {
//     req.body.id=Math.max(...maxId)+1;
//   }
//   else
//   {
//     req.body.id=1;
//   //  console.log("Node id"+nodeId);
//   }
//   //req.body.id=parseInt(noteId);
//   const newNote=req.body;
//   notes.push(newNote);
//   console.log(notes);
 const noteUpdate=JSON.stringify(notes);
  fs.writeFileSync('./db/db.json',noteUpdate);
  res.json(true);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
