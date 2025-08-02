module.exports = {
  root: true,
  extends: '@react-native',
  plugins: ['import'],
  rules: {
    'import/order': [
      'warn',
      {
        groups: [
          ['builtin', 'external', 'internal'],
          ['parent', 'sibling', 'index'],
        ],
        pathGroups: [
          {
            pattern: 'react',
            group: 'external',
            position: 'before',
          },
        ],
        pathGroupsExcludedImportTypes: ['react'],
        'newlines-between': 'never',
        alphabetize: { order: 'asc', caseInsensitive: true },
      },
    ],
    'import/first': 'warn',
  },
};
