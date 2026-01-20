module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
  },
  env: { browser: true, node: true, es2022: true },
  plugins: [],
  rules: {
    'no-unused-vars': 'warn',
    'no-console': 'warn',
  },
  ignorePatterns: ['.next/', 'node_modules/', '.history/', 'test-results/'],
};
