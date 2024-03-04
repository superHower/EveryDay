# 1. nginx部署
将前端打包好的dist文件下的东西全部放到nginx的html文件里面


# 2. 端口占用问题
鼠标放到桌面最下面 =》 右键 =》 任务管理器
=> 点击名称 =》 进行排序 =》 找是否有nginx


# 3 查看占用端口的进程
cmd => netstat -ano | findStr 80
得到PID =》 任务管理器 查找PID => 一般会被系统占用


# 4 更换端口号
conf/nginx.conf => 打开方式： vsCode
36 行 ： server 更改成 90

再次双击 nginx.exe =》 任务管理器 =》 能够找到nginx就成功了


# 5. 启动nginx
localhost: 90

# 6. 关闭nginx
taskkill /im nginx.exe -f
