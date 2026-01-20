module.exports = {
  ignores: ['.next/', 'node_modules/', 'dist/', 'out/', 'test-results/'],
  extends: ['next/core-web-vitals'],
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    // Allow dev-only imports in test/e2e files
    'no-console': 'warn',
  },
};
