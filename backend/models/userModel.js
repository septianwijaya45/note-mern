const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      // role user jika admin
      type: Boolean,
      required: true,
      default: false,
    },
    pic: {
      type: String,
      require: true,
      default:
        "https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png",
    },
  },
  {
    timestamps: true,
  }
);

// ***** Bcrypt Password User ***** //
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
// ***** Bcrypt Password User ***** //

const User = mongoose.model("Users", userSchema);

module.exports = User;
