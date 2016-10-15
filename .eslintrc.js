module.exports = {
    "env": {
        "browser": true,
        "node": true,
        "commonjs": true,
        "es6": true
    },
    "globals": {
        "angular": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "sourceType": "module"
    },
    "rules": {
        "indent": [
            "error",
            4
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
            //"double"
        ],
        "semi": [
            "error",
            "always"
        ]
    }
};