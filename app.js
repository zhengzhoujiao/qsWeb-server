const express = require('express')
var loginApi = require('./router/users')
var uploadApi = require('./router/upload')
var pageUploadApi = require('./router/pageUpload')
var bp = require('body-parser')
const app = express()
const port = 3001
app.use(bp.urlencoded({ extended: false }))
app.use(bp.json())
// 设置跨域和相应数据格式
app.all('/*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, mytoken')
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, Authorization')
    res.setHeader('Content-Type', 'application/json;charset=utf-8')
    res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept,X-Requested-With')
    res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
    res.header('X-Powered-By', ' 3.2.1')
    if (req.method == 'OPTIONS') res.send(200)
    /*让options请求快速返回*/ else next()
  })

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use(loginApi)
app.use(uploadApi)
app.use('/page',pageUploadApi)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})