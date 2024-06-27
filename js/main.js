/* Moment 2 DT207G VT24, Åsa Lindskog, sali1502@student.miun.se */

let url = "http://127.0.0.1:3000/api/workexperiences";

getWork();
createWork("Expressen", "Grafiker", "Stockholm", "1989-12-01", "1993-02-15", "Grafiker/redigerare på Söndagsbilagan");

async function getWork() {
    const response = await fetch(url);
    const data = await response.json();
    console.table(data);
}

async function createWork(compayname, jobtitle, location, startdate, enddate, description) {
    let workexperience = {
        compayname: compayname,
        jobtitle: jobtitle,
        location: location,
        startdate: startdate,
        enddate: enddate,
        description: description
    }

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "content-type": "Application/json"
        },
        body: JSON.stringify(workexperience)
    });

    const data = await response.json();
    console.table(data);
}



