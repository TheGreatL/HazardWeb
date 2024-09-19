const express = require("express");
const router = express.Router();

router.post("/insert", (req, res) => {
	const data = req.body;
	console.log(data);
	res.status(200).json({ status: "OK" });
	const query = "INSERT INTO hazard VALUES ();";
});

router.get("/s", (req, res) => {
	res.send(":asd");
});

module.exports = router;
