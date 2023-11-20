/* eslint-env node */

module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  rules: {
    '@typescript-eslint/no-unused-vars': [
      'error',
      { ignoreRestSiblings: true },
    ],
    '@typescript-eslint/ban-ts-comment': 'warn',
    'no-irregular-whitespace': [
      'error',
      {
        skipStrings: true,
        skipTemplates: true,
        skipJSXText: true,
      },
    ],
  },
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
};
