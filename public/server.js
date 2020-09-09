// Dependencies
const express = require("express");
const fs = require("fs");
const path = require("path");
const noteFile = require(".db/db.json");


// Set up the Express App
const app = express();
const PORT = normalizePort(process.env.PORT || "3000");

// Set up app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "notes.html"));
});

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});