const userModel = require("../model/userModel");
const itemModel = require("../model/itemModel");
const cloudinary = require("../utils/cloudinary");
const mongoose = require("mongoose");

const createItem = async (req, res) => {
	try {
		const { title, model, price } = req.body;
		const image = await cloudinary.uploader.upload(req.file.path);

		const getUser = await userModel.findById(req.params.id);
		const makeItem = await new itemModel({
			title,
			model,
			price,
			avatar: image.secure_url,
			avatarID: image.public_id,
		});

		makeItem.user = getUser;
		makeItem.save();

		getUser.item.push(mongoose.Types.ObjectId(makeItem._id));
		getUser.save();

		res.status(201).json({ message: "item ccreate", data: makeItem });
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

const viewItem = async (req, res) => {
	try {
		const getItems = await userModel.findById(req.params.id).populate("item");

		res.status(200).json({ message: "view", data: getItems });
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

const viewAllItem = async (req, res) => {
	try {
		const { page, limit } = req.query;
		const getItems = await itemModel
			.find()
			.sort({ createdAt: -1 })
			.limit(limit)
			.skip((page - 1) * limit)
			.exec();

		res
			.status(200)
			.json({ total: getItems.length, message: "view", data: getItems });
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

const searchItem = async (req, res) => {
	try {
		const search = req.query.searchData
			? { title: { $regex: req.query.searchData, $options: "i" } }
			: {};

		const viewData = await itemModel.find(search);

		res
			.status(200)
			.json({ total: viewData.length, message: "view", data: viewData });
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

const singleItem = async (req, res) => {
	try {
		const updateData = await itemModel.findById(req.params.item);

		res.status(201).json({ message: "singly found", data: updateData });
	} catch (error) {
		res.status(404).json({ message: error });
	}
};

const updateItem = async (req, res) => {
	try {
		const { title, price, model } = req.body;
		const user = await userModel.findById(req.params.id);
		if (user) {
			await cloudinary.uploader.destroy(findUser.avatarID);
			const image = await cloudinary.uploader.upload(req.file.path);
			const updateData = await itemModel.findByIdAndUpdate(
				req.params.item,
				{
					title,
					price,
					model,
					avatar: image.secure_url,
					avatarID: image.public_id,
				},
				{ new: true }
			);

			res.status(201).json({ message: "updated", data: updateData });
		}
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

const deleteItem = async (req, res) => {
	try {
		const user = await userModel.findById(req.params.id);
		const remove = await itemModel.findByIdAndRemove(req.params.item);

		user.item.pull(remove);
		user.save();

		res.status(201).json({ message: "deleted" });
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

module.exports = {
	deleteItem,
	createItem,
	viewAllItem,
	viewItem,
	searchItem,
	updateItem,
	singleItem,
};
