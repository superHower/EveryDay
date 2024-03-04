# 1. 数据类型
## 1.1. 数值类型
1. tinyint
2. smallint
3. mediumint
4. int
5. bigint
6. float       
7. double       
8. decimal  

unsigned -- 无符号
decimaal(5, 2) 5位数字长度，2位小数



## 1.2. 字符类型
1. char    定长
2. varchar 变长
3. blob    二进制文本数据
4. text    文本数据
5. tinyblob
6. tinytext
7. mediumblob
8. mediumtext
9. longblob
10. mediumblob



## 1.3. 日期类型
1. date        YYYY-MM-DD
2. time        HH:MM:SS
3. year        YYYY
4. datetime    YYYY-MM-DD HH:MM:SS
5. timestamp   YYYY-MM-DD HH:MM:SS





# 2. 表操作
1. 查询库中所有表
show tables
2. 查询表结构
desc tb_emp
3. 查询建表语句
show create table tb_emp
4. 删除表
drop table if exists tb_emp

# 3. 字段操作
1. 添加字段
alter table tb_emp add xxx
2. 修改字段类型
alter table tb_emp modify int
3. 修改字段名和字段类型
alter table tb_emp change xxx int
4. 删除字段
alter table tb_emp drop column xxx
5. 修改表名
rename table tb_emp to new_xxx













































