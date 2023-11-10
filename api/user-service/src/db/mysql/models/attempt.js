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
        attemptDate: {
            type: Sequelize.DATEONLY,
            defaultValue: Sequelize.NOW
        },
        attemptStatus: {
            type: Sequelize.STRING,
            values: ['attempt', 'success', 'fail']
        }
    }, {
        timestamps: false
    })

    return attempts
}