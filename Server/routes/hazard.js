const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/POST/HazardInfo", (req, res) => {
	// console.log(req.body);
	const { name, susceptibility, type, details, id, coords } = req.body;

	// coords.forEach((element) => {
	// 	console.log(element);
	// });

	const query =
		"INSERT INTO hazardinfotbl (HazardName,HazardTypeID,HazardServe,HazardDetails,HazardCoordsID) VALUES(?,?,?,?,?);";

	const coordsID = `HZRDCRDS${name.charAt(0)}${name.charAt(
		name.length - 1
	)}${id}${details.charAt(0)}`;

	db.query(query, [name, type, susceptibility, details, coordsID], (err, results) => {
		if (err || results.affectedRows == 0) {
			console.error("Error inserting data:", err);

			return res.status(500).json({ status: "Error", error: err });
		}
		coords.forEach((coord) => {
			const insert_coords = `INSERT INTO hazardcoordstbl VALUES(?,?,?);`;
			db.query(
				insert_coords,
				[coordsID, coord.lat, coord.lng],
				(err, results) => {
					if (err || results.affectedRows == 0) {
						console.error(
							"Error inserting coords data",
							err
						);

						return res.status(500).json({
							status: "Error",
							error: err,
						});
					}
				}
			);
		});

		res.status(200).json({ status: "OK" });
	});
});
router.get("/GET/:hazardType", (req, res) => {
	const type = req.params.hazardType;
	const query =
		"SELECT * FROM hazardinfotbl i INNER JOIN hazardcoordstbl c ON i.HazardCoordsID= c.HazardCoordsID WHERE i.HazardTypeID=?;";

	db.query(query, [type], (error, results) => {
		if (error) {
			console.error("Error executing query:", error);
			return res.status(500).json({ message: "Server error" });
		}

		if (results.length === 0) {
			return res.status(404).json({ message: "No data found" });
		}
		const compressedData = results.reduce((acc, current) => {
			// Find if HazardID already exists in the accumulator
			let existing = acc.find((item) => item.HazardID === current.HazardID);

			if (existing) {
				// Add coordinates to the existing hazard
				existing.Outlines.push({
					HazardLong: current.HazardLong,
					HazardLat: current.HazardLat,
				});
			} else {
				// Add new hazard with outlines
				acc.push({
					HazardID: current.HazardID,
					HazardName: current.HazardName,
					HazardTypeID: current.HazardTypeID,
					HazardServe: current.HazardServe,
					HazardDetails: current.HazardDetails,
					HazardCoordsID: current.HazardCoordsID,
					Outlines: [
						{
							HazardLong: current.HazardLong,
							HazardLat: current.HazardLat,
						},
					],
				});
			}

			return acc;
		}, []);
		res.json(compressedData);
	});
});
module.exports = router;
