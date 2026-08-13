# Norte | Barbearia & Clube

Site institucional de página única (one-page) para a barbearia Norte, com loja de produtos integrada, sistema de carrinho, agendamento online e chat de suporte simulado.

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
    ├── login.html
    └── produtos.html
```

`index.html`, `styles.css` e `script.js` precisam ficar **na mesma pasta** (raiz do projeto), pois `index.html` referencia os outros dois via caminho relativo.

> ⚠️ **As páginas em `pages/` estão com caminhos quebrados** — veja a seção [Notas conhecidas](#-notas-conhecidas).

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
| Header | Navegação, alternância de tema, login, carrinho e agendamento |
| Hero | Chamada principal com foto e selo de avaliação |
| Ticker | Faixa animada com frases institucionais |
| História | Texto sobre a barbearia + anos de atuação |
| Serviços | Cards de serviços (Corte, Barba, Combo, Ritual premium) |
| Cortes | Galeria de inspirações de cortes |
| Depoimento | Citação de cliente |
| Loja | Grade de 20 produtos com paginação (8 por página) |
| Footer | Contato, endereço e horários |

## 📄 Páginas internas (`pages/`)

Além da página principal, o projeto tem 3 páginas avulsas que reaproveitam os mesmos estilos e reforçam fluxos específicos:

| Página | Descrição |
|---|---|
| `pages/agendamento.html` | Página dedicada de agendamento — mesmo formulário do modal da home (serviço, barbeiro, data e horário), mais um bloco de dicas ("Chegue 5 min antes", etc.) e status da agenda. |
| `pages/login.html` | Página de login centralizada. Verifica `localStorage` (`norteUser`): se já existe um usuário salvo, mostra a tela "Você já está logado!" com opção de sair (`logoutBtn`); caso contrário, mostra o formulário de nome/e-mail. |
| `pages/produtos.html` | Página de loja isolada — grade de produtos (`#products`), paginação própria (`#productPages`), drawer de carrinho e um banner de promoção ("Compre 2, ganhe um brinde"). |

Todas as três referenciam `../index.html` para voltar à home e reutilizam o header/footer do site.

Os caminhos de `styles.css`/`script.js` e os IDs de produtos/paginação/formulário dessas páginas foram corrigidos para bater com o `script.js` compartilhado — veja o changelog abaixo.

## ⚙️ Funcionalidades (JavaScript)

- **Tema claro/escuro** — persistido em `localStorage`, detecta preferência do sistema na primeira visita.
- **Carrinho de compras** — adicionar/remover produtos, total calculado, persistido em `localStorage`, drawer lateral.
- **Loja paginada** — 20 produtos, 8 por página, navegação por botões numerados.
- **Agendamento** — modal com formulário (serviço, barbeiro, data, horário); data mínima travada no dia atual.
- **Login** — modal simples de identificação do cliente (simulado, sem backend).
- **Suporte/Chat** — modal com histórico de mensagens e sugestões rápidas.
- **Toasts** — notificações temporárias de sucesso/erro/aviso.
- **Scroll to top** — botão flutuante para voltar ao topo.
- **Acessibilidade** — skip link, `aria-*` em modais e regiões, fechar modais com `Esc`.

> ⚠️ Este projeto é **front-end apenas**: não há backend real. Login, agendamento e finalização de pedido são simulados (sem envio de dados para servidor).

## 🎨 Customização rápida

- **Cores e variáveis**: topo do `styles.css`, dentro de `:root` (e `[data-theme="dark"]` para o modo escuro).
- **Produtos da loja**: array `ALL_PRODUCTS` em `script.js` — cada item é `[nome, descrição, preço, imagem]`.
- **Serviços exibidos**: array `DATA_S` dentro de `renderServices()` em `script.js`.
- **Cortes exibidos**: array `DATA_C` dentro de `renderCuts()` em `script.js`.
- **Itens por página da loja**: constante `ITEMS_PER_PAGE` em `script.js`.

## 🛠️ Tecnologias

- HTML5 semântico
- CSS3 (variáveis, grid, flexbox, media queries)
- JavaScript puro (vanilla, sem frameworks)
- [Lucide Icons](https://lucide.dev/) via CDN
- Google Fonts: DM Sans, DM Mono, Playfair Display

## 🔧 Changelog (correções aplicadas em `pages/`)

- **Caminhos de CSS/JS corrigidos**: `../css/style.css` → `../styles.css` e `../js/script.js` → `../script.js` nas 3 páginas (antes apontavam para arquivos/pastas inexistentes e as páginas abriam sem estilo nem JavaScript).
- **`produtos.html`**: grade de produtos e paginação renomeadas de `#products`/`.products` e `#productPages`/`.pages` para `#productsGrid`/`.products-grid` e `#pagination`/`.pagination`, batendo com o que `script.js` espera (e reaproveitando o CSS correto).
- **`agendamento.html`**: `<form id="booking">` renomeado para `<form id="bookingForm">` para o `script.js` conseguir capturar o envio do formulário.
- **Botão "Entrar"** em `agendamento.html` e `produtos.html`: agora é um link real para `login.html` (antes tentava abrir um modal de login que não existe fora da home).
- **`script.js`**: adicionado o processamento do login (`#loginForm`), que faltava completamente — agora salva o usuário em `localStorage` (`norteUser`) e mostra a tela de sucesso, tanto no modal da home quanto em `pages/login.html`.
- **`script.js`**: `renderProducts()` ganhou proteção contra páginas que não têm grade de produtos (evita erro em `login.html`, por exemplo).
- **`script.js`**: data mínima do campo de agendamento agora é definida assim que a página carrega, não só ao abrir o modal — necessário para `agendamento.html`, que não passa pelo `openBooking()`.
- **`produtos.html`**: botão "Ver carrinho" (`#viewCart`) agora abre o drawer do carrinho.

## 📌 Notas conhecidas

- Os botões de sugestão do chat de suporte (`.suggestion-btn`) e o envio de mensagem (`#supportForm`) na home ainda não têm um listener de JavaScript implementado — o clique não preenche/envia mensagem automaticamente no momento.
- O botão `#supportBtn` (rodapé da home) não possui listener para abrir o modal de suporte.
- `pages/agendamento.html` e `pages/produtos.html` têm sua própria seção de loja/agendamento (fora dos modais da home) — é uma segunda implementação da mesma funcionalidade, não uma extensão dela. Ajustar uma não atualiza a outra automaticamente.

---

Feito para bons dias e bons cortes. © 2026 Norte Barbearia
