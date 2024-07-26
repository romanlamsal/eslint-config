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

let packageManager = "npm"
if (existsSync("pnpm-lock.yaml")) {
    packageManager = "pnpm"
} else if (existsSync("yarn.lock")) {
    packageManager = "yarn"
}

console.log("Installing package and eslint/prettier, if missing.")

const cwdPackageJsonPath = join(process.cwd(), "package.json")
let cwdPackageJson = JSON.parse(readFileSync(cwdPackageJsonPath, { encoding: "utf-8" }))

const hasPrettier = "prettier" in (cwdPackageJson.devDependencies || {})
const hasEslint = "eslint" in (cwdPackageJson.devDependencies || {})

const missingDeps = [
    `${packageJson.name}@^${packageJson.version}`,
    !hasPrettier && "prettier",
    !hasEslint && `eslint@^${packageJson.peerDependencies.eslint}`,
].filter(Boolean)

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
