import express from 'express';
import console = require('node:console');
import userRoutes from "./routes/userRoutes";

const app = express();
const port = 3000; 
const etudiants = [
    { id: 1, nom: "Dupont", prenom: "Jean"},
    { id: 2, nom: "Martin", prenom: "Sophie"},
    { id: 3, nom: "Doe", prenom: "Jhon"}
];
let print = console.log

app.get('/', (req : Request, res : Response ) => {
    res.send("Bienvenue sur mon serveur API");
});

app.get('/api/data', (req : Request, res : Response) => {
    res.json(etudiants);
});

app.get('/api/hello/:name', (req : Request, res : Response) => {
    let retours = {message : `bonjours ${req.params.name}`, timestamp : new Date}
    res.json(retours);
});

app.use("/api", userRoutes);

app.listen(port,() => {
    console.log(`serveur lancé sur http://localhost:${port}`);
});