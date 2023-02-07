const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const toml = require("toml");
const yaml = require("yamljs");
const json5 = require("json5");

const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const isProductionMode = (mode) => mode === "production";
const currMode = "development"; // production

module.exports = () => {
    // This code executes before module.exports is defined.
    console.log("🛎🛎🛎 isProduction", isProductionMode(currMode));

    return {
        mode: currMode,
        entry: "./src/index.js",
        devtool: "eval-source-map", //for production, use none
        module: {
            rules: [
                {
                    test: /\.css$/i,
                    use: ["style-loader", "css-loader"],
                },
                {
                    test: /\.(png|jpg|jpeg|gif|svg)$/i,
                    type: "asset/resource",
                },
                {
                    test: /\.(woff|woff2|ttf|eot|otf)$/i,
                    type: "asset/resource",
                },
                {
                    test: /\.(csv|tsv)$/i,
                    use: ["csv-loader"],
                },
                {
                    test: /\.xml$/i,
                    use: ["xml-loader"],
                },
                {
                    test: /\.json5$/i,
                    type: "json",
                    parser: {
                        parse: json5.parse,
                    },
                },
                {
                    test: /\.yaml$/i,
                    type: "json",
                    parser: {
                        parse: yaml.parse,
                    },
                },
                {
                    test: /\.toml$/i,
                    type: "json",
                    parser: {
                        parse: toml.parse,
                    },
                },
            ],
        },
        devServer: {
            static: "./dist", //The static directory where the server gets the data
            hot: true,
        },
        plugins: [
            new HtmlWebpackPlugin({
                title: "Sample",
            }),
        ],
        output: {
            filename: "[name].bundle.js",
            path: path.resolve(__dirname, "dist"),
            clean: true,
        },
        optimization: {
            minimize: isProductionMode(currMode),
            minimizer: isProductionMode(currMode)
               ? [new TerserPlugin(), new CssMinimizerPlugin()]
               : [],
            innerGraph: true,
            usedExports: true,
            splitChunks: {
                chunks: "all",
            },
        },
    };
};

//https://webpack.js.org/guides/
