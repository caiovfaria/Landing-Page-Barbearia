# Norte Barbearia — site comercial estático

Projeto demonstrativo de site institucional e catálogo comercial para uma barbearia de pequeno porte. A aplicação usa somente HTML, CSS e JavaScript vanilla e foi preparada para hospedagem estática.

O produto permite apresentar a marca, serviços, cortes e produtos, além de montar solicitações de agendamento e pedido que são encaminhadas ao WhatsApp. O envio é uma solicitação: não existe confirmação automática, pagamento ou reserva de horário.

## Objetivo do projeto

- oferecer uma presença digital profissional e responsiva;
- apresentar serviços e produtos de forma organizada;
- facilitar o contato comercial pelo WhatsApp;
- funcionar sem backend, build ou dependências instaláveis;
- servir como base configurável para um cliente real.

## Funcionalidades implementadas

- home institucional com história, serviços, cortes e catálogo;
- página dedicada de produtos com paginação;
- carrinho com quantidades, subtotal, total de itens e valor total;
- persistência validada do carrinho em `localStorage`;
- solicitação de pedido pelo WhatsApp;
- formulário de solicitação de agendamento com validação, resumo, profissionais, serviços, data e horário;
- menu mobile acessível;
- tema claro/escuro persistido em `localStorage`;
- modal e drawer com foco contido, Escape e retorno de foco;
- skip links, landmarks, labels, mensagens de erro e estados ARIA;
- metadados técnicos, Open Graph básico, Twitter Card, JSON-LD, favicon, robots e sitemap;
- página `404.html` compatível com hospedagem estática;
- layout responsivo para celular, tablet e desktop.

## O que não existe nesta versão

- login ou área do cliente;
- backend ou banco de dados;
- agenda com disponibilidade em tempo real;
- reserva ou confirmação automática de horário;
- pagamento online;
- controle de estoque;
- cálculo de frete;
- painel administrativo;
- analytics.

Pedidos e horários somente são solicitados. Disponibilidade, confirmação, pagamento e retirada ou entrega são combinados diretamente com a barbearia pelo WhatsApp.

## Stack

- HTML5 semântico;
- CSS3 com variáveis, Grid, Flexbox e media queries;
- JavaScript vanilla;
- Lucide Icons 1.28.0 via CDN;
- Google Fonts: DM Sans, DM Mono e Playfair Display;
- imagens demonstrativas remotas da Unsplash.

Não há framework, bundler, gerenciador de pacotes ou etapa de build.

## Estrutura de arquivos

```text
Landing-Page-Barbearia/
├── 404.html                 # Página de erro para hospedagem estática
├── favicon.svg              # Favicon derivado da marca visual
├── index.html               # Home, serviços, cortes, loja, modal e carrinho
├── README.md                # Documentação técnica e comercial
├── robots.txt               # Regras públicas de rastreamento
├── script.js                # Dados, tema, navegação, carrinho e agendamento
├── sitemap.xml              # Home, produtos e agendamento
├── styles.css               # Identidade visual e responsividade
└── pages/
    ├── agendamento.html     # Solicitação dedicada de horário
    └── produtos.html        # Catálogo e carrinho
```

## Como executar localmente

O projeto pode ser aberto diretamente pelo `index.html`, mas um servidor HTTP local representa melhor o ambiente de publicação.

Com Python:

```bash
python -m http.server 8000
```

Depois, acesse `http://localhost:8000/index.html`.

Não é necessário instalar dependências.

## Configuração rápida

### Nome e WhatsApp

No início de `script.js`:

```js
const BUSINESS_CONFIG = {
    name: 'Norte Barbearia',
    whatsapp: '5511999999999'
};
```

- `name`: nome usado nas mensagens de agendamento e pedido;
- `whatsapp`: código do país, DDD e número, somente com dígitos e sem `+`, espaços ou pontuação.

Exemplo estrutural: `55` + DDD + número.

### Dados comerciais que precisam ser substituídos

Quando existir um cliente real, revise todos estes pontos:

| Dado | Onde alterar |
|---|---|
| Nome da barbearia | `BUSINESS_CONFIG`, títulos, metadados, JSON-LD, header, rodapés e textos institucionais |
| WhatsApp | `BUSINESS_CONFIG.whatsapp` |
| Telefone visível | links `tel:` e textos dos rodapés nas três páginas |
| E-mail | links `mailto:` dos rodapés |
| Endereço e cidade | rodapés, textos locais, metadados e JSON-LD da home |
| Horários | rodapés, página de agendamento e `openingHoursSpecification` no JSON-LD |
| Barbeiros | array `BARBERS` em `script.js` |
| Serviços e preços | array `SERVICES` e catálogo de ofertas do JSON-LD |
| Horários solicitáveis | array `BOOKING_TIMES` em `script.js` |
| Produtos | array `ALL_PRODUCTS` em `script.js` |
| Textos institucionais | `index.html` e páginas internas |
| Domínio | canonical, Open Graph, JSON-LD, sitemap e robots |
| Instagram e redes sociais | não existem links demonstrativos; adicione somente URLs reais fornecidas pelo cliente |
| Imagens | hero, história, cortes, produtos e futura imagem social |

Os dados atuais são demonstrativos e não devem ser apresentados como dados de um estabelecimento real sem revisão.

## Imagens

As imagens atuais são remotas e demonstrativas. Para uso comercial, o cliente deve fornecer imagens próprias ou devidamente licenciadas.

Pontos de substituição:

- hero: imagem principal em `index.html`;
- história: `background` de `.story-image` em `styles.css`;
- cortes: array `DATA_C` dentro de `renderCuts()` em `script.js`;
- produtos: propriedade `image` dos objetos de `ALL_PRODUCTS`;
- imagem social: ainda não existe.

Para compartilhamento social, recomenda-se criar uma imagem de 1200 × 630 px. Depois, adicione `og:image` e `twitter:image` com uma URL HTTPS absoluta. Não configure essas metatags antes de o arquivo existir.

## SEO e domínio

As páginas possuem titles, descriptions, Open Graph básico, Twitter Card, canonical relativo e JSON-LD `HairSalon` na home.

Como ainda não existe domínio definitivo:

- canonical, `og:url`, `@id` e `url` do JSON-LD usam caminhos relativos compatíveis com publicação em subdiretório;
- `sitemap.xml` usa `https://dominio-a-definir.invalid` como marcador reservado e não publicável;
- a diretiva `Sitemap:` permanece comentada em `robots.txt`.

Antes da publicação em domínio real:

1. substitua canonical e `og:url` por URLs HTTPS absolutas;
2. atualize `@id` e `url` do JSON-LD em `index.html`;
3. substitua todas as ocorrências de `https://dominio-a-definir.invalid` no sitemap;
4. descomente e ajuste a URL absoluta do sitemap em `robots.txt`;
5. adicione a imagem social somente depois de criar o arquivo;
6. valide novamente metadados, JSON-LD e sitemap no endereço publicado.

O `sitemap.xml` lista somente:

- home;
- produtos;
- agendamento.

A página 404 não é indexável e não entra no sitemap.

## Favicon

`favicon.svg` já está referenciado nas páginas públicas e na 404. Ele é um favicon simples derivado da marca demonstrativa. Substitua-o caso o cliente forneça uma identidade visual definitiva.

## Hospedagem estática e GitHub Pages

Os assets e links de navegação usam caminhos relativos, inclusive nas páginas internas e na 404, permitindo publicação em subdiretórios como os usados pelo GitHub Pages.

Para publicar corretamente:

- mantenha a estrutura de pastas;
- publique a raiz do repositório como diretório do site;
- não mova `pages/`, `styles.css`, `script.js` ou `favicon.svg` sem atualizar as referências;
- configure o domínio e o sitemap antes de liberar indexação comercial;
- confirme que o provedor utiliza `404.html` como página de erro.

Não há configuração de deploy automatizado neste repositório.

## Armazenamento local

O navegador utiliza:

- `norteTheme`: preferência de tema;
- `norteCart`: itens e quantidades do carrinho.

O carrinho restaurado é validado contra o catálogo atual. Registros inválidos são ignorados para evitar que dados antigos quebrem a aplicação.

## Acessibilidade

O projeto inclui:

- navegação por teclado;
- foco visível;
- skip links;
- um `h1` e um `main` por página;
- labels e erros associados aos campos;
- nomes acessíveis nos controles do carrinho;
- foco contido em modal e drawer;
- fechamento com Escape e retorno ao acionador;
- estados `aria-expanded`, `aria-hidden` e `aria-current`;
- regiões ao vivo com prioridade moderada.

Uma auditoria comercial definitiva ainda deve incluir testes em leitores de tela e navegadores usados pelo público do cliente.

## Segurança na hospedagem

Headers HTTP não são definidos pelos arquivos HTML. No provedor final, configure e teste conforme os recursos externos utilizados:

- `Content-Security-Policy`;
- `Strict-Transport-Security` após habilitar HTTPS;
- `X-Content-Type-Options: nosniff`;
- `Referrer-Policy`;
- `Permissions-Policy`.

Não foi adicionada uma meta CSP rígida porque ela poderia bloquear Google Fonts, Lucide, Unsplash e WhatsApp sem configuração adequada da hospedagem.

## Possíveis evoluções com backend

Estas possibilidades não fazem parte da versão atual:

- agenda com disponibilidade real e confirmação automática;
- painel administrativo;
- autenticação de equipe ou clientes;
- estoque e gestão de produtos;
- pagamento online;
- histórico de pedidos;
- integração com CRM, e-mail ou notificações;
- armazenamento centralizado das configurações comerciais.

Qualquer evolução desse tipo exige definição de requisitos, segurança, privacidade e infraestrutura próprias.

## Licença

Consulte o arquivo `LICENSE` antes de reutilizar ou comercializar o código.

---

Projeto demonstrativo Norte Barbearia. Feito para bons dias e bons cortes.
