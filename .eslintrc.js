module.exports = {
  parser: '@babel/eslint-parser',
  plugins: ['react', 'react-native'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      modules: true,
    },
  },
  extends: ['eslint:recommended', 'plugin:react/recommended', 'airbnb-base'],
  rules: {
    'arrow-body-style': 'off',
    'class-methods-use-this': 'off',
    'consistent-return': 'off',
    'global-require': 'off',
    'import/no-cycle': 'off',
    'import/prefer-default-export': 'off',
    'max-len': 'off',
    'no-console': ['error'],
    'no-empty': ['error', { allowEmptyCatch: true }],
    'no-underscore-dangle': 'off',
    'no-use-before-define': 'off',
    'react/prop-types': 'off',
  },
  settings: {
    'import/resolver': {
      'babel-module': {},
    },
    react: {
      version: 'detect',
    },
  },
  env: {
    jest: true,
  },
};
