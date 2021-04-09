const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

//set express app
const app = express();

//connect to mongodb
mongoose.connect("mongodb://localhost/ninjago", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});
// mongoose.set("useCreateIndex", true);
mongoose.Promise = global.Promise;

app.use(express.static("public"));

app.use(bodyParser.json());

//initialize routes
app.use("/api", require("./routes/api"));

//error handling middleware
app.use(function (err, req, res, next) {
  console.log(err);

  res.status(422).send({
    error: err.message,
  });
});

app.listen(process.env.port || 4000, function () {
  console.log("now Listening for requests");
});
