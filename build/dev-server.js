require('./check-versions')()

var config = require('../config')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

var opn = require('opn')
var path = require('path')
var express = require('express')
var router = express.Router()
var webpack = require('webpack')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = process.env.NODE_ENV === 'testing'
  ? require('./webpack.prod.conf')
  : require('./webpack.dev.conf')

var request = require('request')

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
// automatically open browser, if not set will be false
var autoOpenBrowser = !!config.dev.autoOpenBrowser
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable

var app = express()
var compiler = webpack(webpackConfig)
// user
// var user = require('../server/routes/user')


var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: false,
  heartbeat: 2000
})
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

// !!!
app.use(function (req, res, next) {
  if (req.url.indexOf('/webapi') != -1) {
    var requestParams = {
      url: '',
      method: '',
      json: true,
    }
    var requestApi = 'http://47.94.74.150:9060' + req._parsedUrl.pathname.slice(7)
    console.log("br:")
    console.log("webapi:", requestApi)
    console.log("method:", req.method)
    console.log("params:", req._parsedUrl.query)

    var pathname = req._parsedUrl.pathname
    requestParams.url = requestApi
    requestParams.method = req.method
    // var doubanApi = 'https://api.douban.com/v2/book/1220562'
    if (req.method == 'GET') {
      var query = getQueryStringArgs(req._parsedUrl.query)
      var qs = {
        params: query,
      }
      qs.params = JSON.stringify(qs.params)

      requestParams.qs = qs
    } else if (req.method == 'POST') {
      requestParams.form = {key: 'value'}
      requestParams.headers = {
        "content-type": "application/json"
      }
    }

    request(requestParams, function (error, response, body) {
      // console.log("server response:", response)
      console.log("server body:", body)
      res.send(body)
    })
    // get query
    function getQueryStringArgs(url){
      var qs = url.substring(url.lastIndexOf("?") + 1)
      var args = {}
      var items = qs.length > 0 ? qs.split('&') : []
      var item = null
      var name = null
      var value = null
      for(var i=0; i<items.length; i++){
         item = items[i].split("=")
         //用decodeURIComponent()分别解码name 和value（因为查询字符串应该是被编码过的）。
         name = decodeURIComponent(item[0])
         value = decodeURIComponent(item[1])
         if(name.length){
             args[name] = value
         }
       }
       return args
     }

  } else {
    next()
  }
})
// !!!

var uri = 'http://localhost:' + port

var _resolve
var readyPromise = new Promise(resolve => {
  _resolve = resolve
})

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
  // when env is testing, don't need open it
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
  _resolve()
})

var server = app.listen(port)

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
