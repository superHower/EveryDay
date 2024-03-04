# 1. 基本查询
## 1.1 查询多个字段
select username, name from tb_emp;

## 1.2 查询所有字段
select * from tb_emp;

## 1.3 查询后设置别名
select id as 姓名, name as 姓名 from tb_emp;

## 1.4 去除重复记录
select distinct gender from tb_emp;






# 2. 条件查询 （where）
## 2.1 between ... and ... 某个范围
select * from tb_emp where id between 2 and 4;

## 2.2 in(...)             in列表中的值
select * from tb_emp where job in (2, 3, 4);

## 2.3 like                模糊匹配( _ % )
select * from tb_emp where name like '张_';//查询张xx




# 3. 分组查询 (group by xx having xxx)
select 字段 from tb where 条件 group by 字段 having 条件

注意： having是对group by 分组之后的结果进行条件过滤
select gender, count(*) from tb_emp where gender < 3 group by gender having count(*) >= 4;


## 3.1 聚合函数
1. count(字段)  -   select count(id) from tb_emp;
但是 null 的记录不会被统计在内

2. count(*)     -   select count(*) from tb_emp;
3. max(字段)    -   select max(entrydate) from tb_emp;
4. min(字段)
5. sum(字段)
6. avg(字段)





# 4. 排序查询 (order by)
select * from tb_emp order by gender, id desc;
注： gender相同， 按照id排序

## 4.1 排序方式
1. 升序 ASC (默认)
2. 降序 DESC



# 5. 分页查询 (limit)
## 5.1 每页展示5条记录, 起始索引是0
select * from tb_emp limit 0,5
注意0 是起始索引
## 5.2 起始索引计算公式
起始索引 = （页码 - 1） * 每页展示记录数

# 6. 流程控制函数
## 6.1 if
select if(gender = 1, '男性员工', '女性员工') 性别， count(*) from tb_emp group by gender;

## 6.2 case
select (case gender when 1 then '男性' when 2 then '女性' else '性别未知' end) 性别, count(*) from tb_emp group by gender;
