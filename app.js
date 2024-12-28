// External Import
var cors = require("cors");
var express = require("express");
var cookieParser = require("cookie-parser");
// Internal Import
var apiResponses = require("./helpers/api-response");
var indexRouter = require("./routes/index");
var apiRouter = require("./routes/api");
require("dotenv").config();
const port = process.env.SERVER_PORT || 4000;
global.__basedir = __dirname;
var app = express();
app.use(express.json());
app.use(cookieParser());

// To Allow Cross-Origin Requests
app.use(
  cors({
    origin: (origin, callback) => callback(null, true),
    credientials: true,
  })
);

app.use(express.static("public/uploads"));

//Route Prefixes
app.use("/", indexRouter);
app.use("/api", apiRouter);

app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb" }));
app.use(express.urlencoded({ extended: false }));

//throw 404 if URL not found
app.all("*", function (req, res) {
  return apiResponses.notFoundResponse(res, "Page not found");
});

app.use((err, req, res) => {
  if (err.name === "UnauthorizedError") {
    return apiResponses.unauthorizedResponse(res, err.message);
  }
});

app.listen(port, async () => {
  console.log("Server up on http://localhost:4000");
  // await sequelize.authenticate();
  // console.log("'Database Connected!");
});
app.maxHttpHeaderSize = 64 * 1024; // 64KB
module.exports = app;
