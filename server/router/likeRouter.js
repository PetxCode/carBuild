const express = require("express");
const router = express.Router();
const {
	deleteLikes,
	itemLikes,
	allLikes,
	createLike,
	getItemLikes,
} = require("../controller/likeController");

router.route("/").get(allLikes);
router.route("/:id/:item/like").get(getItemLikes);
router.route("/:id/:item/like").post(createLike);
router.route("/:id/:item/:like").delete(deleteLikes);
router.route("/:id/:item/:like").get(itemLikes);

module.exports = router;
