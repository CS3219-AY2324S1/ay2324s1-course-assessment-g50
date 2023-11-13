module.exports = (sequelize, Sequelize) => {
    const attempts = sequelize.define("attempts", {
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
            defaultValue: Sequelize.NOW
        },
        attemptStatus: {
            type: Sequelize.ENUM,
            values: ['attempt', 'success', 'failure']
        }
    }, {
        timestamps: false
    })

    return attempts;
}