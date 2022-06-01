const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();

const uri = process.env.ONLINE_URL;

const client = new MongoClient(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	serverApi: ServerApiVersion.v1,
});
client.connect((err) => {
	client.db("classBuyList").collection("devices");
	// perform actions on the collection object
	client.close();
});

module.exports = client;
