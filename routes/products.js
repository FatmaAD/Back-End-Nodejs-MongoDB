const express = require("express");
const router = express.Router();
const productctrl = require("../controllers/products");

//get all product
router.get("/", productctrl.getAll);

//getById one product
router.get("/:productId", productctrl.getById);

//get the products of a spicific user 
router.get("/user/:userId",productctrl.getRelatedProducts )

//add a new product
router.post("/", productctrl.add);

//remove a product
router.delete("/:productId", productctrl.remove);

//update product
// router.post("/", productctrl.update);
module.exports = router;
