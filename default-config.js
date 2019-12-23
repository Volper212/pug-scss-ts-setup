module.exports = {
  scripts: ['index'], // index => index.ts, test => test.ts
  pugLocals: {},
  uglifyOptions: {
    compress: {
      keep_infinity: true,
      passes: 3,
      toplevel: true,
      unsafe: true,
      unsafe_comps: true,
      unsafe_Function: true,
      unsafe_math: true,
      unsafe_proto: true,
      unsafe_regexp: true,
      unsafe_undefined: true
    },
    mangle: {
      eval: true,
      toplevel: true
    }
  },
  typescriptOptions: {
    target: 'es5'
  }
};
