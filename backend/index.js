import {User, UserCryptos, InitializeDb} from "./db.js";

import express from 'express';

import bodyParser from 'body-parser';
import cors from 'cors';
import axios from "axios";

const app = express();
app.use(cors());
app.use(bodyParser.json());

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
    const { username, hashedPassword: password, firstname, lastname, email } = req.body

    try {
        await User.create({username, password, firstname, lastname, email});

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

app.get('/user/:username/cryptos', async (req, res) => {
    const { username } = req.params

    try {
        const user = await User.findOne({ where: { username: username } });

        if (user) {
            const userCryptos = await UserCryptos.findAll({ where: { userId: user.id }, order: [['amount', 'desc']] });
            res.status(200).json(userCryptos);
        } else {
            res.status(404).send('Utilisateur non trouvé');
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
})

app.post('/user/:username/trade', async (req, res) => {
    const { username } = req.params
    const { cryptoId, amount, cryptoIdToExchange } = req.body

    if(!cryptoId || !amount || !cryptoIdToExchange){
        return res.status(400).send('Requête incomplète')
    }

    if(cryptoId === cryptoIdToExchange){
        return res.status(400).send('Vous ne pouvez pas échanger la même cryptomonnaie')
    }

    console.log(req.body)

    try {
        const user = await User.findOne({ where: { username: username } });

        let resCryptos;
        let cryptoIWant;
        if (cryptoId === 'money') {
            cryptoIWant = { priceUsd: 1 }
        } else {
            resCryptos = await axios.get('https://api.coincap.io/v2' + '/assets/' + cryptoId)
            cryptoIWant = resCryptos.data.data
        }

        let userCryptoToExchange;
        let cryptoToExchange;
        if (cryptoIdToExchange === 'money') {
            userCryptoToExchange = { amount: user.money }
            cryptoToExchange = { priceUsd: 1 }
        } else {
            const userCryptos = await UserCryptos.findAll({where: {userId: user.id}});
            userCryptoToExchange = userCryptos.find(c => c.cryptoId === cryptoIdToExchange)

            resCryptos = await axios.get('https://api.coincap.io/v2' + '/assets/' + cryptoIdToExchange)
            cryptoToExchange = resCryptos.data.data
        }

        const amountCryptoIHaveRequested = amount * cryptoIWant.priceUsd / cryptoToExchange.priceUsd

        if (amountCryptoIHaveRequested > userCryptoToExchange.amount) {
            res.status(400).send('Pas assez de ' + cryptoIdToExchange.name + ' pour effectuer la transaction');
        }

        if(cryptoId === 'money') {
            user.money += amount
            user.save()
        } else {
            const userCrypto = await UserCryptos.findOne({where: {userId: user.id, cryptoId: cryptoId}})
            if(userCrypto) {
                userCrypto.amount += amount
                await userCrypto.save()
            } else {
                await UserCryptos.create({
                    userId: user.id,
                    cryptoId: cryptoId,
                    amount: amount
                })
            }
        }

        if(cryptoIdToExchange === 'money') {
            user.money -= amountCryptoIHaveRequested
        } else {
            userCryptoToExchange.amount -= amountCryptoIHaveRequested
            await userCryptoToExchange.save()
        }

        res.status(200).send('Transaction effectuée');
    } catch (e) {
        console.error(e)
    }
})

app.get('/user/:username/money', async (req, res) => {
    const { username } = req.params
    try {
        const user = await User.findOne({where: { username: username }})
        res.status(200).json(user.money)
    } catch (e) {
        res.status(500).send('Erreur serveur')
    }
})

// app.get('/favorite', async (req, res) => {
//     // Favorite.findAll({
//     //     where: {
//     //         user:
//     //     }
//     // })
// })

InitializeDb().then(() => {

    const server = app.listen(3000, function () {
        console.log('Serveur backend démarré !');
    });
});
