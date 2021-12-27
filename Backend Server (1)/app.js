var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
//Mongo DB Driver
const mongoose = require("mongoose");
const axios = require("axios");

const cors = require("cors");

var indexRouter = require("./routes/index");

var app = express();

//DotEnv
require("dotenv").config();

//Variables
var port = process.env.PORT || 5001;
const mongouri = process.env.ATLAS_URI;

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(cors());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods: GET, POST,PUT,PATCH, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const Product = require("./schema/Product");

app.post("/predict", async (req, res, next) => {
  // console.log(req.file.path.replace("\\", "/"));
  console.log(req.body.code);

  const reviews = await Product.find({ code: req.body.code });
  console.log(reviews);
  let total = 0;
  let reviewsArr = [];
  let productName = "";
  for (let x = 0; x < reviews.length; x++) {
    var r = { value: 0, review: "" };
    console.log();
    await axios
      .post("http://127.0.0.1:5000/predict", {
        review: [reviews[x].review],
      })
      .then((resAx) => {
        if (resAx.data.hasOwnProperty("prediction")) {
          // return res.json({
          //   eligiblity: false,
          //   message: resAx.data.no,
          //   status: "noid",
          // });

          total = total + parseFloat(resAx.data.prediction);
          console.log("prediction", resAx.data.prediction);
          r = { value: resAx.data.prediction, reviewString: reviews[x].review };
          productName = reviews[x].productName;
        }
      })
      .catch((error) => {
        res.json({
          eligiblity: false,
          message: "Something Wrong with Database Please Try Again Later",
          status: "404",
        });
        console.log(error);
      });
    reviewsArr.push(r);
  }

  return res.json({
    product: req.body.code,
    productName: productName,
    TotalRating: total,
    ReviewCount: reviews.length,
    Average: total / reviews.length,
    Reviews: reviewsArr,
  });
  // const rv = [
  //   {value: 2, review: 'Not satisfied with the product'},
  //   {value: 3, review: 'Product is okay'},
  //   {value: 4, review: 'Easy to use'},
  //   {value: 1, review: 'Very bad, waste of money'},
  //   {value: 5, review: 'Excellent product'},
  // ]

  // return res.json({
  //   product: req.body.code,
  //   TotalRating: 4.9,
  //   ReviewCount: rv.length,
  //   Average: total / rv.length,
  //   Reviews: rv
  // });
});

app.post("/addProductReview", (req, res, next) => {
  const p = new Product({
    code: req.body.code,
    review: req.body.review,
    productName: req.body.productName,
  });

  p.save()
    .then((single) => {
      console.log(single);
      res.status(201).json(single);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

//mongoDB Connection
mongoose
  .connect(mongouri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB Connected…");
  })
  .catch((err) => console.log(err));
//custom error handling
app.use((req, res, next) => {
  if (req.file) {
    fis.unlink(req.file.path, (err) => {
      console.log(err);
    });
  }
  const Er = new Error("Not Found");
  Er.status = 404;
  next(Er);
});

//custom error handling
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

app.listen(port, function () {
  console.log(`Server is running on port: ${port}`);
});

module.exports = app;
