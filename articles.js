const mongoose = require("mongoose");

// Schema defines our data model. Topping names must be unique!
const ArticleSchema = mongoose.Schema({
    title: String,
    content: String,
    tags: [
      String
    ]
});

// Creating a model defines a new collection
const Articles = mongoose.model("Articles", ArticleSchema);
module.exports = Articles;

