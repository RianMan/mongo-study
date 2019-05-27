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

    - 和mysql的比较<br >
    mongo | mysql <br>
    -|-<br>
    文档（document）| 记录（row）<br>
    集合（collection）| 表（table）<br>
    数据库（database）| 数据库（database）
