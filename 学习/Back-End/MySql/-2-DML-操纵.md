# 1. 添加数据 ( INSERT )
## 1.1 指定字段
insert into tb_emp(username, name, gender) values ('wuji', '张无忌'， 1)
## 1.2 全部字段
insert into tb_emp values ('自己看着写吧')
## 1.3 批量添加 指定字段
insert into tb_emp(username, name, gender) values ('wuji', '张无忌', 1),
('xiaoming', '李晓明', 1),
('xiaomei', '王小美', 2)
## 1.4 批量添加 全部字段
insert into tb_emp values ...


# 2. 修改数据 ( UPDATE )
## 1. 指定某一行数据 (where)
update tb_emp set job = 3 where id = 1;
## 2.2 整张表全部修改（ 不带where ）
update tb_emp set entrydate = '2010-01-01';

# 3. 删除数据 ( DELETE )
delete from tb_emp where id = 1
