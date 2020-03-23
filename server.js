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

// app.use("/", (req, res) => {
//   res.sendFile(__dirname + "/public/index.html");
//  });

// app.get("/")

// app.post("./addArticle", (req, res) => {
//   var myData = new User(req.body);
//   myData.save()
//       .then(item => {
//           res.send("Article saved to database");
//       })
//       .catch(err => {
//           res.status(400).send("Unable to save to database");
//       });
// });

// trying to enter multiple data 
// Article.insertMany([
//   {title: "Trump outlines national guard activations for New York, California and Washington", content:"xyz info"},
//   {title: "Dow futures drop 5%, hitting 'limit down' at the start of futures trading Sunday", content:"abc info"}, 
//   {title: "30 days that brought the world to the brink of a depression", content:"lmn info"}
// ], (err, newArticle) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(newArticle);
// });

// to find some things in the document 
// Articles.find({"content":"lmn info"}, (err, result) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(result);
// });

//to delete multiple records 
// Articles.deleteMany({"content":"lmn info", "content":"xyz info","content":"abc info"}, (err) => {
//   if (err) {
//     console.log(err);
//   }
// });


// app.get("/articles", (req, res) => {
//   getArticles((err, articles) => {
//     res.json(articles);
//   });
// });
/*
app.post("/articles", (req, res) => {
  const articleTitle = req.body.title;
  if (!articleTitle) {
    return res.status(400).json({ message: "Missing \"article\" attribute from request body." });
  }
  addArticle(article, (err, newArticle) => {
    res.json(newArticle);
  });
});
*/
// app.delete("/article/:title", (req, res) => {
//   const articleToDelete = req.params.title;
//   deleteArticle(articleToDelete, (err, numDeleted) => {
//     if (numDeleted === 0) {
//       return res.status(404).json({ message: `Article with the title "${articleToDelete}" does not exist.` });
//     }
//     res.json({ numDeleted: numDeleted });
//   });
// });

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
  const messages = Article.find().exec((err, data) => {
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

app.listen(3000, () => {
  console.log("Server is listening on port 3000!");
});


