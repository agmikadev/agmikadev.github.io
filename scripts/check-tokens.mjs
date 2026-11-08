import { readdirSync, readFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const stylesRoot = join(root, "src");

const IGNORED_FILES = new Set([
  "src/styles/tokens.css",
  "src/styles/globals.css",
  "src/index.css",
  "src/App.css",
]);

const LAYOUT_PROPERTIES = new Set([
  "width",
  "height",
  "min-width",
  "max-width",
  "min-height",
  "max-height",
  "grid-template-columns",
  "grid-template-rows",
  "font-size",
  "border-radius",
  "z-index",
  "top",
  "right",
  "bottom",
  "left",
]);

const RAW_UNIT = /\b\d+(?:\.\d+)?(?:px|rem)\b/;
const ALLOWED_VALUE = /^(?:0|0px|0%|100%|auto|none|inherit|initial|unset|transparent|currentColor|\d+(?:\.\d+)?%|\d+(?:\.\d+)?em|\d+(?:\.\d+)?ch|\d+(?:\.\d+)?ex|\d+(?:\.\d+)?vw|\d+(?:\.\d+)?vh|\d+(?:\.\d+)?dvh|\d+(?:\.\d+)?dvw|50%)$/i;

function walk(dir) {
  const entries = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "node_modules" || entry.name === "dist") continue;
      entries.push(...walk(full));
    } else if (entry.isFile() && entry.name.endsWith(".css")) {
      entries.push(full);
    }
  }
  return entries;
}

const violations = [];

for (const file of walk(stylesRoot)) {
  const relativePath = relative(root, file).replaceAll("\\", "/");
  if (IGNORED_FILES.has(relativePath)) continue;

  const lines = readFileSync(file, "utf8").split(/\r?\n/);
  lines.forEach((line, index) => {
    const match = line.match(/^\s*([a-z-]+)\s*:\s*(.+?);\s*$/i);
    if (!match) return;

    const [, property, rawValue] = match;
    if (!LAYOUT_PROPERTIES.has(property)) return;
    if (rawValue.includes("var(") || ALLOWED_VALUE.test(rawValue.trim())) return;
    if (!RAW_UNIT.test(rawValue)) return;

    violations.push({
      file: relativePath,
      line: index + 1,
      property,
      value: rawValue.trim(),
    });
  });
}

if (violations.length === 0) {
  console.log("Design token check passed.");
  process.exit(0);
}

console.error(`Design token check failed: ${violations.length} raw layout value(s).`);
for (const violation of violations.slice(0, 80)) {
  console.error(
    `  ${violation.file}:${violation.line} ${violation.property}: ${violation.value}`,
  );
}
if (violations.length > 80) {
  console.error(`  ...and ${violations.length - 80} more.`);
}
console.error("Use a token from src/styles/tokens.css (or add a semantic token).");
process.exit(1);
