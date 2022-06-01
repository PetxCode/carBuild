const express = require("express");
const {
	viewAllItem,
	viewItem,
	searchItem,
	deleteItem,
	updateItem,
	createItem,
	singleItem,
} = require("../controller/itemController");
const router = express.Router();
const upload = require("../utils/multer");

router.route("/all").get(viewAllItem);
router.route("/:id").get(viewItem);

router.route("/").get(searchItem);

router.route("/:id/create").post(upload, createItem);
router.route("/:id/:item").patch(upload, updateItem);

router.route("/:id/:item").delete(deleteItem);
router.route("/:id/:item").get(singleItem);

module.exports = router;
