# Norte | Barbearia & Clube

Site institucional de página única (one-page) para a barbearia Norte, com catálogo de produtos, carrinho local e interface de solicitação de agendamento.

## 📁 Estrutura do projeto

```
Landing-Page-Barbearia/
├── .gitignore
├── LICENSE
├── index.html          # Página principal (one-page: hero, serviços, cortes, loja...)
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
- **WhatsApp da barbearia**: propriedade `whatsapp` em `BUSINESS_CONFIG`, no início de `script.js`.
- **Serviços exibidos e disponíveis para agendamento**: array `SERVICES` em `script.js`.
- **Profissionais**: array `BARBERS` em `script.js`.
- **Horários para solicitação**: array `BOOKING_TIMES` em `script.js`.
- **Cortes exibidos**: array `DATA_C` dentro de `renderCuts()` em `script.js`.
- **Itens por página da loja**: constante `ITEMS_PER_PAGE` em `script.js`.

## 🛠️ Tecnologias

- HTML5 semântico
- CSS3 (variáveis, grid, flexbox, media queries)
- JavaScript puro (vanilla, sem frameworks)
- [Lucide Icons](https://lucide.dev/) via CDN
- Google Fonts: DM Sans, DM Mono, Playfair Display

## 📌 Notas conhecidas

- Pedidos não consultam estoque, pagamento, retirada ou entrega; esses detalhes são confirmados manualmente no WhatsApp.
- A solicitação de agendamento não consulta disponibilidade real e não reserva horários automaticamente.

---

Feito para bons dias e bons cortes. © 2026 Norte Barbearia
