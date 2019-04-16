const Category = require("./../model/category");
const product = require("./../controllers/products");
const createError = require("http-errors");
const validator = require("validator");

module.exports = categoryCtrl = {
  //get all categories
  getAll: async function(req, res, next) {
    const categ = await Category.find();
    if (categ) {
      res.send(categ);
    } else return next(createError(404));
  },

  //get one category
  getById: async function(req, res, next) {
    const categName = req.params.categId;
    const products = product.getAll();
    if (products) {
      const categProducts = [];
      for (let i = 0; i < products.length; i++) {
        if (products[i].category === categName) {
          categProducts.push(products[i]);
        }
      }
    }
    console.log(categProducts);
    if (products) {
      res.send(products);
    } else return next(createError(401, "incorrect request inputs"));
  },

  //to add a new category
  add: function(req, res, next) {
    const { name, products } = req.body;
    if (validator.isAlpha(name) && products.constructor === Array) {
      const category = new Category(req.body);
      category.save();
      res.send(category);
    } else return next(createError(401, "incorrect values"));
  },

  //to remove a category
  remove: async function(req, res, next) {
    const id = req.params.categId;
    if (id) {
      const c = await Category.findOne({ _id: id });
      if (c) {
        Category.deleteOne(
          { _id: id },
          next(createError(404, "Faild to delete"))
        );
        res.send("Success");
      } else return next(createError(400, "incorrect values"));
    }
  }
};
