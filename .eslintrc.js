module.exports = {
  plugins: [
    'react',
    'tailwindcss',
  ],
  extends: [
    'next',
    'plugin:react/all',
    'plugin:tailwindcss/recommended',
    'prettier', // https://nextjs.org/docs/basic-features/eslint#prettier
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
    'react/jsx-max-depth': ['error', { 'max': 3 }],
  },
}