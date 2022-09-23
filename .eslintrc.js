module.exports = {
  plugins: [
    'react',
  ],
  extends: [
    'next',
    'plugin:react/all',
    'prettier' // https://nextjs.org/docs/basic-features/eslint#prettier
  ],
  rules: {
    'import/order': [
      'error',
      {
        alphabetize: {
          order: 'asc'
        }
      }
    ],
    'react/jsx-filename-extension': [1, { 'extensions': ['.tsx', '.jsx'] }],
    'react/jsx-no-literals': 'off',
  },
}