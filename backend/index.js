import {User, Favorite, Crypto, InitializeDb} from "./db.js";

import express from 'express';

import bodyParser from 'body-parser';
import cors from 'cors';

// import faker from 'faker';

// Initialisation serveur
const app = express();
// Sécurité
app.use(cors());
// Configuration parser body
app.use(bodyParser.json());

// Configuration Faker
// faker.locale = 'fr';

// Partie utilisateur
app.post('/register', async (req, res) => {
    const { username, password } = req.body
    try {
        await User.create({
            username: username,
            password: password,
        })
        res.status(200)
    } catch (e) {
        console.error(e)
    }
})

app.post('/signin', (req, res) => {
    const { username, password } = req.body
    try {
        User.findOne({
            username: username,
            password: password
        })
        res.status(200)
    } catch (e) {
        console.error(e)
    }
})

// Partie favoris
app.post('/favorite', (req, res) => {
    const { cryptoId } = req.body
    try {
        User.findOne({
            username: username,
            password: password
        })
        res.status(200)
    } catch (e) {
        console.error(e)
    }
})

app.get('/favorite', async (req, res) => {
    // Favorite.findAll({
    //     where: {
    //         user:
    //     }
    // })
})

await InitializeDb();

const server = app.listen(3000, function () {
    console.log('Serveur backend démarré !');
});