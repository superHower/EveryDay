# 1 springWeb 项目
## 1.1. 构建项目
新建 =》 spring initializr => 设置名字 =》 勾选springWeb => 确定

## 1.2. 启动类
```
@SpringBootApplication
public class SpringWebDemoApplication {

    public static void main(String[] args) {
        SpringApplication.run(SpringWebDemoApplication.class, args);
    }

}
```

## 1.3. 自定义类helloController
添加方法hello,
```
// 请求处理类
@RestController
public class helloController {
    @RequestMapping("/hello")
    public String hello() {
        System.out.println("Hello World");
        return "Hello World";
    }
}
```

## 1.4. 运行
浏览器输入localhost:8080

## 1.5 postman作用： 进行接口测试




# 2. 前端控制器 - 控制 xxxController
0. DispatcherServlet
1. 请求 - HttpServletRequest  获取请求数据
2. 响应 - HttpServletResponse 设置响应数据
3. BS架构：（浏览器/服务器）-淘宝、天猫、bilibi
4. CS架构: (客户端/服务器) - 微信、 百度网盘





# 3. 请求响应  @RequestMapping("/hello")
## 3.1 简单参数
1. controller/RequestController文件下：

```
    // 1. 原始方式 （繁琐）
    @RequestMapping("/simpleParam")
    public String simpleParam(HttpServletRequest request){
        //获取请求参数
        String name = request.getParameter("name");
        String ageStr = request.getParameter("age");

        int age = Integer.parseInt(ageStr);
        System.out.println(name+ ":" + age);
        return "OK";
    }

    // 2. springboot方式
    @RequestMapping("/simpleParam")
    public String simpleParam(String name, Integer age){
        System.out.println(name+ ":" + age);
        return "OK";
    }
    // 3. 必填参数@RequestParam(name = "name", required = false)

```
2. postman 传入URL:
http://localhost:8080/simpleParam?name=Tom&age=10

## 3.2 必填参数 @RequestParam
```
    @RequestMapping("/simpleParam")
    public String simpleParam(
        @RequestParam(name = "name", required = false)
         String name, 
         Integer age){
        System.out.println("姓名：" + name+ "， 年龄：" + age);
        return "OK";
    }
```

## 3.3 实体参数（对象参数）
1. 新建pojo文件，再新建User类文件
2. controller/RequestController文件下：
```
    @RequestMapping("/simplePojo")
    public String simplePojo(User user){
        System.out.println(user);
        return "OK";
    }
```
3. postman 传入：
http://localhost:8080/simplePojo?name=Tom&age=20&address.province=jiangsu&address.city=suzhou


## 3.4 数组/集合参数 @RequestParam
1. controller/RequestController文件下：
```
    @RequestMapping("/arrayParam")
    public String arrayParam(String[] hobby){
        System.out.println(Arrays.toString(hobby));
        return "OK";
    }

    @RequestMapping("/listParam")
    public String listParam(@RequestParam List<String> hobby){
        System.out.println(hobby);
        return "OK";
    }
```
2. postman 传入
http://localhost:8080/listParam?hobby=game&hobby=java&hobby=sexy


## 3.4 日期参数 @DateTimeFormat
1. controller/RequestController文件下：
```
    @RequestMapping("/dateParam")
    public String dateParam(@DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss") LocalDateTime updateTime){
        System.out.println(updateTime);
        return "OK";
    }
```
2. postman 传入
http://localhost:8080/dateParam?updateTime=2023-09-04 23:25:56


## 3.5 Json参数 @RequestBody
1. controller/RequestController文件下：
```
    @RequestMapping("/jsonParam")
    public String jsonParam(@RequestBody User user){
        System.out.println(user);
        return "OK";
    }
```
2. postman 传入 => bady => raw => JSON
```
{
    "name": "Tom",
    "age": 12,
    "address": {
        "province": "beijing",
        "city": "chaoyang"
    }
}
```

## 3.6 路径参数( 动态参数 ) @PathVariable
1. controller/RequestController文件下：
```
    @RequestMapping("/path/{id}/{name}")
    public String pathParam2(@PathVariable Integer id , @PathVariable String name){
        System.out.println(id);
        System.out.println(name);
        return "OK";
    }
```


# 4. 响应数据
## 4.1 注解 @RestController 
1. 相当于@ResponseBody + @Controller
2. 作用： 方法返回值直接相应，JSON格式

## 4.2 统一响应结果
1. 新建pojo/Result类文件
2. Result(code、msg、data)

## 4.2.* 员工 - 案例开发
1. pom.xml引入dom4j的依赖 - 用来解析XML文件
2. 新建utils/XmlParserUtils文件
3. 新建pojo/Emp员工类
4. 在resources文件下新建emp.xml文件
5. 引入前端页面：resources/static 引入
6. 新建EmpController
```
解析emp.xml文件  得到empList
对数据进行转换处理  empList.stream().forEach(emp -> {})
响应数据        return Result.success(empList);
```
7. postman测试响应 http://localhost:8080/listEmp
8. 浏览器查看前端页面 http://localhost:8080/emp.html

## 4.3 分层解耦

### 4.3.1 三层架构
1. Controller：控制层 - 请求service接受数据、响应数据
```
    private EmpService empService = new EmpServiceA;

    @RequestMapping("/listEmp")
    public Result list(){
        //1. 调用service, 获取数据
        List<Emp> empList = empService.listEmp();

        //3. 响应数据
        return Result.success(empList);
    }

```

2. Service： 逻辑处理层 - 处理Dao数据
```
    private EmpDao empDao = new EmpDaoA;

    public List<Emp> listEmp() {
        //1. 调用dao, 获取数据
        List<Emp> empList = empDao.listEmp();

        empList.stream().forEach(emp -> {
            //处理 gender 1: 男, 2: 女
            String gender = emp.getGender();
            if("1".equals(gender)){
                emp.setGender("男");
            }else if("2".equals(gender)){
                emp.setGender("女");
            }

            //处理job - 1: 讲师, 2: 班主任 , 3: 就业指导
            String job = emp.getJob();
            if("1".equals(job)){
                emp.setJob("讲师");
            }else if("2".equals(job)){
                emp.setJob("班主任");
            }else if("3".equals(job)){
                emp.setJob("就业指导");
            }
        });
        return empList;
    }
```

3. Dao: 数据访问层 - 访问解析emp.xml数据
```
    @Override
    public List<Emp> listEmp() {
        //1. 加载并解析emp.xml
        String file = this.getClass().getClassLoader().getResource("emp.xml").getFile();
        System.out.println(file);
        List<Emp> empList = XmlParserUtils.parse(file, Emp.class);
        return empList;
    }
```


### 4.3.2 IOC与DI入门
1. 控制反转: 
@Component - 将当前类交给IOC容器， 成为IO容器的bean

2. 依赖注入: 
@Autowired - 运行时,从IOC容器获取该类型对象,赋值给该变量

3. 业务逻辑处理Service类切换： 注释掉 A 的 @Component

### 4.3.3 IOC详解
1. @Component衍生注解：@Controller、@Service、@Repository

2. @Repository("daoA") => Endpoints/Actuator => Bean

3. @ComponentScan - Bean组件扫描
(1) 当dao包移动到与com.hower包同一目录时， 重新扫描

(2) 在启动器文件 SpringbootWebReqRespApplication中：
    @SpringBootApplication 扫描本包及子包的功能
    @ComponentScan({"dao","com.itheima"}) 指定扫描的包


### 4.3.4 DI详解
Bean注入时，@Autowired注解 如果存在多个相同的bean,会出错

解决方案:
1. @Primary  （在EmpServiceA.java文件中）
    给需要注入的 Service类 前面加上注解@Primary
```
@Primary
@Service
public class EmpServiceB implements EmpService {
    ...
}
```

2. @Qualifier  （在EmpController.java文件中）
    在controller类的@Autowired前面
    加上@Qualifier("empServiceA")
    (默认service类的首字母小写)
```
@RestController
public class EmpController {
    @Qualifier("empServiceA")
    @Autowired
    private EmpService empService ;

    @RequestMapping("/listEmp")
    public Result list(){
        List<Emp> empList = empService.listEmp();
        return Result.success(empList);
    }

}
```

3. @Resource （在EmpController.java文件中）
    不再使用@Autowired， 
    改为@Resource(name = "empServiceBB")
    (默认service类的首字母小写)
