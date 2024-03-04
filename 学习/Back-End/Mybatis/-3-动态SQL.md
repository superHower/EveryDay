# 0. 格式化快捷方式
Ctrl + Alt + L

# 1. <if> 与 <where> <set>
多个 if 判断时用 where 或 set

```
        <where>
            <if test="name != null">
                name like concat('%', #{name}, '%')
            </if>

            <if test="gender != null">
                and gender = #{gender}
            </if>

            <if test="begin != null and end != null">
                and entrydate between #{begin} and #{end}
            </if>
        </where>
```

# 2. <foreach>
collection: 集合
item： 集合项
separator: 分隔符
open: 开始符
end: 结束符

```
    <delete id="deleteByIds">
        delete from emp where id in
        <foreach collection="ids" separator="," item="id" open="(" close=")">
            #{id}
       </foreach>
    </delete>
```


# 3. <sql> <include>
1. sql : 封装可重复使用的SQL片段
```
    <sql id="commonSelect">
        select username, name, gender, image, job, entrydate, dept_id, create_time, update_time
        from emp
    </sql>
```


2. include: 使用指定的 sql 片段
```
        <include refid="commonSelect"/>
```