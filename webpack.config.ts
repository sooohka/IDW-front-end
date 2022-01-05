import { Configuration as WebpackConf } from "webpack";
import { Configuration as DevServerConf } from "webpack-dev-server";
import HWP from "html-webpack-plugin";
import RRWP from "@pmmmwh/react-refresh-webpack-plugin";
import DotEnv from "dotenv-webpack";
import path from "path";
interface Configuration extends WebpackConf {
  devServer?: DevServerConf;
}

const isDev = process.env.NODE_ENV !== "production";
const config: Configuration = {
  devtool: isDev ? "cheap-module-source-map" : "source-map",
  devServer: {
    hot: true,
    port: 6500,
  },
  mode: isDev ? "development" : "production",
  entry: "./src/index.tsx",

  output: {
    path: path.join(__dirname, "build"),
    filename: "bundle.js",
    assetModuleFilename: "static/[hash][name][ext]",
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpg|jpeg)$/,
        type: "asset/resource",
      },
      {
        test: /\.svg$/,
        use: ["@svgr/webpack"],
      },
    ],
  },
  plugins: [
    //
    new HWP({ template: "./public/index.html", favicon: "./public/favicon.ico" }),
    new DotEnv({ path: isDev ? "./.env.development.local" : "./.env.production.local" }),
    isDev && new RRWP(),
  ],
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
    alias: {
      "@Api": path.join(__dirname, "src/api/"),
      "@Assets": path.join(__dirname, "src/assets/"),
      "@Components": path.join(__dirname, "src/components/"),
      "@Pages": path.join(__dirname, "src/pages/"),
      "@Store": path.join(__dirname, "src/store/"),
      "@Style": path.join(__dirname, "src/style/"),
      "@Test": path.join(__dirname, "src/test/"),
      "@Contexts": path.join(__dirname, "src/utils/contexts/"),
      "@Hooks": path.join(__dirname, "src/utils/hooks/"),
      "@Lib": path.join(__dirname, "src/utils/lib/"),
      "@Utils": path.join(__dirname, "src/utils/"),
    },
  },
};

export default config;
