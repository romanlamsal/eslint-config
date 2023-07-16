require("@rushstack/eslint-patch/modern-module-resolution")

module.exports = {
    extends: ["../"],
    overrides: [
        {
            files: ["**/*.tsx"],
            plugins: ["react"],
        },
    ],
}
