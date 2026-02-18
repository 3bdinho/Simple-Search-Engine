const express = require("express");
const router = express.Router();
const { searchHandler } = require("../services/searchService");

router.get("/", searchHandler);

module.exports = router;
