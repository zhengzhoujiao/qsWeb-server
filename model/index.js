const MongoClient = require('mongodb').MongoClient;
const assert = require('assert')

//Connection URL
const url = 'mongodb://localhost:27017';

//Database Name
const dbName = 'qsweb';

//use connect method to connect to the server
function connect(callback){
    MongoClient.connect(url,function(err,client){
        if(err){
            console.log('数据库连接错误',err)
        }
        else{
            var db = client.db(dbName)
            callback && callback(db) //callback存在则调用
            client.close()
        }
    })
}
module.exports = {
    connect
}