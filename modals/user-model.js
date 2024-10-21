const mongoose = require("mongoose");

//bcrypt - for password hashing
const bcrypt = require("bcrypt");

//JSON - web token - JWT
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  isAdmin: {
    type: Boolean,
    require: false,
  },
});

//secuire the password with  bcrypt -- middleware
userSchema.pre("save", async function (next) {
  const user = this;

  if (!user.isModified("password")) {
    return next();
  }

  try {
    const saltRound = await bcrypt.genSalt(10);
    const hash_password = await bcrypt.hash(user.password, saltRound);
    user.password = hash_password;
    next();
  } catch (error) {
    next(error);
  }
});

//json Web token - controll user to what perform , it not stored in database and stored in server during authentication in
//  localStorage / cookies for later use
userSchema.methods.generateToken = async function () {
  try {
    return jwt.sign(
      {
        userId: this._id.toString(),
        email: this.email,
        isAdmin: this.isAdmin,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1d" } // 30 days token
    );
  } catch (error) {
    console.log(error);
  }
};

//compare password
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
}

//define the model / collection name
const User = new mongoose.model("User", userSchema);
module.exports = User;
