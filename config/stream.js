// Rollup plugins.
import babel from 'rollup-plugin-babel'
import cjs from 'rollup-plugin-commonjs'
import globals from 'rollup-plugin-node-globals'
import replace from 'rollup-plugin-replace'
import resolve from 'rollup-plugin-node-resolve'
import uglify from 'rollup-plugin-uglify'
import scss from 'rollup-plugin-scss'

export default {
  dest: 'public/stream.min.js',
  entry: 'src/stream.js',
  format: 'iife',
  plugins: [
    babel({
      babelrc: false,
      exclude: ['node_modules/**', 'src/style/**'],
      presets: [
        ['es2015', {
          modules: false
        }], 'stage-0', 'react'
      ],
      plugins: ['external-helpers']
    }),
    cjs({
      exclude: ['node_modules/process-es6/**', 'src/style/**'],
      include: [
        'node_modules/**',
      ]
    }),
    globals(),
    replace({
      //'process.env.NODE_ENV': JSON.stringify('development')
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    resolve({
      browser: true,
      main: true
    }),
    scss({
      output: 'public/stream.css'
    }),
    uglify()
  ],
  sourceMap: true
}