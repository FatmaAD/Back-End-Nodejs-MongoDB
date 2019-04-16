const User = require("./../model/User");
const createError = require("http-errors");
const validator = require("validator");

module.exports = userCtrl = {
  //register a new user
  register: async function(req, res, next) {
    debugger;
    const { username, email, password } = req.body;
    if (validator.isAlpha(username) && validator.isEmail(email)) {
      const usr = new User(req.body);
      await usr.save();
      res.send(usr);
    } else {
      next(createError(404, "invalid inputs"));
    }
  },

  //checks a loged in user
  login: async function(req, res, next) {
    // debugger;
    const { username, password } = req.body;
    if (!username && !password) next(createError(401, "authintication failed"));
    const user = await User.findOne({ username });
    if (!user) return next(createError(401, "user invalid"));
    const matched = await user.verifyPass(password);
    if (!matched) return next(createError(401, "authintication failed"));
    const token = await user.tokenGenerator();
    res.send({
      token,
      user
    });
  },

  getById: async function(req, res, next) {
    const id = req.params.userId;
    if (id) {
      const usr = await User.findOne({ _id: id });
      if (usr) res.send(usr);
    } else return next(createError(404, "unvalid id"));
  },

};



