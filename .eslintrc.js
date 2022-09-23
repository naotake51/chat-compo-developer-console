module.exports = {
  plugins: [
    'react',
  ],
  extends: [
    'next',
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
    ]
  }
}