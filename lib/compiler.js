const { getAST, getDependencies, transform } = require('./parser')
const path = require('path')
const fs = require('fs')

module.exports = class Compiler{

    constructor(options) {
        const { entry, output } = options

        this.entry = entry
        this.output = output
        this.modules = [] // 构建好的模块的信息都存放在this.modules中
    }

    // 构建入口
    run() {
        const entryModule = this.buildModule(this.entry,true) // 需要ast

        this.modules.push(entryModule)

        // 遍历处理依赖
        this.modules.map((_module)=>{
            _module.dependencies.map((dependency)=>{
                this.modules.push(this.buildModule(dependency))
            })
        })

        this.emitFiles()
    }

    buildModule(filename,isEntry) {
        let ast

        if(isEntry){
            ast = getAST(filename) //通过绝对路径获取，如果是入口文件已经是绝对路径了
        }else{
            const absolutePath = path.join(process.cwd(),'./src',filename) //将相对路径转换成等绝对路径
            ast = getAST(absolutePath)
        }

        return {
            filename,
            dependencies: getDependencies(ast),
            source: transform(ast)
        }
    }

    emitFiles() {
        //把文件输出，关注两块：1.把文件输出到哪里,2.把代码构建出来,做个自己的模块包裹，类似于webpack的模块机制__webpack_require__
        const outputPath = path.join(this.output.path,this.output.filename)

        let modules = ''

        this.modules.map((_module)=>{
            modules += `'${_module.filename}': function (require,module,exports) {${_module.source}},`
        })

        const bundle = `(function(modules){
            function require(filename) {
                var fn = modules[filename]
                var module = {exports:{}}

                fn(require,module,module.exports)

                return module.exports
            }

            require('${this.entry}')
        })({${modules}})`

        fs.writeFileSync(outputPath,bundle,'utf-8')
    }
}