const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

export const module = {
    rules: [
        {
            test: /\.css$/i,
            use: ["style-loader", "css-loader"],
        },
    ],
};