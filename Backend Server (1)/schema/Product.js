const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Product = new Schema({
  code: {
    type: String,
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  review: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Products", Product);
