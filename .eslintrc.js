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
    "eslint:recommended",
    "plugin:vue/recommended",
    "standard"
  ],
  globals: {
    __static: true
  },
  plugins: [
    'html', 'vue'
  ],
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-unused-vars': [2, {
      // 允许声明未使用变量
      'vars': 'local',
      // 参数不检查
      'args': 'none'
    }],
    // 关闭语句强制分号结尾
    'semi': [0],
    //空行最多不能超过100行
    'no-multiple-empty-lines': [0, {'max': 100}],
    //关闭禁止混用tab和空格
    'no-mixed-spaces-and-tabs': [0],
    "curly": ["error", "all"],
    "comma-dangle": ["error", "only-multiline"],
    "camelcase": ["error", {"properties": "never"}],
    "indent": ["error", 4, {"SwitchCase": 1}],
    "object-curly-spacing": ["error", "never"],
    "space-before-function-paren": ["error", "never"],
    "space-before-blocks": ["error", "always"],
    "space-infix-ops": ["error", {"int32Hint": false}],
    "no-alert": "error",
    "no-dupe-args": "error",
    "no-duplicate-case": "error",
    "no-duplicate-imports": "error",
    "no-empty": "error",
  }
}
