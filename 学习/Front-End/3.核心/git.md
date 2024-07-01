# 0. Git 下载

```shell
      git -v (查看版本号)
      git config --global user.name "xxx"
      git config --global user.email "xxx"
      git config --list （查看git清单）
```

# 1. Git 仓库

```shell
      git init （初始化仓库）
```

# 2. git忽略文件.gitignore

文件里面写入文件名，该文件就会被Git忽略

# 3. Git三区域

## 1. 工作区：实际开发时操作的文件夹

    Git文件状态
      未跟踪：U-红色-未被Git管理过
      新添加：A-绿色-新文件，从未被Git管理过
      已跟踪：M-----已经修改的文件

    ``shell       查看文件状态： git status -s       ``

## 2. 暂存区：保存之前的准备区域（暂存改动过的文件）

    ```shell
      查看暂存区： git ls-files

    放所有改动过的文件：git add .
      放入暂存区：      git add page/login/index.html
      恢复成之前的内容： git restore page/login/index.css
      移出暂存区：      git rm --cached page/login/index.css

    ```

## 3. 版本库：提交并保存暂存区的 内容，产生版本快照

    ```shell
      保存提交版本库：git commit -m "1.登录页面-标签部分准备"

    查看版本历史：     git log --oneline
      查看版本日志：     git reflog --oneline

    回退版本（保留）git reset --soft
      回退版本（覆盖）git reset --hard
      回退版本：     git reset --mixed
      ```

# 4. git分支

### 新开发需求 与 修改bug

```shell
      查看分支：        git branch
      切换分支：        git checkout
      合并分支：        git merge 
      删除分支：        git branch -d login-bug

      发布分支：        git push
      拉取分支：        git pull

      签入
      签出
```

# 5. git stash 暂存改动

## 场景1：在当前分支A 修改分支B 的bug ?

```shell
      git stash
      git checkout B
      ---  修改 B 的 bug --- 
      git checkout A
      git stash pop
```

## 场景2：代码开发完毕准备提交，避免他人已提交代码而起冲突

```shell
      git stash
      git pull
      git stash pop
      --- 若他人已经提交代码，确认代码没冲突 ---
      git commit
      git push
```

# 6. 开发新功能 流程

```shell
## 准备开发
git pull origin main  --远程拉取
git checkout -b new-feature --创建新分支
git push -u origin fix-dzq-20240218-style --先在远程推一次，确保有这个分支
## 正在开发
git add modified-file --暂存代码
git commit -m "An informative commit message" --提交代码
## 合并新功能
git rebase -i HEAD~n --合并所有提交记录（eqx不让用）
git checkout main --切换为主分支
git merge new-feature --在主分支上，合并新功能
## 推送仓库
git push origin main --推送到远程仓库

```


# 7. git fetch和git pull的区别

`git fetch`只会拉取远程的内容分支到本地，但是 `不会自动合并`，是否合并取决于用户的操作。

而 `git pull`会拉取远程对应分支的内容到本地，并且与本地分支 `进行合并`，git pull相当于 `git fetch + git merge`。

# 8. git rebase和git merge的区别

`git rebase`也可以合并代码，如果把提交记录当作一条线时，当在a分支上使用git rebase b时，会以 `b分支的最后一个commit为基点`，然后将 `a分支上与b分支有差异的commit`向上延伸。也可以理解为在b分支最后一个commit之后 `又提交了n个commit`。

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c4327bd17b394d768647efdbff81289a~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=583&h=145&s=14054&e=png&b=2a2e36)

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a2eb974163064bae927478a97d26fe8a~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=592&h=142&s=13816&e=png&b=2a2e36)

此时有test和test1两个分支，在test分支上使用 `git rebase feature/test1`：

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/80ac48645eb84a7e9181c0105a6354cf~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=661&h=164&s=19461&e=png&b=292d35)

`get merge`则不同，get merge会将两个分支进行 `合并`，两条分支线在合并处会 `产生一个交点并新增一条commit记录`。

因此，如果我们想表明某个分支是通过合并进来的，就使用git merge，如果我们想让两个分支进行合并，但是又希望分支线保持一条直线，可以使用git rebase或git cherry-pick的方式进行合并。

### git pull --rebase

`git pull --rebase`一般用于多人协作时拉取远程代码，如果直接使用git pull，可能远程和本地都有提交，此时代码就会冲突。如果使用 `git pull --rebase`，就会先将远程的代码拉取到暂存区，然后以本地最新代码为基准，如果远程有改动的代码，就会在当前基准上创建新的commit。

# 9. 如何回退提交

### reset

可以通过 `git reset [ --soft | --mixed | --hard ] [< commitid >]`的方式进行代码git回退。

* 当参数为 `soft`时，会保留回退位置的commit之后的代码，并且为暂存状态；
* 当参数为 `mixed`时，会保留回退位置的commit之后的代码，但是没有暂存；
* 当参数为 `hard`时，不会保留回退位置的commit之后的代码；

### revert

`git revert`不会像 `git reset`一样，将某个commit之后的commit全都清除，它的作用为 `修改某一次commit`，然后 `产生一个新的commit`。

比如有3个commit，分别为 `a、b、c`，当执行 `git revert b`时，让用户选择是否保留 `commit c以及commit c的代码`，最终会生成一个 `Revert commit`。

# 10. 谈谈git flow

`git flow`是git官方推崇的一种 `工作流`，在大型团队合作项目中，如果能落实git flow的话，能够给团队合作带来很大提升。

git flow中规定了有 `五种分支`，分别为 `master`、`develop`、`hotfix`、`release`、`feature`。

* `master`：该分支是主分支，作为 `发布分支`，只接收hotfix和release的合并；
* `release`：该分支为预发布分支，作为 `提测分支`，由develop分支拉取，最终合并进master；
* `hotfix`：该分支为bug修复分支，当有线上bug时，由master分支拉取hotfix进行修改，最终合并给master；
* `develop`：该分支作为开发分支，开发新需求时，以该分支为基准，拉取feature分支，feature合并之后，由develop拉取release进行提测；
* `feature`：该分支作为需求分支，每一个独立的需求单独拉取feature，开发完成之后合并进develop。

在实际工作中应该视情况而定，如果项目较繁杂，人员较多，可以使用 `五分支模型`，如果较少时，可以变成 `三分支`等。

