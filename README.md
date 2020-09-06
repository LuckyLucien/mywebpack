# mywebpack
A simple webpack developed by myself is for mastering webpack better.


# mywebpack实现的功能
### 1.可以将ES6语法转换成ES5语法
- 通过`babylon`生成AST
- 通过`babel-core`将AST重新生成源代码
### 2.可以分析模块之间的依赖关系
- 通过`babel-travere`的importDeclaration方法获取依赖属性
### 3.生成js文件可以在浏览器中运行


# 文件说明
### /lib/parser.js
- 将代码解析成AST语法树，再将AST最终转换成代码。完成ES6转换成ES5。
- 分析依赖  

### /lib/compiler.js
- 模块的构建
- 最后文件的输出

### /lib/test.js
- 开发过程中的测试文件，可删掉

### /dist
- 简单起见，dist目录是自己手动新建的，index.html和main.js也是
- main.js内代码是自动构建生成的，可在浏览器内运行的es5代码

# 实现过程中需要的包安装说明：
- 转换AST用到了babylon,需要安装一下：`npm i babylon -S`
- 分析依赖用到了babel-traverse,安装：`npm i babel-traverse -S`
- 将AST转换成源码，借助了babel-core,安装：`npm i babel-core -S`
- es2015,es2016,es2017的语法都可以借助env来解析,安装：`npm i @babel/preset-env -S` 和 `npm i babel-preset-env -S`

### How to run
1. 清空 main.js 文件中代码，以便查看运行效果
2. 命令行输入`npm run build`或者`node lib/index.js`
3. 查看main.js，已生成想要的js代码