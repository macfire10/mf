const path = require("path");

module.exports = function (port) {
    return {
        entry: './src/index',
        devServer: {
          ///contentBase: path.join(__dirname, 'dist'),
          port,
          historyApiFallback: true,
          hot: false,
          hotOnly: false,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
            'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
          },
        },
        devtool: 'cheap-module-source-map',
        output: {
          publicPath: 'auto',
          // chunkFilename: '[id].[contenthash].js',
        },
        resolve: {
          extensions: ['.ts', '.tsx', '.js'],
          alias: {
            '@shared': path.resolve(__dirname, "./packages/shared/src")
          },
          fallback: {
            "crypto": require.resolve("crypto-browserify"),
            "stream": require.resolve("stream-browserify")
          },
        },
        module: {
            rules: [
              {
                test: /bootstrap\.tsx$/,
                loader: "bundle-loader",
                options: {
                  lazy: true,
                },
              },
              {
                test: /\.tsx?$/,
                loader: "babel-loader",
                exclude: /node_modules/,
                options: {
                  presets: ["@babel/preset-react", "@babel/preset-typescript"],
                },
              },
              {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
              },
              {
                test: /\.s[ac]ss$/i,
                use: [
                  // Creates `style` nodes from JS strings
                  "style-loader",
                  // Translates CSS into CommonJS
                  "css-loader",
                  // Compiles Sass to CSS
                  "sass-loader",
                ],
              },
            ],
          },
    }
}