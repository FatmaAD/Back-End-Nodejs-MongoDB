const Product = require("../model/product");
const createError = require("http-errors");
const validator = require("validator");

module.exports = productCtrl = {
  getAll: async function(req, res, next) {
    const products = await Product.find();
    if (products) res.send(products);
    else return next(createError(404, "page not found"));
  },

  getById: async function(req, res, next) {
    const id = req.params.productId;
    if (id) {
      const product = await Product.findOne({ _id: id });
      if (product) res.send(product);
    } else return next(createError(404, "unvalid id"));
  },

  getRelatedProducts: async function(req, res, next) {
    const userId = req.params.userId
    const products = await Product.find({ addedBy: userId });
    res.send(products)
  },


  add: async function(req, res, next) {
    const { image, name, pricea, priceb, category, description } = req.body;
    if (
      validator.isAlpha(validator.blacklist(name, " ")) &&
      validator.isInt(pricea) &&
      validator.isAlpha(category)
    ) {
      const product = new Product(req.body);
      console.log(req.body);
      await product.save();
      res.send(product);
    } else return next(createError(400, "incorrect values"));
  },

  remove: async function(req, res, next) {
    const _id = req.params.productId;
    try {
      if (_id) {
        const p = await Product.findOne({ _id });
        if (p) {
          await Product.deleteOne({ _id });
          res.status(200).send("deleted successfully");
        } else return next(createError(400, "incorrect values"));
      }
    } catch (error) {
      next(createError(401, error));
    }
  }
};
