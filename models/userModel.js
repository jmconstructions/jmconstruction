const crypto = require("crypto");

const mongoose = require("mongoose");

const validator = require("validator");

const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name of the user is compulsory"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "An email is must"],
    unique: true,
    lowercase: true, //this will just transform email to lower case
    validate: [validator.isEmail, "please provide a valid email"],
  },
  photo: {
    type: String,
    default: "default.jpg",
  },
  role: {
    type: String,
    enum: ["user", "nextadmin", "employee", "admin"],
    default: "user",
  },
  password: {
    type: String,
    required: [true, "A password is must"],
    minlength: 8,
    select: false,
  },
  active: {
    default: true,
    type: Boolean,
  },

  passwordConfirm: {
    type: String,
    required: [true, "please confirm your password"],
    minlength: 8,
    //lescture number 127
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "password are no the same",
    },
    select: false,
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },

  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
});

userSchema.pre("save", async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified("password")) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;

  next();
});

userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) {
    return next();
  }

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    // console.log('Password was changed at:', this.passwordChangedAt);
    // console.log('Password was changed at:', changedTimestamp);
    // console.log('JWT Timestamp:', JWTTimestamp);
    return JWTTimestamp < changedTimestamp;
  }

  //false means password is not changed
  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  // console.log({ resetToken }, this.passwordResetToken);

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  //this return is then use in the authcontroller
  return resetToken;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
