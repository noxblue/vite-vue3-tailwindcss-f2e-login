module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    "eslint:recommended",
    "plugin:vue/vue3-recommended",
    "plugin:prettier/recommended",
    "eslint-config-prettier"
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: {
      modules: true,
      jsx: true
    },
    requireConfigFile: false,
    parser: "@babel/eslint-parser"
  },
  plugins: ["vue", "prettier"],
  rules: {
    "prettier/prettier": "error"
  }
};
