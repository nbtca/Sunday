/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution")

module.exports = {
  root: true,
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/eslint-config-typescript/recommended",
  ],
  rules: {
    semi: ["error", "never"],
    "vue/comment-directive": 'off',
    "vue/no-setup-props-destructure": 'off',
  },
}
