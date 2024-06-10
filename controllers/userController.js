const asyncHandler = require("express-async-handler");
const User = require("../models/userModal");
const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
//@desc register a user
//@route POST user/register
//@access public

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All Fields Are Required");
  }
  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("User Already Exists");
  } else {
    const hashedPassword = await bycrypt.hash(password, 10);
    const user = User.create({
      username,
      email,
      password: hashedPassword,
    });
    if (user) {
      res.status(201).json({ _id: user.id, email: user.email });
    } else {
      res.status(400);
      throw new Error("User Data is Not Valid");
    }
  }
  res.json({ message: "User Registered Succesfully" });
});

//@desc sign in a user
//@route POST user/loginUser
//@access public

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fileds are mandatory");
  }
  const user = await User.findOne({ email });
  if (user && (await bycrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );
    res.status(201).json({ accessToken });
  } else {
    res.status(401);
    throw new Error("Email or password is not valid");
  }
});

//@desc get current user
//@route GET user/current
//@access private
const getCurrentUser = asyncHandler(async (req, res) => {
  res.json(req.user);
});

module.exports = {
  registerUser,
  loginUser,
  getCurrentUser,
};
