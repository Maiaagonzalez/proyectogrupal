module.exports = {
  root: true,
  env: {
    es2020: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
  ],
  rules: {
    quotes: ["off"],
    indent: ["off"],
    semi: ["off"],
    "comma-dangle": ["off"],
    "no-unused-vars": ["warn"],
    "no-undef": ["error"],
  },
};
