/**
 * 路由模块
 */
const express = require("express");
const router = express.Router();
const service = require("./service.js")

//路由处理

//首页
router.get('/',service.showIndex)
//添加图书(跳转到添加图书页面)
router.get('/toAddBook',service.toAddBook)
//添加图书(提交表单)
router.post('/addBook',service.addBook)
//修改图书
router.get('/toEditBook',service.toEditBook)
//编辑提交图书
router.post('/editbook',service.editBook)

module.exports = router;