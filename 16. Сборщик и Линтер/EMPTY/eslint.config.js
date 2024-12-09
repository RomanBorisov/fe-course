module.exports = [
    {
        files: ['**/*.ts', '**/*.tsx'],
        languageOptions: {
            parserOptions: {
                ecmaVersion: 2022,
                sourceType: 'module',
                ecmaFeatures: {
                    jsx: true,
                },
            },
            globals: {
                process: true,
            },
        },
        rules: {
            'no-console': 'warn',
            'semi': ['error', 'always'],
        },
    },
];
