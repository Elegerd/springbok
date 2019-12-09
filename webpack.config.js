const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        app: ['./src_frontend/App.ts'],
        vendor: ['react', 'react-dom']
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].bundle.js'
    },
    devtool: "source-map",
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx", ".json"]
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "awesome-typescript-loader"
            }
        ]
    },
    devServer: {
      port: 3000,
      open: true,
      historyApiFallback: true,
      proxy: {
        "/api": {
            target: "http://localhost:3001",
            changeOrigin: true,
            secure: false,
            pathRewrite: { '^/api': '' }
        },
      }
    },
    plugins: [
        new HtmlWebPackPlugin({
            favicon: "./public/favicon.ico",
            template: "./src_frontend/index.html",
        }),
    ]
};
