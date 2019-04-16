const mongoose = require("mongoose");
const validator = require("validator");
const { promisify } = require("util");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
const sign = promisify(jwt.sign);
const verify = promisify(jwt.verify);

//process enironmets
const saltRounds = process.env.SALT_ROUNDS || 10;
const secretKey = process.env.SECRET_KEY || "Temp_Secret_Key";
const tokenExpiry = process.env.TOKEN_EXPIRY || "5hrs";

const schema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      index: {
        unique: true
      }
    },
    password: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      index: { unique: true },
      validate: validator.isEmail
    }
  },
  {
    toJSON: {
      hidden: ["password", "__v"],
      transform: true
    }
  }
);

//hide the password from the JSON res
schema.options.toJSON.transform = function(doc, ret, option) {
  if (option.hidden) {
    option.hidden.forEach(field => {
      delete ret[field];
    });
  }
  return ret;
};

const hashPass = pass => bcrypt.hash(pass, saltRounds);

//hash pass before saving or case modified
schema.pre("save", async function() {
  const user = this;
  if (user.isNew || user.modifiedPaths().includes("password")) {
    user.password = await hashPass(user.password);
  }
});

//compares the existing pass with another after hash
schema.method("verifyPass", function(pass) {
  return bcrypt.compare(pass, this.password);
})

//generates a token
schema.method("tokenGenerator", async function() {
  return sign({ _id: this._id }, secretKey, { expiresIn: tokenExpiry });
});

//checks on a usertokens
schema.method("getUserByToken", async function(token) {
  const decoded = await verify(token, secretKey);
  const user = User.findById(decoded._id);
  if (!user) throw new Error("User not found");
  return user;
});

const User = mongoose.model("User", schema);
module.exports = User;
