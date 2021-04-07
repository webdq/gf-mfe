const SentryWebpackPlugin = require('@sentry/webpack-plugin');
const plugins = [];

if (process.env.NODE_ENV === 'production') {
  plugins.push(
    new SentryWebpackPlugin({
      url: 'http://192.168.1.182:9000/',
      authToken: process.env.SENTRY_AUTH_TOKEN,
      org: 'sentry',
      project: 'app-main',
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
  configureWebpack: {
    plugins: [...plugins]
  }
};
