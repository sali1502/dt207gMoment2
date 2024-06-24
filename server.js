const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

// Routes
app.get("/api", (req, res) => {
    res.json({ message: "Welcome to my API" });
});

app.get("/api/workexperiences", (req, res) => {
    res.json({ message: "Get workexperiences" });
});

app.post("/api/workexperiences", (req, res) => {
    res.json({ message: "Workexperience added" });
});

app.put("/api/workexperiences/:id", (req, res) => {
    res.json({ message: "Workexperience uppdated: " + req.params.id });
});

app.delete("/api/workexperiences/:id", (req, res) => {
    res.json({ message: "Workexperience deleted: " + req.params.id });
});

// Anslut till databasen
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

connection.connect((err) => {
    if (err) {
        console.log("Connection failed: " + err);
    }
    console.log("Connected to database");
});

app.listen(port, () => {
    console.log("Server is running on port: " + port);
});
