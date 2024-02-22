import babel from '@rollup/plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import terser from '@rollup/plugin-terser'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import postcss from 'rollup-plugin-postcss'
import image from '@rollup/plugin-image'
// import typescript from '@rollup/plugin-typescript'
// import dts from 'rollup-plugin-dts'

const packageJson = require('./package.json')

const rollupConfig = [
  {
    input: 'src/index.js',
    output: [
      {
        file: packageJson.main,
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [
      babel({
        babelHelpers: 'bundled',
        presets: ['@babel/preset-react'],
        extensions: ['.js', '.jsx'],
      }),
      commonjs(),
      peerDepsExternal(),
      resolve({
        extensions: ['.js', '.jsx'],
      }),
      terser(),
      postcss({
        plugins: [],
        minimize: true,
      }),
      image(),

      // typescript({ tsconfig: './tsconfig.json' }),
    ],
    external: [
      'react',
      'react-dom',
      'draft-js',
      'react-bootstrap-typeahead',
      'react-draft-wysiwyg',
      'react-dropzone',
      'react-icons',
      'react-modal',
      'react-multi-date-picker',
      'styled-components',
      'sweetalert2',
      'tailwindcss',
    ],
    // globals: {
    //   react: 'React',
    // },
  },
  //   {
  //     input: 'src/index.js',
  //     output: [{ file: 'dist/types.d.ts', format: 'es' }],
  //     plugins: [dts.default()],
  //     external: [/\.css$/],
  //   },
]

export default rollupConfig
