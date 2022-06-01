const express = require("express");
const router = express.Router();
const upload = require("../utils/multer");
const {
	signUser,
	getUsers,
	getUser,
	createUser,
	updateUser,
	deleteUser,
} = require("../controller/userController");

router.route("/").get(getUsers);
router.route("/register").post(upload, createUser);
router.route("/signin").post(signUser);
router.route("/:id").get(getUser).patch(upload, updateUser).delete(deleteUser);

module.exports = router;
