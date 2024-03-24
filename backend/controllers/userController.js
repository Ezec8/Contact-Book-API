const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');   

//@desc register user
//@route POST /api/users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400);
    throw new Error("Invalid Credentials, Fill in all fields");
  }
  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("User with Email already exists");
  }

  //hashed pw
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log(`hashed pw is: ${hashedPassword}`); // test

  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  console.log(`User created: ${user}`);
  if (user) {
    res.status(201).json({ _id: user.id, email: user.email });
  } else {
    res.status(400);
    throw new Error("User data is not valid");
  }

  res.status(201).json(user);
});

//@desc user login
//@route POST /api/users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body; 

    if (!email || !password) {
        res.status(400);
        throw new Error("Username/password is incorrect")
    }
    const user = await User.findOne({email});
    // compare pw with hashed pw 
    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign({
            user: {
                username: user.username,
                email: user.email, 
                id: user.id
            }
        }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" })
        res.status(200).json({ accessToken });
    } else {
        res.status(401);
        throw new Error("Username/password is incorrect");
    } 
});

//@desc current user information
//@route GET /api/users/current
//@access private
const userCurrent = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

module.exports = {
  registerUser,
  loginUser,
  userCurrent,
};
