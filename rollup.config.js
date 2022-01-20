import typescript from 'rollup-plugin-typescript2'
import { terser } from 'rollup-plugin-terser'
import { nodeResolve } from '@rollup/plugin-node-resolve' //将外部引入的js打包进来
import nodePolyfills from 'rollup-plugin-polyfill-node'
import babel from 'rollup-plugin-babel'
import del from 'rollup-plugin-delete'
import json from '@rollup/plugin-json'
import commonjs from '@rollup/plugin-commonjs' //将CommonJS模块转换为ES6, 方便rollup直接调用
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'
import vue from 'rollup-plugin-vue'

const isProduction = process.env.NODE_ENV === 'production'

export default {
    input: './src/index.ts',
    output: [
        {
            format: 'umd',
            file: 'demo/index.umd.js',
            name: 'easyAxios',
            sourcemap: true,
            globals: {
                vue: 'vue',
            },
        },
    ],
    external: ['vue'],
    plugins: [
        del({ targets: ['dist', 'demo/index.umd.js'] }),
        commonjs(),
        nodeResolve({ browser: true }),
        nodePolyfills(),
        vue({
            css: true,
            compileTemplate: true,
        }),
        // isProduction && terser(),
        babel({
            exclude: 'node_modules/**',
            runtimeHelpers: true,
        }),
        json(),
        // 开启服务
        !isProduction &&
            serve({
                open: false,
                host: 'localhost',
                port: 9008,
                historyApiFallback: true,
                contentBase: 'demo',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                },
            }),
        // 热更新
        !isProduction && livereload(),

        typescript({
            exclude: 'node_modules/**',
            useTsconfigDeclarationDir: true,
            extensions: ['.js', '.ts', '.tsx'],
        }),
    ],
}
