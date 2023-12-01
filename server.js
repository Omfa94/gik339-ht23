// console.log("vår första node-server!");
// console.log("vårt första node-server igen.");

//sparar express modulen och importerar vi och sparar alla verktyg av de nod.modules som vi behöver i variabeln express
const express = require("express");
//denna möjliggör att vi få ut allt vi behöver på vår server!
const server = express();
//skapat en variabel som innehåller alla verktyg som denna modul har
const sqlite3 = require("sqlite3");

//vi säger att vi använder json till server.
server.use(express.json()).use(express.urlencoded({ extended: false }));

//förfrågan hantering, när någon surfar ingenting efter / så körs denna funktion. man kan sriva efter /user eller vad som helst! när du söker på browsere är alltid get frågan
//i collack funktionen() 2 parametrar request och response
server.get("/users/", (req, res) => {
  const method = req.method;
  const url = req.url;
  //skapar en databaskoppling
  const db = new sqlite3.Database("./gik339-L4.db");
  const sql = "SELECT * FROM users";

  //om de söker fel så ska de få detta meddelande!
  db.all(sql, (err, rows) => {
    if (err) {
      res.send(err);
    } else {
      res.send(rows);
    }
  });

  //man svarar detta och det kommer synas på browser!
  // res.send(`Du gjorde en ${method}-förfrågan till ${url}`);
});

//post method har oxå callback func.används när man vill skicka data
server.post("/users", (req, res) => {
  //datan skickas via body,ex innehåll i formelär!
  const body = req.body;
  //man ska spara innehåll i body till databasen
  //skicka tillbaka svatt att det gick bra!ist för body!
  res.send(body);
});

//man vill lyssna på förfrågningar direkt i url/browser
//http://localhost:3000/users/1/omid så skickar vi ett objekt id 1 och name:omid
server.put("/users/:id/:name", (req, res) => {
  const params = req.params;
  res.send(params);
});

//om man skriver http://localhost:3000 så betyder att på port 3000 får vi frågningar!
server.listen(3000);
