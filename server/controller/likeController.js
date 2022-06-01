const userModel = require("../model/userModel");
const itemModel = require("../model/itemModel");
const likeModel = require("../model/likeModel");
const cloudinary = require("../utils/cloudinary");
const mongoose = require("mongoose");

const createLike = async (req, res) => {
	try {
		const likeBefore = await likeModel.findById(req.params.id);
		if (likeBefore) {
			res.status(201).json({ message: "Already Like Before!" });
		} else {
			const getItem = await itemModel.findById(req.params.item);
			const likeData = await new likeModel({ _id: req.params.id });

			likeData.item = getItem;
			likeData.save();

			getItem.like.push(mongoose.Types.ObjectId(likeData._id));
			getItem.save();

			res.status(201).json({ message: "Like Added", data: likeData });
		}
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

const allLikes = async (req, res) => {
	try {
		const likeData = await likeModel.find();
		res.status(200).json({ message: "suceess", data: likeData });
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

const itemLikes = async (req, res) => {
	try {
		const likeData = await itemModel.findById(req.params.item);
		res.status(200).json({ message: "suceess", data: likeData });
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

const getItemLikes = async (req, res) => {
	try {
		const likeData = await itemModel.findById(req.params.item).populate("like");
		res.status(200).json({ message: "suceess", data: likeData });
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

const deleteLikes = async (req, res) => {
	try {
		const likeData = await itemModel.findById(req.params.item);
		const remove = await likeModel.findByIdAndRemove(req.params.like);

		likeData.like.pull(remove);
		likeData.save();

		res.status(200).json({ message: "deleted" });
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

// const createLike = async (req, res) => {
//     try {

//     } catch (error) {
//         res.status(404).json({ message: error.message})
//     }
// }

module.exports = {
	deleteLikes,
	itemLikes,
	allLikes,
	createLike,
	getItemLikes,
};
