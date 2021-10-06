const { createProxyMiddleware } = require('http-proxy-middleware')

const configureProxy = (path, target) =>
  createProxyMiddleware(path, {
    target: target,
    secure: false,
    pathRewrite: { [`^${path}`]: '' }
  })

module.exports = function (app) {
  app.use(configureProxy('/api/person-service', 'http://localhost:8090'))
  app.use(configureProxy('/api/tempo', 'http://localhost:55681'))
}
