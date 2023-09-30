// import NodeRSA from 'node-rsa';
// import axios from 'axios';

// const key = new NodeRSA({b:1024});

// Encryption function:
async function encrypt(password) {
    // const publicKey = await axios.get('http://localhost:8000/rsa-pks');
    // key.importKey(publicKey, 'pkcs1-public-pem');
    // return key.encrypt(password, 'base64')
    return password;
};

const RSAUtil = { encrypt };

export default RSAUtil;
