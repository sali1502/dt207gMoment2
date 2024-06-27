/* Moment 2 DT207G VT24, Åsa Lindskog, sali1502@student.miun.se */

const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

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
app.get("/api", (req, res) => {
    res.json({ message: "Välkommen till mitt API" });
});

// Hämta arbetserfarenhet 
app.get("/api/workexperiences", (req, res) => {
    connection.query(`SELECT * FROM workexperiences;`, (err, results) => {
        if (err) {
            res.status(500).json({ error: "Något har gått fel: " + err });
            return;
        }
        if (results.length === 0) {
            res.status(404).json({ message: "Ingen arbetserfarenhet kunde hittas" });
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
        errors.message = "Alla fält behöver vara ifyllda!";
        errors.detail = "Inkludera företagsnamn, titel, ort, startdatum, slutdatum och beskrivning i JSON-format";

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
            companyname: compayname,
            jobtitle: jobtitle,
            location: location,
            startdate: startdate,
            enddate: enddate,
            description: description
        };

        res.json({ message: "Arbetserfarenhet tillagd", workexperience });
    });
});

// Uppdatera arbetserfarenhet
app.put("/api/workexperiences/:id", (req, res) => {
    res.json({ message: "Arbetserfarenhet uppdaterad: " + req.params.id });
});

// Radera arbetserfarenhet
app.delete("/api/workexperiences/:id", (req, res) => {
    res.json({ message: "Arbetserfarenhet raderad: " + req.params.id });
});

// Starta server
app.listen(port, () => {
    console.log("Server startad på port: " + port);
});
