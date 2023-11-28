import { Sequelize } from "sequelize";

// Connexion à la base de donnée avec Sequelize
const sequelize = new Sequelize('sqlite:database-fortucrypto.db');

export const User = sequelize.define('user', {
    username: { type: Sequelize.STRING, allowNull: false, unique: true },
    password: { type: Sequelize.STRING, allowNull: false },
    email: { type: Sequelize.STRING, allowNull: false, unique: true, validate: { isEmail: true } },
    firstname: { type: Sequelize.STRING, allowNull: false },
    lastname: { type: Sequelize.STRING, allowNull: false},
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
            email:'alice@mail.com',
            firstname:'Alice',
            lastname:'Liddell',
        });
        User.create({
            username: 'bob',
            password: '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8',
            email:'bob@mail.com',
            firstname:'Bob',
            lastname:'Lemon',
        });
    });
    Favorite.sync({ force: true }).then(() => console.log('Table favoris créée'));
    Crypto.sync({ force: true }).then(() => console.log('Table crypto créée'));
}