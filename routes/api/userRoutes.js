const router = require('express').Router();
const {
  getUsers,
  createUser,
  getSingleUser,
  updateUser
} = require("../../controllers/user-controller");


// /api/users
router.route("/").get(getUsers).post(createUser);
// router.route("/").post(createUser);
router.route('/:userId').get(getSingleUser).put(updateUser);
// /api/user/userId/friends/:friendId

module.exports = router;