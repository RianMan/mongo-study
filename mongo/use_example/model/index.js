let mongoose = require('mongoose');

// connect db
let conn = mongoose.createConnection('mongodb://127.0.0.1:27017/school',{
    useNewUrlParser:true
});
conn.on('open',()=>{console.log('连接成功')})

conn.on('error',()=>{console.log('出错了')});


let UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    createDate : {
        type: Date,
        default: Date.now(),
    }
});

var userModel = conn.model('User',UserSchema);

exports.userModel = userModel;