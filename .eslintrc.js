const off = 0
const warn = 1
const error = 2

module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  globals: {
    test: true,
    expect: true,
  },
  extends: ['plugin:react/recommended', 'airbnb', 'prettier'],
  parserOptions: {
    ecmaVersion: 12,
    ecmaFeatures: {
      jsx: true,
    },
    sourceType: 'module',
  },
  plugins: ['react', 'react-hooks', 'prettier'],
  settings: {
    // Cf. https://github.com/yannickcr/eslint-plugin-react#configuration
    react: {
      version: 'detect',
    },
  },
  rules: {
    semi: [warn, 'never'],
    'react-hooks/rules-of-hooks': error,
    'react-hooks/exhaustive-deps': warn,
    'react/react-in-jsx-scope': off,
    'react/jsx-filename-extension': [warn, { extensions: ['.jsx', '.tsx'] }],
    'react/jsx-props-no-spreading': off,
    'react/prop-types': off,
    'no-use-before-define': off,
    'consistent-return': off,
    'no-plusplus': off,
    'no-unused-vars': warn,
    'react/jsx-one-expression-per-line': off,
    'react/jsx-curly-newline': off,
    'array-callback-return': off,
    'react/no-danger': off,
  },
}
