module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true,
  },
  extends: ['plugin:react/recommended', 'airbnb', 'airbnb-babel'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'no-unused-vars': 'warn',
    'react/prop-types': 'warn',
    'react/forbid-prop-types': 'warn',
    'jsx-a11y/control-has-associated-label': 'warn',
    'import/no-cycle': 'warn',
  },
};
