module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
    project: './tsconfig.json',
  },
  overrides: [{ files: ['*.js'], parser: 'espree' }],
  plugins: ['@typescript-eslint', 'import', 'jest'],
  env: { 'jest/globals': true },
  extends: [
    '@react-native',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:react/recommended',
    'prettier',
  ],
  settings: {
    'import/resolver': {
      typescript: {
        project: './tsconfig.json',
      },
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  rules: {
    '@typescript-eslint/no-unused-vars': 'off',
    'react/react-in-jsx-scope': 'off',
    'import/no-unresolved': ['error', { commonjs: true, amd: true }],
    'import/named': 'error',
    'import/namespace': 'error',
    'import/default': 'error',
    'import/export': 'error',
    'react/prop-types': 'off',
    'no-empty-pattern': 'off',
    'no-var': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'prefer-const': 'off',
    '@typescript-eslint/no-unused-expressions': 'off',
    'react/display-name': 'off',
    '@typescript-eslint/no-require-imports': 'off',
    'import/no-named-as-default': 'off',
    'import/order': [
      'warn',
      {
        groups: [['builtin'], 'external', 'internal', ['parent', 'sibling']],
        pathGroups: [
          {
            pattern:
              '@{redux,themes,assets,components,conf,hooks,navigation,storage,thunk,slice,screens,themes,colors,utils,interfaces,app,network,common,services,context,constants,skeletonLoader}/**',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '@**',
            group: 'external',
            position: 'after',
          },
          {
            pattern: 'react**',
            group: 'builtin',
            position: 'after',
          },
        ],
        pathGroupsExcludedImportTypes: ['builtin'],
        'newlines-between': 'never',
        alphabetize: { order: 'asc', caseInsensitive: true },
      },
    ],
  },
};
