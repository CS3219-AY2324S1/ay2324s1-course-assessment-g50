const cors = require('cors')

// Cors Configs
const corsConfig = cors({
    credentials: true,
    origin: 'http://peerprepg50.site',
});

// Proxy Configs
const proxyOptions = {
    changeOrigin: true,
};

module.exports = {
    proxyOptions,
};