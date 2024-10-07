const router = require("express").Router();
const {
  getThought,
  createThought,
  getThoughtById,
  updateThoughtById,
  deleteThoughtById,
  createReaction,
  deleteReactionById,
} = require("../../controllers/thoughtController");
// localhost/api/thoughts
// GET - retrieve all Thoughts
// POST - create a new thought
// update the associated User's Thoughts array field
router.route("/").get(getThought).post(createThought);

// localhost/api/thoughts/:id
// GET - retrieve a single thought by _id
// PUT - updated a thought by its _id
// DELETE - remove a thought by its _id
router.route("/:id").get(getThoughtById).put(updateThoughtById).delete(deleteThoughtById);

// localhost/api/thoughts/:thoughtId/reactions
// POST - create a reaction stored in a single thought's reaction array field

router.route("/:id/reaction").post(createReaction);
// DELETE - pull and remove a reaction by the reaction's reactionId value
router.route("/:thoughtId/reaction/:reactionId").delete(deleteReactionById);

// export routes to api/index
module.exports = router;
