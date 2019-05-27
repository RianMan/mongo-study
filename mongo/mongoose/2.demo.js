let mongoose = require('mongoose');

// connect db
let conn = mongoose.createConnection('mongodb://127.0.0.1:27017/school',{
    useNewUrlParser:true
});
conn.on('open',()=>{console.log('连接成功')})

conn.on('error',()=>{console.log('出错了')})


let StudentSchema = new mongoose.Schema({
    name: String,
    age: Number,
    address: String,
    hobby:[],
});

var stuModel = conn.model('Student',StudentSchema);

let ScoreSchema = new mongoose.Schema({
    course: String,
    score: Number,
    student: {type: 'ObjectId', ref:stuModel},
});

var scoreModel = conn.model('Score',ScoreSchema);

// stuModel.create({name:"章三",age:19}).then(doc=>{
//     scoreModel.create({course:'英语',score:100,student:doc._id})
// })
//通过成绩id找到学生的信息
// scoreModel.find({_id:"5cebaaf21ea237735097eae8"}).populate('student',{name:1}).then(d=>{
//     console.log(d)
// })

scoreModel.findOne({_id:"5cebaaf21ea237735097eae8"}).then(d => {
    d.score = 120;
    //直接该数据然后保存，不需要在通过update去做更新操作
    d.save();
})