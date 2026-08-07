const fs = require("node:fs");
const path = require("node:path");

/**
 * Build adapter — workaround para vercel/next.js#85374.
 *
 * Em Next.js 16 com `output: "export"`, o runtime do browser solicita os
 * payloads RSC de prefetch como arquivos planos (`__next.<segment>.__PAGE__.txt`),
 * mas o build grava em diretórios aninhados (`__next.<segment>/__PAGE__.txt`).
 * O mismatch entre os dois formatos gera 404 no console (auditoria
 * `errors-in-console` do Lighthouse) e desativa o prefetch de navegação.
 *
 * Este adapter achata os caminhos aninhados do prefetch RSC no formato
 * pontilhado esperado pelo cliente. Remover quando o upstream corrigir o bug.
 *
 * @type {import("next").NextAdapter}
 */
const adapter = {
  name: "flatten-rsc-payload-paths",

  async onBuildComplete({ outputs }) {
    for (const file of outputs.staticFiles) {
      const sourcePath = file.filePath;
      const targetPath = flattenRscPath(sourcePath);

      if (!targetPath || targetPath === sourcePath) continue;
      if (fs.existsSync(targetPath)) continue;

      try {
        await fs.promises.rename(sourcePath, targetPath);

        // Remove o diretório que ficou vazio após o achatamento (best-effort).
        const parent = path.dirname(sourcePath);
        await fs.promises.rmdir(parent).catch(() => {});
      } catch {
        // Falha pontual no rename não deve quebrar o build.
      }
    }
  },
};

/**
 * Achata um payload RSC aninhado no formato pontilhado esperado pelo cliente:
 *
 *   out/de/__next.$d$locale/__PAGE__.txt -> out/de/__next.$d$locale.__PAGE__.txt
 *
 * Retorna `null` para arquivos que não são payloads RSC aninhados.
 */
function flattenRscPath(filePath) {
  // Normaliza separadores (o build pode emitir `/` mesmo no Windows).
  const segments = filePath.split(/[\\/]/);
  const index = segments.findIndex((segment) => segment.startsWith("__next."));

  // Só achata quando o segmento `__next.*` NÃO é o último componente
  // (arquivos planos como `__next._tree.txt` já estão no formato correto).
  if (index < 0 || index >= segments.length - 1) return null;

  const result = segments.slice(0, index);
  result.push(segments.slice(index).join("."));
  return result.join(path.sep);
}

module.exports = adapter;
