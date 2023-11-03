const express = require("express");
const path = require("path");
const logger = require("morgan");
const { handleHttpErrors } = require("./src/errorHandler");
require("dotenv").config();

const photosRouter = require("./routes/photos");
const aiRouter = require("./routes/ai");

const app = express();
app.use(logger("dev"));
app.use(express.json());
app.use(express.static(path.join(__dirname, "/static")));
app.use("/externalapi/photos", photosRouter);
app.use("/externalapi/ai", aiRouter);
app.use(handleHttpErrors);

module.exports = app;
