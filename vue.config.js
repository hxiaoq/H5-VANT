'use strict'
const path = require('path')
const defaultSettings = require('./src/settings.js')

function resolve(dir) {
    return path.join(__dirname, dir)
}

const name = defaultSettings.title || 'vue vant Template' // page title

const vantTheme = path.resolve(__dirname, './src/assets/less/variables.less')
    // If your port is set to 80,
    // use administrator privileges to execute the command line.
    // For example, Mac: sudo npm run
    // You can change the port by the following methods:
    // port = 9528 npm run dev OR npm run dev --port = 9528
const port = process.env.port || process.env.npm_config_port || 9528 // dev port

// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
    /**
     * You will need to set publicPath if you plan to deploy your site under a sub path,
     * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
     * then publicPath should be set to "/bar/".
     * In most cases please use '/' !!!
     * Detail: https://cli.vuejs.org/config/#publicpath
     */
    publicPath: './',
    outputDir: 'dist',
    assetsDir: 'static',
    lintOnSave: false,
    productionSourceMap: false,
    devServer: {
        port: port,
        open: true,
        overlay: {
            warnings: false,
            errors: true
        },
        proxy: {
            [process.env.VUE_APP_BASE_API1]: {
                target: 'http://192.168.0.200:9999',
                changeOrigin: true,
                pathRewrite: {
                    ['^' + process.env.VUE_APP_BASE_API1]: process.env.VUE_APP_BASE_API1
                }
            },
            [process.env.VUE_APP_BASE_API2]: {
                target: 'http://192.168.0.200:9999',
                changeOrigin: true,
                pathRewrite: {
                    ['^' + process.env.VUE_APP_BASE_API2]: process.env.VUE_APP_BASE_API2
                }
            },
            [process.env.VUE_APP_BASE_API3]: {
                target: 'http://192.168.0.200:9999',
                changeOrigin: true,
                pathRewrite: {
                    ['^' + process.env.VUE_APP_BASE_API3]: process.env.VUE_APP_BASE_API3
                }
            }
        },
        // after: require('./mock/mock-server.js')
    },
    configureWebpack: {
        // provide the app's title in webpack's name field, so that
        // it can be accessed in index.html to inject the correct title.
        name: name,
        resolve: {
            alias: {
                '@': resolve('src')
            }
        }
    },
    chainWebpack(config) {
        // it can improve the speed of the first screen, it is recommended to turn on preload
        config.plugin('preload').tap(() => [{
            rel: 'preload',
            // to ignore runtime.js
            // https://github.com/vuejs/vue-cli/blob/dev/packages/@vue/cli-service/lib/config/app.js#L171
            fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
            include: 'initial'
        }])

        // when there are many pages, it will cause too many meaningless requests
        config.plugins.delete('prefetch')

        // set svg-sprite-loader
        config.module
            .rule('svg')
            .exclude.add(resolve('src/icons'))
            .end()
        config.module
            .rule('icons')
            .test(/\.svg$/)
            .include.add(resolve('src/icons'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            })
            .end()

        config.when(process.env.NODE_ENV !== 'development', (config) => {
            config
                .plugin('ScriptExtHtmlWebpackPlugin')
                .after('html')
                .use('script-ext-html-webpack-plugin', [{
                    // `runtime` must same as runtimeChunk name. default is `runtime`
                    inline: /runtime\..*\.js$/
                }])
                .end()
            config.optimization.splitChunks({
                    chunks: 'all',
                    cacheGroups: {
                        libs: {
                            name: 'chunk-libs',
                            test: /[\\/]node_modules[\\/]/,
                            priority: 10,
                            chunks: 'initial' // only package third parties that are initially dependent
                        },
                        commons: {
                            name: 'chunk-commons',
                            test: resolve('src/components'), // can customize your rules
                            minChunks: 3, //  minimum common number
                            priority: 5,
                            reuseExistingChunk: true
                        }
                    }
                })
                // https:// webpack.js.org/configuration/optimization/#optimizationruntimechunk
            config.optimization.runtimeChunk('single')
        })
    },
    css: {
        loaderOptions: {
            less: {
                // 若 less-loader 版本小于 6.0，请移除 lessOptions 这一级，直接配置选项。
                lessOptions: {
                    modifyVars: {
                        // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
                        hack: `true; @import "${vantTheme}";`
                    }
                }
            }
        }
    }

}