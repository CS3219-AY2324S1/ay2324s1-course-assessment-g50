module.exports = (sequelize, Sequelize) => {
    const AttemptHistory = sequelize.define("attempt_history", {
        userId: {
            type: Sequelize.BIGINT,
            primaryKey: true
        },
        questionName: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        attemptDate: {
            type: Sequelize.DATEONLY,
        },
        attemptStatus: {
            type: Sequelize.STRING,
        },
        savedCode: {
            type: Sequelize.TEXT,
        }
    }, {
        timestamps: false
    })

    return AttemptHistory
}