/* Moment 2 DT207G VT24, Åsa Lindskog, sali1502@student.miun.se */

"use strict";

getData();

async function getData() {
    const response = await fetch("http://127.0.0.1:3000/api/workexperiences");
    const data = await response.json();
    console.log(data);
}