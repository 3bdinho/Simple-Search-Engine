const tokenize = require("./tokenizer");
const InvertedIndex = require("../models/InvertedIndex");

const indexDocument = async (document) => {
  try {
    //1-tokenize title and content together
    const title = tokenize(document.title);
    const content = tokenize(document.content);
    const allTokens = [...title, ...content];

    //2-Build term frequency map with positions
    const termMap = {};
    allTokens.forEach((token, position) => {
      if (!termMap[token]) {
        termMap[token] = { frequency: 0, positions: [] };
      }
      termMap[token].frequency += 1;
      termMap[token].positions.push(position);
    });

    //3-Update or create inverted index entries
    for (const [term, { frequency, positions }] of Object.entries(termMap)) {
      await InvertedIndex.findOneAndUpdate(
        { term },
        {
          $push: { postings: { docId: document._id, frequency, positions } },
          $inc: { df: 1 }, // increase doc freq
        },
        { upsert: true, new: true }, //To create one if not exists
      );
    }

    console.log(`indexed document: ${document._id}`);
  } catch (err) {
    console.error(`Indexing error:`, err);
    throw err;
  }
};

module.exports = indexDocument;
