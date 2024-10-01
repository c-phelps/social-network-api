const router = require("express").Router();

// localhost/api/thoughts
// GET - retrieve all Thoughts
// POST - create a new thought
// update the associated User's Thoughts array field
router.route("/").get().post();

// localhost/api/thoughts/:id
// GET - retrieve a single thought by _id
// PUT - updated a thought by its _id
// DELETE - remove a thought by its _id
router.route("/:id").get().put().delete();

// localhost/api/thoughts/:thoughtId/reactions
// POST - create a reaction stored in a single thought's reaction array field
// DELETE - pull and remove a reaction by the reaction's reactionId value
router.route("/:id/reactions").post().delete();

module.exports = router;
