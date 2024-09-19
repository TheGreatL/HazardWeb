const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
	res.json({ asd: "asd", ken: { child: "knekenkenekn" } });
});
router.get("/coords", (req, res) => {
	res.json({ barangay1: { lng: 2323, lat: 23232.4523432 } });
});

router.post("/", (req, res) => {
	res.send("Post");
});
router.get("/coords/:k", (req, res) => {
	res.send("Coords Get " + req.params.k);
});
module.exports = router;
