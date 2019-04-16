const express = require("express");
const router = express.Router();
const userCntrl = require('./../controllers/user');
const AuthintacationMdW = require('./../middlewares/Authintication')

/* posts a user in the user collection */
router.post("/", userCntrl.register );

//checks on a user in collection
router.post("/authenticate", userCntrl.login)

router.post("/:userId", userCntrl.getById)


//anything after the user has to be authorized
// router.use(AuthintacationMdW)


module.exports = router;
