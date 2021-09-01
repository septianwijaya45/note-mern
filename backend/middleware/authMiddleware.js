const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const expressAsyncHandler = require("express-async-handler");

// Memproteksi jika user belum login
const protect = expressAsyncHandler(async (req, res, next) => {
  let token;

  // jika ada authorization di backend dan frontend
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1]; //ambil encrypt kedua untuk mengambil data

      const decode = jwt.verify(token, process.env.JWT_SECRET); // ambil data token dan bandingkan dengan jwt

      req.user = await User.findById(decode.id).select("-password"); // remove column password

      next();
    } catch (error) {
      // jika gagal
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  // jika tidak ada token (tidak ada authorization)
  if (!token) {
    res.status(401);
    throw new Error("Not Authorized, Token Not Found");
  }
});

module.exports = protect;
