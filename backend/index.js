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
app.post('/login', async (req, res) => {
    const { username, hashedPassword: password } = req.body

    try {
        const users = await User.findAll({ where: { username, password } });

        if (users.length) {
            res.status(200).send('Connexion réussie');
        } else {
            res.status(403).send('Connexion impossible');
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
})

app.post('/register', async (req, res) => {
    const { username, hashedPassword: password } = req.body

    try {
        await User.create({username, password});

        res.status(200).send('Utilisateur créé')
    } catch (err) {
        return res.status(500).json({ message: err.message });
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

InitializeDb().then(() => {

    const server = app.listen(3000, function () {
        console.log('Serveur backend démarré !');
    });
});
