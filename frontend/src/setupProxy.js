const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function(app){

    app.use(
        createProxyMiddleware("/api/rawmaterial/upload", {
            target: "http://localhost:9192",
            secure: false,
            changeOrigin: true
        })
    );
};