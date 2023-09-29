// import NodeRSA from 'node-rsa';
// import axios from 'axios';

// const key = new NodeRSA({b:1024});

// Encryption function:
async function encrypt(password) {
    // const publicKey = await axios.get('http://localhost:8000/rsa-pks');
    // key.importKey(publicKey, 'pkcs1-public-pem');
    // return key.encrypt(password, 'base64')
    return 'Ttdlct94I8C7yEls4/DCxNRmA3Tw/Jq1qGhVDagB1qHfdIszYPSa/HmpVtn4BQEala+yp4fsSyRpBTY9o2RtiNThmUs98ZzsZTJYkQy43APcv+jMh3bO+cGrEs5DivC7XmMNicp7Fd8idxZowgY3NRJylnL6MKj+pTj+vZNT/mQ='
};

const RSAUtil = { encrypt };

export default RSAUtil;
