#!/usr/bin/env node

/**
 * Validação estática de assets de imagem.
 *
 * Regras:
 * 1. Referências a .png/.jpg/.jpeg em código-fonte são PROIBIDAS (excepto allowlist técnica).
 * 2. Referências a .webp devem apontar para ficheiros existentes e ser WebP reais.
 * 3. Todos os .webp em public/ devem ser formato WebP real (magic bytes).
 * 4. Assets críticos devem existir e ser válidos.
 *
 * Uso: `node scripts/check-image-assets.mjs`
 * Exit 0: tudo OK
 * Exit 1: problemas encontrados
 */
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

const errors = [];
const warn = (msg) => errors.push(msg);
const ok = (msg) => console.log(`[check-images] OK: ${msg}`);

// --- Allowlist de referências .png/.jpg/.jpeg permitidas ---
// Estes são assets framework/infra que NÃO podem ser convertidos para WebP.
const IMAGE_ALLOWLIST = new Set([
  "/apple-icon.png",   // Next.js Apple Touch Icon (requer PNG por spec)
  "/icon.png",         // Next.js Icon (requer PNG por spec)
]);

// --- Helpers ---

function isRealWebP(filePath) {
  try {
    const buf = readFileSync(filePath);
    if (buf.length < 12) return false;
    const riff = buf.slice(0, 4).toString("ascii");
    const webp = buf.slice(8, 12).toString("ascii");
    return riff === "RIFF" && webp === "WEBP";
  } catch {
    return false;
  }
}

function isRealPNG(filePath) {
  try {
    const buf = readFileSync(filePath);
    if (buf.length < 8) return false;
    return buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47;
  } catch {
    return false;
  }
}

/** Convert absolute path to repo-relative path using forward slashes. */
function toRel(abs) {
  return abs.slice(ROOT.length).split(sep).join("/");
}

// --- Recursive file scanner ---

function findSourceFiles(dir) {
  const results = [];
  try {
    for (const entry of readdirSync(dir)) {
      if (["node_modules", ".next", "out", ".git"].includes(entry)) continue;
      const full = join(dir, entry);
      const st = statSync(full);
      if (st.isDirectory()) {
        results.push(...findSourceFiles(full));
      } else if (/\.(ts|tsx|js|json|css)$/.test(entry)) {
        results.push(full);
      }
    }
  } catch {}
  return results;
}

// --- Scan for image references ---

const IMAGE_RE = /["'`](\/[^\s"'`]+\.(?:webp|png|jpg|jpeg))["'`]/g;

const imageRefs = new Map(); // ref -> [{file, line}]

const sourceFiles = findSourceFiles(ROOT);
let scannedCount = 0;

for (const f of sourceFiles) {
  let content;
  try {
    content = readFileSync(f, "utf8");
  } catch {
    continue;
  }
  scannedCount++;
  const relFile = toRel(f);
  const lines = content.split("\n");

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    let m;
    IMAGE_RE.lastIndex = 0;
    while ((m = IMAGE_RE.exec(line)) !== null) {
      const ref = m[1];
      if (!imageRefs.has(ref)) imageRefs.set(ref, []);
      imageRefs.get(ref).push({ file: relFile, line: i + 1 });
    }
  }
}

console.log(
  `[check-images] Scanned ${scannedCount} files, found ${imageRefs.size} unique image refs`,
);

// --- Validate each reference ---
let checked = 0;
for (const [ref, sources] of imageRefs) {
  const isRaster = /\.(png|jpg|jpeg)$/i.test(ref);
  const isAllowed = IMAGE_ALLOWLIST.has(ref);

  for (const { file, line } of sources) {
    checked++;

    // Rule 1: .png/.jpg/.jpeg references are PROHIBITED (unless allowlisted)
    if (isRaster && !isAllowed) {
      warn(
        `${file}:${line} — RASTER REFERENCE PROHIBITED: "${ref}" → Use .webp instead`,
      );
      continue;
    }

    // Rule 2: All references must point to existing files
    const fullPath = join(ROOT, "public", ref);
    if (!existsSync(fullPath)) {
      warn(`${file}:${line} — reference "${ref}" → FILE NOT FOUND`);
      continue;
    }

    const buf = readFileSync(fullPath);
    if (buf.length === 0) {
      warn(`${file}:${line} — reference "${ref}" → FILE IS EMPTY`);
      continue;
    }

    // Rule 3: .webp references must be real WebP
    if (ref.endsWith(".webp") && !isRealWebP(fullPath)) {
      warn(`${file}:${line} — reference "${ref}" → NOT A REAL WEBP FILE`);
      continue;
    }

    // Rule 4: Allowlisted .png must be real PNG
    if (ref.endsWith(".png") && isAllowed && !isRealPNG(fullPath)) {
      warn(`${file}:${line} — reference "${ref}" → NOT A REAL PNG FILE`);
      continue;
    }
  }
}
ok(`Validated ${checked} references across ${imageRefs.size} unique paths`);

// --- Validate critical static files exist ---
const criticalFiles = [
  "/og-image.webp",
  "/logo.webp",
  "/logo-80.webp",
  "/logo-160.webp",
  "/logo-320.webp",
  "/testimonials/andreia-foto.webp",
  "/testimonials/mauricio-foto.webp",
  "/testimonials/pedro-foto.webp",
  "/testimonials/romerson-foto.webp",
  "/testimonials/sandro-foto.webp",
  "/testimonials/wanda-foto.webp",
  "/bestfluenty-newinamadora.webp",
  "/press/tvi-bom-dia-alegria.webp",
  "/ceo.webp",
];

for (const ref of criticalFiles) {
  const full = join(ROOT, "public", ref);
  if (!existsSync(full)) {
    warn(`CRITICAL: missing ${ref}`);
    continue;
  }
  const buf = readFileSync(full);
  if (buf.length === 0) {
    warn(`CRITICAL: empty file ${ref}`);
    continue;
  }
  if (ref.endsWith(".webp") && !isRealWebP(full)) {
    warn(`CRITICAL: ${ref} is not a real WebP`);
    continue;
  }
  ok(`${ref} exists and is valid (${buf.length} bytes)`);
}

// --- Validate all .webp files in public/ are real WebP ---
function validateDir(dir) {
  try {
    for (const entry of readdirSync(dir)) {
      const full = join(dir, entry);
      const st = statSync(full);
      if (st.isDirectory()) {
        validateDir(full);
      } else if (entry.endsWith(".webp")) {
        if (!isRealWebP(full)) {
          const rel = toRel(full);
          warn(`FAKE WEBP: ${rel} (${st.size} bytes, not real WebP format)`);
        }
      }
    }
  } catch {}
}

validateDir(join(ROOT, "public"));
ok("All .webp files in public/ are real WebP format");

// --- Report ---
if (errors.length > 0) {
  console.error("\n[check-images] FAILED — issues found:");
  for (const e of errors) {
    console.error(`  - ${e}`);
  }
  process.exit(1);
}

console.log("\n[check-images] OK — all image references validated");
