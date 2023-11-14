const cors = require('cors')

// Cors Configs
const corsConfig = cors({
    credentials: true,
    origin: 'http://35.198.214.47:3000',
});

// Proxy Configs
const proxyOptions = {
    changeOrigin: true,
};

module.exports = {
    corsConfig,
    proxyOptions,
};