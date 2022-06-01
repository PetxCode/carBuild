const userModel = require("../model/userModel");
const itemModel = require("../model/itemModel");
const ratingModel = require("../model/ratingModel");
const mongoose = require("mongoose");

const createRating = async (req, res) => {
	try {
		const { rate } = req.body;
		const ratingBefore = await ratingModel.findById(req.params.id);
		if (ratingBefore) {
			res.status(201).json({ message: "Already rating Before!" });
		} else {
			const getItem = await itemModel.findById(req.params.item);
			const ratingData = await new ratingModel({ _id: req.params.id, rate });

			ratingData.item = getItem;
			ratingData.save();

			getItem.rating.push(mongoose.Types.ObjectId(ratingData._id));
			getItem.save();

			res.status(201).json({ message: "rating Added", data: ratingData });
		}
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

const allRatings = async (req, res) => {
	try {
		const ratingData = await ratingModel.find();
		res.status(200).json({ message: "suceess", data: ratingData });
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

const itemRatings = async (req, res) => {
	try {
		const ratingData = await itemModel.findById(req.params.item);
		res.status(200).json({ message: "suceess", data: ratingData });
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

const getItemRatings = async (req, res) => {
	try {
		const ratingData = await itemModel
			.findById(req.params.item)
			.populate("rating");
		res.status(200).json({ message: "suceess", data: ratingData });
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

const deleteRatings = async (req, res) => {
	try {
		const ratingData = await itemModel.findById(req.params.item);
		const remove = await ratingModel.findByIdAndRemove(req.params.rating);

		ratingData.rating.pull(remove);
		ratingData.save();

		res.status(200).json({ message: "deleted" });
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

module.exports = {
	deleteRatings,
	itemRatings,
	allRatings,
	createRating,
	getItemRatings,
};
