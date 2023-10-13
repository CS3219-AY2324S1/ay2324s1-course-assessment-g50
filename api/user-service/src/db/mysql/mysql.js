const config = {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}

const Sequelize = require('sequelize')
const sequelize = new Sequelize(config.database, config.user, config.password, {
    host: config.host,
    dialect: config.dialect,
    pool: {
        max: config.pool.max,
        min: config.pool.min,
        acquire: config.pool.acquire,
        idle: config.pool.idle
    }
})

const db = {};
db.Sequelize = Sequelize
db.sequelize = sequelize

db.user = require("./models/user")(sequelize, Sequelize)
db.userInfo = require("./models/userInfo")(sequelize, Sequelize)

// Create association between 2 tables.
db.user.belongsTo(db.userInfo, {
    foreignKey: 'id',
    targetKey: 'userId',
    constraints: false
})

module.exports = db