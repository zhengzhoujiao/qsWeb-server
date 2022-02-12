var express = require('express');
var router = express.Router()
var model = require('../model')
var multipart = require('connect-multiparty'); //在处理模块中引入第三方解析模块
var multipartMiddleware = multipart();
//头像上传
router.post('/upload', multipartMiddleware, function (req, res) {  //引用connect - muitipart 模块
    console.log(req.files.file)
    var data = {
        uploadDate:new Date().toLocaleString(),
        filePath:req.files.file.path.substring(req.files.file.path.lastIndexOf("\\")+1,req.files.file.path.length)
    }
    model.connect(function (db) {
        db.collection('theImage').insertOne(data,function(err,result){
            // console.log(result.ops[0])
            if (err) {
                res.status(500).send({message:"服务器错误"})
            } else {
                res.status(200).send(result.ops[0])
            }
        })
    })
})
module.exports = router