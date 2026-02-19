const express = require("express");
const router = express.Router();
const {
  CreateOne,
  getAllDocs,
  getDocById,
  deleteById,
} = require("../services/documentService");

//POST  /api/documents to create new doc
router
  .route("/")
  .post(CreateOne)
  //GET   /api/documents to get all docs
  .get(getAllDocs);

router.route("/:id").get(getDocById).delete(deleteById);

module.exports = router;
