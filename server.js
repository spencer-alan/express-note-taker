// Dependencies
const express = require("express");
const fs = require("fs");
const path = require("path");
const noteFile = require("./db/db.json");

// Set up the Express App
const app = express();
const PORT = process.env.PORT || "3000"

// Set up app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + "/public"));


// Update json file function
function updateFile(data, res) {
  fs.writeFile("./db/db.json", JSON.stringify(data), function(err) {
    if (err) throw err;
    res.json(data);
  });
};

// Routes
app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get("/api/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "./db/db.json"));
});

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.post("/api/notes", function(req, res) {
  let newNote = req.body;

  noteFile.push(newNote);
  noteFile.map((noteData, i) => noteData.id = i +1);
  updateFile(noteFile, res);
});

app.delete("/api/notes/:id", function(req, res) {
  id = req.params.id;

  fs.readFile("./db/db.json", "utf8", function(err, data) {
    if (err) throw err;
    let jsonData = JSON.parse(data);
    jsonData.splice(id - 1, 1);
    jsonData.map((noteData, i) => noteData.id = i +1);
    updateFile(jsonData, res);
  });
});

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});