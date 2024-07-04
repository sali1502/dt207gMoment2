/* Moment 2.1 DT207G VT24, Åsa Lindskog, sali1502@student.miun.se */

const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Anslut till databasen
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

connection.connect((err) => {
    if (err) {
        console.log("Anslutning felaktig: " + err);
    }
    console.log("Ansluten till databas");
});

/* ROUTES */

// Hämta arbetserfarenhet med id
app.get("/api/workexperiences/:id", (req, res) => {

    let id = req.params.id;

    connection.query(`SELECT compayname, jobtitle, location, startdate, enddate, description FROM workexperiences WHERE id=?;`, [id], (err, results) => {
        if (err) {
            res.status(500).json({ error: "Något har gått fel: " + err });
            return;
        }
        if (results.affectedRows === 0) {
            res.status(404).json({ message: "Ingen arbetserfarenhet kunde hittas." });
        } else {
            res.json(results);
        }
    });
});

// Hämta arbetserfarenhet (alla)
app.get("/api/workexperiences", (req, res) => {
    connection.query(`SELECT * FROM workexperiences;`, (err, results) => {
        if (err) {
            res.status(500).json({ error: "Något har gått fel: " + err });
            return;
        }
        if (results.length === 0) {
            res.status(404).json({ message: "Ingen arbetserfarenhet kunde hittas." });
        } else {
            res.json(results);
        }
    })
});

// Lägg till arbetserfarenhet
app.post("/api/workexperiences", (req, res) => {
    let compayname = req.body.compayname;
    let jobtitle = req.body.jobtitle;
    let location = req.body.location;
    let startdate = req.body.startdate;
    let enddate = req.body.enddate;
    let description = req.body.description;

    // Felhantering
    let errors = {
        message: "",
        detail: "",
        https_response: {
        }
    };

    if (!compayname || !jobtitle || !location || !startdate || !enddate || !description) {

        // Felmeddelanden
        errors.message = "Alla fält behöver vara ifyllda.";
        errors.detail = "Inkludera företagsnamn, titel, ort, startdatum, slutdatum och beskrivning i JSON-format.";

        // Svarskod
        errors.https_response.message = "Bad request";
        errors.https_response.code = 400;
        res.status(400).json(errors);
        return;
    }

    connection.query(`INSERT INTO workexperiences(compayname, jobtitle, location, startdate, enddate, description) VALUES (?, ?, ?, ?, ?, ?);`, [compayname, jobtitle, location, startdate, enddate, description], (err, results) => {
        if (err) {
            res.status(500).json({ error: "Något gick fel: " + err });
            return;
        }

        console.log("Fråga skapad: " + results);

        let workexperience = {
            compayname: compayname,
            jobtitle: jobtitle,
            location: location,
            startdate: startdate,
            enddate: enddate,
            description: description
        };

        res.json({ message: "Arbetserfarenhet tillagd", workexperience });
    });
});

// Uppdatera arbetserfarenhet med id
app.put("/api/workexperiences/:id", (req, res) => {
    let id = req.params.id;
    let compayname = req.body.compayname;
    let jobtitle = req.body.jobtitle;
    let location = req.body.location;
    let startdate = req.body.startdate;
    let enddate = req.body.enddate;
    let description = req.body.description;

    if (!compayname || !jobtitle || !location || !startdate || !enddate || !description) {
        res.status(400).json({ message: "Alla fält behöver fyllas i." });
        return;
    }

    connection.query(`UPDATE workexperiences SET compayname=?, jobtitle=?, location=?, startdate=?, enddate=?, description=? WHERE id=?`, [compayname, jobtitle, location, startdate, enddate, description, id], (err, results) => {
        if (err) {
            res.status(500).json({ error: "Något har gått fel: " + err });
            return;
        }

        if (results.affectedRows === 0) {
            res.status(404).json({ message: "Ingen arbetserfarenhet kunde uppdateras." });
        } else {
            res.json({ message: "Arbetserfarenhet uppdaterad", id: id });
        }
    });
});

// Radera arbetserfarenhet med id
app.delete("/api/workexperiences/:id", (req, res) => {

    let id = req.params.id;

    connection.query(`DELETE FROM workexperiences WHERE id=?;`, [id], (err, results) => {
        if (err) {
            res.status(500).json({ error: "Något har gått fel: " + err });
            return;
        }
        if (results.affectedRows === 0) {
            res.status(404).json({ message: "Ingen arbetserfarenhet kunde raderas." });
        } else {
            res.json({ message: "Arbetserfarenhet raderad", id: id });
        }
    });
});

// Starta applikationen
app.listen(port, () => {
    console.log("Server startad på port: " + port);
});
