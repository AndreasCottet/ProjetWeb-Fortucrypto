import { Sequelize } from "sequelize";

// Connexion à la base de donnée avec Sequelize
const sequelize = new Sequelize('sqlite:database-fortucrypto.db');

export const User = sequelize.define('user', {
    username: { type: Sequelize.STRING },
    password: { type: Sequelize.STRING },
})

export const Favorite = sequelize.define('favorite', {
    cryptoSymbol: { type: Sequelize.STRING },
    user: { type: User},
})

export const Crypto = sequelize.define('crypto', {
    cryptoSymbol: { type: Sequelize.STRING },
})

export async function InitializeDb() {
    User.sync({ force: true }).then(() => {
        console.log('Table user créée');

        User.create({
            username: 'alice',
            password: '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8',
        });
        User.create({
            username: 'bob',
            password: '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8',
        });
    });
    Favorite.sync({ force: true }).then(() => console.log('Table favoris créée'));
    Crypto.sync({ force: true }).then(() => console.log('Table crypto créée'));
}