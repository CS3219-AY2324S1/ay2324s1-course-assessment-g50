module.exports = (sequelize, Sequelize) => {
    const UserInfo = sequelize.define("user_info", {
        userId: {
            type: Sequelize.BIGINT
        },
        accessToken: {
            type: Sequelize.STRING
        },
        refreshToken: {
            type: Sequelize.STRING
        },
    })

    return UserInfo
}