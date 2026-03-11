// Data
const allProducts = [
    { id: 1, name: "Canon EOS R5", brand: "Canon", category: "mirrorless", image: "./images/canon-r5.png", specs: "45MP · 8K Video · IBIS", price: 2499, period: "day", rating: 4.9, reviews: 128, badge: "Popular" },
    { id: 2, name: "Sony A7 IV", brand: "Sony", category: "mirrorless", image: "./images/sony-a7.png", specs: "33MP · 4K 60fps · Eye AF", price: 1999, period: "day", rating: 4.8, reviews: 96, badge: "Best Seller" },
    { id: 3, name: "Nikon D850", brand: "Nikon", category: "dslr", image: "./images/nikon-d850.png", specs: "45.7MP · 4K UHD · 153 AF", price: 1799, period: "day", rating: 4.7, reviews: 84, badge: "" },
    { id: 4, name: "Canon EOS 5D IV", brand: "Canon", category: "dslr", image: "./images/canon-5d.png", specs: "30.4MP · 4K · Dual Pixel AF", price: 1599, period: "day", rating: 4.6, reviews: 112, badge: "" },
    { id: 5, name: "Sony FX6", brand: "Sony", category: "video", image: "./images/sony-fx6.png", specs: "4K 120fps · S-Cinetone · E-Mount", price: 4999, period: "day", rating: 4.9, reviews: 45, badge: "Pro Choice" },
    { id: 6, name: "Blackmagic 6K Pro", brand: "Blackmagic", category: "video", image: "./images/blackmagic-6k.png", specs: "6K · Super 35 · EF Mount", price: 3499, period: "day", rating: 4.7, reviews: 67, badge: "" },
    { id: 7, name: "GoPro Hero 12", brand: "GoPro", category: "action", image: "./images/gopro-hero12.png", specs: "5.3K · HyperSmooth 6.0", price: 599, period: "day", rating: 4.5, reviews: 203, badge: "Adventure" },
    { id: 8, name: "DJI Osmo Action 4", brand: "DJI", category: "action", image: "./images/osmo-action4.png", specs: "4K 120fps · Waterproof", price: 499, period: "day", rating: 4.4, reviews: 156, badge: "" },
    { id: 9, name: "Sony A7S III", brand: "Sony", category: "mirrorless", image: "./images/sony-a7siii.png", specs: "12.1MP · 4K 120p · Low Light King", price: 2799, period: "day", rating: 4.9, reviews: 78, badge: "Low Light" },
    { id: 10, name: "Canon EOS R3", brand: "Canon", category: "mirrorless", image: "./images/canon-r3.png", specs: "24.1MP · 30fps · Eye Control AF", price: 3299, period: "day", rating: 4.8, reviews: 52, badge: "Speed" },
    { id: 11, name: "Nikon Z9", brand: "Nikon", category: "mirrorless", image: "./images/nikon-z9.png", specs: "45.7MP · 8K · 120fps", price: 3599, period: "day", rating: 4.9, reviews: 41, badge: "Flagship" },
    { id: 12, name: "RED Komodo 6K", brand: "RED", category: "video", image: "./images/red-komodo.png", specs: "6K · Global Shutter · RF Mount", price: 7999, period: "day", rating: 5.0, reviews: 28, badge: "Cinema" },
];

const accessoriesData = [
    { id: 101, name: "Canon RF 50mm f/1.2", image: "./images/canon-50mm.png", price: 899, period: "day", type: "Lens", brand: "Canon" },
    { id: 102, name: "Sony 24-70mm f/2.8", image: "./images/sony-2470.png", price: 699, period: "day", type: "Lens", brand: "Sony" },
    { id: 103, name: "Manfrotto 055", image: "./images/manfrotto-055.png", price: 299, period: "day", type: "Tripod", brand: "Manfrotto" },
    { id: 104, name: "DJI RS 3 Pro", image: "./images/dji-rs3.png", price: 599, period: "day", type: "Gimbal", brand: "DJI" },
    { id: 105, name: "NiSi Filter Kit", image: "./images/nisi-filter.png", price: 199, period: "day", type: "Filter", brand: "NiSi" },
    { id: 106, name: "Godox AD600 Pro", image: "./images/godox-ad600.png", price: 499, period: "day", type: "Light", brand: "Godox" },
    { id: 107, name: "Sennheiser MKE 600", image: "./images/sennheiser-mke600.png", price: 349, period: "day", type: "Mic", brand: "Sennheiser" },
    { id: 108, name: "Sigma 70-200mm f/2.8", image: "./images/sigma-70200.png", price: 599, period: "day", type: "Lens", brand: "Sigma" },
    { id: 109, name: "Peak Design Stand", image: "./images/peak-design.png", price: 149, period: "day", type: "Stand", brand: "Peak Design" },
    { id: 110, name: "Zhiyun Crane 4", image: "./images/zhiyun-crane.png", price: 449, period: "day", type: "Gimbal", brand: "Zhiyun" },
];

// Cart state: array of { id, name, emoji, brand, price, period, qty }
let cart = [];
let currentFilter = 'all';
let notifTimeout = null;

function findItemData(id) {
    let item = allProducts.find(p => p.id === id);
    if (item) return { id: item.id, name: item.name, image: item.image, brand: item.brand, price: item.price, period: item.period };
    item = accessoriesData.find(a => a.id === id);
    if (item) return { id: item.id, name: item.name, image: item.image, brand: item.brand || item.type, price: item.price, period: item.period };
    return null;
}

// Cart functions
function addToCart(id, name, btn) {
    const existing = cart.find(c => c.id === id);
    if (existing) {
        existing.qty++;
    } else {
        const data = findItemData(id);
        if (data) {
            cart.push({ ...data, qty: 1 });
        }
    }
    updateCartUI();

    // Button animation
    if (btn) {
        btn.classList.add('added');
        const orig = btn.innerHTML;
        btn.innerHTML = '✓ Added';
        setTimeout(() => {
            btn.classList.remove('added');
            btn.innerHTML = orig;
        }, 1500);
    }

    // Bounce cart button
    const cartBtnEl = document.getElementById('cartBtn');
    cartBtnEl.classList.remove('bounce');
    void cartBtnEl.offsetWidth;
    cartBtnEl.classList.add('bounce');

    showNotification(name);
}

function removeFromCart(id) {
    const el = document.querySelector(`.cart-item[data-id="${id}"]`);
    if (el) {
        el.classList.add('removing');
        setTimeout(() => {
            cart = cart.filter(c => c.id !== id);
            updateCartUI();
            renderCartItems();
        }, 400);
    } else {
        cart = cart.filter(c => c.id !== id);
        updateCartUI();
        renderCartItems();
    }
}

function updateQty(id, delta) {
    const item = cart.find(c => c.id === id);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) {
        removeFromCart(id);
        return;
    }
    updateCartUI();
    renderCartItems();
}

function clearCart() {
    cart = [];
    updateCartUI();
    renderCartItems();
}

function updateCartUI() {
    const totalItems = cart.reduce((s, c) => s + c.qty, 0);
    document.getElementById('cartCount').textContent = totalItems;
    document.getElementById('mobileCartCount').textContent = totalItems;
    document.getElementById('cartItemCount').textContent = totalItems + ' item' + (totalItems !== 1 ? 's' : '');

    const subtotal = cart.reduce((s, c) => s + c.price * c.qty, 0);
    const tax = Math.round(subtotal * 0.18);
    const total = subtotal + tax;

    const summaryEl = document.getElementById('cartSummary');
    const checkoutBtn = document.getElementById('checkoutBtn');
    const clearBtn = document.getElementById('clearCartBtn');

    if (cart.length === 0) {
        summaryEl.innerHTML = '';
        checkoutBtn.disabled = true;
        clearBtn.style.display = 'none';
    } else {
        summaryEl.innerHTML = `
                    <div class="cart-summary-row muted"><span>Subtotal</span><span>₹${subtotal.toLocaleString()}</span></div>
                    <div class="cart-summary-row muted"><span>GST (18%)</span><span>₹${tax.toLocaleString()}</span></div>
                    <div class="cart-summary-row muted"><span>Delivery</span><span style="color:var(--green)">FREE</span></div>
                    <div class="cart-summary-row total"><span>Total</span><span class="amount">₹${total.toLocaleString()}</span></div>
                `;
        checkoutBtn.disabled = false;
        clearBtn.style.display = 'block';
    }
}

function renderCartItems() {
    const list = document.getElementById('cartItemsList');
    if (cart.length === 0) {
        list.innerHTML = `
                    <div class="cart-empty">
                        <span class="cart-empty-icon">🛒</span>
                        <h3>Your cart is empty</h3>
                        <p>Looks like you haven't added any cameras yet. Browse our collection and find your perfect gear!</p>
                    </div>
                `;
        return;
    }
    list.innerHTML = cart.map(item => `
                <div class="cart-item" data-id="${item.id}">
                    <div class="cart-item-image">
                        ${item.image ? `<img src="${item.image}" alt="${item.name}" style="width:100%; height:100%; object-fit:contain;">` : item.emoji}
                    </div>
                    <div class="cart-item-details">
                        <div class="cart-item-brand">${item.brand}</div>
                        <div class="cart-item-name">${item.name}</div>
                        <div class="cart-item-price">₹${(item.price * item.qty).toLocaleString()} <small>₹${item.price}/${item.period}</small></div>
                    </div>
                    <div class="cart-item-actions">
                        <button class="cart-item-remove" onclick="removeFromCart(${item.id})" title="Remove">🗑️</button>
                        <div class="qty-control">
                            <button class="qty-btn" onclick="updateQty(${item.id}, -1)">−</button>
                            <span class="qty-value">${item.qty}</span>
                            <button class="qty-btn" onclick="updateQty(${item.id}, 1)">+</button>
                        </div>
                    </div>
                </div>
            `).join('');
}

function openCart() {
    document.getElementById('cartOverlay').classList.add('open');
    document.getElementById('cartSidebar').classList.add('open');
    document.body.style.overflow = 'hidden';
    renderCartItems();
    updateCartUI();
}

function closeCart() {
    document.getElementById('cartOverlay').classList.remove('open');
    document.getElementById('cartSidebar').classList.remove('open');
    document.body.style.overflow = '';
}

function proceedToCheckout() {
    if (cart.length === 0) return;
    const orderId = 'LR-' + Math.random().toString(36).substr(2, 8).toUpperCase();
    document.getElementById('orderId').textContent = orderId;
    closeCart();
    setTimeout(() => {
        document.getElementById('checkoutModal').classList.add('open');
        document.body.style.overflow = 'hidden';
    }, 300);
}

function closeCheckoutModal() {
    document.getElementById('checkoutModal').classList.remove('open');
    document.body.style.overflow = '';
    cart = [];
    updateCartUI();
    renderCartItems();
}

function showNotification(itemName) {
    const notif = document.getElementById('cartNotification');
    document.getElementById('notifItem').textContent = itemName;
    notif.classList.add('show');
    if (notifTimeout) clearTimeout(notifTimeout);
    notifTimeout = setTimeout(() => notif.classList.remove('show'), 3000);
}

function toggleWishlist(btn) {
    btn.classList.toggle('liked');
    btn.textContent = btn.classList.contains('liked') ? '♥' : '♡';
}

// Render Products
function renderProducts(filter = 'all') {
    const grid = document.getElementById('productsGrid');
    const filtered = filter === 'all' ? allProducts : allProducts.filter(p => p.category === filter);
    grid.innerHTML = filtered.map((p, i) => `
                <div class="product-card scroll-animate" style="transition-delay:${i * 0.1}s" data-category="${p.category}">
                    ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ''}
                    <button class="product-wishlist" onclick="toggleWishlist(this)">♡</button>
                    <div class="product-image">
                        <img src="${p.image}" class="camera-img" alt="${p.name}">
                        <div class="product-image-overlay"></div>
                    </div>
                    <div class="product-info">
                        <div class="product-brand">${p.brand}</div>
                        <div class="product-name">${p.name}</div>
                        <div class="product-specs">${p.specs}</div>
                        <div class="product-rating">
                            <span class="stars">${'★'.repeat(Math.floor(p.rating))}${p.rating % 1 >= 0.5 ? '½' : ''}</span>
                            <span class="rating-text">${p.rating} (${p.reviews})</span>
                        </div>
                        <div class="product-footer">
                            <div class="product-price">₹${p.price} <span>/${p.period}</span></div>
                            <button class="add-to-cart" onclick="addToCart(${p.id}, '${p.name}', this)">🛒 Rent</button>
                        </div>
                    </div>
                </div>
            `).join('');
    observeElements();
}

function renderAccessories() {
    const grid = document.getElementById('accessoriesGrid');
    grid.innerHTML = accessoriesData.map((a, i) => `
                <div class="accessory-card scroll-animate" style="transition-delay:${i * 0.1}s">
                    <img src="${a.image}" class="accessory-img" alt="${a.name}">
                    <h3>${a.name}</h3>
                    <div style="color:var(--text-muted);font-size:0.75rem;margin-bottom:0.5rem;text-transform:uppercase;letter-spacing:1px;">${a.type}</div>
                    <div class="price">₹${a.price} <span>/${a.period}</span></div>
                    <button class="btn-small" onclick="addToCart(${a.id}, '${a.name}', this)">Add to Cart</button>
                </div>
            `).join('');
}

// Filter Tabs
document.querySelectorAll('.filter-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        currentFilter = tab.dataset.filter;
        renderProducts(currentFilter);
    });
});

// Hamburger
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
});
function closeMobile() {
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('active');
}

// Scroll Effects
const navbar = document.getElementById('navbar');
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
    backToTop.classList.toggle('visible', window.scrollY > 500);
});
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// Intersection Observer
function observeElements() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    document.querySelectorAll('.scroll-animate').forEach(el => observer.observe(el));
}

// Search
document.getElementById('searchInput').addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase();
    if (!q) { renderProducts(currentFilter); return; }
    const filtered = allProducts.filter(p =>
        p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) || p.specs.toLowerCase().includes(q)
    );
    const grid = document.getElementById('productsGrid');
    if (filtered.length === 0) {
        grid.innerHTML = '<p style="text-align:center;color:var(--text-muted);grid-column:1/-1;padding:3rem;">No cameras found. Try a different keyword.</p>';
        return;
    }
    grid.innerHTML = filtered.map((p, i) => `
                <div class="product-card" style="animation:fadeInUp 0.5s ease ${i * 0.1}s both;">
                    ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ''}
                    <button class="product-wishlist" onclick="toggleWishlist(this)">♡</button>
                    <div class="product-image"><span class="camera-emoji">${p.emoji}</span><div class="product-image-overlay"></div></div>
                    <div class="product-info">
                        <div class="product-brand">${p.brand}</div>
                        <div class="product-name">${p.name}</div>
                        <div class="product-specs">${p.specs}</div>
                        <div class="product-rating"><span class="stars">${'★'.repeat(Math.floor(p.rating))}</span><span class="rating-text">${p.rating} (${p.reviews})</span></div>
                        <div class="product-footer">
                            <div class="product-price">₹${p.price} <span>/${p.period}</span></div>
                            <button class="add-to-cart" onclick="addToCart(${p.id}, '${p.name}', this)">🛒 Rent</button>
                        </div>
                    </div>
                </div>
            `).join('');
});

// Init
renderProducts();
renderAccessories();
observeElements();
updateCartUI();
renderCartItems();
