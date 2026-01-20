module.exports = [
  {
    ignores: ['.next/', 'node_modules/', 'dist/', 'out/', 'test-results/'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
    },
    rules: {
      'no-console': 'warn',
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    },
  },
];
