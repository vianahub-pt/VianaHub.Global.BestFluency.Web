/**
 * Gera variantes otimizadas (WebP) dos assets estáticos da landing.
 *
 * Motivação (spec §25): imagens em AVIF/WebP com `srcset`/`sizes`, dimensões
 * explícitas e sem metadados desnecessários (spec §30). Com
 * `images.unoptimized: true`, a otimização acontece nesta pipeline de assets.
 *
 * Uso: `node scripts/optimize-images.mjs`
 * Requer `sharp` (já presente como dependência transitiva do Next.js).
 *
 * Gera:
 *   public/logo-80.webp                            — logótipo 80×80  (1x do render a 40px)
 *   public/logo-160.webp                           — logótipo 160×160 (2x/retina; imagem do Hero, issue #29)
 *   public/logo-320.webp                           — logótipo 320×320 (retina do Hero)
 *   public/ceo.webp                                — fotografia da fundadora 400×400
 */
import { mkdirSync, statSync } from "node:fs";
import { dirname } from "node:path";

import sharp from "sharp";

const SOURCES = [
  {
    input: "public/logo.jpeg",
    outputs: [
      { file: "public/logo-80.webp", width: 80, height: 80, quality: 82 },
      { file: "public/logo-160.webp", width: 160, height: 160, quality: 82 },
      { file: "public/logo-320.webp", width: 320, height: 320, quality: 82 },
    ],
  },
  {
    input: "public/ceo.jpeg",
    outputs: [
      { file: "public/ceo.webp", width: 400, height: 400, quality: 82 },
    ],
  },
  {
    input: "public/assets/kids-pt-br.webp",
    outputs: [
      {
        file: "public/assets/pt-BR/kids-pt-br-480.webp",
        width: 480,
        height: 720,
        quality: 80,
      },
      {
        file: "public/assets/pt-BR/kids-pt-br-960.webp",
        width: 960,
        height: 1440,
        quality: 80,
      },
      {
        file: "public/assets/pt-BR/kids-pt-br-1440.webp",
        width: 1440,
        height: 2160,
        quality: 80,
      },
    ],
  },
];

let changed = 0;
for (const { input, outputs } of SOURCES) {
  for (const { file, width, height, quality } of outputs) {
    mkdirSync(dirname(file), { recursive: true });
    await sharp(input).resize(width, height).webp({ quality }).toFile(file);
    const { size } = statSync(file);
    console.log(
      `[optimize-images] ${file} (${width}x${height}) ${formatBytes(size)}`,
    );
    changed += 1;
  }
}
console.log(`[optimize-images] done — ${changed} file(s)`);

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  return `${(bytes / 1024).toFixed(1)} KB`;
}
