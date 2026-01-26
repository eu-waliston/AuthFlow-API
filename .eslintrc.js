module.exports = {
  env: {
    node: true,
    es2021: true,
    jest: true,
  },
  extends: ['airbnb-base', 'plugin:prettier/recommended'],
  plugins: ['import'],
  rules: {
    'no-console': 'off',
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'no-underscore-dangle': ['error', { allow: ['_id'] }],
    'consistent-return': 'off',
    'no-unused-vars': ['error', { argsIgnorePattern: 'next' }],

    semi: ['error', 'always'], 
    indent: ['error', 2],
  },
};
