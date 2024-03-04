# 0. JSTL介绍
1. JSTL: JSP标准标签库

2. 核心标签库
用于： 循环、表达式赋值、基本输入输出
http://java.sun.com/jsp/jstl/core


3. 格式化标签库
用于：区域日期格式化
http://java.sun.com/jsp/jstl/fmt


# 1. 新建JSTL项目
1. 下载jar包
https://archive.apache.org/dist/jakarta/taglibs/standard/binaries/

2. 导入jar包
在WEB-INF下新建lib目录下导入jar包

文件 => 项目结构 => 模块 => 依赖 => +
=> 添加WEB-INF的lib => 勾选 => 确定


# 2. 条件动作标签
## 2.1 if标签
1. scope: page, request, session, application
```
<c:if test="${num <= 0}" var="flag" scope="request">
  数值小于0
</c:if>
```

## 2.2 choose标签 (wehn标签, otherwise标签)
```
<c:choose>
  <c:when test="${score < 60}">
    不及格
  </c:when>
  <c:when test="${score == 60}">
    刚好及格
  </c:when>
  <c:otherwise>
    棒棒滴
  </c:otherwise>
</c:choose>
```

## 2.3 forEach标签
1. var: 限域变量名

```
<c:forEach var="i" begin="1" end="10" step="2">
  ${i} &nbsp;
</c:forEach>
```
2. items： 被循环的集合 或 map
```
<c:forEach var="item" items="${li}">
    ${item} &nbsp;
</c:forEach>
```





# 3. 格式化动作标签
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
## 3.1 formatNumber标签
1. value: 要显示的数字
2. type：NUMBER(数字), CURRENCY(货币), PERCENT（百分比）

```

<fmt:formatNumber value="10" type="number" var="num1" />${num1}<br>
<fmt:formatNumber value="10" type="percent" var="num2" />${num2}<br>
<fmt:formatNumber value="10" type="currency" var="num3" />${num3}<br>
<%--设置时区--%>
<fmt:setLocale value="en__US"/>
<fmt:formatNumber value="10" type="currency"/><br>
```

## 3.2 formatDate标签
1. value: 要显示的日期
2. type: DATE, TIME, BOTH
3. dateStyle: FULL, LONG, MEDIUM, SHORT, DEFAULT
4. timeStyle: FULL, LONG, MEDIUM, SHORT, DEFAULT
5. pattern: 自定义格式
6. timeZone: 显示日期的时区
```
<%
    request.setAttribute("myDate", new Date());
%>

Date对象：${myDate} <br>
默认日期： <fmt:formatDate value="${myDate}" /> <br>
默认时间： <fmt:formatDate value="${myDate}"  type = "time"  /> <br>
日期时间： <fmt:formatDate value="${myDate}"  type = "both"  /> <br>
<br><br>
完全格式： <fmt:formatDate value="${myDate}"  type = "both" dateStyle="Full" /> <br>
段格式：   <fmt:formatDate value="${myDate}"  type = "both" timeStyle="short" /> <br>
自定义格式： <fmt:formatDate value="${myDate}"  type = "both" pattern="yyyy-MM-dd" /> <br>


```

## 3.3 parseNumber标签 - 解析数字， 货币， 百分数
1. value: 要解析的数字
2. type：NUMBER(数字), CURRENCY(货币), PERCENT（百分比）
3. var: 存储带解析数字的变量

```
<fmt:parseNumber value="100"  /> <br>
<fmt:parseNumber value="100" type="number" /> <br>
<fmt:parseNumber value="100%" type="percent" /> <br>
```
## 3.4 parseDate标签 - 解析日期
```
<fmt:parseDate value="2023-09-10" type="date" /> <br>
<fmt:parseDate value="2023/09/10" pattern="yyyy-MM-dd" /> <br>
```
