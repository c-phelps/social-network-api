// export the functions used by each of the routes stated in the routes/api/thoughtRoutes.js file
const User = require("../models/User");
const Thought = require("../models/Thought");
// find all user
async function getUser(req, res) {
  try {
    const user = await User.find().select("-__v");
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
}
// create user
async function createUser(req, res) {
  try {
    const userData = await User.create(req.body);
    const user = await User.findOne({ _id: userData._id }).select("-__v");
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
}
// retrieve a single user by id
async function getUserById(req, res) {
  try {
    const user = await User.findOne({ _id: req.params.id }).select("-__v");

    if (!user) {
      return res.status(404).json({ message: "No user found." });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json("error" + err);
  }
}
// update a user by id
async function updateUserById(req, res) {
  try {
    const user = await User.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true })
      // exclude the version field:
      .select("-__v");

    if (!user) {
      return res.status(404).json({ message: "No user found." });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
}
// remove user by id
async function deleteUserById(req, res) {
  try {
    const user = await User.findOneAndRemove({ _id: req.params.id });

    if (!user) {
      return res.status(404).json({ message: "No user found." });
    }

    const thought = await Thought.deleteMany({ username: user.username }, { new: true });

    if (!thought) {
      return res.status(404).json({ message: "User deleted, no associated thoughts." });
    }
    res.json("User and associated thoughts deleted.");
  } catch (err) {
    res.status(500).json(err);
  }
}
// api/:userId/friend/:friendId
// create a friend for the user based off the userId
async function createFriendById(req, res) {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { new: true }
    )
      // exclude the version field:
      .select("-__v");

    if (!user) {
      return res.status(404).json({ message: "No user found." });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
}
// delete user by id
async function deleteFriendById(req, res) {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { new: true }
    )
      // exclude the version field:
      .select("-__v");

    if (!user) {
      return res.status(404).json({ message: "No user found." });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
}
// export the functions
module.exports = {
  getUser,
  createUser,
  getUserById,
  updateUserById,
  deleteUserById,
  createFriendById,
  deleteFriendById,
};
