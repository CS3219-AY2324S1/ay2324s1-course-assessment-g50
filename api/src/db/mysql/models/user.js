module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        email: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        salt: {
            type: Sequelize.STRING
        },
        role: {
            type: Sequelize.STRING,
            defaultValue: 'user',
            allowNull: false,
        },
    })

    return User
}