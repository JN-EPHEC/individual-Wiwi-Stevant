import express from 'express';

const app = express();
const port = 3000; 
let print = console.log

app.get('/', (req : object, res : object) => {
    res.send("Bienvenue sur mon serveur API");
});

app.listen(port,() => {
    console.log(`serveur lancé sur http://localhost:${port}`);
});