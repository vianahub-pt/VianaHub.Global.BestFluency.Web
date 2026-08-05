/**
 * Dados estruturados JSON-LD renderizados no HTML estático.
 * O conteúdo é sempre construído a partir de dados confirmados (spec §21).
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
