
"use strict";

getData();

async function getData() {
    const response = await fetch("http://127.0.0.1:3000/api/workexperiences");
    const data = await response.json();
    console.log(data);
}