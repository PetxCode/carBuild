const express = require("express");
const router = express.Router();
const {
	deleteRatings,
	itemRatings,
	allRatings,
	createRating,
	getItemRatings,
} = require("../controller/ratingController");

router.route("/").get(allRatings);
router.route("/:id/:item").get(getItemRatings);
router.route("/:id/:item").post(createRating);
router.route("/:id/:item/:like").delete(deleteRatings);
router.route("/:id/:item/:like").get(itemRatings);

module.exports = router;
