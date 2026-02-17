const mongoose = require("mongoose");

const invertedIndexSchema = new mongoose.Schema({
  term: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  postings: [
    {
      docId: mongoose.Schema.Types.ObjectId,
      positions: [Number],
    },
  ],
  // Calculate the number of documents containing this term
  df: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("InvertedIndex", invertedIndexSchema);
