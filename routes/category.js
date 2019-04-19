const express = require("express");
const router = express.Router();
const categoryCtrl = require("./../controllers/category");

router.get('/:categName', categoryCtrl.getById)


module.exports = router;
