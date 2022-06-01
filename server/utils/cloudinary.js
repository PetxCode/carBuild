const cloudinary = require("cloudinary").v2;
require("dotenv").config();

cloudinary.config({
	cloud_name: "aj-market",
	api_key: "135846474532221",
	api_secret: "VpAai8fmH0Rzn7HXpEt7yYBdHRM",
	secure: true,
});

module.exports = cloudinary;
