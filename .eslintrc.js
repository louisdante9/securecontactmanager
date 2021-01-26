module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    mocha: true,
  },
  extends: ["airbnb-base"],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  rules: {
    semi: ["error", "always"],
    quotes: ["error", "single"],
    "no-console": 2,
    "no-undef": 0,
    "comma-dangle": 0,
    "one-var": 0,
    "class-methods-use-this": "off",
  },
};
