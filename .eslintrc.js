module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'airbnb', 'prettier'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', 'prettier'],
  // todo: fix these in the code, then remove the rules
  rules: {
    'prettier/prettier': 'warn',
    'no-restricted-syntax': 'warn',
    'consistent-return': 'warn',
    'no-unused-vars': 'warn',
    'no-unused-expressions': 'warn',
    'no-shadow': 'warn',
    'no-return-await': 'warn',
    'react/jsx-filename-extension': 'warn',
    'react/prop-types': 'warn',
    'react/jsx-no-useless-fragment': 'warn',
    'react/react-in-jsx-scope': 'warn',
    'react/button-has-type': 'warn',
    'react/no-array-index-key': 'warn',
    'jsx-a11y/label-has-associated-control': 'warn',
    'jsx-a11y/media-has-caption': 'warn',
  },
};
