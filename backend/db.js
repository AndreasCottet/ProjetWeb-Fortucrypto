import { Sequelize } from "sequelize";

const sequelize = new Sequelize('sqlite:database-fortucrypto.db');

export const User = sequelize.define('user', {
    username: { type: Sequelize.STRING, allowNull: false, unique: true },
    password: { type: Sequelize.STRING, allowNull: false },
    email: { type: Sequelize.STRING, allowNull: false, unique: true, validate: { isEmail: true } },
    firstname: { type: Sequelize.STRING, allowNull: false },
    lastname: { type: Sequelize.STRING, allowNull: false},
    money: {type: Sequelize.INTEGER, allowNull: false, defaultValue: 100000 },
})

export const UserCryptos = sequelize.define('users_cryptos', {
    userId: {
        type: Sequelize.INTEGER,
        references: {
            model: User,
            key: 'id'
        }
    },
    cryptoId: { type: Sequelize.STRING },
    amount: { type: Sequelize.INTEGER },
})

export async function InitializeDb() {
    await sequelize.drop()

    User.sync({ force: true }).then(() => {
        console.log('Table user créée');

        User.create({
            username: 'alice',
            password: '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8',
            email:'alice@mail.com',
            firstname:'Alice',
            lastname:'Liddell',
        }).then((value) => {
            UserCryptos.sync({ force: true }).then(() => {

                UserCryptos.create({
                    userId: value.id,
                    cryptoId: 'bitcoin',
                    amount: 1,
                })

                UserCryptos.create({
                    userId: value.id,
                    cryptoId: 'ethereum',
                    amount: 2,
                })
            })
        });

        User.create({
            username: 'bob',
            password: '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8',
            email:'bob@mail.com',
            firstname:'Bob',
            lastname:'Lemon',
        });
    });
}