const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ProvidePlugin = require('webpack').ProvidePlugin
const ModuleFederationPlugin = require('webpack').container.ModuleFederationPlugin
const path = require('path')
const deps = require('./package.json').dependencies

const getCommonWebpackConfig = require('../../webpack.common')

module.exports = {
  ...getCommonWebpackConfig(3000),
  entry: {
    main: "./src/index",
  },
  output: {
    publicPath: '/',
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'host',
      filename: 'remoteEntry.js',
      remotes: {
        navbar: 'navbar@http://localhost:3003/remoteEntry.js',
        sidebar: 'sidebar@http://localhost:3004/remoteEntry.js',
        dashboard: 'dashboard@http://localhost:3005/remoteEntry.js',
        patients: 'patients@http://localhost:3006/remoteEntry.js',
        scheduling: 'scheduling@http://localhost:3007/remoteEntry.js',
        medications: 'medications@http://localhost:3008/remoteEntry.js',
        incidents: 'incidents@http://localhost:3009/remoteEntry.js',
        labs: 'labs@http://localhost:3010/remoteEntry.js',
        settings: 'settings@http://localhost:3011/remoteEntry.js',
        imagings: 'imagings@http://localhost:3012/remoteEntry.js',
      },
      shared: [
        {
          ...deps,
          react: {
            singleton: true,
            requiredVersion: deps.react,
          },
          'react-dom': {
            singleton: true,
            requiredVersion: deps['react-dom'],
          },
          'react-i18next': {
            singleton: true,
            requiredVersion: deps['react-dom'],
          },
          '@mf/shared': {},
        },
      ],
    }),
    new ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
      process: 'process/browser',
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      excludeChunks: ["host"],
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],
}
