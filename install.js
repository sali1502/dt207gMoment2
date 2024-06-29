const mysql = require("mysql");

// Anslutningsinställningar
const connection = mysql.createConnection({
    host: "localhost",
    user: "dt207gM2",
    password: "password",
    database: "dt207gM2"
});

connection.connect((err) => {
    if (err) {
        console.error("Anslutningen misslyckades: " + err);
        return;
    }
    console.log("Ansluten till mySQL!");
})

// Skapa tabell 
connection.query("DROP TABLE IF EXISTS workexperiences;",
    (err, results) => {
        if (err) throw err;
        console.log("Tabell workexperiences raderad")
    });

connection.query(`CREATE TABLE workexperiences (
    id INT AUTO_INCREMENT PRIMARY KEY,
    compayname VARCHAR(255),
    jobtitle VARCHAR(255),
    location VARCHAR(255),
    startdate DATE,
    enddate DATE,
    description TEXT)`, (err, results) => {
    if (err) throw err;
    console.log("Tabell workexperiences skapad: " + results);
});