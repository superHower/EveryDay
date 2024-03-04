# 1. 新建JSP项目
 1. 文件 》 新建 》 JakartaEE 》 模板 -- web应用程序 》 服务器 -- Tomcat 》  确认

 2. Tomcat编辑配置 》 部署 》 应用程序上下文 》 修改成 /jsp

 3. 文件 》 设置 》 编辑器 》 文件和代码模板 》 其他 》 JSP文件 》 Jsp File.jsp 》 确定

 4. webapp 》 与WEB-INF同级目录 》 新建jsp文件

 5. 启动Tomcat 》 浏览器输入http://localhost:8080/jsp/example_1.jsp



# 2. JSP注释
<%-- JSP注释 --%>



# 3. 脚本小程序 Scriptlet
## 3.1 java脚本段（局部变量）
<% 
  java脚本段， 定义局部变量 
%>
## 3.2 声明全局（变量、方法、类）
<%!
  java全局变量
%>
## 3.3 表达式 （一个数据）
<%= str %>





# 4. 指令标签
## 4.1 include静态包含 - 即内容直接替换
<%@ include file="" %> 

## 4.2 include动态包含 - 内容独立（类似方法调用）
```
<jsp:include page="include_1.html"></jsp:include>
```
注意： 两个动态包含之间不能加任何内容


### 4.2.1 页面传参 
```
<jsp:include page="index.jsp">
    <jsp:param name="uname" value="Hower"/>
    <jsp:param name="msg" value="<%=str%>"/>
    <jsp:param name="msg2" value="huawei"/>
</jsp:include>
```

### 4.2.2 接收参数 
request.getParameter(name) 


## 4.3 page指令标记
1. contentType属性: "text/html; charset = UTF-8"
2. launguage属性: "Java"
3. import属性: "java.io*"
4. session属性: true(是否需要内置的session对象)
5. buffee属性: 内置输出流对象out讲服务器的信息发送到客户端
6. autoFlush属性: 指定out的缓冲区被填满时，缓冲区是否刷新
7. isThreadSafe属性: JSP页面是否可多线程访问
8. info属性: 为JSP页面准备一个常用且常要修改的字符串

## 4.4 forward动作标记:
jsp:forward page="index.jsp" 






# 5. 四大域对象
## 5.1 page范围
只在一个页面中保存属性， 
跳转后无效
```
<jsp:forward page="03-四大域对象跳转.jsp"></jsp:forward> 
```

## 5.2 request范围
只在一次请求中保存属性， 服务器跳转后依然有效
在 a标签 跳转后无效
```
<a href="03-四大域对象跳转.jsp">a标签控制客户端跳转</a>
```


## 5.3 session范围
在一次会话中， 任何跳转都有效
关闭浏览器之后，再输入网址就无效


## 5.4 application范围
整个服务器上保存


# 6. EL表达式
## 6.1 获取指定域对象的值
如果setAttribute的名字相同，则查找方式从小到大， 找到为止
pageContext > request > session > application
```
    ${pageScope.uname}
    ${requestScope.uname}
    ${sessionScope.uname}
    ${applicationScope.uname}
```

## 6.2 获取数据
### 6.2.1 获取List
1. 获取某一个数据： ${list.size()}
2. 获取集合长度：   ${list[2]}

### 6.2.2 获取Map
${map.key} 或者 ${map["key"]}

### 6.2.3 获取javaBean
${user.uname}  或者  ${user.getName()}


### 6.2.4 empty判断 
判断域对象是否为空 ${empty uname}

### 6.2.5 等值判断
判断是否相等 ${a == b} 或者 ${a eq b}



# 7 JSP内置对象
## 7.1 request对象
1.1 获取请求的参数
<%
 String username = request.getParameter("username"); 
%>

1.2 处理中文编码
request.setCharacterEncoding("UTF-8")
1.3 设置响应头信息
response.setHeader("Content-Type", "text/html"); 


## 7.2.response对象
2.1 设置响应头的信息
response.setHeader("Content-Type", "text/html");

2.2 重定向
response.setRedirect("index.jsp")

2.3设置响应状态码
response.setStatus(404);

2.4 URL重写(不支持cookie)
response.encodeRedirectURL("index.jsp")


## 7.3.session对象
3.1 获取存储信息
request.getSession() 
3.2 设置存储信息
 session.setAttribute("username", "admin") 

## 7.4.application对象
同session，但其作用于整个服务器

## 7.5.out对象
用于在客户端输出
out.print(str)




# 8. JavaBean
1. 编写Javabean
在WEB-INF/classes/Person.java文件下

2. 使用Javabean
<jsp:useBean id="person" class="Person" scope="session"/>

3. 获取bean属性
 <jsp:getProperty name="person" property="age"/></p>

4. 修改bean属性
<jsp:setProperty name="person" property="name" value="Tom"/>