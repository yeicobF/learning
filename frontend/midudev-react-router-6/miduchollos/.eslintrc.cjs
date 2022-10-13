module.exports = {
  extends: ["eslint:recommended", "standard", "plugin:react/recommended"],
  rules: {
    quotes: ["warn", "double"],
    "comma-dangle": ["warn", "always-multiline"],
    "react/react-in-jsx-scope": "off",
  },
}
