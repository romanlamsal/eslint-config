require("@rushstack/eslint-patch/modern-module-resolution")

module.exports = {
    extends: ["../", "plugin:@typescript-eslint/recommended"],
    plugins: ["svelte3", "@typescript-eslint"],
    overrides: [
        {
            files: ["*.svelte"],
            processor: "svelte3/svelte3",
        },
    ],
    settings: {
        "svelte3/typescript": true,
    },
}
