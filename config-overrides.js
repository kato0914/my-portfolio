const { override, adjustStyleLoaders } = require('customize-cra');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = override(
  (config) => {
    if (!config.optimization) {
      config.optimization = {};
    }

    config.optimization.minimizer = [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true,
          },
          output: {
            comments: false,
          },
        },
        extractComments: false,
      }),
    ];

    config.optimization.splitChunks = {
      chunks: 'all',
      minSize: 20000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      automaticNameDelimiter: '~',
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    };

    return config;
  },
  adjustStyleLoaders(({ use: [, css] }) => {
    css.options.modules = {
      localIdentName: '[local]--[hash:base64:5]'
    };
  })
);