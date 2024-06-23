const mysql = require("mysql");

// Anslutningsinställningar
const connection = mysql.createConnection({
host: "localhost",
user: "dt207gM2",
password: "password",
database: "dt207gM2"
});

connection.connect((err) => {
    if(err) {
        console.error("connection failed: " + err);
        return;
    }
    console.log("Connected to mySQL!");
})

// Skapa tabell 
connection.query(`CREATE TABLE workexperiences (
    id INT AUTO_INCREMENT PRIMARY KEY,
    compayname VARCHAR(255),
    jobtitle VARCHAR(255),
    location VARCHAR(255),
    startdate DATE,
    enddate DATE,
    description TEXT)`, (err, results) => {
        if(err) throw err;
        console.log("Table workexperiences created: " + results);
    });