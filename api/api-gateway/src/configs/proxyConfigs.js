const cors = require('cors')

// Cors Configs
const corsConfig = cors({
    credentials: true,
    origin: 'http://peerprepg50:3000',
});

// Proxy Configs
const proxyOptions = {
    changeOrigin: true,
};

module.exports = {
    corsConfig,
    proxyOptions,
};