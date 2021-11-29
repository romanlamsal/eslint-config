const fs = require("fs")
const path = require("path")
const { execSync } = require("child_process")

function log(...messages) {
    fs.appendFileSync(path.join(__dirname, "/log.txt"), messages.join(" ") + "\n")
}

log("Adding dependencies to package.json")

function getProjectPath(file) {
    if (file)
        return path.join(process.env.INIT_CWD, file)

    return process.env.INIT_CWD
}

function getPackagePath(file) {
    return path.join(process.cwd(), file)
}

const projectPackageJsonPath = getProjectPath("package.json")
const projectPackageJson = JSON.parse(fs.readFileSync(projectPackageJsonPath).toString())
const packagePackageJson = JSON.parse(fs.readFileSync(getPackagePath("package.json")).toString())

fs.writeFileSync(projectPackageJsonPath, JSON.stringify({
    ...projectPackageJson,
    dependencies: {
        ...(projectPackageJson.dependencies || {}), ...packagePackageJson.peerDependencies
    }
}, null, 2))

log(`Creating/updating ${getProjectPath(".eslintrc")}`)
fs.writeFileSync(getProjectPath(".eslintrc"), JSON.stringify({
    extends: [path.join("./node_modules", packagePackageJson.name, "configs/.eslintrc")]
}, null, 2))

// log(`Installing additional dependencies in ${getProjectPath()}`)
// execSync(`yarn --cwd ${getProjectPath()} install`, { encoding: "utf-8" })
// log("done!")
