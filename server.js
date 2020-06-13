const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();

const PORT = 5000;
global.appRoot = path.resolve(__dirname);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", function(req, res) {
    res.sendFile(path.join(appRoot + "/public/", "index.html"));
});

app.get("/notes", function(req,res) {
    res.sendFile(path.join( appRoot + "/public/", "notes.html"));
});

app.get("/api/notes", function(req, res){
    var notes = fs.readFileSync("./db/db.json", "utf-8", function(err, data){
        if (err) throw err;
        return data;
    })
    return res.json(JSON.parse(notes));
});



app.listen(PORT, function(){
    console.log(`listening on Port: ${PORT}`);
})