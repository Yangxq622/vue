let Ext = require("extract-text-webpack-plugin")
let Hwp = require("html-webpack-plugin")

module.exports = {
    entry: __dirname + "/src/main.js",
    output: {
        path: __dirname + "/dist/",
        filename: "app.js"
    },
    devtool: "source-map",
    devServer: {
        contentBase: __dirname + "/dist/",
        host:"192.168.52.92",
        port: 3000,
        inline: true,
        proxy: { //配置http代理
            "/zhuiszhu": { //key的值代表以该值为开头的路径会被转发到一下服务器
                target: "http://192.168.52.67",// http转发的目标服务器
                secure: false
            }
        }
    },
    resolve: {//别名
        alias: {
            "vue": "vue/dist/vue.js"
        }
    },
    module: {
        rules: [
            { test: /\.css$/, loader: Ext.extract("css-loader") },
            { test: /\.less$/, loader: Ext.extract("css-loader!less-loader") },
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }, //将es6语法解析成es5
            { test: /\.html$/, loader: "string-loader" },
            { test: /\.(woff|svg|eot|ttf)\??.*$/, loader: "url-loader?name=fonts/[name].[md5:hash:hex:7].[ext]" }
        ]
    },
    plugins: [
        new Ext("app.css"),
        new Hwp({
            template: "src/index.html",
            filename: "index.html",
            inject: true
        })
    ]
}