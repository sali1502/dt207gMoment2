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
