/**
 * Secção decorativa de scroll parallax entre Hero e Modalidades.
 *
 * Efeito clássico: o fundo fica fixo no viewport (`background-attachment:
 * fixed`) enquanto a página rola sobre ele — a imagem não se move e o
 * conteúdo das secções vizinhas passa por cima, criando profundidade.
 *
 * - `bg-contain` + `bg-center`: mostra a imagem POR INTEIRO (panorâmica
 *   8704×2176, 4:1), sem cortar nem esticar, centralizada;
 * - `bg-no-repeat`: padrão único, sem tiling;
 * - implementação 100% CSS (Server Component, sem JS): sem dependência de
 *   scroll events/reduce-motion; `background-attachment: fixed` não é uma
 *   animação, pelo que não é bloqueada por `prefers-reduced-motion`;
 * - em navegadores mobile-iOS (que ignoram `background-attachment: fixed`)
 *   a imagem continua visível por inteiro, apenas rola com a página
 *   (degradação aceitável — efeito é decorativo e mobile-first);
 * - decorativa: aria-hidden e sem heading (não cria landmark).
 */
export function ParallaxBand() {
  return (
    <div
      aria-hidden="true"
      className="relative h-[25vh] min-h-[280px] w-full bg-fixed bg-left bg-no-repeat md:h-[45vh]"
      style={{ backgroundImage: "url('/paralax-1.jpg')" }}
    />
  );
}
