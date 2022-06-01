const mongoose = require("mongoose");
require("dotenv").config();

const mainURL = process.env.ONLINE_DB;
const url = "mongodb://localhost/newDB";

mongoose.connect(url).then(() => {
	console.log("database is now connected...!");
});

module.exports = mongoose;
