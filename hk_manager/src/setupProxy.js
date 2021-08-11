const {createProxyMiddleware} = require('http-proxy-middleware')

module.exports = function (app) {
    app.use(
        '/baidu_api',
        createProxyMiddleware({
            target: 'http://api.map.baidu.com/weather/v1',
            changeOrigin: true,
            pathRewrite: {
                '^/baidu_api': '/'
            }
        })
    );
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://localhost:5000',
            changeOrigin: true
        })
    );
}