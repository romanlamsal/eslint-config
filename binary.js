#! /usr/bin/node
const fs = require("fs")
const path = require("path")
const { execSync } = require("child_process")

function log(...messages) {
    console.log(...messages)
}

log("Adding dependencies to package.json")

function getProjectPath(file) {
    if (file)
        return path.join(process.cwd(), file)

    return process.cwd()
}

function getPackagePath(file) {
    return path.join("node_modules/@lamsal-de/node-defaults", file)
}

const projectPackageJsonPath = getProjectPath("package.json")
const projectPackageJson = JSON.parse(fs.readFileSync(projectPackageJsonPath).toString())
const packagePackageJson = JSON.parse(fs.readFileSync(getPackagePath("package.json")).toString())

fs.writeFileSync(projectPackageJsonPath, JSON.stringify({
    ...projectPackageJson,
    devDependencies: {
        ...(projectPackageJson.devDependencies || {}), ...packagePackageJson.peerDependencies
    }
}, null, 2))

log(`Creating/updating ${getProjectPath(".eslintrc")}`)
fs.writeFileSync(getProjectPath(".eslintrc"), JSON.stringify({
    extends: ["./" + path.join("./node_modules", packagePackageJson.name, "configs/.eslintrc")]
}, null, 2))

log(`Installing additional dependencies in ${getProjectPath()}`)
execSync(`yarn --cwd ${getProjectPath()} install`, { encoding: "utf-8" })
log("done!")
