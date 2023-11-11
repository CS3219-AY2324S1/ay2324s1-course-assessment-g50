module.exports = (sequelize, Sequelize) => {
    const attemptsDetails = sequelize.define("attempt_details", {
        userId: {
            type: Sequelize.BIGINT,
            primaryKey: true,
        },
        questionName: {
            type: Sequelize.STRING,
            primaryKey: true,
        },
        codeLanguage: {
            type: Sequelize.ENUM,
            primaryKey: true,
            values: ['python', 'java', 'javascript'],
            defaultValue: 'python'
        },
        savedCode: {
            type: Sequelize.TEXT,
            defaultValue: ""
        },
    }, {
        timestamps: false
    })

    return attemptsDetails;
}