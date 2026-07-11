import fs from "fs"
import childProcess from "child_process"

const run = (cmd) => {
  try {
    return childProcess.execFileSync(cmd[0], cmd.slice(1), { encoding: "utf8" }).trim()
  } catch {
    return null
  }
}
const checks = [
  ["node", ["node", "-v"], /^v(2[2-9]|[3-9][0-9])\./],
  ["npm", ["npm", "-v"], /^(1[0-9]|[2-9][0-9])\./],
  ["git", ["git", "--version"], /git version/],
  ["make", ["make", "--version"], /GNU Make/],
]
let errors = 0
for (const [name, cmd, re] of checks) {
  const out = run(cmd)
  if (!out || !re.test(out)) {
    console.error("ERROR:", name, "check failed:", out || "not found")
    errors++
  } else console.log("ok:", name, out.split("\n")[0])
}
for (const p of ["package.json", "quartz.config.yaml", "content", "Makefile"]) {
  if (!fs.existsSync(p)) {
    console.error("ERROR: missing " + p)
    errors++
  }
}
if (errors) process.exit(1)
