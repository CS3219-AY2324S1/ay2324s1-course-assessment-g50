const cors = require('cors')

// Cors Configs
const corsConfig = cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
});

// Proxy Configs
const proxyOptions = {
    changeOrigin: true,
};

module.exports = {
    corsConfig,
    proxyOptions,
};