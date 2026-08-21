# Análise da especificação original — Best Fluency

Data da revisão: 5 de agosto de 2026

## 1. Parecer executivo

O documento original não deve ser utilizado diretamente como especificação oficial de implementação.

Ele contém bom material de base, textos aproveitáveis, decisões corretas de SEO e orientações visuais relevantes. Contudo, está estruturado como uma compilação de conversas e prompts sucessivos, com versões repetidas e algumas instruções contraditórias. O ficheiro tem 58 páginas, cerca de 990 parágrafos com conteúdo e praticamente todo o texto está formatado no estilo normal, sem hierarquia real de títulos.

### Decisão recomendada

- Preservar o documento como arquivo histórico e fonte de conteúdo.
- Não o entregar ao OpenCode como fonte oficial.
- Substituí-lo por uma especificação V2 única, curta o suficiente para ser operacional e completa o suficiente para não exigir invenções.
- Definir a landing page como a página principal `/`, porque nesta primeira fase será o único conteúdo do domínio.

## 2. O que deve ser mantido

### Posicionamento

- Aulas de inglês presenciais na Amadora e online.
- Ensino prático, próximo e personalizado.
- Atendimento a crianças, jovens e adultos.
- Inspiração subtil em viagem, jornada e embarque.
- Identidade visual em preto, branco e dourado.
- WhatsApp como principal canal de conversão.

### Conteúdo já consistente

- H1 focado em serviço, localização e benefício.
- Título SEO e meta description local.
- Secção Best Kids.
- Depoimentos reais em HTML.
- Apresentação da fundadora.
- Percurso visual em quatro etapas.
- FAQ em accordion acessível.
- CTA final inspirado num cartão de embarque premium.
- Proibição de inventar fotografias, avaliações, preços, horários ou dados da empresa.

### Requisitos técnicos acertados

- Apenas um H1.
- HTML semântico.
- Imagens otimizadas.
- Canonical, Open Graph, robots.txt e sitemap.xml.
- LocalBusiness sem Review ou AggregateRating.
- FAQPage opcional, sem promessa de resultado enriquecido.
- Build, lint, testes e verificação de TypeScript antes da entrega.

## 3. Problemas do documento atual

### 3.1 Repetição e versões concorrentes

O mesmo Hero, Best Kids, benefícios, depoimentos, jornada, FAQ e CTA aparecem em mais de uma versão. A exigência de FAQPage surge como obrigatória e, depois, como opcional. A rota aparece como `/aulas-de-ingles-amadora`, mas o próprio documento reconhece que a raiz `/` é melhor quando a landing page é a única página.

### 3.2 Estrutura orientada ao conteúdo, mas não à conversão

O documento explica bem a metodologia, porém demora a responder às perguntas comerciais mais importantes:

- Existem aulas individuais?
- Existem turmas?
- Qual é o limite de alunos?
- As aulas podem ser presenciais ou online?
- Onde são as aulas presenciais?
- Quanto dura cada aula?

Essas respostas devem aparecer na primeira área visível ou imediatamente abaixo do Hero.

### 3.3 Sobreposição entre metodologia e benefícios

A secção de metodologia tem cinco pontos e a secção de benefícios tem mais três. Vários conceitos repetem-se: personalização, continuidade, feedback, orientação e adaptação. Isso aumenta a página sem acrescentar nova informação.

Recomendação: fundir ambas numa única secção com quatro pilares.

### 3.4 Falta uma secção clara de modalidades

Para o atual modelo comercial, esta é a maior lacuna. A página precisa apresentar explicitamente:

- aulas individuais;
- turmas reduzidas com até 4 alunos;
- aulas presenciais na Amadora;
- aulas online.

Sem essa secção, o visitante pode não perceber rapidamente se a oferta corresponde ao que procura.

### 3.5 Falta uma secção local forte

A morada aparece apenas no FAQ. Para captar alunos na Amadora, deve existir uma secção própria com:

- Venda Nova, Amadora;
- Espaço CASA;
- Avenida Chaby Pinheiro, 5;
- fotografia real do espaço, quando disponível;
- link para abrir a localização no Google Maps;
- informação sobre acesso apenas quando confirmada.

### 3.6 Excesso de instruções visuais abertas

Há muitas indicações como avião, passaporte, globo, rota, pegadas, selo e cartão de embarque. Se todas forem usadas, a página pode parecer uma agência de viagens.

Recomendação: limitar a linguagem de viagem a três momentos:

1. detalhe discreto no Hero;
2. percurso de entrada;
3. CTA final.

### 3.7 Métricas e captação não estão especificadas

A página tem CTAs, mas não define como medir o resultado. Devem existir eventos para:

- clique no WhatsApp;
- origem do clique por secção;
- clique no telefone;
- clique na localização;
- abertura de FAQ;
- profundidade de scroll;
- campanhas por UTM.

### 3.8 Infraestrutura incompleta

O documento menciona Core Web Vitals, mas não define a arquitetura de produção para Docker, VPS e Cloudflare. A especificação V2 deve incluir:

- abordagem static-first;
- Docker multi-stage;
- servidor web Nginx ou equivalente;
- healthcheck;
- execução sem privilégios de root;
- Cloudflare em Full (strict);
- política de cache para assets versionados;
- compressão;
- headers de segurança;
- monitorização de disponibilidade e desempenho.

### 3.9 Privacidade e consentimento

Não há especificação para cookies, analytics ou pixels publicitários. Para a primeira versão, a solução mais simples é:

- utilizar Cloudflare Web Analytics para métricas básicas e Core Web Vitals;
- só ativar GA4, Google Ads ou Meta Pixel depois de implementar consentimento adequado para tecnologias não essenciais;
- disponibilizar política de privacidade e política de cookies.

### 3.10 Depoimentos e imagens

Os textos podem ser utilizados, mas fotografias e conteúdos provenientes do WhatsApp exigem autorização. Quando não existir fotografia autorizada, deve ser usado um avatar neutro com iniciais, sem inventar rostos.

## 4. Estrutura recomendada

1. Header compacto e fixo
2. Hero
3. Faixa de informações essenciais
4. Modalidades
5. Método e diferenciais combinados
6. Presença local na Amadora
7. Best Kids
8. Depoimentos
9. Fundadora
10. Como começar
11. FAQ
12. CTA final
13. Footer

## 5. Prioridades para a primeira versão

### Prioridade P0 — obrigatória para publicar

- Hero claro com CTA para WhatsApp.
- Individual e turmas até 4 alunos visíveis acima da dobra ou logo abaixo.
- Presencial na Amadora e online.
- Morada, telefone e WhatsApp corretos.
- Fotografias e logótipo reais.
- Responsive mobile-first.
- SEO técnico básico.
- Performance e acessibilidade.
- Docker e Cloudflare corretamente configurados.
- Medição dos cliques de conversão.

### Prioridade P1 — recomendada no lançamento

- Depoimentos.
- Fundadora.
- Best Kids.
- FAQ.
- Link para localização.
- Open Graph personalizado.
- Cloudflare Web Analytics.

### Prioridade P2 — fase seguinte

- teste de nível online;
- blog e biblioteca de conteúdos;
- páginas específicas por público e intenção;
- páginas para outros idiomas;
- automação de leads;
- área do aluno.

## 6. Conclusão

O documento original não deve ser descartado como conteúdo, mas deve ser descartado como especificação operacional. A solução correta é uma V2 consolidada, com uma só versão de cada texto, decisões técnicas definitivas e critérios mensuráveis.

A nova especificação encontra-se no ficheiro `landing-page-spec-v2.md`.
