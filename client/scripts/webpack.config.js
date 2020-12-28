const webpack = require("webpack");
const path = require("path");

const isProduction = process.env.NODE_ENV === "production";

process.chdir(path.join(__dirname, ".."));
const RootPath = process.cwd();

let extraPlugins = [];
let extraOptimizations = {};

if (isProduction) {
	const TerserJSPlugin = require("terser-webpack-plugin");
	const MiniCssExtractPlugin = require("mini-css-extract-plugin");
	const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
	const CompressionPlugin = require("compression-webpack-plugin");

	extraPlugins = [
		new CompressionPlugin(),
		new webpack.optimize.AggressiveMergingPlugin(),
		new MiniCssExtractPlugin({
			filename: "[name].css",
			chunkFilename: "[id].[contenthash].css"
		})
	];

	extraOptimizations = {
		minimizer: [
			new TerserJSPlugin({}),
			new OptimizeCSSAssetsPlugin({})
		]
	};
}

if (process.env.GSP_BUNDLE_ANALYZE) {
	const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
	extraPlugins.push(new BundleAnalyzerPlugin());
}

let DefinePluginArgs = {
    __production: isProduction ? "true" : "false",
    "process.env": {
        "NODE_ENV": JSON.stringify(isProduction ? "production" : "development")
    }
};

let plugins = [
    new webpack.DefinePlugin(DefinePluginArgs),
    ...extraPlugins
];

module.exports = {
    mode: isProduction ? "production" : "development",
    entry: path.join(RootPath, "src", "index.js"),
    context: path.join(RootPath, "src"),
    output: {
        path: path.join(RootPath, "public", "generated"),
        publicPath: "/generated/",
        chunkFilename: "[name].[contenthash].chunk.js",
        filename: "index.bundle.js"
    },
    devtool: isProduction ? undefined : "eval-cheap-module-source-map",
    module: {
        rules: [
            {
                test: /\.worker\.js$/,
                use: { loader: "worker-loader" }
            },
            {
                test: /\.jsx?$/,
                exclude: [ /\.tem\.js$/ ],
                loader: "babel-loader",
                options: {
                    cacheDirectory: path.join(__dirname, "..", "cache"),
                    configFile: path.join(RootPath, "scripts", "babel.config.js")
                }
            },
            {
                test: /\.scss|.css$/,
                use: [
                    isProduction
                        ? {
                            loader: require("mini-css-extract-plugin").loader,
                            options: {
                                publicPath: "/"
                            }
                        }
                        : {
                            loader: "style-loader"
                        },
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true,
                            url: false
                        }
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                config: path.join(__dirname, "postcss.config.js")
                            }
                        }
                    },
                    {
                        loader: "resolve-url-loader",
                        options: {}
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            implementation: require("sass"),
                            sassOptions: {
                                includePaths: [
                                    path.join(RootPath, "src")
                                ]
                            },
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.svg$/,
                use: [
                    {
                        loader: "@svgr/webpack",
                        options: {
                            icon: true,
                            // replaceAttrValues:
                        },
                    },
                ],
            }
        ]
    },
    plugins: plugins,
    optimization: {
        ...extraOptimizations
    },
    resolve: {
        modules: [path.join(RootPath, "node_modules")],
        alias: {},
        extensions: [".js", ".jsx"]
    },
    externals: {
        fs: "{}",
        tls: "{}",
        net: "{}",
        console: "{}",
        v8: "{}"
    },
    devServer: {
        contentBase: path.join(__dirname, "..", "public"),
        publicPath: "/generated/",
        compress: true
    }
};