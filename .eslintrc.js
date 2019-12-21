module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
    mocha: true,
  },
  extends: [
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    "linebreak-style": 0,
    "semi": 0,
    "no-param-reassign": 0,
    "space-infix-ops": 0,
    "no-plusplus": 0,
    "indent": 0,
    "no-continue": 0,
    'no-proto': 0,
    "comma-spacing": 0,
    "prefer-template": 0,
  },
};
