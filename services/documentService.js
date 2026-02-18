const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/ApiError");
const Document = require("../models/Document");

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
