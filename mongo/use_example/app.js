const Koa = require('koa');
const path = require('path');
const fs = require('fs');
const statics =  require('koa-static')
const bodyParse = require('koa-bodyparser');
const Router = require('koa-router');
const {userModel } = require('./model');
const app = new Koa();
const router = new Router();
const static = path.join(__dirname, './views');

app.use(statics(
    path.join(__dirname, './views')
));

const home = new Router();
const loginUp = new Router();
const login = new Router();

/**
 * 
 const parserPromise = (ctx) => new Promise((resolve,reject) => {
    try {
        let str = '';
        ctx.req.on('data',function(data){
            str += data;
        })
        ctx.req.on('end',function(err){
            if(!err && str){
                let strArr = str.split('&');
                const obj = strArr.reduce((memo,cur,index) => {
                    let key = cur.split('=')[0];
                    let value  = cur.split('=')[1];
                    memo[key] = value;
                    return memo;
                },{})
                resolve(obj)
            }else{
                resolve('');
            }
        });
    } catch (error) {
        reject(error)
    }
})

const parser = async (ctx,next) => {
    const res = await parserPromise(ctx);
    ctx.state.queryBody = res;
    next();
}
 */

//首页
home.get('/', async (ctx) => {
    ctx.body = '首页'
})


//注册
loginUp.get('/',async (ctx, next) => {
    let data = await fs.readFileSync(static+'/loginup.html','utf-8');
    ctx.body = data;
}).post('/',async (ctx) => {
    let userInfo = ctx.request.body;
    userModel.create(userInfo).then(()=>{
        ctx.body = 'ok'
    })
    ctx.redirect('/login')
});


//登陆
login.get('/',async (ctx, next) => {
    console.log(999)
    let data = await fs.readFileSync(static+'/login.html','utf-8');
    ctx.body = data;
}).post('/',async (ctx, next) => {
    let userInfo = ctx.request.body;
    next();
    let doc = await userModel.findOne(userInfo)
    if(doc){
        ctx.redirect('/')
    }else{
        ctx.redirect('back')
    }
});

router.use('/', home.routes(), home.allowedMethods())
router.use('/loginUp', loginUp.routes(), loginUp.allowedMethods())
router.use('/login', login.routes(), login.allowedMethods())

app.use(bodyParse()).use(router.routes()).use(router.allowedMethods())

app.listen(9090);