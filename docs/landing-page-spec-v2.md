# Best Fluency — Especificação oficial da landing page V2

Versão: 2.0  
Data: 5 de agosto de 2026  
Estado: proposta consolidada para aprovação

> Este documento substitui todas as versões anteriores como fonte oficial de implementação. O ficheiro original deve permanecer apenas como histórico.

---

## 1. Contexto

A Best Fluency Language School está a iniciar a sua presença digital. Nesta primeira fase, o site terá uma única landing page destinada principalmente à captação de alunos em Portugal.

A oferta prioritária é:

- aulas de inglês personalizadas;
- aulas individuais;
- turmas reduzidas com um máximo de 8 alunos;
- aulas presenciais na Venda Nova, Amadora;
- aulas online;
- atendimento a crianças, jovens e adultos.

O principal canal de conversão será o WhatsApp.

---

## 2. Objetivo de negócio

### Objetivo principal

Gerar contactos qualificados de pessoas interessadas em aulas de inglês e conduzi-las para uma conversa no WhatsApp.

### Objetivos secundários

- apresentar a Best Fluency como uma escola profissional, próxima e moderna;
- reforçar a presença local na Amadora;
- explicar rapidamente modalidades, públicos e funcionamento;
- construir confiança através de depoimentos e da apresentação da fundadora;
- criar uma base técnica preparada para anúncios, SEO local e expansão futura.

### Conversão principal

Clique num CTA que abra o WhatsApp com mensagem automática contextualizada.

### Conversões secundárias

- clique no telefone;
- clique para abrir a localização;
- navegação até às modalidades;
- interação com o FAQ.

---

## 3. Público-alvo

### Público principal

- adultos em Portugal que pretendem melhorar o inglês para trabalho, entrevistas, viagens ou situações do dia a dia;
- residentes na Amadora e concelhos próximos que procuram aulas presenciais;
- pessoas em Portugal que preferem aulas online;
- pais e encarregados de educação que procuram aulas de inglês para crianças dos 6 aos 13 anos;
- jovens que necessitam de reforço, maior confiança ou prática de comunicação.

### Necessidades mais comuns

- começar do zero;
- perder o receio de falar;
- melhorar pronúncia e construção de frases;
- desenvolver inglês profissional;
- obter acompanhamento próximo;
- aprender num grupo pequeno;
- encontrar horários compatíveis com a rotina.

---

## 4. Decisões estratégicas baseadas no benchmarking

A landing page deve combinar princípios observados nas melhores referências do setor, sem copiar qualquer concorrente:

- modernidade visual e apresentação de marca;
- percurso guiado e sensação de evolução;
- organização comercial simples;
- proposta de valor direta;
- forte prova social;
- conteúdo local específico;
- carregamento rápido e experiência mobile-first.

A estratégia de acessos não depende apenas da landing page. A página deve converter tráfego proveniente de:

- Google Ads;
- Meta Ads;
- Google Business Profile e Google Maps;
- pesquisas locais;
- redes sociais;
- recomendações e links diretos.

Conteúdo editorial, teste de nível e páginas adicionais deverão ser tratados numa fase posterior para ampliar o tráfego orgânico.

---

## 5. Arquitetura da página

A página deverá seguir esta ordem:

1. Header
2. Hero
3. Faixa de informações essenciais
4. Modalidades
5. Método e diferenciais
6. Aulas presenciais na Amadora
7. Best Kids
8. Depoimentos
9. Fundadora
10. Como começar
11. FAQ
12. CTA final
13. Footer

### Decisão de URL

Como esta será inicialmente a única página do domínio, deverá ser publicada na raiz:

`/`

Não criar uma segunda rota com o mesmo conteúdo em `/aulas-de-ingles-amadora`.

---

## 6. Identidade visual

### Cores

Utilizar os valores oficiais da marca quando forem fornecidos. Até lá, manter tokens configuráveis, sem fixar tons definitivos no código.

Papéis cromáticos:

- preto: títulos, fundos de contraste e elementos premium;
- branco: área de leitura e respiro;
- dourado: destaque, rota, ícones e pequenos detalhes;
- cinzentos neutros: textos secundários, bordas e fundos suaves.

### Estilo

- moderno;
- elegante;
- premium sem ostentação;
- acolhedor;
- humano;
- profissional;
- claro e leve.

### Inspiração em viagem

A linguagem visual de viagem deve ser subtil e aparecer principalmente em:

1. detalhe de rota no Hero;
2. secção “Como começar”;
3. CTA final.

Elementos permitidos:

- avião em traço fino;
- rota pontilhada;
- pequeno selo inspirado num passaporte;
- recorte subtil de cartão de embarque;
- globo minimalista;
- pontos de percurso.

Evitar utilizar todos os elementos ao mesmo tempo.

### Proibições

- não copiar concorrentes;
- não utilizar a imagem de referência no site;
- não transformar a página numa agência de viagens;
- não usar excesso de dourado;
- não utilizar animações pesadas;
- não inventar fotografias ou rostos;
- não utilizar fotografias genéricas de crianças como principal identidade da Best Kids quando a Faísca estiver disponível.

---

## 7. Header

### Conteúdo

- logótipo da Best Fluency;
- links âncora: Modalidades, Método, Best Kids, Depoimentos, FAQ;
- botão: `Marcar aula experimental`.

### Comportamento

- compacto;
- sticky após o início do scroll;
- fundo sólido ou com leve transparência apenas se o contraste permanecer adequado;
- menu móvel acessível;
- fechar o menu depois de selecionar uma âncora;
- respeitar `prefers-reduced-motion`.

### CTA do header

Mensagem:

`Olá! Gostaria de marcar uma aula experimental de inglês na Best Fluency.`

---

## 8. Hero

### Eyebrow

`BEST FLUENCY LANGUAGE SCHOOL · AMADORA E ONLINE`

### H1

`Aulas de inglês na Amadora e online para comunicar com confiança`

### Texto principal

`Aulas práticas e personalizadas para crianças, jovens e adultos, em formato individual ou em turmas reduzidas com um máximo de 8 alunos.`

### Texto complementar

`Desenvolva a comunicação para o trabalho, os estudos, as viagens e as situações do dia a dia.`

### CTA principal

`Marcar aula experimental`

Mensagem do WhatsApp:

`Olá! Gostaria de marcar uma aula experimental de inglês na Best Fluency.`

### CTA secundário

Link textual ou botão de menor destaque:

`Conhecer as modalidades`

Destino: âncora da secção de modalidades.

### Imagem

Preferência:

- fotografia institucional real que represente ensino, proximidade e profissionalismo;
- pode incluir a Taty num contexto de aula ou comunicação;
- não utilizar stock genérico se existir fotografia real adequada.

Alt sugerido, sujeito à imagem escolhida:

`Professora da Best Fluency durante uma aula de inglês personalizada`

### Requisitos

- CTA principal visível sem scroll em telemóveis comuns;
- título sem quebra excessiva;
- imagem principal com dimensões reservadas;
- sem vídeo automático;
- elemento decorativo de rota discreto;
- carregamento prioritário apenas para a imagem principal.

---

## 9. Faixa de informações essenciais

Apresentar imediatamente abaixo do Hero, em quatro itens curtos:

- `Aulas individuais`
- `Turmas até 4 alunos`
- `Presencial na Amadora`
- `Aulas online`

Opcional, caso não torne a área excessivamente carregada:

- `Aulas de 50 minutos`

### Requisitos

- legível sem depender de hover;
- ícones simples;
- uma ou duas linhas no telemóvel;
- não utilizar carrossel.

---

## 10. Modalidades

### H2

`Escolha a modalidade mais adequada ao seu percurso`

### Introdução

`As aulas são organizadas de acordo com o nível, os objetivos e a disponibilidade dos alunos.`

### Card 1 — Aulas individuais

Título:

`Acompanhamento totalmente personalizado`

Texto:

`Conteúdos, ritmo e prática ajustados às necessidades de um único aluno, com espaço para trabalhar dificuldades específicas e objetivos pessoais ou profissionais.`

Indicação visual:

`Presencial ou online`

CTA:

`Quero saber mais sobre aulas individuais`

Mensagem:

`Olá! Gostaria de receber informações sobre as aulas individuais de inglês da Best Fluency.`

### Card 2 — Turmas reduzidas

Título:

`Aprender e praticar num grupo pequeno`

Texto:

`Turmas organizadas por nível, com um máximo de 8 alunos, para permitir participação, interação e acompanhamento próximo.`

Indicação visual:

`Sujeito à formação de turma e disponibilidade`

CTA:

`Quero saber mais sobre as turmas`

Mensagem:

`Olá! Gostaria de receber informações sobre as turmas de inglês da Best Fluency.`

### Requisitos

- dois cards principais;
- lado a lado no desktop;
- empilhados no telemóvel;
- CTA contextual em cada card;
- não incluir preços nesta fase;
- não afirmar disponibilidade imediata de turmas sem confirmação.

---

## 11. Método e diferenciais

Esta secção substitui as antigas secções separadas de metodologia e benefícios.

### H2

`Um percurso de aprendizagem pensado para evoluir`

### Introdução

`Cada aluno tem um ponto de partida, um ritmo e objetivos diferentes. Por isso, as aulas são organizadas para criar continuidade, prática e orientação em cada etapa.`

### Pilar 1 — Percurso personalizado

`Os conteúdos e as atividades são definidos de acordo com o nível, as necessidades e a evolução do aluno.`

### Pilar 2 — Prática com propósito

`O inglês é utilizado progressivamente em situações úteis para o trabalho, os estudos, as viagens e o dia a dia.`

### Pilar 3 — Continuidade e feedback

`Cada aula dá seguimento ao conteúdo anterior, com correções e orientações que tornam os próximos passos claros.`

### Pilar 4 — Pronúncia e confiança

`O aluno recebe apoio para construir frases, melhorar a pronúncia e comunicar com maior segurança.`

### Requisitos

- quatro blocos ou cards;
- ícones lineares;
- textos curtos;
- sem animação excessiva;
- não repetir os mesmos argumentos noutras secções.

---

## 12. Aulas presenciais na Amadora

### H2

`Aulas de inglês presenciais na Venda Nova, Amadora`

### Texto

`As aulas presenciais decorrem no Espaço CASA, na Avenida Chaby Pinheiro, 5, Venda Nova — Amadora.`

`Um espaço próximo e acolhedor para aprender inglês com acompanhamento personalizado.`

### Informações

- `Espaço CASA`
- `Avenida Chaby Pinheiro, 5`
- `Venda Nova — Amadora`
- telefone: `+351 21 474 4028`

### CTA

`Ver localização`

O link definitivo do Google Maps deve ser fornecido e confirmado antes da publicação.

### Imagem

Utilizar fotografia real da sala, da entrada ou do espaço, caso exista autorização.

### Requisitos

- não incorporar um mapa pesado na primeira versão;
- utilizar link para Google Maps;
- não inventar código postal, estacionamento, transportes ou acessibilidade física;
- mostrar a morada no HTML;
- a configuração do Google Business Profile deverá ser tratada separadamente de acordo com a elegibilidade real da localização.

---

## 13. Best Kids

### H2

`Aulas de inglês para crianças com a Best Kids`

### Texto principal

`Na Best Kids, cada aula transforma o inglês numa nova descoberta. Com a ajuda da Faísca, a nossa raposa curiosa, as crianças aprendem através de jogos, histórias, imagens, músicas e desafios adaptados à sua idade.`

`As atividades ajudam a desenvolver vocabulário, compreensão, pronúncia e confiança para utilizar o inglês de forma natural e progressiva.`

### Frase de destaque

`Com a Faísca, o inglês vai com eles para todo o lado.`

### Diferenciais

#### Aprendizagem envolvente

`Jogos, histórias, músicas e atividades que despertam a curiosidade.`

#### Conteúdos por idade e nível

`Aulas adaptadas ao desenvolvimento e ao ritmo de cada criança.`

#### Contacto com o inglês desde o início

`Palavras, expressões e situações do dia a dia apresentadas de forma progressiva.`

#### Confiança para comunicar

`Um ambiente positivo que incentiva a participação e a expressão oral.`

### Informações práticas

- `Crianças dos 6 aos 13 anos`
- `Aulas presenciais na Venda Nova, Amadora`
- `Aulas online disponíveis`
- `Turmas organizadas por idade e nível`

### CTA

`Conhecer a Best Kids`

Mensagem:

`Olá! Gostaria de receber mais informações sobre as aulas Best Kids.`

### Imagem

Asset real da Faísca.

Alt:

`Faísca, mascote da Best Kids, nas aulas de inglês para crianças`

### Requisitos

- a Faísca deve ser o principal elemento visual;
- manter a identidade geral em preto, branco e dourado;
- utilizar elementos infantis apenas como detalhe;
- não apresentar a aprendizagem apenas como entretenimento.

---

## 14. Depoimentos

### H2

`O que dizem os alunos da Best Fluency`

### Subtítulo

`Experiências reais de quem está a aprender e a evoluir connosco.`

### Pedro António

Origem: `Avaliação Google`  
Classificação: `5 estrelas`

> “Aprendo muito com a teacher Taty.”

### Sandro Vite

Origem: `Avaliação Google`  
Classificação: `5 estrelas`

> “Incrível, um ensino muito bem aplicado e de maneira simples e objetiva.”

### Maurício Moura

Origem: `Depoimento via WhatsApp`

> “A teacher possui vasto conhecimento da língua inglesa e facilidade para transferir esse conhecimento para os alunos, de uma forma descontraída.”

### Wanda Ramos

Origem: `Depoimento via WhatsApp`

> “Foi tudo muito explícito, com conteúdo de fácil perceção. A professora Taty deixou-me muito à vontade para tirar as minhas dúvidas sem vergonha ou receio de errar.”

### Requisitos

- utilizar `<blockquote>` e `<cite>`;
- fotografias apenas quando autorizadas;
- avatar com iniciais quando não existir fotografia autorizada;
- não inventar datas, profissões ou localizações;
- estrelas apenas para avaliações que vieram do Google;
- não implementar Review ou AggregateRating no JSON-LD;
- 2 × 2 no desktop, 2 por linha no tablet e 1 por linha no telemóvel;
- sem carrossel automático.

### CTA após a grelha

`Marcar aula experimental`

Mensagem:

`Olá! Gostaria de marcar uma aula experimental de inglês na Best Fluency.`

---

## 15. Fundadora

### H2

`Conheça a fundadora da Best Fluency`

### Texto

`Olá, sou a Taty Viana. Sou engenheira de formação e fundadora da Best Fluency Language School.`

`A minha experiência profissional em empresas multinacionais e contextos internacionais mostrou-me, na prática, como os idiomas podem abrir portas no trabalho, nos estudos, nas viagens e na vida pessoal.`

`Foi com esse propósito que criei a Best Fluency: ajudar cada aluno a aprender de forma próxima, prática e orientada para os seus objetivos.`

### Imagem

Fotografia real e autorizada da Taty Viana.

Alt:

`Taty Viana, fundadora da Best Fluency Language School`

### Requisitos

- fotografia e texto lado a lado no desktop;
- texto antes ou depois da imagem no mobile conforme os testes de leitura;
- não incluir afirmações profissionais que não possam ser comprovadas;
- tom próximo, sem biografia longa.

---

## 16. Como começar

### H2

`Como começar as aulas de inglês na Best Fluency`

### Subtítulo

`Da primeira mensagem à primeira aula, acompanhamos cada passo do seu percurso.`

### Etapa 1 — Abra a conversa

`Envie-nos uma mensagem pelo WhatsApp e conte-nos o que procura, os seus objetivos e a sua disponibilidade.`

### Etapa 2 — Descubra o seu ponto de partida

`Numa breve conversa, identificamos o nível atual e as principais necessidades de aprendizagem.`

### Etapa 3 — Trace a sua rota

`Definimos a modalidade, os conteúdos e um percurso de aprendizagem adaptado aos objetivos do aluno.`

### Etapa 4 — Comece a avançar

`Inicie as aulas e acompanhe a evolução com prática, orientação e feedback contínuo.`

### CTA

`Dar o primeiro passo`

Mensagem:

`Olá! Gostaria de receber informações sobre as aulas da Best Fluency.`

### Conceito visual

- linha ou rota dourada;
- quatro paragens;
- pequeno avião ou pegadas discretas da Faísca;
- horizontal no desktop;
- vertical no telemóvel;
- animação apenas quando não houver preferência por movimento reduzido.

---

## 17. FAQ

### H2

`Perguntas frequentes sobre as aulas da Best Fluency`

### Subtítulo

`Encontre respostas rápidas sobre as aulas de inglês presenciais na Amadora e online.`

### Pergunta 1 — Onde decorrem as aulas presenciais?

`As aulas presenciais decorrem no Espaço CASA, na Avenida Chaby Pinheiro, 5, Venda Nova — Amadora.`

### Pergunta 2 — Também existem aulas online?

`Sim. A Best Fluency disponibiliza aulas online para alunos que procuram maior flexibilidade ou que não conseguem deslocar-se ao espaço presencial.`

### Pergunta 3 — Existem aulas individuais e em grupo?

`Sim. Existem aulas individuais e turmas reduzidas, organizadas de acordo com o nível e a disponibilidade dos alunos.`

### Pergunta 4 — Quantos alunos existem em cada turma?

`As turmas têm um máximo de 8 alunos, permitindo maior participação e acompanhamento durante as aulas.`

### Pergunta 5 — Para quem são as aulas?

`Existem aulas para crianças, jovens e adultos, com conteúdos definidos de acordo com a idade, o nível e os objetivos de cada aluno.`

### Pergunta 6 — Preciso de saber inglês para começar?

`Não. As aulas são adequadas tanto para iniciantes como para alunos que já possuem conhecimentos de inglês e pretendem continuar a evoluir.`

### Pergunta 7 — Como é identificado o meu nível?

`Antes do início das aulas, realizamos uma breve conversa para compreender os conhecimentos atuais, as principais dificuldades e os objetivos do aluno.`

### Pergunta 8 — As aulas são personalizadas?

`Sim. Os conteúdos, as atividades e o ritmo das aulas são ajustados ao nível, às necessidades e à evolução de cada aluno.`

### Pergunta 9 — Quanto tempo dura cada aula?

`Cada aula tem a duração de 50 minutos, com foco na prática, na participação e na evolução contínua.`

### Pergunta 10 — Como funciona a aula experimental?

`A aula experimental permite conhecer a abordagem da Best Fluency, esclarecer dúvidas e perceber como o ensino pode ser adaptado aos objetivos do aluno.`

### Pergunta 11 — Como posso marcar uma aula?

`Basta clicar num botão do WhatsApp e indicar o tipo de aula pretendido e a disponibilidade.`

### Comportamento do accordion

- todas as respostas fechadas inicialmente;
- apenas uma resposta aberta de cada vez;
- interação por rato, toque e teclado;
- utilizar botão real para cada pergunta;
- utilizar `aria-expanded` e `aria-controls`;
- foco visível;
- ícone `+` fechado e `−` aberto;
- animação curta;
- sem deslocamento inesperado da página.

### Dados estruturados

O conteúdo deve existir em HTML. `FAQPage` em JSON-LD é opcional e não deve ser tratado como fonte provável de rich result para esta escola.

---

## 18. CTA final

### Eyebrow

`PRONTO PARA EMBARCAR?`

### H2

`O seu próximo passo no inglês começa aqui`

### Texto

`Fale connosco pelo WhatsApp, esclareça as suas dúvidas e descubra a modalidade mais adequada ao seu nível, aos seus objetivos e à sua rotina.`

### Botão

`Marcar aula experimental`

Mensagem:

`Olá! Gostaria de receber informações e marcar uma aula experimental de inglês na Best Fluency.`

### Informação complementar

`Aulas presenciais na Amadora e online.`

### Conceito visual

- cartão de embarque premium original;
- fundo de alto contraste;
- linha pontilhada e avião em traço fino;
- selo discreto;
- bastante espaço visual;
- um único CTA principal.

---

## 19. Footer

### Conteúdo obrigatório

- logótipo;
- `Best Fluency Language School`;
- `Avenida Chaby Pinheiro, 5, Venda Nova — Amadora`;
- `+351 21 474 4028`;
- link para WhatsApp;
- links sociais oficiais confirmados;
- Política de Privacidade;
- Política de Cookies;
- ano atual;
- direitos reservados.

### Requisitos

- telefone clicável com `tel:`;
- WhatsApp com mensagem automática;
- redes sociais apenas quando os URLs forem confirmados;
- não inventar NIF, email, horários ou links.

---

## 20. Integração com WhatsApp

### Número

`351214744028`

O número deve ser validado em produção antes da publicação.

### Formato

Utilizar links `https://wa.me/` com mensagem codificada e abertura numa nova aba.

### Segurança e acessibilidade

- `rel="noopener noreferrer"`;
- `aria-label` contextual;
- foco visível;
- área de toque mínima adequada;
- não utilizar widget de chat pesado na primeira versão.

### Eventos de conversão

Registar pelo menos:

- `whatsapp_click`;
- parâmetro `section`;
- parâmetro `cta_label`;
- parâmetro `modality`, quando aplicável;
- parâmetros UTM da sessão, quando disponíveis.

Exemplos de `section`:

- `header`;
- `hero`;
- `individual`;
- `group`;
- `best_kids`;
- `testimonials`;
- `journey`;
- `final_cta`.

---

## 21. SEO

### Title

`Aulas de Inglês na Amadora e Online | Best Fluency`

### Meta description

`Aulas de inglês presenciais na Venda Nova, Amadora, e online para crianças, jovens e adultos. Opções individuais e turmas até 4 alunos.`

### Canonical

Canonical absoluta para a raiz HTTPS do domínio definitivo.

### H1

Apenas um H1:

`Aulas de inglês na Amadora e online para comunicar com confiança`

### Requisitos

- `<html lang="pt-PT">`;
- conteúdo principal presente no HTML renderizado;
- sem `noindex` em produção;
- `robots.txt`;
- `sitemap.xml` com a raiz;
- Open Graph;
- Twitter/X card quando aplicável;
- favicon e ícones;
- imagens sociais com dimensões corretas;
- links rastreáveis com elementos `<a>`;
- sem conteúdo duplicado noutra rota;
- palavras-chave utilizadas naturalmente.

### Palavras e intenções locais

- aulas de inglês na Amadora;
- aulas de inglês em Venda Nova;
- escola de inglês na Amadora;
- aulas de inglês presenciais;
- aulas de inglês online em Portugal;
- aulas individuais de inglês;
- turmas de inglês reduzidas;
- inglês para crianças na Amadora.

Não repetir as expressões de forma artificial.

### Dados estruturados

Implementar JSON-LD com dados reais, preferencialmente com tipos compatíveis com organização educativa e negócio local.

Dados confirmados:

- name: `Best Fluency Language School`;
- telephone: `+351 21 474 4028`;
- streetAddress: `Avenida Chaby Pinheiro, 5`;
- addressLocality: `Amadora`;
- addressRegion: `Lisboa`;
- addressCountry: `PT`;
- url: domínio definitivo;
- image/logo: URL absoluta do asset definitivo.

Adicionar apenas após confirmação:

- código postal;
- coordenadas;
- horários;
- email;
- perfis sociais.

Não adicionar:

- Review;
- AggregateRating;
- avaliações inventadas;
- preços não confirmados.

### SEO local externo

Após a publicação:

- configurar Google Search Console;
- enviar sitemap;
- verificar indexação;
- manter nome, morada e telefone consistentes;
- alinhar o Google Business Profile com a elegibilidade real da localização;
- utilizar URLs com UTM nas campanhas.

---

## 22. Medição e analytics

### Fase inicial recomendada

Ativar Cloudflare Web Analytics para:

- visitas;
- páginas vistas;
- origens de tráfego;
- dispositivos;
- países;
- Core Web Vitals reais.

### Conversões de marketing

GA4, Google Ads e Meta Pixel poderão ser adicionados quando houver:

- plano de medição aprovado;
- consentimento para tecnologias não essenciais;
- política de privacidade e cookies atualizada;
- mecanismo para aceitar, recusar e alterar preferências.

### KPIs

- visitas por canal;
- taxa de clique no WhatsApp;
- cliques por secção;
- contactos qualificados;
- custo por contacto por campanha;
- percentagem mobile;
- LCP, INP e CLS no percentil 75.

---

## 23. Acessibilidade

### Requisitos mínimos

- WCAG 2.2 AA como referência;
- contraste suficiente;
- navegação completa por teclado;
- ordem de foco lógica;
- foco visível;
- skip link para conteúdo principal;
- landmarks semânticos;
- um H1 e hierarquia de headings coerente;
- alt descritivo para imagens informativas;
- `alt=""` para elementos decorativos;
- ícones acompanhados por texto ou nome acessível;
- accordion acessível;
- menu móvel acessível;
- não depender apenas da cor;
- respeitar `prefers-reduced-motion`;
- área de toque confortável;
- zoom e tamanho de texto sem quebra do layout.

---

## 24. Responsividade

### Mobile-first

A página deve ser projetada inicialmente para telemóvel.

### Telemóvel

- uma coluna;
- CTA principal amplo;
- Hero sem altura excessiva;
- texto antes de elementos decorativos;
- cards empilhados;
- rota vertical;
- menu condensado;
- detalhes decorativos reduzidos.

### Tablet

- grelhas de duas colunas quando houver espaço;
- depoimentos 2 por linha;
- margens equilibradas.

### Desktop

- largura máxima de conteúdo consistente;
- grelhas equilibradas;
- textos com comprimento de linha confortável;
- Hero em duas colunas;
- rota horizontal.

### Breakpoints

Devem seguir o sistema do framework. Não criar breakpoints arbitrários sem necessidade.

---

## 25. Performance

### Estratégia

- página static-first;
- JavaScript apenas para interações necessárias;
- evitar bibliotecas pesadas para animação;
- sem vídeo automático;
- sem mapa incorporado;
- sem widget de WhatsApp de terceiros;
- sem carrossel;
- fontes locais ou cuidadosamente otimizadas;
- imagens em AVIF ou WebP com fallback quando necessário;
- `srcset` e `sizes`;
- dimensões explícitas;
- lazy loading abaixo da dobra;
- imagem LCP descoberta no HTML e priorizada;
- CSS crítico eficiente;
- assets com nomes versionados.

### Metas de experiência real

No percentil 75:

- LCP: até 2,5 s;
- INP: até 200 ms;
- CLS: até 0,1.

### Metas de auditoria antes do lançamento

Executar três testes mobile em ambiente de produção e utilizar a mediana:

- Lighthouse Performance: mínimo 90;
- Accessibility: mínimo 95;
- Best Practices: mínimo 95;
- SEO: mínimo 95;
- sem erros críticos no console;
- sem imagens desproporcionais;
- sem layout shift perceptível.

---

## 26. Arquitetura técnica

### Abordagem recomendada

Para uma única landing page sem área administrativa, utilizar uma aplicação static-first.

Se o projeto já estiver em Next.js, utilizar renderização estática e componentes de servidor sempre que possível. Se o projeto ainda não existir, o OpenCode deve comparar uma implementação estática em Next.js com uma alternativa como Astro e justificar a escolha antes de iniciar.

### Não incluir nesta fase

- base de dados;
- autenticação;
- CMS;
- API própria;
- formulário interno;
- processamento de pagamentos.

### Estrutura de componentes sugerida

- `Header`
- `Hero`
- `InfoStrip`
- `Modalities`
- `Method`
- `LocalSection`
- `BestKids`
- `Testimonials`
- `Founder`
- `Journey`
- `Faq`
- `FinalCta`
- `Footer`
- `WhatsAppLink`
- `JsonLd`

### Conteúdo

Centralizar textos e dados comerciais num ficheiro tipado ou módulo de conteúdo, evitando mensagens divergentes entre componentes.

---

## 27. Docker e VPS Hostinger

### Docker

- build multi-stage;
- imagem final pequena;
- dependências de desenvolvimento fora da imagem final;
- execução como utilizador não-root;
- healthcheck;
- `restart: unless-stopped` no Compose;
- logs para stdout/stderr;
- versões de imagens fixadas;
- `.dockerignore`;
- nenhuma credencial dentro da imagem;
- build reproduzível.

### Servidor web

Para conteúdo estático, utilizar Nginx ou equivalente com:

- compressão na origem;
- headers de cache;
- fallback correto apenas quando necessário;
- página 404;
- security headers;
- endpoint de saúde.

### Deploy

- domínio apontado para o IP da VPS;
- portas públicas apenas 80 e 443;
- aplicação não exposta diretamente numa porta de desenvolvimento;
- atualização por pipeline ou script reprodutível;
- possibilidade de rollback;
- backup da configuração;
- validação após deploy.

---

## 28. Cloudflare

### DNS e SSL

- proxy Cloudflare ativo;
- SSL/TLS em `Full (strict)`;
- certificado válido na origem;
- redirecionamento HTTP para HTTPS;
- considerar HSTS apenas depois de validar totalmente HTTPS e subdomínios;
- TLS mínimo conforme a política definida.

### Cache

- assets com hash: cache longo e `immutable`;
- HTML: browser com revalidação;
- cache de HTML no edge apenas com regra e processo de purge validados;
- purgar o cache após deploy quando necessário;
- não aplicar cache indiscriminado a caminhos futuros que possam ter conteúdo privado.

### Performance

- compressão Brotli/Zstandard/Gzip conforme suporte do plano e do cliente;
- HTTP/3 quando disponível;
- otimização de imagens apenas se compatível com o plano e sem duplicar o trabalho do framework;
- verificar o estado `CF-Cache-Status` dos assets.

### Segurança

- WAF e proteções de bots adequadas ao plano;
- headers como CSP, `X-Content-Type-Options`, `Referrer-Policy` e proteção contra framing;
- limitar o acesso direto à origem quando operacionalmente viável;
- não ativar recursos que modifiquem JavaScript sem testes completos.

### Monitorização

- Cloudflare Web Analytics;
- Core Web Vitals;
- uptime externo;
- alertas de indisponibilidade e certificado.

---

## 29. Privacidade

### Páginas obrigatórias

- Política de Privacidade;
- Política de Cookies.

### Analytics e publicidade

- não carregar pixels ou cookies não essenciais antes da decisão do utilizador quando for exigido consentimento;
- permitir aceitar e recusar com clareza equivalente;
- permitir alterar a escolha posteriormente;
- documentar fornecedores e finalidades;
- evitar scripts de terceiros desnecessários.

### WhatsApp

A página deve informar, na política de privacidade, que ao clicar no WhatsApp o utilizador será encaminhado para um serviço externo sujeito às políticas desse fornecedor.

---

## 30. Assets

### Obrigatórios

- logótipo vetorial ou PNG de alta qualidade;
- Faísca;
- fotografia da Taty;
- fotografia principal do Hero;
- fotografias autorizadas dos alunos ou avatares com iniciais;
- fotografia do Espaço CASA;
- imagem Open Graph;
- favicon.

### Estrutura sugerida

```text
public/assets/brand/logo-best-fluency.svg
public/assets/brand/faisca.webp
public/assets/people/taty-viana.webp
public/assets/people/hero-best-fluency.webp
public/assets/location/espaco-casa.webp
public/assets/testimonials/pedro.webp
public/assets/testimonials/sandro.webp
public/assets/testimonials/mauricio.webp
public/assets/testimonials/wanda.webp
public/assets/social/og-best-fluency.jpg
```

### Regras

- não inventar rostos;
- não utilizar prints de WhatsApp na grelha principal;
- remover metadados desnecessários das imagens;
- preservar autorização de uso;
- definir ponto focal para recortes responsivos.

---

## 31. Informações pendentes

A implementação não deve inventar os seguintes dados:

- domínio definitivo;
- URL definitiva do Google Maps;
- códigos hexadecimais oficiais da marca;
- tipografia oficial;
- código postal;
- horários;
- email oficial;
- links sociais;
- confirmação de que o número fixo recebe WhatsApp;
- condição comercial da aula experimental;
- disponibilidade atual das turmas;
- fotografias autorizadas;
- consentimento para utilizar nomes e depoimentos;
- regras de estacionamento, transportes e acessibilidade física;
- dados legais para Política de Privacidade.

---

## 32. Critérios de aceitação

### Conteúdo e conversão

- [ ] O Hero explica serviço, público, localização, individual e grupos até 8.
- [ ] O CTA principal abre o WhatsApp com a mensagem correta.
- [ ] Cada modalidade tem CTA contextual.
- [ ] A morada aparece fora do FAQ.
- [ ] Não existem preços ou dados inventados.
- [ ] Todos os depoimentos correspondem ao conteúdo aprovado.
- [ ] Fotografias têm autorização ou são substituídas por iniciais.

### SEO

- [ ] Apenas um H1.
- [ ] Title e meta description corretos.
- [ ] Canonical absoluta para `/`.
- [ ] `lang="pt-PT"`.
- [ ] Open Graph e favicon.
- [ ] robots.txt e sitemap.xml.
- [ ] JSON-LD válido e sem ratings em benefício próprio.
- [ ] Conteúdo principal no HTML renderizado.

### Acessibilidade

- [ ] Navegação por teclado completa.
- [ ] Foco visível.
- [ ] Contraste AA.
- [ ] Alt adequado.
- [ ] Accordion acessível.
- [ ] Menu móvel acessível.
- [ ] Movimento reduzido respeitado.

### Performance

- [ ] Imagem LCP priorizada.
- [ ] Imagens abaixo da dobra em lazy load.
- [ ] Dimensões de imagens definidas.
- [ ] Sem vídeo automático, mapa incorporado ou widget pesado.
- [ ] Lighthouse dentro das metas definidas.
- [ ] Build de produção sem erros.

### Infraestrutura

- [ ] Docker multi-stage.
- [ ] Container non-root.
- [ ] Healthcheck.
- [ ] HTTPS Full (strict).
- [ ] Cache de assets versionados.
- [ ] Headers de segurança.
- [ ] Analytics e uptime configurados.

### QA

- [ ] Build executado.
- [ ] Lint executado.
- [ ] Testes executados.
- [ ] TypeScript sem erros, quando aplicável.
- [ ] Testes em telemóvel, tablet e desktop.
- [ ] Teste em Chrome, Edge, Firefox e Safari ou serviço equivalente.
- [ ] Links e mensagens de WhatsApp validados.
- [ ] Dados estruturados validados.
- [ ] Nenhum erro crítico no console.

---

## 33. Prompt de planeamento para o OpenCode

```text
Leia integralmente:

@docs/landing-page-spec-v2.md
@design-reference/best-fluency-travel-style.jpeg

O documento V2 é a única fonte oficial de requisitos. A imagem é apenas moodboard e não pode ser publicada nem copiada.

Antes de alterar qualquer ficheiro:

1. Analise a arquitetura atual do projeto.
2. Identifique framework, rotas, estilos, componentes e pipeline de build.
3. Confirme se o projeto é novo ou existente.
4. Compare a melhor abordagem static-first compatível com a infraestrutura Docker/VPS.
5. Confirme a publicação na raiz `/` e identifique possíveis rotas duplicadas.
6. Liste os assets e dados ainda ausentes.
7. Proponha a arquitetura de componentes.
8. Proponha a estratégia de conteúdo centralizado e tipado.
9. Proponha SEO, JSON-LD, robots.txt, sitemap.xml e Open Graph.
10. Proponha analytics, eventos de conversão e privacidade.
11. Proponha Docker, reverse proxy, healthcheck, cache e configuração Cloudflare.
12. Identifique ambiguidades ou riscos.
13. Apresente um plano por etapas, com critérios de validação.

Não altere ficheiros nesta fase.
Não invente textos, dados comerciais, contactos, fotografias, horários, preços, coordenadas ou avaliações.
Aguarde aprovação.
```

---

## 34. Prompt de implementação para o OpenCode

```text
Implemente o plano aprovado utilizando como fonte oficial:

@docs/landing-page-spec-v2.md
@design-reference/best-fluency-travel-style.jpeg

A referência visual deve ser utilizada apenas como inspiração. Crie uma solução original para a Best Fluency.

Requisitos obrigatórios:

- português de Portugal;
- landing page publicada na raiz `/`;
- apenas um H1;
- mobile-first;
- HTML semântico e acessível;
- individual e turmas até 8 visíveis no início da página;
- presencial na Amadora e online;
- CTAs de WhatsApp contextuais;
- identidade em preto, branco e dourado;
- inspiração subtil em viagem;
- SEO técnico e local;
- LocalBusiness/organização educativa apenas com dados confirmados;
- sem Review ou AggregateRating;
- depoimentos em HTML;
- imagens otimizadas;
- Core Web Vitals;
- eventos de conversão;
- Docker de produção;
- configuração documentada para Cloudflare;
- nenhuma informação inventada.

Ao terminar:

1. Execute o build.
2. Execute lint.
3. Execute os testes existentes.
4. Verifique erros de TypeScript.
5. Execute a auditoria de acessibilidade disponível.
6. Execute três auditorias Lighthouse mobile e apresente a mediana.
7. Valide links e mensagens de WhatsApp.
8. Valide JSON-LD, robots.txt e sitemap.xml.
9. Liste todos os ficheiros criados e alterados.
10. Informe requisitos não implementados e respetivo motivo.
11. Liste assets e informações ainda pendentes.
12. Documente os passos de deploy Docker e configuração Cloudflare.
```
