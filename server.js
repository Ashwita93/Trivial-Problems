const express = require("express");
const app = express();
const mongoose = require("mongoose");
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require("dotenv").config();

const MONGO_URL = process.env.MONGO_URL;
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("connected!");
});

const Article = require("./articles.js");


app.use(express.static("public"));


app.post("/add", (request, response) => {
  console.log('request.body', request.body)
  const newTitle = request.body.title;
  const newContent = request.body.content;
  addArticle(newTitle, newContent, (err, newData) => {
      if(err) {
        console.error('[ERROR] /add', err);
        response.status(500).json({status: 'error'});
      }
      response.json(newData);
  });
});

app.get("/display", (request, response) => {
  // const messages = Article.find().exec((err, data) => {
  //     response.json(data);
  // });
  const messages = Article.find((err, data) => {
    response.json(data);
});
})

function addArticle(title, content, cb){
  Article.create({title: title, content: content}, (err, newMessage) => {
      if (err) console.log(err)
      else cb(err, newMessage)
  })
  //Message.insert({name: name},(err, newName) => {
  //cb(err, newName);
  //});
}

// app.listen(3000, () => {
//   // console.log("Server is listening on port 3000!");
// });

const port = process.env.PORT || 3000; 
app.listen(port, () => { console.log(`Express server listening on port ${port}!`); 
});

