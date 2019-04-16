const mongoose = require("mongoose");

const schema = mongoose.Schema({
  image: {
    type: String
  },
  name: {
    type: String,
    required: true,
    index: {
      unique: true
    }
  },
  pricea: {
    type: Number,
    required: true
  },
  priceb: {
    type: Number
  },
  category: {
    type: String,
    required: true
  },
  desrciption: {
    type: String
  },
  addedBy: {
    type: String,
    required: true,
    index: {
      unique: true
    }
  }
});

const Product = mongoose.model("Product", schema);
module.exports = Product;
