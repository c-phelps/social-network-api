// Will require a virtual called friendCount, retrieves the length of the user's  friend array
// username - String, Required, Unique, Trimmed (no leading trailing spaces)
// email - String, Required, Unique, requires validation for an email address
// thoughts - Array of _id values from the Thought model
// friends - Arrray of _id values from the User model

const { Schema, model } = require("mongoose");

const userSchema = new Schema({});

userSchema.virtual("friendCount", function () {
  return this.friends.length;
});

const User = model("user", userSchema);

module.exports = User;
