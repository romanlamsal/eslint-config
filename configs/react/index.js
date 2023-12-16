require("@rushstack/eslint-patch/modern-module-resolution")

module.exports = {
    extends: ["../", "plugin:@typescript-eslint/recommended"],
    overrides: [
        {
            files: ["**/*.tsx"],
            plugins: ["react"],
        },
    ],
}
