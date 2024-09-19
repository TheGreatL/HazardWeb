// db.js
const mysql = require("mysql2");

const db = mysql.createConnection({
	host: "localhost",
	user: "root", // default XAMPP user
	password: "", // leave blank for no password, or enter your password
	database: "hazardwebdatabase", // your database name in phpMyAdmin
});

db.connect((err) => {
	if (err) {
		console.error("Database connection failed:", err.stack);
		return;
	}
	console.log("Connected to database.");
});

module.exports = db;
