const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ProvidePlugin = require('webpack').ProvidePlugin
const ModuleFederationPlugin = require("webpack").container
  .ModuleFederationPlugin;
const path = require("path");
const deps = require('./package.json').dependencies

const getCommonWebpackConfig = require('../../webpack.common')

module.exports = {
  ...getCommonWebpackConfig(3007),
  plugins: [
    new ModuleFederationPlugin({
      name: "scheduling",
      filename: "remoteEntry.js",
      exposes: {
        "./App": "./src/App",
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
"react-i18next": {
            singleton: true,
            requiredVersion: deps['react-dom'],
          },
          "@mf/shared": {},
        },
      ],
    }),
    new ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
      process: 'process/browser'
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
  ],
};
