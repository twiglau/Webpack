# Git commit 规范和 Changelog 生成  
* 良好的 Git commit 规范优势:  
> 加快 Code Review 的流程  
> 根据 Git Commit 的元数据生成 Changelog  
> 后续维护者可以知道 Feature 被修改的原因  

* 技术方案  & Git 提交格式  
> 统一团队 Git commit 日志标准, 便于后续代码 review 和 版本发布  
> 使用angular的 Git commit 日志作为基本规范  
>> 提交类型限制为: feat, fix, docs, style, refactor, pref, test, chore, revert 等  
>> 提交信息分为两部分: 标题(首字母不大写, 末尾不要标点), 主体内容(正常的描述信息即可)  
> 日志提交时友好的类型选择提示 : 使用 commitize 工具  
> 不符合要求格式的日志拒绝提交的保障机制  
>> 使用 validate-commit-msg 工具  
>> 需要同时在客户端, gitlab server hook 做  
> 统一 changelog 文档信息生成 : 使用 conventional-changelog 工具  


# 提交格式要求  
```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```  
对格式的说明如下:  
* type 代表某次提交的类型, 比如是修复一个bug还是增加一个新的feature,所有的type类型如下:  
* feat: 增加feature  
* fix: 修复bug  
* docs: 仅仅修改了文档, 比如 README,CHANGELOG, CONTRIBUTE 等等  
* style: 仅仅修改了空格, 格式缩进 等等, 不改变代码逻辑  
* refactor: 代码重构, 没有加新功能或者修复bug  
* perf: 优化相关, 比如提升性能, 体验  
* test: 测试用例, 包括单元测试, 集成测试等  
* chore: 改变构建流程, 或者增加依赖库, 工具等  
* revert: 回滚到上一个版本  

# 本地开发阶段增加 precommit 钩子  
* 安装 husky  
```
npm install husky --save-dev  
```
* 通过 commitmsg 钩子校验信息  
```
"scripts": {
    "commitmsg": "validate-commit-msg",
    "changelog": "conventional-changelog -p angular -i CHANGELOG.md -s -r O"
},
"devDependencies": {
    "validate-commit-msg": "^2.11.1",
    "conventional-changelog-cli": "^1.2.0",
    "husky": "^0.13.1"
}
```