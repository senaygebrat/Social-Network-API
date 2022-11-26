const router = require('express').Router();
const {
  getUsers,
  createUser
} = require("../../controllers/user-controller");


// /api/users
router.route("/").get(getUsers).post(createUser);
// router.route("/").post(createUser);

// /api/user/userId/friends/:friendId

module.exports = router;