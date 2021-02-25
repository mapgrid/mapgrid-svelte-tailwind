import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import svelte from 'rollup-plugin-svelte'
import livereload from 'rollup-plugin-livereload'
import { terser } from 'rollup-plugin-terser'
import sveltePreprocess from 'svelte-preprocess'

const prod = process.env.NODE_ENV === 'production'
const watch = process.env.ROLLUP_WATCH

export default {
    input: 'src/index.js',
    output: {
        file: 'public/bundle.js',
        format: 'iife',
    },
    plugins: [
        svelte({
            preprocess: sveltePreprocess({ postcss: true }),
            compilerOptions: {
                dev: !prod,
            },
            css: css => {
                css.write('bundle.css')
            },
        }),
        resolve({
            dedupe: ['svelte', 'svelte/internal'],
        }),
        commonjs(),
        !!watch && livereload(),
        !!prod && terser(),
    ],
}
