const { name } = require('./package');
const SentryWebpackPlugin = require('@sentry/webpack-plugin');

module.exports = {
  webpack: (config, env) => {
    if (env === 'development') {
      config.output.library = `${name}-[name]`;
      config.output.libraryTarget = 'umd';
      config.output.jsonpFunction = `webpackJsonp_${name}`;
      config.output.globalObject = 'window';
    } else {
      config.plugins.push(
        new SentryWebpackPlugin({
          url: process.env.SENTRY_URL,
          authToken: process.env.SENTRY_AUTH_TOKEN,
          org: 'sentry',
          project: 'app-react',
          urlPrefix: '~/',
          // webpack specific configuration
          include: './build',
          ignore: ['node_modules', 'webpack.config.js']
        })
      );
    }
    return config;
  },

  devServer: (configFunction) => {
    return function (proxy, allowedHost) {
      const config = configFunction(proxy, allowedHost);
      config.headers = {
        'Access-Control-Allow-Origin': '*'
      };
      config.historyApiFallback = true;
      config.hot = false;
      config.watchContentBase = false;
      config.liveReload = false;
      config.open = false;
      return config;
    };
  }
};
