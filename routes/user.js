const express = require("express");
const router = express.Router();
const userCntrl = require('./../controllers/user');

/* posts a user in the user collection */
router.post("/", userCntrl.register );

//checks on a user in collection
router.post("/authenticate", userCntrl.login)

router.post("/:userId", userCntrl.getById)


module.exports = router;
