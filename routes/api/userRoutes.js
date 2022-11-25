const router = require('express').Router();
const {
  getUsers
} = require("../../controllers/user-controller");
const {
  createUser
} = require("../../controllers/user-controller");


router.route("/").get(getUsers);
router.route("/").post(createUser);

module.exports = router;