module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  },
  env: {
    browser: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/recommended',
    'standard'
  ],
  globals: {
    __static: true
  },
  plugins: [
    'html', 'vue'
  ],
  rules: {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-unused-vars': [2, {
      // 允许声明未使用变量
      vars: 'local',
      // 参数不检查
      args: 'none'
    }],
    // 关闭语句强制分号结尾
    semi: [0],
    // indent: 'off',
    'vue/script-indent': [
      'error',
      2,
      {
        baseIndent: 1
      }
    ]
  }
}
