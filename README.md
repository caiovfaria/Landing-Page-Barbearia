# Norte | Barbearia & Clube

Site institucional de página única (one-page) para a barbearia Norte, com catálogo de produtos, carrinho local e interface de solicitação de agendamento.

## 📁 Estrutura do projeto

```
Landing-Page-Barbearia/
├── .gitignore
├── LICENSE
├── favicon.svg        # Favicon simples derivado da marca visual
├── index.html          # Página principal (one-page: hero, serviços, cortes, loja...)
├── robots.txt          # Regras públicas de rastreamento
├── sitemap.xml         # Mapa das três páginas públicas; exige domínio antes do deploy
├── styles.css          # Todos os estilos (light/dark mode e responsivo)
├── script.js           # Toda a lógica e interatividade da página principal
└── pages/
    ├── agendamento.html
    └── produtos.html
```

`index.html`, `styles.css` e `script.js` precisam ficar **na mesma pasta** (raiz do projeto), pois `index.html` referencia os outros dois via caminho relativo.

## 🚀 Como rodar

Não há build nem dependências para instalar. Basta abrir o `index.html` no navegador:

- **Direto**: dê duplo clique em `index.html`, ou
- **Servidor local** (recomendado, evita eventuais bloqueios de CORS do navegador):
  ```bash
  cd norte
  python3 -m http.server 8000
  ```
  Depois acesse `http://localhost:8000`.

## 🧩 Seções da página

| Seção | Descrição |
|---|---|
| Header | Navegação, alternância de tema, carrinho e agendamento |
| Hero | Chamada principal com foto e selo de avaliação |
| Ticker | Faixa animada com frases institucionais |
| História | Texto sobre a barbearia + anos de atuação |
| Serviços | Cards de serviços (Corte, Barba, Combo, Ritual premium) |
| Cortes | Galeria de inspirações de cortes |
| Depoimento | Citação de cliente |
| Loja | Grade de 20 produtos com paginação (8 por página) |
| Footer | Contato, endereço e horários |

## 📄 Páginas internas (`pages/`)

Além da página principal, o projeto tem 2 páginas avulsas que reaproveitam os mesmos estilos e reforçam fluxos específicos:

| Página | Descrição |
|---|---|
| `pages/agendamento.html` | Página dedicada com a mesma interface de solicitação da home (serviço, barbeiro, data e horário), preparada para uma integração futura. |
| `pages/produtos.html` | Página de catálogo isolada — grade de produtos (`#productsGrid`), paginação (`#pagination`) e drawer de carrinho. |

As duas referenciam `../index.html` para voltar à home e reutilizam o header/footer do site.

Os caminhos de `styles.css`/`script.js` e os IDs de produtos/paginação/formulário dessas páginas foram corrigidos para bater com o `script.js` compartilhado — veja o changelog abaixo.

## ⚙️ Funcionalidades (JavaScript)

- **Tema claro/escuro** — persistido em `localStorage`, detecta preferência do sistema na primeira visita.
- **Carrinho de pedidos** — quantidades, subtotais e total, persistência validada em `localStorage` e envio da solicitação pelo WhatsApp.
- **Loja paginada** — 20 produtos, 8 por página, navegação por botões numerados.
- **Solicitação de agendamento** — formulário compartilhado entre home e página interna, com resumo, validação e envio da solicitação pelo WhatsApp.
- **Toasts** — notificações temporárias de sucesso/erro/aviso.
- **Scroll to top** — botão flutuante para voltar ao topo.
- **Acessibilidade** — skip link, `aria-*` em modais e regiões, fechar modais com `Esc`.

> ⚠️ Este projeto é **front-end apenas**: agendamentos e pedidos abrem o WhatsApp com mensagens prontas, mas dependem de confirmação da barbearia. Não há pagamento ou reserva automática.

## 🎨 Customização rápida

- **Cores e variáveis**: topo do `styles.css`, dentro de `:root` (e `[data-theme="dark"]` para o modo escuro).
- **Produtos da loja**: array de objetos `ALL_PRODUCTS` em `script.js`, com `id`, `name`, `description`, `price` e `image`.
- **Nome e WhatsApp usados nas mensagens**: propriedades `name` e `whatsapp` em `BUSINESS_CONFIG`, no início de `script.js`. O telefone deve conter código do país e DDD, somente com números, por exemplo `5511999999999`.
- **Serviços exibidos e disponíveis para agendamento**: array `SERVICES` em `script.js`.
- **Profissionais**: array `BARBERS` em `script.js`.
- **Horários para solicitação**: array `BOOKING_TIMES` em `script.js`.
- **Cortes exibidos**: array `DATA_C` dentro de `renderCuts()` em `script.js`.
- **Itens por página da loja**: constante `ITEMS_PER_PAGE` em `script.js`.

## 🔎 Configuração comercial e SEO antes da publicação

Os dados atuais da Norte são exemplos do projeto. Para um cliente real, revise conjuntamente:

1. `BUSINESS_CONFIG`, serviços, profissionais, produtos e horários em `script.js`;
2. nome, telefone, endereço e horários nos rodapés das três páginas;
3. textos de `title`, description e Open Graph no `head` de cada página;
4. JSON-LD `HairSalon` no `head` de `index.html`, incluindo telefone, endereço, horários, serviços e preços.

### Domínio, canonical, Open Graph, sitemap e robots

Ainda não há domínio definitivo configurado. Por isso, os canonicals e `og:url` usam caminhos relativos (`/`, `/pages/produtos.html` e `/pages/agendamento.html`) em vez de inventar um domínio. Eles são resolvidos pelo endereço real da publicação, mas URLs absolutas são preferíveis para compartilhamento social.

Quando o domínio for definido:

1. troque os valores relativos de `canonical`, `og:url`, `@id` e `url` do JSON-LD por URLs HTTPS absolutas;
2. substitua todas as ocorrências de `https://dominio-a-definir.invalid` em `sitemap.xml` pelo domínio público, sem barra duplicada;
3. descomente e atualize a linha `Sitemap:` de `robots.txt` com a URL absoluta do sitemap;
4. valide novamente o sitemap e os dados estruturados no ambiente publicado.

O domínio `.invalid` do sitemap é um marcador reservado e intencionalmente não publicável. O arquivo precisa ser configurado antes do deploy.

### Imagem social

Não existe uma imagem social própria no repositório, portanto nenhuma referência `og:image` ou `twitter:image` foi adicionada. Antes da publicação comercial:

1. crie uma imagem própria/licenciada, preferencialmente em 1200 × 630 px;
2. salve-a em um caminho estável, por exemplo `assets/social-share.jpg`;
3. adicione `og:image` e `twitter:image` com a URL HTTPS absoluta do arquivo em cada página.

Não aponte essas metatags para um arquivo que ainda não exista.

### Imagens comerciais

As imagens atuais são carregadas remotamente da Unsplash e funcionam como conteúdo de demonstração. Um projeto comercial deve substituí-las por fotos próprias ou devidamente licenciadas, mantendo dimensões e proporções adequadas para evitar mudanças de layout.

## 🛠️ Tecnologias

- HTML5 semântico
- CSS3 (variáveis, grid, flexbox, media queries)
- JavaScript puro (vanilla, sem frameworks)
- [Lucide Icons](https://lucide.dev/) 1.28.0 via CDN, com versão fixada
- Google Fonts: DM Sans, DM Mono, Playfair Display

## 📌 Notas conhecidas

- Pedidos não consultam estoque, pagamento, retirada ou entrega; esses detalhes são confirmados manualmente no WhatsApp.
- A solicitação de agendamento não consulta disponibilidade real e não reserva horários automaticamente.
- O projeto é estático: não possui backend, painel administrativo, disponibilidade em tempo real, pagamento, estoque ou confirmação automática.
- Metadados sociais não incluem imagem até que um asset comercial próprio seja criado.
- O sitemap não deve ser publicado enquanto o domínio `.invalid` não for substituído.

## 🔐 Segurança na hospedagem

Headers HTTP não podem ser definidos de forma confiável apenas pelos arquivos HTML. Na hospedagem final, configure e teste pelo provedor, conforme os recursos externos realmente utilizados:

- `Content-Security-Policy`;
- `Strict-Transport-Security` após habilitar HTTPS;
- `X-Content-Type-Options: nosniff`;
- `Referrer-Policy`;
- `Permissions-Policy`.

Não foi adicionada uma meta CSP, pois uma política rígida sem configuração do servidor poderia bloquear Google Fonts, Lucide, Unsplash e WhatsApp.

---

Feito para bons dias e bons cortes. © 2026 Norte Barbearia
