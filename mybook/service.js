/**
 * 业务模块
 */
const path = require('path');
const fs = require('fs')
let data = require("./data.json")
let maxBookId = () => {
    let arr = [];
    data.forEach(item => {
        arr.push(item.id)
    });
    return Math.max.apply(null, arr)
}
//显示主页
// status 表示状态 1 正常  2 已删除
exports.showIndex = (req, res) => {
    res.render('index', {
        list: data
    })
}
//跳转到添加图书界面
exports.toAddBook = (req, res) => {
    res.render('addBook', {})
}
//添加图书保存数据
exports.addBook = (req, res) => {
    let info = req.body;
    let book = {};
    for (let key in info) {
        book[key] = info[key]
    }
    book.id = maxBookId() + 1;
    data.push(book)
    //需要把内存中的文件写入文件
    fs.writeFile(path.join(__dirname, 'data.json'), JSON.stringify(data), (err) => {
        if (err) {
            res.send('添加书籍失败')
        }
        res.redirect('/')
    })
}
exports.toEditBook = (req, res) => {
    let id = req.query.id;
    let book = {};
    data.forEach((item)=>{
        if(item.id ==id){
            book =item;
           return;
        }
    })
    res.render('editBook', book)
}
exports.editBook = (req,res)=>{
    let info = req.body;
    data.forEach((item)=>{
        if(item.id == info.id){
            for(key in info){
                item[key] = info[key]
            }
            return;
        }
    })
    fs.writeFile(path.join(__dirname,'data.json'),JSON.stringify(data),(err)=>{
        if(err){
            res.send('修改数据失败')
        }
        res.redirect('/')
    })
}

exports.delBook = (req,res)=>{
    let info = req.body;
    data.forEach((item)=>{
        if(item.id == info.id){
            // 修改状态
            item.status = 0
            // for(key in info){
            //     item[key] = info[key]
            // }
            return ;
        }
    })
    fs.writeFile(path.join(__dirname,'data.json'),JSON.stringify(data),(err)=>{
        if(err){
            res.send('修改数据失败')
        }
        res.redirect('/')
    })
}