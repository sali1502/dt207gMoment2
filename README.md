# Labbuppgift 2.1 för kursen DT207G Backend-baserad webbutveckling

I detta repository finns kod för ett REST API byggt med Express.<br>
APIets syfte är att skapa ett CV där arbetserfarenhet ska kunna läggas till, visas, uppdateras och raderas.<br>
Denna funktionalitet skapas med CRUD (Create, Read, Update, Delete).<br>

## Länk
En liveversion av APIet finns tillgänglig på följande URL: http://127.0.0.1:3000/api/workexperiences<br>

## Installation, databas
APIet använder en MySQL-databas. Klona ner källkodsfilerna, kör kommando npm install för att installera nödvändiga npm-paket.<br>
Kör installations-skriptet install.js. Installations-skriptet skapar en databastabell enlig nedan:

<table>
<tr>
  <th>Tabell-namn</th>
  <th>Fält</th>
</tr>
<tr>
  <td>workexperiences</td>
  <td><strong>id</strong> (int(11), <strong>compayname</strong>(varchar(255), <strong>jobtitle</strong>(varchar(255), <strong>location</strong>(varchar(255), <strong>startdate</strong>(date), <strong>enddate</strong>(date), <strong>description</strong>(text)</td>
</tr>
</table>

## Användning
Nedan finns beskrivet hur man kan nå APIet på olika vis:

<table>
<tr>
  <th>Metod</th>
  <th>Ändpunkt</th>
  <th>Beskrivning</th>
</tr>
<tr>
  <td>GET</td>
  <td>/workexperiences</td>
  <td>Hämtar alla tillgängliga arbetserfarenheter.</td>
</tr>
<tr>
  <td>GET</td>
  <td>/workexperiences/:ID</td>
  <td>Hämtar en specifik arbetserfarenheter med angivet ID.</td>
</tr>
<tr>
  <td>POST</td>
  <td>/workexperiences</td>
  <td>Lagrar en ny kurs. Kräver att ett objekt med arbetserfarenheter skickas med.</td>
</tr>
<tr>
  <td>PUT</td>
  <td>/workexperiences/:ID</td>
  <td>Uppdaterar en existerande arbetserfarenhet med angivet ID.</td>
</tr>
<tr>
  <td>DELETE</td>
  <td>/workexperiences/:ID</td>
  <td>Raderar en arbetserfarenhet med angivet ID.</td>
</tr>
</table>

Ett objekt med arbetserfarenhet retuneras/skickas som JSON med följande struktur:

```
   {
     "compayname": "Naturapoteket",
     "jobtitle": "Säljare",
     "location": "Stockholm",
     "startdate": "2001-08-01",
     "enddate": "2006-07-30",
     "description": "Säljare och rådgivare i hälsokostbutik"
   }
```
