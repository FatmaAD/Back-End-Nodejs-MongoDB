const Product = require("./../model/product.js");

module.exports = categoryCtrl = {

  getById: async function(req, res, next) {
    const categName = req.params.categName;
    const categories = await Product.find({ category: categName });
    if (categories.length > 0) {
      res.send(categories);
    } else return next(createError(401, "incorrect request inputs"));
  }

};
