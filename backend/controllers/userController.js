const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

exports.registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(404);
    throw new Error("User Already Exists");
  }

  const user = await User.create({
    name,
    email,
    password,
    pic,
  });

  if (user) {
    res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      password: user.password,
      pic: user.pic,
    });
  } else {
    res.status(400);
    throw new Error("Error Occured!");
  }

  res.json({
    name,
    email,
  });
});
