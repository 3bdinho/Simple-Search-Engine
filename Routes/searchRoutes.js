const express = require("express");
const router = express.Router();
const {
  searchHandler,
  SearchBooleanHandler,
} = require("../services/searchService");

router.get("/", searchHandler);

/**
   GET /api/search/boolean
   Query params: q (search query with AND/OR operators)
 */
router.get("/boolean", SearchBooleanHandler);

module.exports = router;
