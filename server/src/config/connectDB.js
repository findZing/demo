const {Sequelize} = require('sequelize');


const sequelize = new Sequelize('digital-ecommerce','root', null, {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
});

const connectDatabase = async() => {
    try {
        await sequelize.authenticate()
    }
    catch(e) {
        console.error(e)
    }
}

export default connectDatabase