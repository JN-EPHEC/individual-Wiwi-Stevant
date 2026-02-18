import express from 'express';
import userRoutes from "./routes/userRoutes.js";
import sequelize from "./config/database.js";
import User from "./models/User.js";

const app = express();
const port = 3000; 
let print = console.log

app.use(express.json());
app.use("/api", userRoutes);
app.use('/',express.static('public'));

async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log("tt fonctionne")
    }
    catch (error) {
        console.error("il y a un probleme avec la connection db" + error);
    }
    try {
        await sequelize.sync()
        console.log("synchro ok")
        app.listen(port,() => {
        console.log(`serveur lancé sur http://localhost:${port}`);
        });
    }
    catch (error) {
        console.error("é bé la synchro bah elle a pas fonctionner, " + error)
    }
}

testConnection()