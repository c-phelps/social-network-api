const router = require("express").Router();
const {
  getUser,
  createUser,
  getUserById,
  updateUserById,
  deleteUserById,
  createFriendById,
  deleteFriendById,
} = require("../../controllers/userController");
// localhost/api/user
// GET - retrieve all User
// POST - create a new User
router.route("/").get(getUser).post(createUser);

// localhost/api/user/:id
// GET - retrieve a single user by _id
// PUT update a user by its _id
// DELETE remove user by its _id
router.route("/:id").get(getUserById).put(updateUserById).delete(deleteUserById);

// localhost/api/user/:id/friend/:friendId
// POST add a new friend th a user's friend list
// DELETE to remove a friend from a user's friend list
router.route("/:userId/friend/:friendId").post(createFriendById).delete(deleteFriendById);

module.exports = router;
