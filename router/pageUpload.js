var express = require('express');
var router = express.Router()
var model = require('../model')
var multiparty = require('multiparty')
// 存页面
router.post('/into',function(req,res,next){
    let date = new Date()
    let Str=date.getFullYear() + '-' +
    (date.getMonth() + 1) + '-' + 
    date.getDate() + ' ' + 
    date.getHours() + ':' + 
    date.getMinutes() + ':' + 
    date.getSeconds()
    let List = JSON.parse(JSON.parse(JSON.stringify(req.body).slice(1,-4))).data
    let id = List.id
    console.log(List)
    // 编辑
    if(id){
        var data = {
            webName:List.webName,
            webPrice:List.webPrice,
            pageDetails:List.pageDetails,
            bgcolor:List.bgcolor,
            userId:List.userId,
            state:List.state,
            date:Str,
            webIp:'未绑定'
        }
        model.connect(function(db){
            db.collection('pageList').updateOne({id:id},{$set:{
                webName:data.webName,
                webPrice:data.webPrice,
                pageDetails:data.pageDetails,
                bgcolor:data.bgcolor,
                userId:data.userId,
                date:Str
            }},function(err,ret){
                // if(res.length>0){
                //     res.send(true,200,'登录成功！')
                // }
                // else{
                //     res.send(false,400,err);
                // }
            })
        }) 
    } else {
        var data = {
            webName:List.webName,
            webPrice:List.webPrice,
            pageDetails:List.pageDetails,
            bgcolor:List.bgcolor,
            userId:List.userId,
            state:List.state,
            date:Str,
            webIp:'未绑定'
        }
        model.connect(function(db){
            db.collection('pageList').insertOne(data,function(err,ret){

            })
        })   
    }
    if(List.webName){
        res.status(200).send('succsee')
    }
    else{
        res.status(500).send('error');
    }
})
// 订单支付payOne
router.post('/payOne',function(req,res){
    // 订单状态更新
    // 余额更新
    // 网页状态更新
    let List = JSON.parse(JSON.parse(JSON.stringify(req.body).slice(1,-4))).data
    model.connect(function(db){
        db.collection('order').updateOne({webName:List.webName},{$set:{
            state:0,
        }},function(err,ret){
            model.connect(function(db){
                db.collection('pageList').updateOne({webName:List.webName},{$set:{
                    state:0,
                }},function(err,ret){
                    let money
                    model.connect(function(db){
                        db.collection('users').find().toArray(function(err, docs) {
                            money = docs[0].balance
                            model.connect(function(db){
                                db.collection('users').updateOne({name:"admin"},{$set:{
                                    balance:money-30,
                                }},function(err,ret){
                                    // if(res.length>0){
                                    //     res.send(true,200,'登录成功！')
                                    // }
                                    // else{
                                    //     res.send(false,400,err);
                                    // }
                                    res.status(200).send('success')
                                })
                            }) 
                        })
                    })
                })
            }) 
        })
    })

})
// 订单
router.post('/order',function(req,res,next){
    let date = new Date()
    let Str=date.getFullYear() + '-' +
    (date.getMonth() + 1) + '-' + 
    date.getDate() + ' ' + 
    date.getHours() + ':' + 
    date.getMinutes() + ':' + 
    date.getSeconds()
    let List = JSON.parse(JSON.parse(JSON.stringify(req.body).slice(1,-4))).data
    var data = {
        webName:List.webName,
        price:List.price,
        userId:List.userId,
        orderNumber:Date.parse(new Date()),
        data:Str,
        state: 0
    }
    console.log(data)
    model.connect(function(db){
        db.collection('order').insertOne(data,function(err,res){
            // if(ret.length>0){
            //     res.send(true,200,'登录成功！')
            // }
            // else{
            //     res.send(false,400,err);
            // }
            // console.log(res)
        })
    })
    res.status(200).send('success')
})
// 加入购物车
router.post('/car',function(req,res,next){
    let date = new Date()
    let Str=date.getFullYear() + '-' +
    (date.getMonth() + 1) + '-' + 
    date.getDate() + ' ' + 
    date.getHours() + ':' + 
    date.getMinutes() + ':' + 
    date.getSeconds()
    let List = JSON.parse(JSON.parse(JSON.stringify(req.body).slice(1,-4))).data
    var data = {
        webName:List.webName,
        price:List.price,
        userId:List.userId,
        orderNumber:Date.parse(new Date()),
        data:Str,
        state: 1
    }
    model.connect(function(db){
        db.collection('order').insertOne(data,function(err,res){
            // if(ret.length>0){
            //     res.send(true,200,'登录成功！')
            // }
            // else{
            //     res.send(false,400,err);
            // }
            // console.log(res)
        })
    })
    res.status(200).send('success')
})
// 充钱 更新
router.post('/addMoney',function(req,res){
    let List = JSON.parse(JSON.parse(JSON.stringify(req.body).slice(1,-4))).data
    let money
    model.connect(function(db){
        db.collection('users').find().toArray(function(err, docs) {
            // if(res.length>0){
            //     res.send(true,200,'登录成功！')
            // }
            // else{
            //     res.send(false,400,err);
            // }
            money = docs[0].balance
            console.log(docs[0].balance)
            console.log(List.money)
            console.log(money+Number(List.money))
            model.connect(function(db){
                db.collection('users').updateOne({name:"admin"},{$set:{
                    balance:money+Number(List.money),
                }},function(err,ret){
                    // if(res.length>0){
                    //     res.send(true,200,'登录成功！')
                    // }
                    // else{
                    //     res.send(false,400,err);
                    // }
                    res.status(200).send('success')
                })
            }) 
        })
    }) 
})
// 扣钱 更新
router.post('/reduceMoney',function(req,res){
    let List = JSON.parse(JSON.parse(JSON.stringify(req.body).slice(1,-4))).data
    let money
    model.connect(function(db){
        db.collection('users').find().toArray(function(err, docs) {
            // if(res.length>0){
            //     res.send(true,200,'登录成功！')
            // }
            // else{
            //     res.send(false,400,err);
            // }
            money = docs[0].balance
            model.connect(function(db){
                db.collection('users').updateOne({name:"admin"},{$set:{
                    balance:money-Number(List.money),
                }},function(err,ret){
                    // if(res.length>0){
                    //     res.send(true,200,'登录成功！')
                    // }
                    // else{
                    //     res.send(false,400,err);
                    // }
                    res.status(200).send('success')
                })
            }) 
        })
    })
})
// 读个人信息
router.get('/getUserDetail',function(req,res){
    model.connect(function(db){
        db.collection('users').find().toArray(function(err, docs) {
            console.log(docs)
            res.status(200).send(docs)
        }
    )
})})
// 读网页 详情通过row传入qiankun渲染
router.get('/getPageList',function(req,res){
    model.connect(function(db){
        db.collection('pageList').find().toArray(function(err, docs) {
            console.log(docs)
            res.status(200).send(docs)
        }
    )
})})
// 读订单
router.get('/getOrderList',function(req,res){
    model.connect(function(db){
        db.collection('order').find().toArray(function(err, docs) {
            console.log(docs)
            res.status(200).send(docs)
        }
    )
})})
// 更新订单状态同时更新网站状态 更新
module.exports = router