var express = require('express');
var router = express.Router()
var model = require('../model')
router.get('/login',function(req,res,next){
    var data = {
        name:req.query.account,
        password:req.query.password
    }
    console.log(data)
    model.connect(function(db){
        db.collection('users').find(data).toArray(function(err,docs){
            if(docs.length>0){
                res.send(true,200,'登录成功！')
            }
            else{
                res.send(false,400,err);
            }
        })
    })
})
module.exports = router