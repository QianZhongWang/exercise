var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Goods = require('../models/goods')

//链接MongoDB数据库
mongoose.connect('mongodb://127.0.0.1:27017/mall',{ useNewUrlParser: true });


//监听
mongoose.connection.on("open",function(){
    console.log("MongoDB connected success")
})

mongoose.connection.on("error",function(){
    console.log("MongoDB connected fail")
})

mongoose.connection.on("disconnected",function(){
    console.log("MongoDB connected disconnected")
})

router.get("/",(req,res,next)=>{
   Goods.find({},(err,data)=>{
       if(err){
           res.json({
               status:'1',
               msg:err.message
            })
       }else{
           res.json({
               status:'0',
               msg:'',
               result:{
                   count:data.length,
                   list:data
               }
            })
       }
   })

})

module.exports =router