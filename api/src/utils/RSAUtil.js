const NodeRSA = require('node-rsa')
const fs = require('fs')
const path = require('path')

// TODO: Change this machaism, we need to have a way to store static key.
const publicKey = fs.readFileSync(path.join(__dirname, 'public_key.pem'), 'utf8')
const privateKey = fs.readFileSync(path.join(__dirname, 'private_key.pem'), 'utf8')

const key = new NodeRSA({b:1024});
key.importKey(publicKey, 'pkcs1-public-pem');
key.importKey(privateKey, 'pkcs1-private-pem');

// Get public key
function getPublicKey() {
    return key.exportKey('public')
}

// Get private key
function getPrivateKey() {
    return key.exportKey('private')
}

// Encryption function:
function encrypt(txt) {
    return key.encrypt(txt, 'base64')
}

// Decryption function:
function decrypt(encryptedTxt) {
    return key.decrypt(encryptedTxt, 'utf8')
}

console.log(encrypt("123456"))

module.exports = {getPublicKey, getPrivateKey, encrypt, decrypt}