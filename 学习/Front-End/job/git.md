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

      ```shell
      查看文件状态： git status -s
      ```
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

