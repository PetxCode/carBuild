const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
require("./utils/db");
const port = process.env.PORT || 2000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
	try {
		res.status(200).json({ message: "Awesome, now connecetd" });
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
});

app.use("/api/user", require("./router/userRouter"));
app.use("/api/item", require("./router/itemRouter"));
app.use("/api/like", require("./router/likeRouter"));
app.use("/api/rating", require("./router/ratingRouter"));

app.listen(port, () => {
	console.log("server is now connected on PORT: ", +port);
});
