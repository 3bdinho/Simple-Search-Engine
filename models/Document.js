const mongoose = require("mongoose");
const indexDocument = require("../utils/Indexer");

const documentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    index: true,
  },
  content: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    unique: true,
  },
  view: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

documentSchema.post("save", async function () {
  await indexDocument(this);
});

module.exports = mongoose.model("Document", documentSchema);
