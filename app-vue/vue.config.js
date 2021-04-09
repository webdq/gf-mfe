const { name } = require('./package');
const SentryWebpackPlugin = require('@sentry/webpack-plugin');
const plugins = [];

if (process.env.NODE_ENV === 'production') {
  plugins.push(
    new SentryWebpackPlugin({
      url: process.env.SENTRY_URL,
      authToken: process.env.SENTRY_AUTH_TOKEN,
      org: 'sentry',
      project: 'app-vue',
      urlPrefix: '~/static/js/',
      // webpack specific configuration
      include: './dist',
      ignore: ['node_modules', 'webpack.config.js']
    })
  );
}

module.exports = {
  productionSourceMap: true,
  publicPath: '/',
  assetsDir: 'static',
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  },
  configureWebpack: {
    output: {
      library: `${name}-[name]`,
      libraryTarget: 'umd', // 把微应用打包成 umd 库格式
      jsonpFunction: `webpackJsonp_${name}`
    },
    plugins: [...plugins]
  }
};
