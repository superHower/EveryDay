# 1.SSR（服务器端渲染）

服务器端渲染（SSR）是一种用于在服务器上渲染网页并将完全渲染后的网页发送到客户端显示的技术。它允许服务器生成网页的完整 HTML 标记，包括动态内容，并作为对请求的响应发送给客户端。

在传统的客户端呈现方法中，客户端会收到一个最小的 HTML 页面，然后向服务器提出额外的数据和资源请求，用于在客户端呈现页面。这会导致初始页面加载时间变慢，并对搜索引擎优化（SEO）产生负面影响，因为搜索引擎爬虫很难索引 JavaScript 驱动的内容。

使用 SSR 时，服务器通过执行必要的 JavaScript 代码来生成最终的 HTML，从而完成网页的渲染。这意味着客户端可以从服务器接收完全呈现的网页，从而减少了对额外资源请求的需求。SSR 可改善初始页面加载时间，并允许搜索引擎轻松索引内容，从而提高搜索引擎优化效果。

SSR 常用于 React 的 Next.js 和 Vue.js 的 Nuxt.js 等框架和库中，以启用服务器端呈现功能。这些框架会为您处理服务器端呈现逻辑，从而更容易实现 SSR。

## 1.1 SSR的好处？

- **改善初始加载时间** ： SSR 允许服务器向客户端发送完整呈现的 HTML 页面，从而减少客户端所需的处理量。这就改善了初始加载时间，因为用户可以更快地看到完整的页面。
- **有利于搜索引擎优化** ：搜索引擎可以有效地抓取和索引 SSR 页面的内容，因为在初始响应中提供了完全呈现的 HTML。这就提高了搜索引擎的可见性，有助于获得更好的搜索排名。
- **可访问性** ： SSR 可确保禁用 JavaScript 或使用辅助技术的用户可以访问内容。通过在服务器上生成 HTML，SSR 可为所有用户提供可靠、可访问的用户体验。
- **低带宽环境下的性能** ： SSR 减少了客户端需要下载的数据量，因此有利于低带宽或高延迟环境中的用户。这对于移动用户或网络连接速度较慢的用户尤为重要。

虽然 SSR 具有这些优点，但必须注意的是，与客户端渲染方法相比，它可能会带来更多的服务器负载和维护复杂性。应仔细考虑缓存、可扩展性和服务器端呈现性能优化等因素。

# 2. 性能优化

## 2.1. vue如何性能优化？

（1）代码层面的优化
    v-if 和 v-show 区分使用场景
    computed 和 watch  区分使用场景
    v-for 遍历必须为 item 添加 key，且避免同时使用 v-if
    长列表性能优化
    事件的销毁
    图片资源懒加载
    路由懒加载
    第三方插件的按需引入
    优化无限列表性能
    服务端渲染 SSR or 预渲染

（2）Webpack 层面的优化

    Webpack 对图片进行压缩
    减少 ES6 转为 ES5 的冗余代码
    提取公共代码
    模板预编译
    提取组件的 CSS
    优化 SourceMap
    构建结果输出分析
    Vue 项目的编译优化

（3）基础的 Web 技术的优化
    开启 gzip 压缩
    浏览器缓存
    CDN 的使用
    使用 Chrome Performance 查找性能瓶颈

## 2.2 SPA首页白屏优化

`SPA页面`首页白屏的原因是因为 `所有资源`都需要在首页加载，因此优化首页白屏就是要优化首页资源的加载。

* 第三方库如果能进行 `按需引入`就采用按需引入，如果不行可以采取 `CDN`的方式引入；
* 尽量减少图片资源，使用字体图标或精灵图，对大图使用TinyPng对图片资源进行压缩，并且使用CDN引入图片；
* 代码层面，检查首页代码是否有 `长耗时的同步任务`阻塞了页面的渲染；
* 开启gzip压缩；
* 打包出来的index.html文件中的 `script标签`，使用 `defer异步加载`或者放到 `body`之后；
* 利用webpack等打包工具进行分包，避免首页一次性加载太多资源；

# 3. Webpack

## 3.1 介绍

webpack 是一个模块打包器。webpack 的主要目标是将 JavaScript 文件打包在一起，打包后的文件用于在浏览器中使用，但它也能够胜任转换(transform)、打包(bundle)。

### 1.webpack原理是什么？

核心概念

* entry：一个可执行模块或者库的入口。
* chunk：多个文件组成一个代码块。可以将可执行的模块和他所依赖的模块组合成一个chunk，这是打包。
* loader：文件转换器。例如把es6转为es5，scss转为css等
* plugin：扩展webpack功能的插件。在webpack构建的生命周期节点上加入扩展hook，添加功能。
* output：编译结果文件输出
  构建流程

Webpack 的运⾏流程是⼀个串⾏的过程，从启动到结束会依次执⾏以下流程：

1. 初始化参数：解析webpack配置参数，合并shell传入和webpack.config.js文件配置的参数，形成最后的配置结果。
2. 开始编译：上一步得到的参数初始化compiler对象，注册所有配置的插件，插件监听webpack构建生命周期的事件节点，做出相应的反应，执行对象的 run 方法开始执行编译。
3. 确定入口：从配置的entry入口，开始解析文件构建AST语法树，找出依赖，递归下去。
4. 编译模块：递归中根据文件类型和loader配置，调用所有配置的loader对文件进行转换，再找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理。
5. 完成模块编译：在经过第4步使⽤ Loader 翻译完所有模块后，得到了每个模块被翻译后的最终内容以及它们之间的依赖关系；
6. 输出资源：根据⼊⼝和模块之间的依赖关系，组装成⼀个个包含多个模块的 Chunk，再把每个 Chunk 转换成⼀个单独的⽂件加⼊到输出列表，这步是可以修改输出内容的最后机会；
7. 输出完成：在确定好输出内容后，根据配置确定输出的路径和⽂件名，把⽂件内容写⼊到⽂件系统。

注意：

*在以上过程中，Webpack 会在特定的时间点，⼴播出特定的事件，插件在监听到感兴趣的事件后，会执⾏特定的逻辑。并且插件可以调⽤ Webpack 提供的 API ，改变 Webpack 的运⾏结果。比如UglifyPlugin，会在loader转换递归完，对结果使用UglifyJs压缩，覆盖之前的结果。*

## 3.2 其他构建工具

> 大致了解下就好  ，现在主流的是webpack、rollup、vite

### 1.他们有什么不同？

* 都是前端构建工具，grunt和gulp在早期比较流行，FIS3停止维护了，现在webpack相对来说比较主流，不过一些轻量化的任务，还是会用gulp来处理，比如单独打包CSS文件等。
* grunt和gulp是基于 ***任务**和流*** （Task、Stream）的。类似 **jQuery** ，找到一个（或一类）文件，对其做一系列链式操作，更新流上的数据， 整条**链式操作**构成了一个 **任务** ，多个任务就构成了整个web的构建 **流程** 。
* webpack是基于***入口***的。webpack会自动地**递归解析**入口所需要加载的所有 **资源文件** ，然后用不同的**Loader**来处理不同的文件，用**Plugin**来扩展webpack功能。
* webpack优点是专注于处理模块化的项目，尤其适合单页应用。Webpack的缺点是只能用于采用模块化开发的项目。
* FIS3并没有 **入口** (entry)的概念，在FIS3中，构建流程不单单根据js来，而是分析每一个文件的依赖关系，生成一个资源表‘sourceMap’，你可以根据资源表定义任何的产出规则
* Fis3的**优点**是集成了各种Web开发所需的构建功能，配置简单、开箱即用。其**缺点**是目前官方已经 **不再更新和维护** ，**不支持**最新版本的Node.js。Fis3是一种专注于Web开发的完整解决方案，如果将Grunt、Gulp比作汽车的 **发动机** ，则可以将Fis3比作一辆完整的 **汽车**

### 2.有类似webpack的工具么？

同样是**基于入口**的打包工具还有以下几个：webpack，[rollup](https://link.juejin.cn?target=https%3A%2F%2Fwww.rollupjs.com%2F "https://www.rollupjs.com/")，[parcel](https://link.juejin.cn?target=https%3A%2F%2Fwww.parceljs.cn%2F "https://www.parceljs.cn/")，[vite](https://link.juejin.cn?target=https%3A%2F%2Fvitejs.cn%2F "https://vitejs.cn/")，[snowpack](https://link.juejin.cn?target=http%3A%2F%2Fwww.snowpack.cn%2F "http://www.snowpack.cn/")

从应用场景上来看：

* webpack：适合大型复杂的前端站点构建，尤其是模块化的，单页应用。
* rollup：专门针对类库进行打包，它的优点是小巧而专注。因此现在很多我们熟知的库都都使用它进行打包，比如：Vue、React和three.js等。
* parcel：零配置，傻瓜式。适用于简单的实验室项目，打包出错很难调试。不支持Tree Shaking。更多优点：[传送门](https://link.juejin.cn?target=https%3A%2F%2Fzhuanlan.zhihu.com%2Fp%2F350601275 "https://zhuanlan.zhihu.com/p/350601275")。
* vite：灵活、复杂度适中，未来趋势。开发期间无需打包，越大型体验感越好。
* snowpack与vite类似。

rollup、vite、snowpack，都是基于ESM，开发期间无需构建，浏览器直用。

### 3.vite和webpack的区别？

**Webpack** 是一个打包模块化 JavaScript 的工具，在 Webpack 里一切文件皆模块，通过 Loader 转换文件，通过 Plugin 注入钩子，最后输出由多个模块组合成的文件。Webpack 专注于构建模块化项目。

一切文件：JavaScript、CSS、SCSS、图片、模板，在 Webpack 眼中都是一个个模块

这样的好处是能清晰的描述出各个模块之间的依赖关系，以方便 Webpack 对模块进行组合和打包。 经过 Webpack 的处理，最终会输出浏览器能使用的静态资源。因此 **每次编译都需要重新构建** 。

---

**vite**主要遵循的是使用 **ESM** (Es modules模块)的规范来执行代码，由于现代浏览器基本上都支持了ESM规范，所以在**开发阶段**并不需要将代码打包编译成es5模块，即可 **直接在浏览器上运行** 。

我们只需要从入口文件出发， 在遇到对应的 `import` 语句时，将对应的模块加载到浏览器中就可以了。当项目越大，文件越多时，vite的开发时优势越明显。

vite**热更新**比webpack，**vite**在HRM方面，当某个模块内容改变时，让 ***浏览器直接重新请求该模块即可，而不是像webpack重新将该模块的所有依赖重新编译*** 。

Vite的使用简单，只需执行初始化命令，就可以得到一个预设好的开发环境，开箱即获得一堆功能，包括：CSS预处理、html预处理、异步加载、分包、压缩、HMR等。

使用 **复杂度介于Parcel和Webpack的中间** ，只是暴露了极少数的配置项和plugin接口，既不会像Parcel一样配置不灵活，又不会像Webpack一样需要了解庞大的loader、plugin生态，灵活适中、复杂度适中。

总体来说，Vite在前端构建工具领域上开辟了一条和webpack完全不同的道路，很好地解决了前端开发阶段构建速度慢的问题。

# 6. 大文件如何上传

分片上传
分片上传，就是将所要上传的文件，按照一定的大小，将整个文件分隔成多个数据块（Part）来进行分片上传
上传完之后再由服务端对所有上传的文件进行汇总整合成原始的文件
大致流程如下：

将需要上传的文件按照一定的分割规则，分割成相同大小的数据块；
初始化一个分片上传任务，返回本次分片上传唯一标识；
按照一定的策略（串行或并行）发送各个分片数据块；
发送完成后，服务端根据判断数据上传是否完整，如果完整，则进行数据块合成得到原始文件

断点续传
断点续传指的是在下载或上传时，将下载或上传任务人为的划分为几个部分
每一个部分采用一个线程进行上传或下载，如果碰到网络故障，可以从已经上传或下载的部分开始继续上传下载未完成的部分，而没有必要从头开始上传下载。用户可以节省时间，提高速度
一般实现方式有两种：

服务器端返回，告知从哪开始
浏览器端自行处理

上传过程中将文件在服务器写为临时文件，等全部写完了（文件上传完），将此临时文件重命名为正式文件即可
如果中途上传中断过，下次上传的时候根据当前临时文件大小，作为在客户端读取文件的偏移量，从此位置继续读取文件数据块，上传到服务器从此偏移量继续写入文件即可

## 6.1. 分片上传

前端：

### 6.1.1 读取文件：准备HTML结构，包括：读取本地文件（input类型为file）、上传文件按钮、上传进度。

    监听input的change事件，当选取了本地文件后，打印事件源可得到文件的一些信息：

### 6.1.2 创建切片

    文件的信息包括文件的名字，文件的大小，文件的类型等信息，接下来可以根据文件的大小来进行切片，例如将文件按照1MB或者2MB等大小进行切片操作：

```js
// 创建切片
function createChunk(file, size = 2 * 1024 * 1024) {//两个形参：file是大文件，size是切片的大小2M
    const chunkList = [] // 创建一个空的切片列表数组chunkList
    let cur = 0
    while (cur < file.size) {
        chunkList.push({
               //从 Blob 接口继承了以下方法： Blob.slice([start[, end[, contentType]]])，
                file: file.slice(cur, cur + size)// 这里使用的是Blob接口的Blob.slice()方法
        })
        cur += size
    }
    return chunkList
}
```

### 6.1.3 上传切片

1. 数据处理:

- 需要将切片的数据进行维护成一个包括该文件，文件名，切片名的对象，所以采用FormData对象来进行整理数据。
- FormData 对象用以将数据编译成键值对,可用于发送带键数据，通过调用它的append()方法来添加字段，
- FormData.append()方法会将字段类型为数字类型的转换成字符串
- （字段类型可以是 Blob、File或者字符串：如果它的字段类型不是 Blob 也不是 File，则会被转换成字符串类）。

2. 并发请求:

- 每一个切片都分别作为一个请求，只有当这4个切片都传输给后端了，
- 即四个请求都成功发起，才上传成功，
- 使用Promise.all()保证所有的切片都已经传输给后端。

```js
//数据处理
async function uploadFile(list) {
    const requestList = list.map(({file,fileName,index,chunkName}) => {
        const formData = new FormData() // 创建表单类型数据
        formData.append('file', file)//该文件
        formData.append('fileName', fileName)//文件名
        formData.append('chunkName', chunkName)//切片名
        return {formData,index}
    })
        .map(({formData,index}) =>axiosRequest({
            method: 'post',
            url: 'http://localhost:3000/upload',//请求接口，要与后端一一一对应
            data: formData
        })
            .then(res => {
                console.log(res);
                //显示每个切片上传进度
                let p = document.createElement('p')
                p.innerHTML = `${list[index].chunkName}--${res.data.message}`
                document.getElementById('progress').appendChild(p)
            })
        )
        await Promise.all(requestList)//保证所有的切片都已经传输完毕
}

//请求函数
function axiosRequest({method = "post",url,data}) {
    return new Promise((resolve, reject) => {
        const config = {//设置请求头
            headers: 'Content-Type:application/x-www-form-urlencoded',
        }
        //默认是post请求，可更改
        axios[method](url,data,config).then((res) => {
            resolve(res)
        })
    })
}

// 文件上传
upload.addEventListener('click', () => {
    const uploadList = chunkList.map(({file}, index) => ({
        file,
        size: file.size,
        percent: 0,
        chunkName: `${files.name}-${index}`,
        fileName: files.name,
        index
    }))
    //发请求，调用函数
    uploadFile(uploadList)

})

```

### 6.1.4 后端接收切片

```js
//app.js
const http = require('http')
const multiparty = require('multiparty')/* 1. 引入multiparty中间件，处理FormData对象的中间件 */
const path = require('path')
const fse = require('fs-extra')//文件处理模块

const server = http.createServer() // 创建一个
const UPLOAD_DIR = path.resolve(__dirname, '.', 'qiepian')/* 2. 读取根目录，创建一个根文件夹qiepian存放切片 */

server.on('request', async (req, res) => {
    /* 3. 处理跨域问题，允许所有的请求头和请求源 */
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', '*')

    if (req.url === '/upload') { //前端访问的地址正确
        const multipart = new multiparty.Form() // 解析FormData对象
        multipart.parse(req, async (err, fields, files) => {
            if (err) { //解析失败
                return
            }
            console.log('fields=', fields);
            console.log('files=', files);
            
            const [file] = files.file
            const [fileName] = fields.fileName
            const [chunkName] = fields.chunkName

            /* 4. 解析数据成功，在qiepian文件夹创建一个新的文件夹，存放接收到的所有切片 */
            const chunkDir = path.resolve(UPLOAD_DIR, `${fileName}-chunks`)
            if (!fse.existsSync(chunkDir)) { //文件夹不存在，新建该文件夹
                await fse.mkdirs(chunkDir)
            }

            /* 5. 通过fse.move(filePath,fileName)将切片移入${fileName}-chunks文件夹。 */
            await fse.move(file.path, `${chunkDir}/${chunkName}`)
            /* 6. 向前端输出 */
            res.end(JSON.stringify({ 
                code: 0,
                message: '切片上传成功'
            }))
        })
    }
})

server.listen(3000, () => {
    console.log('服务已启动');
})

```

### 6.1.5 后端合并切片

- 一：前端得到后端返回的上传成功信息后，通知后端合并切片
- 二：后端接收到合并的数据，创建新的路由进行合并，

```js

// 通知后端去做切片合并
function merge(size, fileName) {
    axiosRequest({
        method: 'post',
        url: 'http://localhost:3000/merge',//后端合并请求
        data: JSON.stringify({
            size,
            fileName
        }),
    })
}

//调用函数，当所有切片上传成功之后，通知后端合并
await Promise.all(requestList)
merge(files.size, files.name)

```

```js

if (req.url === '/merge') { // 该去合并切片了
/* 1. 解析POST请求传递的参数,将每个切片请求传递的数据进行拼接,转换为JSON对象 */
        const data = await resolvePost(req)
        const {
            fileName,
            size
        } = data
/* 2. 接下来该去合并了，拿到上个步骤解析成功后的数据进行解构，通过path.resolve获取每个切片所在的路径； */
        const filePath = path.resolve(UPLOAD_DIR, fileName)//获取切片路径
/* 3. 自定义合并函数mergeFileChunk */
        await mergeFileChunk(filePath, fileName, size)
        res.end(JSON.stringify({
            code: 0,
            message: '文件合并成功'
        }))
}




/*
3. 自定义合并函数mergeFileChunk，只要传入切片路径，切片名字和切片大小，就真的将所有的切片进行合并。在此之前需要将每个切片转换成流stream对象的形式进行合并，自定义函数pipeStream，目的是将切片转换成流对象，在这个函数里面创建可读流，读取所有的切片，监听end事件，所有的切片读取完毕后，销毁其对应的路径，保证每个切片只被读取一次，不重复读取，最后将汇聚所有切片的可读流汇入可写流；
*/
async function mergeFileChunk(filePath, fileName, size) {
    const chunkDir = path.resolve(UPLOAD_DIR, `${fileName}-chunks`)

    let chunkPaths = await fse.readdir(chunkDir)
    chunkPaths.sort((a, b) => a.split('-')[1] - b.split('-')[1])

    const arr = chunkPaths.map((chunkPath, index) => {
/* 4. 切片被读取成流对象，可读流被汇入可写流 */
        return pipeStream(
            path.resolve(chunkDir, chunkPath),
/* 5. 那么在指定的位置通过createWriteStream创建可写流 */
            fse.createWriteStream(filePath, {
                start: index * size,
                end: (index + 1) * size
            })
        )
    })
/* 6. 最后， 同样使用Promise.all()的方法，保证所有切片都被读取， */
    await Promise.all(arr)//保证所有的切片都被读取
}


// 结果转成json数据
function resolvePost(req) {
    // 解析参数
    return new Promise(resolve => {
        let chunk = ''
        req.on('data', data => { //req接收到了前端的数据
            chunk += data //将接收到的所有参数进行拼接
        })
        req.on('end', () => {
            resolve(JSON.parse(chunk))//将字符串转为JSON对象
        })
    })
}

// 将切片转换成流进行合并
function pipeStream(path, writeStream) {
    return new Promise(resolve => {
        // 创建可读流，读取所有切片
        const readStream = fse.createReadStream(path)
        readStream.on('end', () => {
            fse.unlinkSync(path)// 读取完毕后，删除已经读取过的切片路径
            resolve()
        })
        readStream.pipe(writeStream)//将可读流流入可写流
    })
}



```

## 6.2. 断点续传

读取文件内容：

```js
const input = document.querySelector('input');
input.addEventListener('change', function() {
    var file = this.files[0];
});
```

可以使用md5实现文件的唯一性

```js
const md5code = md5(file);
```

然后开始对文件进行分割

```js
var reader = new FileReader();
reader.readAsArrayBuffer(file);
reader.addEventListener("load", function(e) {
    //每10M切割一段,这里只做一个切割演示，实际切割需要循环切割，
    var slice = e.target.result.slice(0, 10*1024*1024);
});
```

h5上传一个（一片）

```js
const formdata = new FormData();
formdata.append('0', slice);
//这里是有一个坑的，部分设备无法获取文件名称，和文件类型，这个在最后给出解决方案
formdata.append('filename', file.filename);
var xhr = new XMLHttpRequest();
xhr.addEventListener('load', function() {
    //xhr.responseText
});
xhr.open('POST', '');
xhr.send(formdata);
xhr.addEventListener('progress', updateProgress);
xhr.upload.addEventListener('progress', updateProgress);

function updateProgress(event) {
    if (event.lengthComputable) {
        //进度条
    }
}
```

这里给出常见的图片和视频的文件类型判断

```js
function checkFileType(type, file, back) {
/**
* type png jpg mp4 ...
* file input.change=> this.files[0]
* back callback(boolean)
*/
    var args = arguments;
    if (args.length != 3) {
        back(0);
    }
    var type = args[0]; // type = '(png|jpg)' , 'png'
    var file = args[1];
    var back = typeof args[2] == 'function' ? args[2] : function() {};
    if (file.type == '') {
        // 如果系统无法获取文件类型，则读取二进制流，对二进制进行解析文件类型
        var imgType = [
            'ff d8 ff', //jpg
            '89 50 4e', //png

            '0 0 0 14 66 74 79 70 69 73 6F 6D', //mp4
            '0 0 0 18 66 74 79 70 33 67 70 35', //mp4
            '0 0 0 0 66 74 79 70 33 67 70 35', //mp4
            '0 0 0 0 66 74 79 70 4D 53 4E 56', //mp4
            '0 0 0 0 66 74 79 70 69 73 6F 6D', //mp4

            '0 0 0 18 66 74 79 70 6D 70 34 32', //m4v
            '0 0 0 0 66 74 79 70 6D 70 34 32', //m4v

            '0 0 0 14 66 74 79 70 71 74 20 20', //mov
            '0 0 0 0 66 74 79 70 71 74 20 20', //mov
            '0 0 0 0 6D 6F 6F 76', //mov

            '4F 67 67 53 0 02', //ogg
            '1A 45 DF A3', //ogg

            '52 49 46 46 x x x x 41 56 49 20', //avi (RIFF fileSize fileType LIST)(52 49 46 46,DC 6C 57 09,41 56 49 20,4C 49 53 54)
        ];
        var typeName = [
            'jpg',
            'png',
            'mp4',
            'mp4',
            'mp4',
            'mp4',
            'mp4',
            'm4v',
            'm4v',
            'mov',
            'mov',
            'mov',
            'ogg',
            'ogg',
            'avi',
        ];
        var sliceSize = /png|jpg|jpeg/.test(type) ? 3 : 12;
        var reader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.addEventListener("load", function(e) {
            var slice = e.target.result.slice(0, sliceSize);
            reader = null;
            if (slice && slice.byteLength == sliceSize) {
                var view = new Uint8Array(slice);
                var arr = [];
                view.forEach(function(v) {
                    arr.push(v.toString(16));
                });
                view = null;
                var idx = arr.join(' ').indexOf(imgType);
                if (idx > -1) {
                    back(typeName[idx]);
                } else {
                    arr = arr.map(function(v) {
                        if (i > 3 && i < 8) {
                            return 'x';
                        }
                        return v;
                    });
                    var idx = arr.join(' ').indexOf(imgType);
                    if (idx > -1) {
                        back(typeName[idx]);
                    } else {
                        back(false);
                    }

                }
            } else {
                back(false);
            }

        });
    } else {
        var type = file.name.match(/.(\w+)$/)[1];
        back(type);
    }
}
```

调用方法如下

```js
checkFileType('(mov|mp4|avi)',file,function(fileType){
    // fileType = mp4,
    // 如果file的类型不在枚举之列，则返回false
});
```

上面上传文件的一步，可以改成：

```js
formdata.append('filename', md5code+'.'+fileType);
```

有了切割上传后，也就有了文件唯一标识信息，断点续传变成了后台的一个小小的逻辑判断
后端主要做的内容为：根据前端传给后台的md5值，到服务器磁盘查找是否有之前未完成的文件合并信息（也就是未完成的半成品文件切片），取到之后根据上传切片的数量，返回数据告诉前端开始从第几节上传
如果想要暂停切片的上传，可以使用XMLHttpRequest的 abort方法

# 3. 无感登录

    1. 在响应器中进行拦截， 判断token返回过期后， 调用刷新token的接口
      2. 后端返回过期事件， 前端判断token过期时间， 调用刷新token接口
      3. 写定时器， 定时刷新token接口（太浪费资源）

    流程
        1. 登陆成功后保存token 和 refresh
        2. 在响应拦截器中对401 状态码引入刷新token的api方法调用
        3. 替换保存本地的新token
        4. 把错误对象里的token替换
        5. 再次发送未完成得到请求
        6. 如果refresh_token过期了， 判断是否过期， 过期就清除所有token重新登陆

# 4. 单点登录？如何实现？

## 4.1 单点登录是什么

单点登录（Single Sign On），简称为 SSO，是目前比较流行的企业业务整合的解决方案之一
SSO的定义是在多个应用系统中，用户只需要登录一次就可以访问所有相互信任的应用系统
SSO 一般都需要一个独立的认证中心（passport），子系统的登录均得通过passport，子系统本身将不参与登录操作
当一个系统成功登录以后，passport将会颁发一个令牌给各个子系统，子系统可以拿着令牌会获取各自的受保护资源，为了减少频繁认证，各个子系统在被passport授权以后，会建立一个局部会话，在一定时间内可以无需再次向passport发起认证

上图有四个系统，分别是Application1、Application2、Application3、和SSO，当Application1、Application2、Application3需要登录时，将跳到SSO系统，SSO系统完成登录，其他的应用系统也就随之登录了
举个例子
淘宝、天猫都属于阿里旗下，当用户登录淘宝后，再打开天猫，系统便自动帮用户登录了天猫，这种现象就属于单点登录

## 4.2 如何实现

同域名下的单点登录
cookie的domain属性设置为当前域的父域，并且父域的cookie会被子域所共享。path属性默认为web应用的上下文路径
利用 Cookie 的这个特点，没错，我们只需要将Cookie的domain属性设置为父域的域名（主域名），同时将 Cookie的path属性设置为根路径，将 Session ID（或 Token）保存到父域中。这样所有的子域应用就都可以访问到这个Cookie
不过这要求应用系统的域名需建立在一个共同的主域名之下，如 tieba.baidu.com 和 map.baidu.com，它们都建立在 baidu.com这个主域名之下，那么它们就可以通过这种方式来实现单点登录

## 4.2.1 不同域名下的单点登录(一)

如果是不同域的情况下，Cookie是不共享的，这里我们可以部署一个认证中心，用于专门处理登录请求的独立的 Web服务
用户统一在认证中心进行登录，登录成功后，认证中心记录用户的登录状态，并将 token 写入 Cookie（注意这个 Cookie是认证中心的，应用系统是访问不到的）
应用系统检查当前请求有没有 Token，如果没有，说明用户在当前系统中尚未登录，那么就将页面跳转至认证中心
由于这个操作会将认证中心的 Cookie 自动带过去，因此，认证中心能够根据 Cookie 知道用户是否已经登录过了
如果认证中心发现用户尚未登录，则返回登录页面，等待用户登录
如果发现用户已经登录过了，就不会让用户再次登录了，而是会跳转回目标 URL，并在跳转前生成一个 Token，拼接在目标URL 的后面，回传给目标应用系统
应用系统拿到 Token之后，还需要向认证中心确认下 Token 的合法性，防止用户伪造。确认无误后，应用系统记录用户的登录状态，并将 Token写入Cookie，然后给本次访问放行。（注意这个 Cookie 是当前应用系统的）当用户再次访问当前应用系统时，就会自动带上这个 Token，应用系统验证 Token 发现用户已登录，于是就不会有认证中心什么事了
此种实现方式相对复杂，支持跨域，扩展性好，是单点登录的标准做法

## 4.2.2 不同域名下的单点登录(二)

可以选择将 Session ID （或 Token ）保存到浏览器的 LocalStorage 中，让前端在每次向后端发送请求时，主动将LocalStorage的数据传递给服务端
这些都是由前端来控制的，后端需要做的仅仅是在用户登录成功后，将 Session ID（或 Token）放在响应体中传递给前端
单点登录完全可以在前端实现。前端拿到 Session ID（或 Token ）后，除了将它写入自己的 LocalStorage 中之外，还可以通过特殊手段将它写入多个其他域下的 LocalStorage 中
关键代码如下：

```js
// 获取 token
var token = result.data.token;
 
// 动态创建一个不可见的iframe，在iframe中加载一个跨域HTML
var iframe = document.createElement("iframe");
iframe.src = "http://app1.com/localstorage.html";
document.body.append(iframe);
// 使用postMessage()方法将token传递给iframe
setTimeout(function () {
    iframe.contentWindow.postMessage(token, "http://app1.com");
}, 4000);
setTimeout(function () {
    iframe.remove();
}, 6000);
 
// 在这个iframe所加载的HTML中绑定一个事件监听器，当事件被触发时，把接收到的token数据写入localStorage
window.addEventListener('message', function (event) {
    localStorage.setItem('token', event.data)
}, false);
```

前端通过 iframe+postMessage() 方式，将同一份 Token 写入到了多个域下的 LocalStorage 中，前端每次在向后端发送请求之前，都会主动从 LocalStorage 中读取Token并在请求中携带，这样就实现了同一份Token 被多个域所共享
此种实现方式完全由前端控制，几乎不需要后端参与，同样支持跨域

## 4.3 流程

单点登录的流程图如下所示：

- 用户访问系统1的受保护资源，系统1发现用户未登录，跳转至sso认证中心，并将自己的地址作为参数
- sso认证中心发现用户未登录，将用户引导至登录页面
- 用户输入用户名密码提交登录申请
- sso认证中心校验用户信息，创建用户与sso认证中心之间的会话，称为全局会话，同时创建授权令牌
- sso认证中心带着令牌跳转会最初的请求地址（系统1）
- 系统1拿到令牌，去sso认证中心校验令牌是否有效
- sso认证中心校验令牌，返回有效，注册系统1
- 系统1使用该令牌创建与用户的会话，称为局部会话，返回受保护资源
- 用户访问系统2的受保护资源
- 系统2发现用户未登录，跳转至sso认证中心，并将自己的地址作为参数
- sso认证中心发现用户已登录，跳转回系统2的地址，并附上令牌
- 系统2拿到令牌，去sso认证中心校验令牌是否有效
- sso认证中心校验令牌，返回有效，注册系统2
- 系统2使用该令牌创建与用户的局部会话，返回受保护资源

用户登录成功之后，会与sso认证中心及各个子系统建立会话，用户与sso认证中心建立的会话称为全局会话
用户与各个子系统建立的会话称为局部会话，局部会话建立之后，用户访问子系统受保护资源将不再通过sso认证中心
全局会话与局部会话有如下约束关系：

局部会话存在，全局会话一定存在
全局会话存在，局部会话不一定存在
全局会话销毁，局部会话必须销毁

# 4. 精灵图和base64 区别

    精灵图： 多张小图整合到一张大图上，利用定位的一些属性把小图显示在页面上
            访问页面时减少请求，提高加载速度
      base64: 传输8bit字节代码的编码方式，
            把原本二进制形式转为64个字符的单位，
            最后组成字符串
            和html css一起下载到浏览器中，减少跨域问题

# 5. svg格式

    基于XML语法格式的图像格式
      可以缩放矢量图
      其他图像是基于像素的
      SVG是对图像形状的描述
      体积小
      不管放大多少倍， 都不会失帧
      1. 可以直接插入页面`<svg></svg>`
      2. 可以被文件引入： `<img src="pic.svg" />`
      3. 可以转为base64引入页面
