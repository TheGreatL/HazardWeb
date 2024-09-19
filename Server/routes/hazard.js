const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/POST", (req, res) => {
	const { name, type, details } = req.body;
	const query = "INSERT INTO hazard (name,type,details) VALUES(?,?,?);";

	db.query(query, [name, type, details], (err, results) => {
		if (err) {
			console.error("Error inserting data:", err);

			return res.status(500).json({ status: "Error", error: err });
		}
		res.status(200).json({ status: "OK" });
	});
});

router.get("/s", (req, res) => {
	res.send(":asd");
});
module.exports = router;
