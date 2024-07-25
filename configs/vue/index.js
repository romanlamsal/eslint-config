require("@rushstack/eslint-patch/modern-module-resolution")

module.exports = {
    extends: ["../", "plugin:vue/essential", "@vue/typescript"],
    rules: {
        "vue/multi-word-component-names": "off",
        "vue/no-multiple-template-root": "off",
    },
}
