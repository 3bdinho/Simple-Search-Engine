const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/ApiError");
const Document = require("../models/Document");
const SearchEngine = require("../engine/SearchEngine");

// @desc    Add a new document to the search index
// @route   POST /api/documents
// @body     Body: { title, content, url }
exports.CreateOne = asyncHandler(async (req, res, next) => {
  const { title, content, url } = req.body;

  if (!title || !content) {
    return next(new ApiError("Title and content are required", 400));
  }

  const document = await Document.create({ title, content, url });

  res.status(201).json({
    status: "success",
    datat: document,
  });
});

// @desc    Retrieve all documents in the database
// @route   GET /api/documents
exports.getAllDocs = asyncHandler(async (req, res, next) => {
  const docs = await Document.find();

  res.status(200).json({
    status: "success",
    count: docs.length,
    data: docs,
  });
});

// @desc    Get a specific document by ID
// @route   GET /api/documents/:id
exports.getDocById = asyncHandler(async (req, res, next) => {
  const doc = await Document.findById(req.params.id);

  if (!doc) return next(new ApiError("Document not found", 404));

  res.status(200).json({
    status: "success",
    data: doc,
  });
});

exports.deleteById = asyncHandler(async (req, res, next) => {
  const doc = SearchEngine.deleteDocument(req.params.id);
  if (!doc) return next(new ApiError("Document not found", 404));
  res.status(200).json({
    status: "success",
    message: "Document deleted successfully",
  });
});
