#!/usr/bin/env node

/**
 * Validação estática de assets de imagem.
 *
 * Verifica que todas as referências a imagens no código apontam para
 * ficheiros existentes, com formato real correto (magic bytes) e tamanho > 0.
 *
 * Uso: `node scripts/check-image-assets.mjs`
 * Exit 0: tudo OK
 * Exit 1: problemas encontrados
 */
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

const errors = [];
const warn = (msg) => errors.push(msg);
const ok = (msg) => console.log(`[check-images] OK: ${msg}`);

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

function isRealJPEG(filePath) {
  try {
    const buf = readFileSync(filePath);
    if (buf.length < 3) return false;
    return buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff;
  } catch {
    return false;
  }
}

function checkFile(ref, sourceFile, sourceLine) {
  const fullPath = join(ROOT, "public", ref);

  if (!existsSync(fullPath)) {
    warn(`${sourceFile}:${sourceLine} — reference "${ref}" → FILE NOT FOUND`);
    return;
  }

  const buf = readFileSync(fullPath);
  if (buf.length === 0) {
    warn(`${sourceFile}:${sourceLine} — reference "${ref}" → FILE IS EMPTY`);
    return;
  }

  if (ref.endsWith(".webp") && !isRealWebP(fullPath)) {
    warn(`${sourceFile}:${sourceLine} — reference "${ref}" → NOT A REAL WEBP FILE`);
    return;
  }

  if (ref.endsWith(".png") && !isRealPNG(fullPath)) {
    warn(`${sourceFile}:${sourceLine} — reference "${ref}" → NOT A REAL PNG FILE`);
    return;
  }

  if (ref.endsWith(".jpg") && !isRealJPEG(fullPath)) {
    warn(`${sourceFile}:${sourceLine} — reference "${ref}" → NOT A REAL JPEG FILE`);
    return;
  }
}

// --- Scan for image references in source files ---

function findFiles(dir, pattern) {
  const results = [];
  try {
    for (const entry of readdirSync(dir)) {
      const full = join(dir, entry);
      const st = statSync(full);
      if (st.isDirectory()) {
        if (entry === "node_modules" || entry === ".next" || entry === "out") continue;
        results.push(...findFiles(full, pattern));
      } else if (entry.endsWith(pattern)) {
        results.push(full);
      }
    }
  } catch {}
  return results;
}

// Collect all .png/.jpg/.jpeg/.webp references from source
const imageRefs = new Map(); // ref -> [{file, line}]

function scanFile(filePath) {
  const content = readFileSync(filePath, "utf8");
  const lines = content.split("\n");
  const relFile = filePath.replace(ROOT + "\\", "").replace(ROOT + "/", "");

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    // Match quoted paths: "/something.webp", '/something.webp', `something.webp`
    const matches = line.matchAll(/["'`]((?:\/[^\s"'`]+\.(?:webp|png|jpg|jpeg))|(?:\w[^"'`]*\.(?:webp|png|jpg|jpeg)))["'`]/g);
    for (const m of matches) {
      const ref = m[1].replace(/["`]/g, "");
      if (!ref.startsWith("/")) continue; // skip relative refs in optimize script
      if (!imageRefs.has(ref)) imageRefs.set(ref, []);
      imageRefs.get(ref).push({ file: relFile, line: i + 1 });
    }
  }
}

// Scan locale files
for (const locale of readdirSync(join(ROOT, "locales"))) {
  const f = join(ROOT, "locales", locale, "common.json");
  if (existsSync(f)) scanFile(f);
}

// Scan TS/TSX files
const srcDirs = [
  join(ROOT, "shared", "lib"),
  join(ROOT, "domains", "landing", "components"),
  join(ROOT, "domains", "press", "components"),
  join(ROOT, "domains", "faq", "components"),
  join(ROOT, "app"),
];
for (const dir of srcDirs) {
  for (const f of findFiles(dir, ".tsx")) scanFile(f);
  for (const f of findFiles(dir, ".ts")) scanFile(f);
}

// Scan CSS
const cssFile = join(ROOT, "app", "globals.css");
if (existsSync(cssFile)) scanFile(cssFile);

// Scan SEO
const seoFile = join(ROOT, "shared", "lib", "seo.ts");
if (existsSync(seoFile)) scanFile(seoFile);

console.log(`[check-images] Found ${imageRefs.size} unique image references in source`);

// --- Validate each reference ---
let checked = 0;
for (const [ref, sources] of imageRefs) {
  for (const { file, line } of sources) {
    checkFile(ref, file, line);
    checked++;
  }
}
ok(`Checked ${checked} references`);

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
          const rel = full.replace(ROOT + "\\", "").replace(ROOT + "/", "");
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
