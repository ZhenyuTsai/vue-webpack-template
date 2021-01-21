module.exports = {
    'env': {
        'browser': true,
        'node': true,
        'es2021': true
    },
    'extends': [
        'eslint:recommended',
        'plugin:vue/essential'
    ],
    'parserOptions': {
        'ecmaVersion': 12,
        'sourceType': 'module'
    },
    'plugins': [
        'vue'
    ],
    'rules': {
        'no-console': 'off',
        'no-debugger':'off',
        'no-alert': 'off',
        'quotes': ['error', 'single'],
        'semi': ['error', 'never']
    }
}
