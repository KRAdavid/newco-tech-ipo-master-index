export default [
  {
    files: ['scripts/**/*.mjs', 'tests/**/*.mjs'],
    ignores: ['node_modules/**', 'dist/**'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        console: 'readonly',
        process: 'readonly',
        URL: 'readonly',
        fetch: 'readonly',
        setTimeout: 'readonly',
      },
    },
    rules: {
      'no-undef': 'error',
      'no-unreachable': 'error',
    },
  },
  { ignores: ['node_modules/**', 'dist/**', 'src/**', '**/*.json', '**/*.css'] },
];
