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
  devServer: {
    hot: true,
    port: 6500,
  },
  mode: isDev ? "development" : "production",
  entry: "./src/index.tsx",
  output: {
    path: path.join(__dirname, "build"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        use: "babel-loader",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpg|jpeg)$/,
        use: "asset/resource",
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
    new DotEnv({path:isDev?"./.env.development.local":"./.env.production.local"}),
    isDev && new RRWP(),
  ],
  resolve: { extensions: [".js", ".jsx", ".ts", ".tsx"] },
};

export default config;
