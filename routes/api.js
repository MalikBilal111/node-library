var express = require("express");
var galleryRouter = require("./gallery");

var app = express();

app.use("/upload/", galleryRouter);

module.exports = app;
