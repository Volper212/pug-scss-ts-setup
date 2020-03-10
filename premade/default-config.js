module.exports = {
  output: 'dist',
  scripts: ['index'], // index => index.ts, test => test.ts
  pugLocals: {},
  minifyOptions: {
    ecma: 5,
    compress: {
      arguments: true,
      booleans_as_integers: true,
      keep_infinity: true,
      passes: 3 // ,
      // unsafe: true,
      // unsafe_arrows: true,
      // unsafe_comps: true,
      // unsafe_Function: true,
      // unsafe_math: true,
      // unsafe_methods: true,
      // unsafe_proto: true,
      // unsafe_regexp: true,
      // unsafe_undefined: true
    },
    mangle: {
      eval: true
    },
    output: {
      comments: /^!/
    }
  },
  typescriptOptions: {
    target: 'es5'
  },
  rollupPlugins: []
};
