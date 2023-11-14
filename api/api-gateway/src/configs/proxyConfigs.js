const cors = require('cors')

// Cors Configs
const corsConfig = cors({
    origin: '*',
});

// Proxy Configs
const proxyOptions = {
    changeOrigin: true,
};

module.exports = {
    corsConfig,
    proxyOptions,
};