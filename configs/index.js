require("@rushstack/eslint-patch/modern-module-resolution")

module.exports = {
    extends: ["prettier", "eslint:recommended"],
    env: {
        browser: true,
        es6: true,
        jest: true,
        node: true,
    },
    plugins: ["unused-imports"],
    parserOptions: {
        parser: "@typescript-eslint/parser",
    },
    overrides: [
        {
            files: ["**/*.tsx"],
            plugins: ["react"],
        },
        {
            files: ["**/*.{ts,tsx}"],
            extends: ["plugin:@typescript-eslint/recommended"],
            rules: {
                "@typescript-eslint/no-non-null-assertion": "off",
                "@typescript-eslint/explicit-module-boundary-types": "off",
                "@typescript-eslint/no-unused-vars": "off",
                "@typescript-eslint/ban-ts-comment": "off",
                "@typescript-eslint/ban-types": "off",
                "@typescript-eslint/no-empty-function": "off",
                "@typescript-eslint/no-extra-semi": "off",
            },
        },
    ],
    rules: {
        "unused-imports/no-unused-imports": "error",
        curly: ["error", "all"],
        "@typescript-eslint/no-non-null-assertion": "off",
    },
}
