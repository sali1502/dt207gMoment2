/* Moment 2 DT207G VT24, Åsa Lindskog, sali1502@student.miun.se */

let url = "http://127.0.0.1:3000/api/workexperiences";

getWork();
createWork("Expressen", "Grafiker", "Stockholm", "1989-12-01", "1993-02-15", "Grafiker/redigerare");
updateWork(9, "Expressen", "Grafiker", "Stockholm", "1989-08-01", "1993-02-15", "Grafiker/redigerare");
deleteWork(41);


// Funktion för att hämta arbetserfarenheter
async function getWork() {
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.table(data);
    } catch (error) {
        console.error("Ett fel uppstod vid hämtning av arbetserfarenheter: ", error);
    }
}

// Funktion för att lägga till arbetserfarenheter
async function createWork(compayname, jobtitle, location, startdate, enddate, description) {

    let workexperience = {
        compayname: compayname,
        jobtitle: jobtitle,
        location: location,
        startdate: startdate,
        enddate: enddate,
        description: description
    }

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "content-type": "Application/json"
            },
            body: JSON.stringify(workexperience)
        });

        const data = await response.json();
        console.table(data);

    } catch (error) {
        console.error("Ett fel uppstod vid postning av arbetserfarenhet: ", error);
    }
}

// Funktion för att uppdatera arbetserfarenheter
async function updateWork(id, compayname, jobtitle, location, startdate, enddate, description) {

    let workexperience = {
        compayname: compayname,
        jobtitle: jobtitle,
        location: location,
        startdate: startdate,
        enddate: enddate,
        description: description
    };

    try {
        const response = await fetch(`${url}/${id}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(workexperience)
        });
        const data = await response.json();
        console.table(data);
    } catch (error) {
        console.error("Ett fel uppstod vid uppdatering av arbetserfarenhet: ", error);
    }
}

// Funktion för att radera arbetserfarenheter
async function deleteWork(id) {
    try {
        const response = await fetch(`${url}/${id}`, {
            method: "DELETE"
        });

        const data = await response.json();
        console.table(data);
    } catch (error) {
        console.error("Ett fel uppstod vid radering av arbetserfarenhet: ", error);
    }
}



