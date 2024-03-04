module.exports = {
  root: true,
  extends: [
    'plugin:@typescript-eslint/recommended',
    '@react-native',
    'prettier',
    'plugin:prettier/recommended',
  ],
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
  rules: {
    'prettier/prettier': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    'import/extensions': 'off',
  },
  pathGroups: [
    {
      pattern: '~assets/**',
      group: 'internal',
    },
    {
      pattern: '~screens/**',
      group: 'internal',
    },
    {
      pattern: '~pages/**',
      group: 'internal',
    },
    {
      pattern: '~components/**',
      group: 'internal',
    },
    {
      pattern: '~biz/**',
      group: 'internal',
    },
    {
      pattern: '~hooks/**',
      group: 'internal',
    },
    {
      pattern: '~hook/**',
      group: 'internal',
    },
    {
      pattern: '~theme/**',
      group: 'internal',
    },
    {
      pattern: '~theme',
      group: 'internal',
    },
    {
      pattern: '~utils/**',
      group: 'internal',
    },
    {
      pattern: '@/**',
      group: 'external',
    },
  ],
  'newlines-between': 'always',
  alphabetize: {
    order: 'asc', // sort in ascending order. Options: ['ignore', 'asc', 'desc']
    caseInsensitive: true, // ignore case. Options: [true, false]
  },
  plugins: ['react-hooks', 'prettier'],
};
