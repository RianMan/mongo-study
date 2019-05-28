## 基础的使用

1. 安装 (mac环境)
    - brew install mongodb
    - sudo mkdir -p /data/db （创建初始的mongo的存放数据文件夹）
    - 然后执行mongod 就可以跑起来了(sudo mongod --dbpath=/data/db)，还可以通过sudo mongod&这样就可以关闭命令行，服务一样启动，在后台监听即可；
    - 客户端(命令行)通过mongo就可以连接了
    - sudo lsof -i:27017(查看mongo的进程)
    - sudo kill -9 92174（关掉mongo的进程）

---

2. 基础的语法和使用

    <table>
        <tr>
            <th>mongo</th>
            <th>mysql</th>
        </tr>
         <tr>
            <th>文档（document）</th>
            <th>记录（row）</th>
        </tr>
         <tr>
            <th>集合（collection）</th>
            <th>表（table）</th>
        </tr>
         <tr>
            <th>数据库（database）</th>
            <th>数据库（database）</th>
        </tr>
    </table>
 
-  show dbs (展示数据库)

-  use school（使用数据库）

-  db.school.createCollection('student') (创建一个集合)
    <br >
    db.student.insert({name:'zs'})
    <br >
    db.student.save()
    > 这个是id没有重复的就是插入，有的话就是更新,每一条记录都会自己产生一个objectId，为了做分布式

-   db.student.drop(删除) , db.student.find(查看)
    > find(查询条件，查询配置)

-   db.student.update(需要改的条件，改成什么值，配置)
    db.stu.update({name:"zs"},{$set:{age:9}},{multi:true})<批量修改>
    ```
        $inc:自增长
        $set:字段：可以为数组或者字符串；
        $push:给一个为数组字段添加一项；
        $pop: 删除最后的一项
        $ne: 不等于
        $addToSet: 添加自动去重的数组
        $in: $in:[1,2]拿出 1，2
        $nin: 不是这个区间的值
        $lt:小于某个值 $gt: 大于某个值 $lte:包含大于的值
    ```

-   db.stu.remove(匹配条件,配置项（例如{justOne:true}）)，删除记录

3. 引进外部文件执行mongo语句 

4. 索引-以供查找

- 保证字段的内容是唯一的，提高搜索的速度
> db.user.ensureIndex({age:-1}) 倒叙插入索引

5. 数据库的备份和恢复

- sudo mongodump --db school --collection student --out ./backup
> 导出一个集合到一个文件夹

- sudo mongorestore ./backup
> 恢复一个文件夹的数据库

6. 数据库权限
- db.createUser()
- db.auth()

7. mongoose的使用
- populate可以进行连表查询 
> Cart.findById('***').populate('user',{username:1}) 

8. 通过使用koa和mongo进行数据的交互
- 在koa里面，所有的访问数据库操作**都是异步的**，所以必须用await来等待执行结果的返回，必须结果回来以后在进行我们的路由跳转操作，被这个问题坑死了

