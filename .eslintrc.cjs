/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution")

module.exports = {
  root: true,
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/eslint-config-prettier/recommended",
    "@vue/eslint-config-typescript/recommended",
  ],
  rules: {
    indent: ["error", 2],
    "linebreak-style": ["error", "unix"],
    quotes: ["error", "double"],
    semi: ["error", "never"],
    "vue/comment-directive": 'off',
    "vue/no-setup-props-destructure": 'off', 
    "arrow-parens": ["error", "as-needed"],
  },
}