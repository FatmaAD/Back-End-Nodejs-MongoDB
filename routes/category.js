const express = require("express");
const router = express.Router();
const categoryCtrl = require("./../controllers/category");

//to get all the categories
router.get("/", categoryCtrl.getAll)

//gets only one by id 
router.get('/:categId', categoryCtrl.getById)

//to add a category  
router.post("/",categoryCtrl.add)


//to delete a category 
router.delete("/:categId",categoryCtrl.remove)

module.exports = router;
