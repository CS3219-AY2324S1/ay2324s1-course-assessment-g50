const jwt = require('jsonwebtoken');
const RSAUtil = require('./RSAUtil');

const ISSUER = 'admin'; // Issuer info
const accessTokenExpires = '1h' // Access token validation period.
const refreshTokenExpires = '7d' // Refresh token validation period.

// Generate JWT Access Token
function generateToken(userId) {
    const privateKey = RSAUtil.getPrivateKey();
    const token = jwt.sign({ userId }, privateKey, {
        issuer: ISSUER,
        expiresIn: accessTokenExpires,
        algorithm: 'RS256', // Use RSA256 Algorithm
    });

    return token;
}

// Verify JWT Token
function verifyToken(token) {
    const publicKey = RSAUtil.getPublicKey();
    try {
        const decoded = jwt.verify(token, publicKey, { issuer: ISSUER, algorithms: ['RS256'] });
        return decoded.userId;
    } catch (err) {
        throw err
    }
}

// Generate JWT Refresh Token
function generateRefreshToken(userId) {
    const privateKey = RSAUtil.getPrivateKey();
    const refreshToken = jwt.sign({ userId }, privateKey, {
        issuer: ISSUER,
        expiresIn: refreshTokenExpires,
        algorithm: 'RS256',
    });

    return refreshToken;
}

module.exports = { generateToken, verifyToken, generateRefreshToken };