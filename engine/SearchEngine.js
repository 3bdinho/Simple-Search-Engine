const InvertedIndex = require("../models/InvertedIndex");
const Document = require("../models/Document");
const tokenize = require("../utils/tokenizer");

const search = async (query, limit = 10) => {
  try {
    const terms = tokenize(query);

    if (terms.length === 0) return [];

    const totalCount = await Document.countDocuments();

    if (totalCount === 0) return [];

    const termResult = await InvertedIndex.find({ term: { $in: terms } });

    if (termResult.length === 0) return [];

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

    // Convert map to array and sort by score
    const rankedResults = Array.from(documentScores.values())
      .sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score;
        return b.termMatches - a.termMatches;
      })
      .slice(0, limit);

    //Get all Document details
    const results = await Promise.all(
      rankedResults.map(async (result) => {
        const doc = await Document.findById(result.docId);
        return {
          ...doc.toObject(),
          score: result.score,
          matchedTerms: result.termMatches,
        };
      }),
    );

    return results;
  } catch (err) {
    console.error("Search error:" , err);
    throw err;
  }
};
