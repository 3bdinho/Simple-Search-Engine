const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const mongoose = require("mongoose");
dotenv.config({ path: "config.env" });
const dbConnection = require("./config/database");
const documentRoute = require("./Routes/documentRoutes");
const searchRoute = require("./Routes/searchRoutes");

// Connect with db
dbConnection();

//Express app
const app = express();

//Middleware
app.use(express.json());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`mode: ${process.env.NODE_ENV}`);
}

// Mount Route
app.use("/api/v1/documents", documentRoute);
app.use("/api/v1/search", searchRoute);

const PORT = process.env.PORT || 9000;
app.listen(process.env.PORT, () => {
  console.log(`App running on ${PORT}`);
});
