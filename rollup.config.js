export default {
  input: 'src/index.js',
  output: [{
    format: 'iife',
    file: 'dist/utils.js',
    name: 'utils',
    preferConst: true,
    exports: 'named',
    strict: false
  }, {
    format: 'esm',
    file: 'dist/utils.esm.js',
    preferConst: true
  }, {
    format: 'cjs',
    file: 'dist/utils.common.js',
    preferConst: true,
    exports: 'named'
  }]
}
