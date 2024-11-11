#!/usr/bin/env node

import { execSync } from "node:child_process"
import { existsSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import packageJson from "./package.json" assert { type: "json" }
import { readFileSync } from "fs"

const [command, type] = process.argv.slice(2)

if (command !== "init") {
    console.log(`Unknown command '${command}'`)
    process.exit(1)
}

const packageManager = (function () {
    const userAgentPackageManager = (process.env.npm_config_user_agent || "").split("/")[0]

    if (["npm", "pnpm", "yarn"].includes(userAgentPackageManager)) {
        return userAgentPackageManager
    }

    if (existsSync("pnpm-lock.yaml")) {
        return "pnpm"
    } else if (existsSync("yarn.lock")) {
        return "yarn"
    }

    return "npm"
})()

const cwdPackageJsonPath = join(process.cwd(), "package.json")
let cwdPackageJson = JSON.parse(readFileSync(cwdPackageJsonPath, { encoding: "utf-8" }))

if (!type || type === "biome") {
    const biomeVersion = { ...cwdPackageJson.devDependencies, ...cwdPackageJson.dependencies }[
        "@biomejs/biome"
    ]

    const missingDeps = [`${packageJson.name}@^${packageJson.version}`]
    if (!biomeVersion) {
        console.log("Installing biome.")
        missingDeps.push("@biomejs/biome@" + packageJson.peerDependencies["@biomejs/biome"])
    }

    execSync(`${packageManager} install -D ${missingDeps.join(" ")}`, { stdio: "inherit" })

    const biomeConfigOptions = ["biome.json", "biome.jsonc"].map(c => join(process.cwd(), c))
    const biomeConfigFile = biomeConfigOptions.find(p => existsSync(p))

    const packageBiomeExport = join(packageJson.name, "biome")

    if (!biomeConfigFile) {
        writeFileSync(
            biomeConfigOptions[0],
            JSON.stringify(
                {
                    $schema: "https://biomejs.dev/schemas/1.9.4/schema.json",
                    extends: [packageBiomeExport],
                },
                null,
                2,
            ),
        )
    } else {
        const biomeConfig = JSON.parse(readFileSync(biomeConfigFile, { encoding: "utf-8" }))

        if ((!"extends") in biomeConfig) {
            biomeConfig.extends = []
        }

        if (!biomeConfig.extends.includes(packageBiomeExport)) {
            biomeConfig.extends.push(packageBiomeExport)
        }

        writeFileSync(biomeConfigFile, JSON.stringify(biomeConfig, null, 2))
    }

    process.exit(0)
}

const hasPrettier = "prettier" in (cwdPackageJson.devDependencies || {})
const hasEslint = "eslint" in (cwdPackageJson.devDependencies || {})

const missingDeps = [
    `${packageJson.name}@^${packageJson.version}`,
    !hasPrettier && "prettier",
    !hasEslint && `eslint@^${packageJson.peerDependencies.eslint}`,
].filter(Boolean)

console.log("Installing package and eslint/prettier, if missing.")

execSync(`${packageManager} install -D ${missingDeps.join(" ")}`, { stdio: "inherit" })

cwdPackageJson = JSON.parse(readFileSync(cwdPackageJsonPath, { encoding: "utf-8" }))

console.log("Adding configs.")
const eslintConfigEntry = () => {
    switch (type) {
        case "react":
            return "@lamsal-de/eslint-config/react"
        case "vue":
            return "@lamsal-de/eslint-config/vue"
        case "svelte":
            return "@lamsal-de/eslint-config/svelte"
        case "ts":
        default:
            return "@lamsal-de"
    }
}
const eslintConfig = {
    extends: [eslintConfigEntry()],
}

if (cwdPackageJson.type === "module") {
    eslintConfig.parserOptions = {
        sourceType: "module",
    }
}

const prettierConfig = "@lamsal-de/eslint-config/prettier"

writeFileSync(
    cwdPackageJsonPath,
    JSON.stringify({ ...cwdPackageJson, eslintConfig, prettier: prettierConfig }, null, 2),
)

console.log("Done!")
