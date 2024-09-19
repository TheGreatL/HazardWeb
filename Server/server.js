const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const db = require("./db");
const app = express();
app.use(cors());
app.use(express.json());

const hazardsRouter = require("./routes/hazard");

app.use("/api/hazard", hazardsRouter);

const PORT = 5000;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
