# 本地开发阶段增加 precommit 钩子  
* 安装 husky  
`npm install husky --save-dev`  
* 增加 npm script, 通过 lint-staged 增量检查修改的文件  
```
"scripts": {
    "precommit": "lint-staged"
},
"lint-staged": {
    "linters": {
        "*.{js,scss}": ["eslint-fix","git add"]
    }
}
```

# 方案二: webpack 与 ESLint 集成  
* 使用 eslint-loader, 构建时检查 JS 规范  
```
module.exports = {
    module: {
        rules: [
            test: /\.js$/,
            exclude: /node_modules/,
            use: [
                "babel-loader",
                "eslint-loader"
            ]
        ]
    }
};
```