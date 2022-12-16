const mongoose = require("mongoose");

const commentsSchema = new mongoose.Schema({
    user: {
      type: String,
    },
    password: {
      type: String,
    },
    content: {
      type: String
    }
  });
  
  module.exports = mongoose.model("Comment", commentsSchema);