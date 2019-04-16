const mongoose = require("mongoose");

const schema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: {
      unique: true
    }
  },
  products: {
    type: [String],
    required: true
  }
});

const Category = mongoose.model("Category", schema);
module.exports = Category;
