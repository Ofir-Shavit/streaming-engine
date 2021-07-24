module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: [
        'standard'
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module'
    },
    plugins: [
        '@typescript-eslint'
    ],
    rules: {
        semi: ['error', 'always'],
        quotes: ['error', 'single'],
        'quote-props': ['error', 'as-needed'],
        'no-useless-constructor': ['off'],
        indent: ['error', 4]
    }
};
