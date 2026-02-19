const asyncHandler = require("express-async-handler");
const SearchEngine = require("../engine/SearchEngine");
const ApiError = require("../utils/ApiError");

exports.searchHandler = asyncHandler(async (req, res, next) => {
  const { q, limit } = req.query;

  if (!q) return next(new ApiError("Query parameter 'q' is required", 400));

  const result = await SearchEngine.search(q, limit ? parseInt(limit) : 10);

  res.status(200).json({
    status: "success",
    query: q,
    count: result.length,
    result: result.map((doc) => ({
      id: doc._id,
      title: doc.title,
      url: doc.url,
      relevanceScore: doc.score.toFixed(40),
      matchedTerms: doc.matchedTerms,
      excerpt: doc.content.substring(0, 200) + "...",
    })),
  });
});

exports.SearchBooleanHandler = asyncHandler(async (req, res, next) => {
  const { q } = req.query;
  if (!q) {
    return next(new ApiError('Query parameter "q" is required', 400));
  }

  const results = SearchEngine.booleanSearch(q);

  res.status(200).json({
    status: "success",
    query: q,
    resultCount: results.length,
    results: (await results).map((doc) => ({
      id: doc._id,
      title: doc.title,
      url: doc.url,
      excerpt: doc.content.substring(0, 200) + "...",
    })),
  });
});
