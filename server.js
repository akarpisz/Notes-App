const express = require("express");
const path = require("path");
const fs = require("fs");
const { text } = require("express");
const app = express();

const PORT = 5000;




global.appRoot = path.resolve(__dirname);

class Note {
  constructor(id, title, text) {
    this.id = id;
    this.title = title;
    this.text = text;
  }
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.get("/", function (req, res) {
  res.sendFile(path.join(appRoot + "/public/", "index.html"));
});

app.get("/notes", function (req, res) {
  res.sendFile(path.join(appRoot + "/public/", "notes.html"));
});

app.get("/api/notes", function (req, res) {
  let notes = fs.readFileSync("./db/db.json", "utf-8", function (err, data) {
    if (err) throw err;
    return data;
  });
  return res.json(JSON.parse(notes));
});
app.post("/api/notes", function (req, res) {
  var notes = fs.readFileSync("./db/db.json", "utf-8", function (err, data) {
    if (err) throw err;
    return data;
  });
  let newId = JSON.parse(notes).length + 1;
console.log(newId);
  let savedNotes = JSON.parse(notes);
  
  let newNote = new Note(newId, (req.body.title), (req.body.text));
  savedNotes.push(newNote);
  console.log(newNote);
  fs.writeFileSync("./db/db.json", JSON.stringify(savedNotes), (err) => {
    throw err;
  });
});

app.delete("/api/notes/:id", async function (req, res) {

  let del = req.params.id;
  let data = fs.readFileSync("./db/db.json");
  let json = JSON.parse(data);
  let len = json.length;
  let newNoteArr = json.filter(note => note.id !== del);
  console.log(newNoteArr);
  //here
  
});

app.listen(PORT, function () {
  console.log(`listening on Port: ${PORT}`);
});
