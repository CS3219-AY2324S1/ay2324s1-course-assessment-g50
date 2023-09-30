const MongoStore = require('connect-mongo');

/* Used for configuring cookie manager configuration)*/
const sessionConfig = {
    secret: 'password',
    name: 'byebye',
    resave: false,
    saveUninitialized: true,
    secure: false, //required for non-https server so that client will send cookie
    sameSite: 'none',
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URL,
        ttl: 1209600,
        autoRemove: 'native',})
}

module.exports = sessionConfig;