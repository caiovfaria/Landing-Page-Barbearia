(function () {
    'use strict';

    const $ = (selector) => document.querySelector(selector);
    const $$ = (selector) => document.querySelectorAll(selector);

    // ============================================================
    // THEME SYSTEM
    // ============================================================
    const Theme = {
        init: function () {
            const saved = localStorage.getItem('norteTheme');
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            const theme = saved || (prefersDark ? 'dark' : 'light');
            this.set(theme);
            this.setupToggle();
        },
        set: function (theme) {
            document.documentElement.setAttribute('data-theme', theme);
            localStorage.setItem('norteTheme', theme);
            this.updateButton(theme);
        },
        toggle: function () {
            const current = document.documentElement.getAttribute('data-theme');
            const next = current === 'dark' ? 'light' : 'dark';
            this.set(next);
        },
        updateButton: function (theme) {
            const btn = $('#themeToggle');
            if (!btn) return;
            const sun = btn.querySelector('.icon-sun');
            const moon = btn.querySelector('.icon-moon');
            if (theme === 'dark') {
                sun.style.display = 'block';
                moon.style.display = 'none';
            } else {
                sun.style.display = 'none';
                moon.style.display = 'block';
            }
        },
        setupToggle: function () {
            const btn = $('#themeToggle');
            if (btn) btn.addEventListener('click', this.toggle.bind(this));
        }
    };

    // ============================================================
    // TOAST SYSTEM
    // ============================================================
    const Toast = {
        show: function (message, type) {
            type = type || 'info';
            const toast = $('#toast');
            if (!toast) return;
            toast.textContent = message;
            toast.className = 'toast ' + type;
            void toast.offsetWidth;
            toast.classList.add('show');
            clearTimeout(toast._hide);
            toast._hide = setTimeout(function () { toast.classList.remove('show'); }, 3000);
        }
    };

    // ============================================================
    // MODAL SYSTEM
    // ============================================================
    const Modal = {
        toggle: function (id, show) {
            if (show === undefined) show = true;
            const el = document.getElementById(id);
            if (!el) return;
            el.classList.toggle('show', show);
            document.body.style.overflow = show ? 'hidden' : '';
        },
        close: function (id) { this.toggle(id, false); },
        open: function (id) { this.toggle(id, true); }
    };

    // ============================================================
    // DADOS DA LOJA (20 Produtos)
    // ============================================================
    const ALL_PRODUCTS = [
        ['Pomada matte', 'Fixação média · 80g', 42.00, 'https://images.unsplash.com/photo-1629198688000-71f23e745b6e?auto=format&fit=crop&w=500&q=80'],
        ['Óleo para barba', 'Nutrição diária · 30ml', 35.00, 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=500&q=80'],
        ['Pente de bolso', 'Acetato italiano', 22.00, 'https://images.unsplash.com/photo-1619451334792-150fd785ee74?auto=format&fit=crop&w=500&q=80'],
        ['Navalhete Norte', 'Aço inoxidável', 55.00, 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=500&q=80'],
        ['Shampoo diário', 'Limpeza suave · 250ml', 38.00, 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&w=500&q=80'],
        ['Bálsamo pós-barba', 'Refrescância · 100ml', 32.00, 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&w=500&q=80'],
        ['Pó texturizador', 'Volume seco · 20g', 45.00, 'https://images.unsplash.com/photo-1629198688000-71f23e745b6e?auto=format&fit=crop&w=500&q=80'],
        ['Escova modeladora', 'Cerdas naturais', 28.00, 'https://images.unsplash.com/photo-1619451334792-150fd785ee74?auto=format&fit=crop&w=500&q=80'],
        ['Cera de barba', 'Modelagem forte · 50g', 39.90, 'https://images.unsplash.com/photo-1629198688000-71f23e745b6e?auto=format&fit=crop&w=500&q=80'],
        ['Loção pós-barba', 'Aloe vera · 100ml', 45.90, 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&w=500&q=80'],
        ['Tesoura de barbeiro', 'Aço carbono', 64.00, 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=500&q=80'],
        ['Tônico capilar', 'Crescimento · 60ml', 52.00, 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=500&q=80'],
        ['Gel fixador', 'Forte · 200ml', 19.90, 'https://images.unsplash.com/photo-1629198688000-71f23e745b6e?auto=format&fit=crop&w=500&q=80'],
        ['Condicionador', 'Hidratação profunda', 44.00, 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&w=500&q=80'],
        ['Necessaire', 'Couro sintético', 89.00, 'https://images.unsplash.com/photo-1619451334792-150fd785ee74?auto=format&fit=crop&w=500&q=80'],
        ['Máquina de corte', 'Profissional', 299.00, 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=500&q=80'],
        ['Pincel de barba', 'Cerdas sintéticas', 18.50, 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=500&q=80'],
        ['Manteiga corporal', 'Hidratação · 100g', 49.00, 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&w=500&q=80'],
        ['Sabonete líquido', 'Barbearia · 200ml', 24.00, 'https://images.unsplash.com/photo-1629198688000-71f23e745b6e?auto=format&fit=crop&w=500&q=80'],
        ['Spray texturizador', 'Acabamento · 150ml', 68.00, 'https://images.unsplash.com/photo-1619451334792-150fd785ee74?auto=format&fit=crop&w=500&q=80']
    ];

    // ============================================================
    // RENDER SERVIÇOS E CORTES (Para manter a Home)
    // ============================================================
    function renderServices() {
        const grid = $('#serviceGrid');
        if (!grid) return;
        const DATA_S = [
            ['Corte da casa', 'R$ 50', 'Consulta e acabamento com navalha.', '50 MIN'],
            ['Barba completa', 'R$ 35', 'Toalha quente, desenho e hidratação.', '40 MIN'],
            ['Combo Norte', 'R$ 80', 'Corte + barba completa.', '90 MIN'],
            ['Ritual premium', 'R$ 110', 'Combo Norte + massagem e produtos premium.', '110 MIN']
        ];
        grid.innerHTML = DATA_S.map(s => `<article class="service"><h3>${s[0]}<span class="price">${s[1]}</span></h3><p>${s[2]}</p><small>${s[3]}</small></article>`).join('');
    }
    function renderCuts() {
        const grid = $('#cuts');
        if (!grid) return;
        const DATA_C = [
            ['Low fade', 'Gradiente baixo', 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80'],
            ['French crop', 'Textura frontal', 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=800&q=80'],
            ['Social clássico', 'Elegância', 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=800&q=80']
        ];
        grid.innerHTML = DATA_C.map(c => `<article class="cut"><img src="${c[2]}" alt="${c[0]}" loading="lazy"><div class="cut-info"><div><b>${c[0]}</b><br><span>${c[1]}</span></div><i data-lucide="arrow-up-right" size="18" color="#c96036"></i></div></article>`).join('');
        if (window.lucide) lucide.createIcons();
    }

    // ============================================================
    // SISTEMA DE PAGINAÇÃO DA LOJA
    // ============================================================
    const ITEMS_PER_PAGE = 8;
    let currentPage = 1;

    function getPageData(page) {
        const start = (page - 1) * ITEMS_PER_PAGE;
        const end = start + ITEMS_PER_PAGE;
        return { items: ALL_PRODUCTS.slice(start, end), total: ALL_PRODUCTS.length };
    }

    function renderProducts() {
        const grid = document.getElementById('productsGrid');
        const pagination = document.getElementById('pagination');
        if (!grid || !pagination) return;

        const data = getPageData(currentPage);
        const totalPages = Math.ceil(data.total / ITEMS_PER_PAGE);

        grid.innerHTML = data.items.map((p, i) => {
            const realIndex = (currentPage - 1) * ITEMS_PER_PAGE + i;
            return `<article class="product"><img src="${p[3]}" alt="${p[0]}" loading="lazy"><small>${p[1]}</small><div><div><strong>${p[0]}</strong><br><span style="color:var(--muted);font-size:12px;">R$ ${p[2].toFixed(2)}</span></div><button class="add" type="button" data-product-index="${realIndex}">+</button></div></article>`;
        }).join('');

        // Paginação
        pagination.innerHTML = Array.from({ length: totalPages }, (_, i) => {
            const num = i + 1;
            return `<button class="page-btn ${num === currentPage ? 'active' : ''}" type="button" data-page="${num}">${num}</button>`;
        }).join('');

        if (window.lucide) lucide.createIcons();
    }

    function goToPage(page) {
        currentPage = page;
        renderProducts();
        document.getElementById('loja').scrollIntoView({ behavior: 'smooth' });
    }

    // ============================================================
    // SISTEMA DE CARRINHO
    // ============================================================
    let cart = [];

    function loadCart() {
        try { cart = JSON.parse(localStorage.getItem('norteCart')) || []; } catch (e) { cart = []; }
        updateCartUI();
    }

    function saveCart() {
        try { localStorage.setItem('norteCart', JSON.stringify(cart)); } catch (e) { }
        updateCartUI();
    }

    function updateCartUI() {
        const count = $('#count');
        const items = $('#cartItems');
        const total = $('#total');

        if (count) {
            count.textContent = cart.length;
            count.style.display = cart.length > 0 ? 'grid' : 'none';
        }
        if (items) {
            if (cart.length === 0) {
                items.innerHTML = '<div class="empty"><p>Seu carrinho está vazio.</p></div>';
            } else {
                items.innerHTML = cart.map((p, i) =>
                    `<div class="cart-item"><span><strong>${p[0]}</strong><br><small>R$ ${p[2].toFixed(2)}</small></span><button class="add" type="button" data-cart-index="${i}">×</button></div>`
                ).join('');
            }
        }
        if (total) {
            const sum = cart.reduce((acc, p) => acc + p[2], 0);
            total.textContent = 'R$ ' + sum.toFixed(2).replace('.', ',');
        }
        if (window.lucide) lucide.createIcons();
    }

    function addToCart(index) {
        if (index < 0 || index >= ALL_PRODUCTS.length) return;
        cart.push(ALL_PRODUCTS[index]);
        saveCart();
        Toast.show(ALL_PRODUCTS[index][0] + ' adicionado ao carrinho!', 'success');
    }

    function removeFromCart(index) {
        if (index < 0 || index >= cart.length) return;
        cart.splice(index, 1);
        saveCart();
        Toast.show('Produto removido do carrinho', 'warning');
    }

    function requestOrder() {
        if (cart.length === 0) { Toast.show('Adicione um produto antes de solicitar o pedido.', 'error'); return; }
        Toast.show('Solicitação não enviada: o canal de pedidos será disponibilizado em breve. Seu carrinho foi mantido.', 'warning');
    }

    // ============================================================
    // BOOKING E EVENT LISTENERS
    // ============================================================
    function openBooking() {
        setBookingDateDefaults();
        Modal.open('bookingLayer');
    }

    function setBookingDateDefaults() {
        const dateInput = $('#bookDate');
        if (!dateInput) return;
        const today = new Date();
        const y = today.getFullYear();
        const m = String(today.getMonth() + 1).padStart(2, '0');
        const d = String(today.getDate()).padStart(2, '0');
        dateInput.min = y + '-' + m + '-' + d;
        if (!dateInput.value) dateInput.value = y + '-' + m + '-' + d;
    }

    function setupListeners() {
        const cartBtn = $('#cartBtn');
        if (cartBtn) cartBtn.addEventListener('click', function () {
            const destination = this.getAttribute('data-href');
            if (destination) {
                window.location.href = destination;
                return;
            }
            Modal.open('drawer');
            updateCartUI();
        });
        const viewCartBtn = $('#viewCart');
        if (viewCartBtn) viewCartBtn.addEventListener('click', function () { Modal.open('drawer'); updateCartUI(); });
        const checkoutBtn = $('#checkout');
        if (checkoutBtn) checkoutBtn.addEventListener('click', requestOrder);
        $$('[data-open-booking]').forEach(btn => {
            btn.addEventListener('click', openBooking);
        });
        const productsGrid = $('#productsGrid');
        if (productsGrid) productsGrid.addEventListener('click', function (e) {
            const button = e.target.closest('[data-product-index]');
            if (button) addToCart(Number(button.getAttribute('data-product-index')));
        });
        const pagination = $('#pagination');
        if (pagination) pagination.addEventListener('click', function (e) {
            const button = e.target.closest('[data-page]');
            if (button) goToPage(Number(button.getAttribute('data-page')));
        });
        const cartItems = $('#cartItems');
        if (cartItems) cartItems.addEventListener('click', function (e) {
            const button = e.target.closest('[data-cart-index]');
            if (button) removeFromCart(Number(button.getAttribute('data-cart-index')));
        });
        $$('[data-close]').forEach(btn => {
            btn.addEventListener('click', function () { Modal.close(this.getAttribute('data-close')); });
        });
        $$('.layer, .drawer').forEach(el => {
            el.addEventListener('click', function (e) { if (e.target === this) Modal.close(this.id); });
        });
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') $$('.layer.show, .drawer.show').forEach(el => Modal.close(el.id));
        });
        const bookingForm = $('#bookingForm');
        if (bookingForm) bookingForm.addEventListener('submit', function (e) {
            e.preventDefault();
            Toast.show('Solicitação não enviada: o canal de agendamento será disponibilizado em breve.', 'warning');
        });
    }

    // ============================================================
    // INIT
    // ============================================================
    function init() {
        Theme.init();
        renderServices();
        renderCuts();
        renderProducts(); // Renderiza a loja completa
        loadCart();
        setupListeners();
        setBookingDateDefaults();
        if (window.lucide) lucide.createIcons();
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();
})();
