const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
	host: "localhost",
	user: "root", // default XAMPP user
	password: "", // leave blank for no password, or enter your password
	database: "hazardwebdatabase", // your database name in phpMyAdmin
});

db.connect((err) => {
	if (err) {
		console.error("Error connecting to the database:", err);
	} else {
		console.log("Connected to the MySQL database");
	}
});

const hazardsRouter = require("./routes/hazards");

app.use("/api/hazard", hazardsRouter);

// Sample route to fetch data from MySQL
app.get("/api/barangay", (req, res) => {
	const sql = `SELECT m.name, m.zoom, m.x, m.y, o.x AS outline_x, o.y AS outline_y
FROM municipalities m
LEFT JOIN outlines o ON m.id = o.municipality_id;`;
	db.query(sql, (err, result) => {
		if (err) {
			return res.status(500).send(err);
		}
		res.json(result);
	});
});

const PORT = 5000;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
