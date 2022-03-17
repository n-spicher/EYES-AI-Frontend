module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: [
        'plugin:vue/essential',
        'eslint:recommended',
        '@vue/typescript/recommended',
        '@vue/prettier/@typescript-eslint',
       
    ],
    parserOptions: {
        ecmaVersion: 2020
    },
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'lines-between-class-members': 0,
        'no-useless-constructor': 0,
        'handle-callback-err': 'off',
        'no-extra-boolean-cast': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/no-inferrable-types': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/camelcase': 'off',
        'no-unneeded-ternary': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        indent: 'off',
        'no-new': 'off',
        quotes: 'off',
        'promise/param-names': 'off',
        'prefer-promise-reject-errors': 'off',
        'no-useless-return': 'off'
    }
};
