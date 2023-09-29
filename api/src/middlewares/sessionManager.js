const MongoStore = require('connect-mongo');

const sessionConfig = {
    secret: 'password',
    name: 'byebye',
    resave: false,
    saveUninitialized: true,
    secure: false, //required for non-https server so that client will send cookie
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URL,
        ttl: 60,
        autoRemove: 'native',})
}

module.exports = sessionConfig;