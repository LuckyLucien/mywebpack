const fs = require('fs')
const babylon = require('babylon')
const traverse = require('babel-traverse').default
const {transformFromAst} = require('babel-core')

module.exports = {
    getAST:(path)=>{
        const source = fs.readFileSync(path,'utf-8')

        return babylon.parse(source,{
            sourceType: 'module'
        })
    },
    getDependencies:(ast) =>{
        const dependencies = []

        traverse(ast,{
            // 分析import 语句
            ImportDeclaration: ({node}) => {
                dependencies.push(node.source.value)
            }
        })

        return dependencies
    },
    transform:(ast) =>{
        const {code} = transformFromAst(ast,null,{
            //es2015,es2016,es2017的语法都可以借助它来解析
            presets:['env']
        })

        return code
    }
}