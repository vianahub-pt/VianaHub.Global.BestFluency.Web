import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static-first: a aplicação inteira é exportada para HTML/CSS/JS estático (out/)
  // e servida por Nginx em container Docker. Não existe runtime Node em produção.
  output: "export",
  // URLs canónicas com barra final (convenção do projeto + SEO).
  trailingSlash: true,
  poweredByHeader: false,
  images: {
    // Otimização de imagens do Next requer servidor Node; com export estático
    // os assets são pré-otimizados (AVIF/WebP + srcset) na pipeline de assets.
    unoptimized: true,
  },
};

export default nextConfig;
