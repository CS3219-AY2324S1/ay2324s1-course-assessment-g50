module.exports = (sequelize, Sequelize) => {
    const UserInfo = sequelize.define("user_info", {
        userId: {
            type: Sequelize.BIGINT
        },
        nickname: {
            type: Sequelize.STRING
        },
        avatar: {
            type: Sequelize.STRING
        },
        sign: {
            type: Sequelize.STRING
        },
        gender: {
            type: Sequelize.STRING
        },
        birth: {
            type: Sequelize.DATE
        }
    })

    return UserInfo
}