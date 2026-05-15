import fs from "fs";
import path from "path";

const ROOT = "./src";

function walk(dir) {
  return fs.readdirSync(dir).flatMap(file => {
    const full = path.join(dir, file);
    return fs.statSync(full).isDirectory() ? walk(full) : full;
  });
}

function extractImports(file) {
  const content = fs.readFileSync(file, "utf8");
  const regex = /from\s+['"](.*?)['"]/g;
  const imports = [];
  let match;
  while ((match = regex.exec(content))) {
    imports.push(match[1]);
  }
  return imports;
}

const files = walk(ROOT).filter(f => f.endsWith(".js") || f.endsWith(".jsx"));

let errors = [];

files.forEach(file => {
  const imports = extractImports(file);

  imports.forEach(i => {
    if (i.startsWith(".")) {
      const resolved = path.resolve(path.dirname(file), i);
      const exists =
        fs.existsSync(resolved) ||
        fs.existsSync(resolved + ".js") ||
        fs.existsSync(resolved + ".jsx") ||
        fs.existsSync(resolved + ".scss");

      if (!exists) {
        errors.push({ file, import: i });
      }
    }
  });
});

if (errors.length === 0) {
  console.log("OK - aucun import cassé détecté");
} else {
  console.log("IMPORTS CASSÉS :");
  console.table(errors);
}