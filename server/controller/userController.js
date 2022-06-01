const userModel = require("../model/userModel");
const cloudinary = require("../utils/cloudinary");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getUsers = async (req, res) => {
	try {
		const user = await userModel.find();
		res.status(200).json({ message: "suceess", data: user });
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

const getUser = async (req, res) => {
	try {
		const user = await userModel.findById(req.params.id).populate("item");
		res.status(200).json({ message: "suceess", data: user });
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

const updateUser = async (req, res) => {
	try {
		const { userName } = req.body;

		const findUser = await userModel.findById(req.params.id);
		if (findUser) {
			await cloudinary.uploader.destroy(findUser.avatarID);
			const image = await cloudinary.uploader.upload(req.file.path);
			const user = await userModel.findByIdAndUpdate(
				req.params.id,
				{ userName, avatar: image.secure_url, avatarID: image.public_id },
				{ new: true }
			);
			res.status(200).json({ message: "suceess", data: user });
		} else {
			res.status(200).json({ message: "no permission to do this" });
		}
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

const deleteUser = async (req, res) => {
	try {
		const user = await userModel.findByIdAndRemove(req.params.id);
		res.status(200).json({ message: "suceess" });
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

const createUser = async (req, res) => {
	try {
		const { userName, email, password } = req.body;

		const salt = await bcrypt.genSalt(10);
		const hashed = await bcrypt.hash(password, salt);

		const image = await cloudinary.uploader.upload(req.file.path);
		const user = await userModel.create({
			email,
			userName,
			password: hashed,
			avatar: image.secure_url,
			avatarID: image.public_id,
		});
		res.status(200).json({ message: "suceess", data: user });
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

const signUser = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await userModel.findOne({ email });
		if (user) {
			const check = await bcrypt.compare(password, user.password);

			if (check) {
				const token = jwt.sign(
					{
						_id: user._id,
					},
					"ThisistheSECRET",
					{ expiresIn: "2d" }
				);

				const { password, ...info } = user._doc;

				res.status(200).json({ message: "suceess", data: { token, ...info } });
			} else {
				res.status(404).json({ message: "user password fail" });
			}
		} else {
			res.status(404).json({ message: "user login fail" });
		}
	} catch (error) {
		res.status(404).json({ message: error });
	}
};

module.exports = {
	signUser,
	getUsers,
	getUser,
	createUser,
	updateUser,
	deleteUser,
};
