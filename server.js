const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Routes
app.get("/api", (req, res) => {
    res.json({ message: "Välkommen till mitt API" });
});

app.get("/api/workexperiences", (req, res) => {
    res.json({ message: "Hämta arbetserfarenhet" });
});

app.post("/api/workexperiences", (req, res) => {
    let companyname = req.body.companyname;
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

    if (!companyname || !jobtitle || !location || !startdate || !enddate || !description) {

        // Felmeddelanden
        errors.message = "Alla fält behöver vara ifyllda!";
        errors.detail = "Inkludera företagsnamn, titel, plats, startdatum, slutdatum och beskrivning i JSON-format";

        // Svarskod
        errors.https_response.message = "Bad request";
        errors.https_response.code = 400;
        res.status(400).json(errors);
        return;
    }

    let workexperience = {
        companyname: companyname,
        jobtitle: jobtitle,
        location: location,
        startdate: startdate,
        enddate: enddate,
        description: description
    };

    res.json({ message: "Arbetserfarenhet tillagd", workexperience });
});

app.put("/api/workexperiences/:id", (req, res) => {
    res.json({ message: "Arbetserfarenhet uppdaterad: " + req.params.id });
});

app.delete("/api/workexperiences/:id", (req, res) => {
    res.json({ message: "Arbetserfarenhet raderad: " + req.params.id });
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
        console.log("Anslutning felaktig: " + err);
    }
    console.log("Ansluten till databas");
});

app.listen(port, () => {
    console.log("Server på port: " + port);
});
