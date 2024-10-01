const router = require("express").Router();

// localhost/api/user
// GET - retrieve all User
// POST - create a new User
router.route("/").get().post();

// localhost/api/user/:id
// GET - retrieve a single user by _id
// PUT update a user by its _id
// DELETE remove user by its _id
router.route("/:id").get().put().delete();

// localhost/api/user/:id/friend/:friendId
// POST add a new friend th a user's friend list
// DELETE to remove a friend from a user's friend list
router.route("/:id/friend/:friendId").post().delete();

module.exports = router;