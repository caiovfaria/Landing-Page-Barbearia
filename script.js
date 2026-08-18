(function () {
    'use strict';

    const $ = (selector) => document.querySelector(selector);
    const $$ = (selector) => document.querySelectorAll(selector);

    const BUSINESS_CONFIG = {
        name: 'Norte Barbearia',
        whatsapp: '5511999999999'
    };

    const SERVICES = [
        { id: 'corte-casa', name: 'Corte da casa', price: 50, description: 'Consulta e acabamento com navalha.', duration: '50 MIN' },
        { id: 'barba-completa', name: 'Barba completa', price: 35, description: 'Toalha quente, desenho e hidratação.', duration: '40 MIN' },
        { id: 'combo-norte', name: 'Combo Norte', price: 80, description: 'Corte + barba completa.', duration: '90 MIN' },
        { id: 'ritual-premium', name: 'Ritual premium', price: 110, description: 'Combo Norte + massagem e produtos premium.', duration: '110 MIN' }
    ];

    const BARBERS = [
        { id: 'rafael', name: 'Rafael' },
        { id: 'lucas', name: 'Lucas' },
        { id: 'andre', name: 'André' }
    ];

    const BOOKING_TIMES = [
        '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
        '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
        '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00'
    ];

    const CURRENCY_FORMATTER = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });

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
        { id: 'pomada-matte', name: 'Pomada matte', description: 'Fixação média · 80g', price: 42.00, image: 'https://images.unsplash.com/photo-1629198688000-71f23e745b6e?auto=format&fit=crop&w=500&q=80' },
        { id: 'oleo-barba', name: 'Óleo para barba', description: 'Nutrição diária · 30ml', price: 35.00, image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=500&q=80' },
        { id: 'pente-bolso', name: 'Pente de bolso', description: 'Acetato italiano', price: 22.00, image: 'https://images.unsplash.com/photo-1619451334792-150fd785ee74?auto=format&fit=crop&w=500&q=80' },
        { id: 'navalhete-norte', name: 'Navalhete Norte', description: 'Aço inoxidável', price: 55.00, image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=500&q=80' },
        { id: 'shampoo-diario', name: 'Shampoo diário', description: 'Limpeza suave · 250ml', price: 38.00, image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&w=500&q=80' },
        { id: 'balsamo-pos-barba', name: 'Bálsamo pós-barba', description: 'Refrescância · 100ml', price: 32.00, image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&w=500&q=80' },
        { id: 'po-texturizador', name: 'Pó texturizador', description: 'Volume seco · 20g', price: 45.00, image: 'https://images.unsplash.com/photo-1629198688000-71f23e745b6e?auto=format&fit=crop&w=500&q=80' },
        { id: 'escova-modeladora', name: 'Escova modeladora', description: 'Cerdas naturais', price: 28.00, image: 'https://images.unsplash.com/photo-1619451334792-150fd785ee74?auto=format&fit=crop&w=500&q=80' },
        { id: 'cera-barba', name: 'Cera de barba', description: 'Modelagem forte · 50g', price: 39.90, image: 'https://images.unsplash.com/photo-1629198688000-71f23e745b6e?auto=format&fit=crop&w=500&q=80' },
        { id: 'locao-pos-barba', name: 'Loção pós-barba', description: 'Aloe vera · 100ml', price: 45.90, image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&w=500&q=80' },
        { id: 'tesoura-barbeiro', name: 'Tesoura de barbeiro', description: 'Aço carbono', price: 64.00, image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=500&q=80' },
        { id: 'tonico-capilar', name: 'Tônico capilar', description: 'Crescimento · 60ml', price: 52.00, image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=500&q=80' },
        { id: 'gel-fixador', name: 'Gel fixador', description: 'Forte · 200ml', price: 19.90, image: 'https://images.unsplash.com/photo-1629198688000-71f23e745b6e?auto=format&fit=crop&w=500&q=80' },
        { id: 'condicionador', name: 'Condicionador', description: 'Hidratação profunda', price: 44.00, image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&w=500&q=80' },
        { id: 'necessaire', name: 'Necessaire', description: 'Couro sintético', price: 89.00, image: 'https://images.unsplash.com/photo-1619451334792-150fd785ee74?auto=format&fit=crop&w=500&q=80' },
        { id: 'maquina-corte', name: 'Máquina de corte', description: 'Profissional', price: 299.00, image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=500&q=80' },
        { id: 'pincel-barba', name: 'Pincel de barba', description: 'Cerdas sintéticas', price: 18.50, image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=500&q=80' },
        { id: 'manteiga-corporal', name: 'Manteiga corporal', description: 'Hidratação · 100g', price: 49.00, image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&w=500&q=80' },
        { id: 'sabonete-liquido', name: 'Sabonete líquido', description: 'Barbearia · 200ml', price: 24.00, image: 'https://images.unsplash.com/photo-1629198688000-71f23e745b6e?auto=format&fit=crop&w=500&q=80' },
        { id: 'spray-texturizador', name: 'Spray texturizador', description: 'Acabamento · 150ml', price: 68.00, image: 'https://images.unsplash.com/photo-1619451334792-150fd785ee74?auto=format&fit=crop&w=500&q=80' }
    ];

    // ============================================================
    // RENDER SERVIÇOS E CORTES (Para manter a Home)
    // ============================================================
    function renderServices() {
        const grid = $('#serviceGrid');
        if (!grid) return;
        grid.innerHTML = SERVICES.map(service => `<article class="service"><h3>${service.name}<span class="price">${CURRENCY_FORMATTER.format(service.price)}</span></h3><p>${service.description}</p><small>${service.duration}</small></article>`).join('');
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

        grid.innerHTML = data.items.map(product => {
            return `<article class="product"><img src="${product.image}" alt="${product.name}" loading="lazy"><small>${product.description}</small><div><div><strong>${product.name}</strong><br><span style="color:var(--muted);font-size:12px;">${CURRENCY_FORMATTER.format(product.price)}</span></div><button class="add" type="button" data-product-id="${product.id}" aria-label="Adicionar ${product.name} ao carrinho">+</button></div></article>`;
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

    function findProduct(reference) {
        if (!reference) return null;
        return ALL_PRODUCTS.find(product => product.id === reference.id) ||
            ALL_PRODUCTS.find(product => product.name === reference.name) || null;
    }

    function normalizeCartData(rawCart) {
        if (!Array.isArray(rawCart)) return [];
        const quantities = new Map();

        rawCart.forEach(entry => {
            let reference;
            let quantity;
            let storedPrice;

            if (Array.isArray(entry)) {
                reference = { name: entry[0] };
                storedPrice = entry[2];
                quantity = 1;
            } else if (entry && typeof entry === 'object') {
                reference = { id: entry.id, name: entry.name };
                storedPrice = entry.price;
                quantity = Number(entry.quantity);
            } else {
                return;
            }

            const product = findProduct(reference);
            const validPrice = Number.isFinite(storedPrice) && storedPrice === product?.price;
            if (!product || !validPrice || !Number.isSafeInteger(quantity) || quantity <= 0) return;
            const combinedQuantity = (quantities.get(product.id) || 0) + quantity;
            if (Number.isSafeInteger(combinedQuantity)) quantities.set(product.id, combinedQuantity);
        });

        return Array.from(quantities, ([id, quantity]) => {
            const product = ALL_PRODUCTS.find(item => item.id === id);
            return { id: product.id, name: product.name, price: product.price, quantity: quantity };
        });
    }

    function loadCart() {
        try {
            cart = normalizeCartData(JSON.parse(localStorage.getItem('norteCart')) || []);
        } catch (e) {
            cart = [];
        }
        try { localStorage.setItem('norteCart', JSON.stringify(cart)); } catch (e) { }
        updateCartUI();
    }

    function saveCart(announcement) {
        try { localStorage.setItem('norteCart', JSON.stringify(cart)); } catch (e) { }
        updateCartUI();
        announceCart(announcement);
    }

    function getCartTotals() {
        return cart.reduce((totals, item) => {
            totals.quantity += item.quantity;
            totals.value += item.price * item.quantity;
            return totals;
        }, { quantity: 0, value: 0 });
    }

    function announceCart(message) {
        if (!message) return;
        const status = $('#cartStatus');
        if (!status) return;
        status.textContent = '';
        window.requestAnimationFrame(() => { status.textContent = message; });
    }

    function updateCartUI() {
        const count = $('#count');
        const items = $('#cartItems');
        const totalItems = $('#totalItems');
        const total = $('#total');
        const checkout = $('#checkout');
        const cartBtn = $('#cartBtn');
        const totals = getCartTotals();

        if (count) {
            count.textContent = totals.quantity;
            count.style.display = totals.quantity > 0 ? 'grid' : 'none';
        }
        if (cartBtn) cartBtn.setAttribute('aria-label', `Carrinho, ${totals.quantity} ${totals.quantity === 1 ? 'item' : 'itens'}`);
        if (items) {
            if (cart.length === 0) {
                items.innerHTML = '<div class="empty"><p>Seu carrinho está vazio.</p><small>Adicione produtos para montar uma solicitação.</small></div>';
            } else {
                items.innerHTML = cart.map(item =>
                    `<div class="cart-item">
                        <div class="cart-item-info">
                            <strong>${item.name}</strong>
                            <small>Preço unitário: ${CURRENCY_FORMATTER.format(item.price)}</small>
                            <span class="item-subtotal">Subtotal: ${CURRENCY_FORMATTER.format(item.price * item.quantity)}</span>
                        </div>
                        <div class="cart-item-actions" role="group" aria-label="Quantidade de ${item.name}">
                            <button class="quantity-control" type="button" data-cart-action="decrease" data-product-id="${item.id}" aria-label="Diminuir quantidade de ${item.name}">−</button>
                            <span class="cart-quantity" aria-label="Quantidade atual de ${item.name}: ${item.quantity}">${item.quantity}</span>
                            <button class="quantity-control" type="button" data-cart-action="increase" data-product-id="${item.id}" aria-label="Aumentar quantidade de ${item.name}">+</button>
                            <button class="remove-item" type="button" data-cart-action="remove" data-product-id="${item.id}" aria-label="Remover ${item.name}">Remover</button>
                        </div>
                    </div>`
                ).join('');
            }
        }
        if (totalItems) totalItems.textContent = totals.quantity;
        if (total) total.textContent = CURRENCY_FORMATTER.format(totals.value);
        if (checkout) checkout.disabled = cart.length === 0;
        if (window.lucide) lucide.createIcons();
    }

    function addToCart(productId) {
        const product = ALL_PRODUCTS.find(item => item.id === productId);
        if (!product) return;
        const existing = cart.find(item => item.id === product.id);
        if (existing) existing.quantity += 1;
        else cart.push({ id: product.id, name: product.name, price: product.price, quantity: 1 });
        saveCart(`${product.name} adicionado. Quantidade: ${existing ? existing.quantity : 1}.`);
        Toast.show(product.name + ' adicionado ao carrinho!', 'success');
    }

    function changeCartQuantity(productId, change) {
        const item = cart.find(product => product.id === productId);
        if (!item) return;
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
            return;
        }
        saveCart(`Quantidade de ${item.name}: ${item.quantity}.`);
    }

    function removeFromCart(productId) {
        const item = cart.find(product => product.id === productId);
        if (!item) return;
        cart = cart.filter(product => product.id !== productId);
        saveCart(`${item.name} removido do carrinho.`);
        Toast.show(item.name + ' removido do carrinho', 'warning');
    }

    function buildOrderWhatsAppUrl() {
        const totals = getCartTotals();
        const itemLines = cart.map(item =>
            `${item.quantity}x ${item.name} — ${CURRENCY_FORMATTER.format(item.price * item.quantity)}`
        );
        const message = [
            `Olá! Gostaria de solicitar um pedido na ${BUSINESS_CONFIG.name}.`,
            '',
            'Itens:',
            ...itemLines,
            '',
            `Total de itens: ${totals.quantity}`,
            `Total: ${CURRENCY_FORMATTER.format(totals.value)}`,
            '',
            'Aguardo a confirmação de disponibilidade e pagamento. Obrigado!'
        ].join('\n');
        return `https://wa.me/${BUSINESS_CONFIG.whatsapp}?text=${encodeURIComponent(message)}`;
    }

    function requestOrder() {
        if (cart.length === 0) {
            Toast.show('Adicione um produto antes de solicitar o pedido.', 'error');
            return;
        }
        window.open(buildOrderWhatsAppUrl(), '_blank', 'noopener,noreferrer');
    }

    // ============================================================
    // BOOKING E EVENT LISTENERS
    // ============================================================
    function openBooking() {
        Modal.open('bookingLayer');
    }

    function getTodayValue() {
        const today = new Date();
        const y = today.getFullYear();
        const m = String(today.getMonth() + 1).padStart(2, '0');
        const d = String(today.getDate()).padStart(2, '0');
        return y + '-' + m + '-' + d;
    }

    function formatBookingDate(value) {
        if (!value) return '—';
        const parts = value.split('-');
        if (parts.length !== 3) return value;
        return parts[2] + '/' + parts[1] + '/' + parts[0];
    }

    function populateBookingFields(form) {
        const serviceSelect = form.elements.service;
        const barberSelect = form.elements.barber;
        const timeSelect = form.elements.time;

        serviceSelect.innerHTML = '<option value="">Selecione um serviço</option>' + SERVICES.map(service =>
            `<option value="${service.id}">${service.name} — ${CURRENCY_FORMATTER.format(service.price)}</option>`
        ).join('');
        barberSelect.innerHTML = '<option value="">Selecione um profissional</option>' + BARBERS.map(barber =>
            `<option value="${barber.id}">${barber.name}</option>`
        ).join('');
        timeSelect.innerHTML = '<option value="">Selecione um horário</option>' + BOOKING_TIMES.map(time =>
            `<option value="${time}">${time}</option>`
        ).join('');
        form.elements.date.min = getTodayValue();
    }

    function getBookingData(form) {
        const service = SERVICES.find(item => item.id === form.elements.service.value);
        const barber = BARBERS.find(item => item.id === form.elements.barber.value);
        return {
            name: form.elements.customerName.value.trim(),
            service: service,
            barber: barber,
            date: form.elements.date.value,
            time: form.elements.time.value
        };
    }

    function updateBookingSummary(form) {
        const summary = form.querySelector('[data-booking-summary]');
        if (!summary) return;
        const data = getBookingData(form);
        const values = {
            name: data.name || '—',
            service: data.service ? data.service.name : '—',
            barber: data.barber ? data.barber.name : '—',
            date: formatBookingDate(data.date),
            time: data.time || '—',
            price: data.service ? CURRENCY_FORMATTER.format(data.service.price) : '—'
        };
        Object.keys(values).forEach(key => {
            const target = summary.querySelector(`[data-summary="${key}"]`);
            if (target) target.textContent = values[key];
        });
    }

    function setFieldError(field, message) {
        const wrapper = field.closest('.field');
        const errorId = field.getAttribute('aria-describedby');
        const error = errorId ? document.getElementById(errorId) : null;
        if (wrapper) wrapper.classList.toggle('error', Boolean(message));
        if (error) error.textContent = message || '';
        if (message) field.setAttribute('aria-invalid', 'true');
        else field.removeAttribute('aria-invalid');
    }

    function validateBooking(form) {
        const data = getBookingData(form);
        const checks = [
            { field: form.elements.customerName, message: data.name ? '' : 'Informe seu nome.' },
            { field: form.elements.service, message: data.service ? '' : 'Selecione um serviço.' },
            { field: form.elements.barber, message: data.barber ? '' : 'Selecione um profissional.' },
            { field: form.elements.date, message: !data.date ? 'Selecione uma data.' : (data.date < getTodayValue() ? 'Selecione uma data a partir de hoje.' : '') },
            { field: form.elements.time, message: data.time ? '' : 'Selecione um horário.' }
        ];
        let firstInvalid = null;
        checks.forEach(check => {
            setFieldError(check.field, check.message);
            if (check.message && !firstInvalid) firstInvalid = check.field;
        });
        if (firstInvalid) firstInvalid.focus();
        return !firstInvalid;
    }

    function buildWhatsAppUrl(data) {
        const message = [
            `Olá! Gostaria de solicitar um agendamento na ${BUSINESS_CONFIG.name}.`,
            '',
            `Nome: ${data.name}`,
            `Serviço: ${data.service.name}`,
            `Barbeiro: ${data.barber.name}`,
            `Data: ${formatBookingDate(data.date)}`,
            `Horário: ${data.time}`,
            `Valor: ${CURRENCY_FORMATTER.format(data.service.price)}`,
            '',
            'Aguardo a confirmação do horário. Obrigado!'
        ].join('\n');
        return `https://wa.me/${BUSINESS_CONFIG.whatsapp}?text=${encodeURIComponent(message)}`;
    }

    function setupBookingForms() {
        $$('[data-booking-form]').forEach(form => {
            populateBookingFields(form);
            updateBookingSummary(form);
            form.addEventListener('input', function (e) {
                if (e.target.matches('input, select')) setFieldError(e.target, '');
                updateBookingSummary(form);
            });
            form.addEventListener('change', function (e) {
                if (e.target.matches('input, select')) setFieldError(e.target, '');
                updateBookingSummary(form);
            });
            form.addEventListener('submit', function (e) {
                e.preventDefault();
                if (!validateBooking(form)) return;
                const url = buildWhatsAppUrl(getBookingData(form));
                window.open(url, '_blank', 'noopener,noreferrer');
            });
        });
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
            const button = e.target.closest('[data-product-id]');
            if (button) addToCart(button.getAttribute('data-product-id'));
        });
        const pagination = $('#pagination');
        if (pagination) pagination.addEventListener('click', function (e) {
            const button = e.target.closest('[data-page]');
            if (button) goToPage(Number(button.getAttribute('data-page')));
        });
        const cartItems = $('#cartItems');
        if (cartItems) cartItems.addEventListener('click', function (e) {
            const button = e.target.closest('[data-cart-action]');
            if (!button) return;
            const productId = button.getAttribute('data-product-id');
            const action = button.getAttribute('data-cart-action');
            if (action === 'increase') changeCartQuantity(productId, 1);
            if (action === 'decrease') changeCartQuantity(productId, -1);
            if (action === 'remove') removeFromCart(productId);
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
        setupBookingForms();
        setupListeners();
        if (window.lucide) lucide.createIcons();
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();
})();
