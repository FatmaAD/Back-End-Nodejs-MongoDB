const User = "./../model/User.js";

module.exports = (req, res, next) => {
  const { Authurization: token } = req.headers;
  req.user = User.getUserByToken(token);
  if(!req.user) throw new Error('Faild to find a matching user')
  next()
};
