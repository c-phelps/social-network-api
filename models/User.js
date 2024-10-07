// Will require a virtual called friendCount, retrieves the length of the user's  friend array
// username - String, Required, Unique, Trimmed (no leading trailing spaces)
// email - String, Required, Unique, requires validation for an email address
// thoughts - Array of _id values from the Thought model
// friends - Arrray of _id values from the User model

const { Schema, model } = require("mongoose");

// function takes a string passed by the validator and checks it against the regex
const validEmail = (email) => {
  // basic regex that determines if a valid email has been sent
  // 1+ a-Z0-9 followed by @ 1+ a-Z0-9 follwed by decimal literal and 1+ a-Z
  const regexEmail = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]+$/;
  // returns true if the string passes the regex test
  return regexEmail.test(email);
};

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        // if the validator passes the email test, returns true and passes
        validator: (email) => Promise.resolve(validEmail(email)),
        message: "Invalid email format",
      },
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "thought",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

const User = model("user", userSchema);

module.exports = User;
