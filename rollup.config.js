import typescript from "rollup-plugin-typescript2";
import postcss from "rollup-plugin-postcss";
import autoprefixer from "autoprefixer";
import { terser } from "rollup-plugin-terser";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import nodePolyfills from "rollup-plugin-polyfill-node";
import { babel } from "@rollup/plugin-babel";
import del from "rollup-plugin-delete";
import json from "@rollup/plugin-json";
import commonjs from "@rollup/plugin-commonjs";
import livereload from "rollup-plugin-livereload";

const isProduction = process.env.NODE_ENV === "production";

const initConfig = () => {
  const flexibleOutput = [];

  const flexiblePlugins = [];

  if (isProduction) {
    // 打算发布的话将代码打包到dist文件夹内
    flexibleOutput.push(
      {
        format: "umd",
        file: "dist/common-axios.umd.js",
        name: "commonAxios",
        globals: {
          axios: "axios",
          "web-message": "web-message",
          "web-mask-layer": "web-mask-layer",
        },
      },
      {
        format: "esm",
        file: "dist/common-axios.esm.js",
        name: "commonAxios",
        globals: {
          axios: "axios",
          "web-message": "web-message",
          "web-mask-layer": "web-mask-layer",
        },
      }
    );

    // 发布压缩代码
    flexiblePlugins.push(terser());
  } else {
    // 开发环境 将代码打包到demo文件夹内
    flexibleOutput.push(
      {
        format: "umd",
        file: "dist/common-axios.umd.js",
        name: "commonAxios",
        globals: {
          axios: "axios",
          "web-message": "web-message",
        },
      },
      {
        format: "esm",
        file: "dist/common-axios.esm.js",
        name: "commonAxios",
        globals: {
          axios: "axios",
          "web-message": "web-message",
        },
      }
    );
    flexiblePlugins.push(livereload());
  }
  const defaultConfig = {
    input: "./src/common-axios.ts",

    external: ["axios", "web-message"],

    plugins: [
      isProduction &&
        del({
          targets: ["dist"],
        }),

      babel({
        skipPreflightCheck: true,
        exclude: "node_modules/**",
        extensions: [".js", ".jsx"],
        babelHelpers: "bundled",
      }),

      commonjs(),

      nodeResolve({
        dedupe: ["vue"], // 解决 npm link 造成多个 版本vue的问题
        browser: true,
        extensions: [".jsx", ".js", ".ts", ".tsx"],
      }),

      nodePolyfills(),

      postcss({
        plugins: [autoprefixer()],
      }),

      json(),

      typescript({
        exclude: "node_modules/**",
        useTsconfigDeclarationDir: true,
        extensions: [".ts", ".tsx"],
      }),
    ],
  };
  defaultConfig.output = flexibleOutput;

  defaultConfig.plugins = defaultConfig.plugins.concat(flexiblePlugins);

  return defaultConfig;
};

export default initConfig();
