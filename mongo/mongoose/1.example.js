let mongoose = require('mongoose');

// connect db
let conn = mongoose.createConnection('mongodb://127.0.0.1:27017/school',{
    useNewUrlParser:true
});
conn.on('open',()=>{console.log('连接成功')})

conn.on('error',()=>{console.log('出错了')})

// 实现增删改查
//1）创建集合骨架
//2) 创建一个模型，模型具有怎删改查的功能

let StudentSchema = new mongoose.Schema({
    name: String,
    age: Number,
    //规定数据类型
    address: String,
    hobby:[],
});

var stuModel = conn.model('Student',StudentSchema);

/** 
 * create delete update find(增删改查)
*/
// stuModel.create({name:'张三',age:20,address:'上海'}).then(data=>{
//     console.log(data);
// })

//新增功能
// ;(async function(){
//     let r = await stuModel.create({name:'张三',age:20});
//     console.log(r);
// })()

//更新功能默认自带插入功能,不会覆盖
// stuModel.updateOne({name:"张三",age:20},{address:'北京',$addToSet:{hobby:{$each:['eat','drink']}}}).
// then(doc=>{console.log(doc)});

//删除
// stuModel.deleteMany({name:"张三"}).then(r => {console.log(r)})

//查询 
/***
 * findOne:对象 ，
 * find:数组,
 * findById:通过id查询
 *  */
// let arr = [];
// for (let index = 1; index <= 50; index++) {
//     arr.push({name:'张'+index ,age: 20+index})
// }
//插入数据
// stuModel.create(arr).then(r=>console.log(r));
// stuModel.findOne({_id:'5ceba14dbdb9ad72679a7089'}).then(r => console.log(r))
// 分页查询 skip limit sort
let pageSize = 10;
let pageNumber = 2;
let skipNum = (pageNumber-1)*pageSize;
//按照年龄从大到小排序，分页查询
stuModel.find({}).sort({age:-1}).limit(pageSize).skip(skipNum).exec().then(r => console.log(r))