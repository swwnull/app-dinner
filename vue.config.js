const path = require('path')
const resolve = (dir) => path.join(__dirname, '.', dir);

module.exports = {
  // 部署应用包时的基本 URL
  publicPath: process.env.NODE_ENV === 'production'
  ? './'
  : '/',
  productionSourceMap: false,
  outputDir: 'dist',
  assetsDir: 'assets',
  // 指定生成的 index.html 的输出路径 (相对于 outputDir),也可以是一个绝对路径
  indexPath: 'index.html',
  // 生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存
  filenameHashing: true,
  // eslint-loader 是否在保存的时候检查
  lintOnSave: true,
  // 是否使用包含运行时编译器的Vue核心的构建
  runtimeCompiler: false,
  // 默认情况下 babel-loader 忽略其中的所有文件 node_modules，
  // 想要通过 Babel 显式转译一个依赖，可以在这个选项中列出来
  transpileDependencies: [],
  // 生产环境 sourceMap
  productionSourceMap: false,
  // 跨域设置 
  // 可取值参考： https://developer.mozilla.org/zh-CN/docs/Web/HTML/CORS_settings_attributes
  crossorigin: undefined,
  // webpack 配置，键值对象时会合并配置，为方法时会改写配置
  // https://cli.vuejs.org/guide/webpack.html#simple-configuration

  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
        // 为生产环境修改配置...
        config.mode = 'production'
    } else {
        // 为开发环境修改配置...
        config.mode = 'development'
    }
    config.externals= {
      'vue': 'Vue',
      'vue-router':'VueRouter',
      'axios': 'axios'
   }
},

css: {
  extract: true,
  sourceMap: false,
  loaderOptions: {
    // 定义全局scss无需引入即可使用
    less: {
      prependData: `
        @import "@/style/common.less";
        @import "@/style/mixin.less";
      `
    }
  },
},
  // webpack 链接 API，用于生成和修改 webapck 配置
  // https://github.com/mozilla-neutrino/webpack-chain
  chainWebpack: (config) => {
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal'];
    types.forEach(type => {
        let rule = config.module.rule('less').oneOf(type)
        rule.use('style-resource')
            .loader('style-resources-loader')
            .options({
                patterns: [path.resolve(__dirname, '@/style/common.less')]
            });
    });

    config.resolve.alias
    .set('@', resolve('src'))
    .set('assets', resolve('src/assets'))
    .set('components', resolve('src/components'))
    .set('router', resolve('src/router'))
    .set('store', resolve('src/store'))
    .set('views', resolve('src/views'))

    config.module.rule('images').use('url-loader')
        .tap(options => ({
            name: './assets/images/[name].[ext]',
            quality: 85,
            limit: 0,
            esModule: false,
        }));

    config.module.rule('svg')
        .use('svg-sprite-loader')
        .loader('svg-sprite-loader')
        .options({
            symbolId: 'icon-[name]'
          })
    config.plugin('define').tap(args => [{
        ...args, 
        "window.isDefine": JSON.stringify(true)
    }]);

    // 生产环境配置
    if (process.env.NODE_ENV === 'production') {
        config.output.filename('./js/[name].[chunkhash:8].js');
        config.output.chunkFilename('./js/[name].[chunkhash:8].js');
        config.plugin('extract-css').tap(args => [{
            filename: './css/[name].[contenthash:8].css',
            chunkFilename: './css/[name].[contenthash:8].css'
        }]);

        config.optimization.minimize(true)
            .minimizer('terser')
            .tap(args => {
                let { terserOptions } = args[0];
                terserOptions.compress.drop_console = true;
                terserOptions.compress.drop_debugger = true;
                return args
            });
        config.optimization.splitChunks({
            cacheGroups: {
                common: {
                    name: 'common',
                    chunks: 'all',
                    minSize: 1,
                    minChunks: 2,
                    priority: 1
                },
                vendor: {
                    name: 'chunk-libs',
                    chunks: 'all',
                    test: /[\\/]node_modules[\\/]/,
                    priority: 10
                }
            }
        });
    }
},

  // 配置高于chainWebpack中关于 css loader 的配置
  

  // 所有 webpack-dev-server 的选项都支持
  // https://webpack.js.org/configuration/dev-server/
  devServer: {
    open: true,
    port: 8080,
    https: false,
    hotOnly: false,
    proxy:{
        '/api':{
            target:"localhost",
            pathRewrite:{
                '^/api':"/api"
            }
  },
},
  },
  // 构建时开启多进程处理 babel 编译
  // 是否为 Babel 或 TypeScript 使用 thread-loader

  // https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
  pwa: {},

  // 第三方插件配置
  pluginOptions: {}
}
