const mongoose = require("mongoose");

module.exports.dbConnector = () => {
	mongoose.connect(
		"mongodb+srv://admin:admin@cluster0.ks6e4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
		{ useNewUrlParser: true, useUnifiedTopology: true },
	);

	let db = mongoose.connection;

	db.once("error", (err) => {
		console.log("Error in connection to Database");
		console.log(err);
	});
	db.once("open", () => {
		console.log("Connected to Database Succesfully");
	});
};
