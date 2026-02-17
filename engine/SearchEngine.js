const invertedIndexSchema = require("../models/InvertedIndex");
const Document = require("../models/Document");
const tokenize = require("../utils/tokenizer");

const search = async (query) => {
  const terms = tokenize(query);

  if (terms.length === 0) return [];

  const totalCount = await Document.countDocuments();

  if (totalCount === 0) return [];

  const termResult = await invertedIndexSchema.find({ term: { $in: terms } });

  if (termResult === 0) return [];

  const documentScores = new Map();

  termResult.forEach((termData) => {
    const idf = Math.log(totalCount / termData.df);

    termData.postings.forEach((posting) => {
      const docId = posting.docId;
      const tf = posting.frequency;
      const tfIdf = tf * idf;

      if (!documentScores.has(docId)) {
        documentScores.set(docId, {
          docId,
          score: 0,
          termMatches: 0,
        });
      }
      const docScore = documentScores.get(docId);
      docScore.score += tfIdf;
      docScore.termMatches += 1;
    });
  });
};
