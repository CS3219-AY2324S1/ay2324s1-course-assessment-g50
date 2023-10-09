const crypto = require('crypto');

function sign(rawPassword, salt, charset) {
    try {
        const md5 = crypto.createHash('md5')
        const input = rawPassword + salt
        md5.update(input, charset)
        return md5.digest('hex') // Return hex value
    } catch (error) {
        throw error
    }
}

module.exports = { sign }