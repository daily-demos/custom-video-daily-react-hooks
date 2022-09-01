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
  rules: {
    'consistent-return': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'jsx-a11y/media-has-caption': 'off',
    'no-console': 'off',
    'react/jsx-filename-extension': 'off',
    'react/no-array-index-key': 'off',
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
  },
};
