const InvertedIndex = require("../models/InvertedIndex");
const Document = require("../models/Document");
const tokenize = require("../utils/tokenizer");

/*@desc   
SearchEngine core search functionality With IF,IDF ranking
Data structures(maps),string proccessing, ranking logic
*/
class SearchEngine {
  /* @des
  - Search documents using TF-IDF ranking
  - Tokenizes query
  - Calculates TF-IDF scores for matching documents
  - Returns ranked results
 */
  static async search(query, limit = 10) {
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
      console.error("Search error:", err);
      throw err;
    }
  }

  /**   @des Delete a document and update all related inverted index entries */
  static async deleteDocument(docId) {
    try {
      // Remove document
      const doc = await Document.findByIdAndDelete(docId);
      if (!doc) throw new Error("Document not found");

      // Remove from all inverted index entries
      await InvertedIndex.updateMany(
        { "postings.docId": docId },
        {
          $pull: { postings: docId }, //To delete posting
          $inc: { df: -1 }, //dcatch(err){
        },
      );

      // Clean up inverted index entries with no postings
      await InvertedIndex.deleteMany({ postings: { $size: 0 } });

      return doc;
    } catch (err) {
      console.error(err);
    }
  }
}

module.exports = SearchEngine;
