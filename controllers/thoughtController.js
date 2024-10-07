// export the functions used by each of the routes stated in the routes/api/userRoutes.js file
const Thought = require("../models/Thought");
const User = require("../models/User");

// retrieve all thoughts via get
async function getThought(req, res) {
  try {
    const thought = await Thought.find()
      // exclude the version field:
      .select("-__v");
    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
}
// create a user via post
async function createThought(req, res) {
  try {
    // create thought based on request
    const thought = await Thought.create(req.body);
    // exclude the version field:
    // update user based on new thought
    // where username = new thought username
    // insert thought id from new thought to user's thoughts array
    const user = await User.findOneAndUpdate(
      { username: thought.username },
      { $addToSet: { thoughts: thought._id } },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({
        message: "Thought created, user not found",
      });
    }

    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
}
// retrieve a single thought by id
async function getThoughtById(req, res) {
  try {
    const thought = await Thought.findOne({ _id: req.params.id })
      // exclude the version field:
      .select("-__v");

    if (!thought) {
      return res.status(404).json({ message: "No thought found." });
    }
    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
}
// update a single thought by the id in the request
async function updateThoughtById(req, res) {
  try {
    const thought = await Thought.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      // exclude the version field:
      .select("-__v");
    if (!thought) {
      return res.status(404).json({ message: "No thought found." });
    }
    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
}
// remove a thought and remove that thought from a user's thought array
async function deleteThoughtById(req, res) {
  try {
    const thought = await Thought.findOneAndRemove({
      _id: req.params.id,
    });

    if (!thought) {
      return res.status(404).json({ message: "No thought found." });
    }

    const user = await User.findOneAndUpdate(
      { thoughts: req.params.id },
      { $pull: { thoughts: req.params.id } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "Thought deleted, no associated users." });
    }
    res.json({ message: "Thought deleted successfully." });
  } catch (err) {
    res.status(500).json(err);
  }
}
// create a new reaction to a thought api/thought/:id/reaction
async function createReaction(req, res) {
  try {
    const thought = await Thought.findOneAndUpdate(
      { _id: req.params.id },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      // exclude the version field:
      .select("-__v");

    if (!thought) {
      return res.status(404).json({ message: "No thought found." });
    }

    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
}
// delete a reaction from a thought by its id
// api/thought/:thoughtId/reaction/:reactionId
async function deleteReactionById(req, res) {
  try {
    const thought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      // exclude the version field:
      .select("-__v");
    if (!thought) {
      return res.status(404).json({ message: "No thought found." });
    }

    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
}
// export the functions
module.exports = {
  getThought,
  createThought,
  getThoughtById,
  updateThoughtById,
  deleteThoughtById,
  createReaction,
  deleteReactionById,
};
