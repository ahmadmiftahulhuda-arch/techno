/* ==========================================================================
   SRUPUT & NYAM - Mobile & Desktop Responsive Engine
   Seamless SPA Scroll, Dynamic QRIS Payment & Real-time Webhook Simulation
   ========================================================================== */

// Full Catalog Database
const FULL_CATALOG_DATA = [
  { id: "mango-juice", title: "Mango Juice", category: "sruput", price: 28000, badge: "Best Seller", badgeType: "tag-corner-bestseller", image: "images/mango.png", description: "Mangga harum manis segar dipadu dengan sentuhan jeruk nipis." },
  { id: "classic-caesar", title: "Classic Caesar Salad", category: "nyam", price: 45000, badge: "Vegan", badgeType: "tag-corner-vegan", image: "images/classic_salad.png", description: "Selada romaine renyah, crouton, keju parmesan, dan saus caesar..." },
  { id: "watermelon-juice", title: "Watermelon Juice", category: "sruput", price: 25000, badge: null, image: "images/watermelon.png", description: "Jus semangka murni tanpa gula tambahan, 100% menyegarkan..." },
  { id: "tropical-fruit-bowl", title: "Tropical Fruit Bowl", category: "nyam", price: 38000, badge: null, image: "images/salad.png", description: "Potongan buah naga, nanas, kiwi dengan siraman yogurt madu." },
  { id: "green-detox-combo", title: "Green Detox", category: "combo", price: 55000, strikePrice: 65000, badge: "Hemat 15%", badgeType: "tag-corner-save", image: "images/salad.png", description: "Green Ninja Juice + Mini Garden Salad. Pilihan cerdas untuk harimu." },
  { id: "sruput-ori", title: "Es Jeruk Peras Original", category: "sruput", price: 15000, badge: "Best Seller", badgeType: "tag-corner-bestseller", image: "images/es_jeruk.png", description: "100% murni perasan jeruk asli tanpa gula buatan." },
  { id: "nyam-salad-green", title: "Gourmet Salad Bowl", category: "nyam", price: 35000, badge: "Organic", badgeType: "tag-corner-vegan", image: "images/salad.png", description: "Sayuran hidroponik segar dengan pilihan dressing premium." },
  { id: "combo-sruput-nyam", title: "Paket Combo Sruput & Nyam", category: "combo", price: 45000, strikePrice: 50000, badge: "Hemat Rp 5.000", badgeType: "tag-corner-save", image: "images/combo.png", description: "Penyatuan sempurna: 1 Es Jeruk Peras + 1 Gourmet Salad Bowl." }
];

// Product Customization Options
const ITEM_CUSTOMIZATION_OPTIONS = {
  "sruput-ori": {
    sugar: [{ label: "Tanpa Gula (0%)", val: "Tanpa Gula (0%)" }, { label: "Normal (100%)", val: "Normal (100%)" }, { label: "Ekstra Manis (150%)", val: "Ekstra Manis (150%)" }],
    ice: [{ label: "Sedikit", val: "Es Sedikit", icons: 1 }, { label: "Normal", val: "Es Normal", icons: 2 }, { label: "Banyak", val: "Es Banyak", icons: 3 }],
    toppings: [{ name: "Biji Selasih", price: 4000 }, { name: "Jelly Citrus", price: 5000 }, { name: "Extra Bulir Jeruk", price: 6000 }]
  },
  "watermelon-juice": {
    sugar: [{ label: "Tanpa Gula (0%)", val: "Tanpa Gula (0%)" }, { label: "Normal (100%)", val: "Normal (100%)" }],
    ice: [{ label: "Sedikit", val: "Es Sedikit", icons: 1 }, { label: "Normal", val: "Es Normal", icons: 2 }],
    toppings: [{ name: "Mint Leaves", price: 3000 }, { name: "Chia Seeds", price: 4000 }]
  },
  "mango-juice": {
    sugar: [{ label: "Tanpa Gula (0%)", val: "Tanpa Gula (0%)" }, { label: "Normal (100%)", val: "Normal (100%)" }],
    ice: [{ label: "Sedikit", val: "Es Sedikit", icons: 1 }, { label: "Normal", val: "Es Normal", icons: 2 }],
    toppings: [{ name: "Coffee Jelly", price: 5000 }, { name: "Extra Mango Slices", price: 6000 }]
  },
  "nyam-salad-green": {
    dressing: [{ label: "Roasted Sesame Dressing", val: "Roasted Sesame Dressing" }, { label: "Honey Mustard Dressing", val: "Honey Mustard Dressing" }, { label: "Caesar Dressing", val: "Caesar Dressing" }],
    toppings: [{ name: "Dada Ayam Panggang", price: 10000 }, { name: "Smoked Beef", price: 12000 }, { name: "Telur Rebus", price: 5000 }]
  }
};

// Initial Cart
let cart = [
  { cartId: 101, id: "mango-juice", title: "Nasi Goreng Spesial", image: "images/mango.png", basePrice: 45000, quantity: 1, sugar: "Level Pedas: Sedang", unitPrice: 45000 },
  { cartId: 102, id: "sruput-ori", title: "Es Teh Lemon", image: "images/es_jeruk.png", basePrice: 15000, quantity: 1, sugar: "Gula: Normal", unitPrice: 15000 }
];

let activeItem = null;
let currentCategoryFilter = "all";
let currentSearchQuery = "";
let discountRate = 0;
let currentAdminTab = "orders";
let currentOrderFilter = "all";
let currentJournalFilter = "all";

// Initial Demo Kitchen & Admin Orders
let kitchenOrders = [
  {
    orderId: "SN-892101",
    customerName: "Ahmad Miftah (Meja 04)",
    phone: "08129876543",
    items: [
      { id: "sruput-ori", title: "Es Jeruk Peras Original", unitPrice: 15000, quantity: 2 },
      { id: "nyam-salad-green", title: "Gourmet Salad Bowl", unitPrice: 35000, quantity: 1 }
    ],
    total: 65000,
    status: "Selesai",
    paymentMethod: "QRIS",
    timestamp: "10:15 WIB"
  },
  {
    orderId: "SN-892102",
    customerName: "Siti Rahma (Takeaway)",
    phone: "08571234567",
    items: [
      { id: "mango-juice", title: "Mango Juice", unitPrice: 28000, quantity: 1 },
      { id: "tropical-fruit-bowl", title: "Tropical Fruit Bowl", unitPrice: 38000, quantity: 1 }
    ],
    total: 66000,
    status: "Diproses",
    paymentMethod: "Tunai",
    timestamp: "10:30 WIB"
  },
  {
    orderId: "SN-892103",
    customerName: "Budi Santoso (Delivery)",
    phone: "08123456789",
    items: [
      { id: "green-detox-combo", title: "Green Detox", unitPrice: 55000, quantity: 1 }
    ],
    total: 65000,
    status: "Siap",
    paymentMethod: "QRIS",
    timestamp: "10:45 WIB"
  }
];

// Initial Financial Logs Ledger
let financialLogs = [
  {
    id: "FIN-101",
    date: new Date().toLocaleDateString("id-ID"),
    time: "08:00 WIB",
    type: "Pengeluaran",
    category: "Bahan Baku",
    description: "Beli Jeruk Peras Segar 15kg & Es Batu",
    amount: 150000,
    orderId: null
  },
  {
    id: "FIN-102",
    date: new Date().toLocaleDateString("id-ID"),
    time: "08:30 WIB",
    type: "Pengeluaran",
    category: "Kemasan",
    description: "Beli Cup Branding Sruput 100 pcs + Sedotan",
    amount: 45000,
    orderId: null
  },
  {
    id: "FIN-103",
    date: new Date().toLocaleDateString("id-ID"),
    time: "10:15 WIB",
    type: "Pemasukan",
    category: "QRIS",
    description: "Pembayaran Pesanan SN-892101 (Ahmad Miftah)",
    amount: 65000,
    orderId: "SN-892101"
  }
];


// DOM Ready
document.addEventListener("DOMContentLoaded", () => {
  renderFullMenuCatalog();
  updateCartUI();
  setupEventListeners();
  initScrollObserver();
});

// Mobile Hamburger Controls
function toggleMobileMenu() {
  const overlay = document.getElementById("mobileMenuOverlay");
  if (overlay) overlay.classList.toggle("active");
}

function mobileNavClick(sectionId) {
  const overlay = document.getElementById("mobileMenuOverlay");
  if (overlay) overlay.classList.remove("active");
  scrollToSection(sectionId);
}

// Scroll Reveal Observer
function initScrollObserver() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll(".reveal-on-scroll").forEach(el => observer.observe(el));
}

// Smooth Scroll to Section
function scrollToSection(sectionId) {
  const target = document.getElementById(sectionId);
  if (target) {
    const offset = 70;
    const bodyRect = document.body.getBoundingClientRect().top;
    const elementRect = target.getBoundingClientRect().top;
    const elementPosition = elementRect - bodyRect;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth"
    });
  }
}

function setActiveNav(el) {
  document.querySelectorAll(".nav-link").forEach(l => l.classList.remove("active"));
  el.classList.add("active");
}

// Render Menu Catalog
function renderFullMenuCatalog() {
  const grid = document.getElementById("fullCatalogGrid");
  if (!grid) return;

  let filtered = FULL_CATALOG_DATA;
  if (currentCategoryFilter !== "all") filtered = filtered.filter(i => i.category === currentCategoryFilter);
  if (currentSearchQuery) filtered = filtered.filter(i => i.title.toLowerCase().includes(currentSearchQuery) || i.description.toLowerCase().includes(currentSearchQuery));

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; color: var(--text-muted); padding: 3rem;">
        <i class="fa-solid fa-magnifying-glass" style="font-size: 2.5rem; opacity: 0.3; margin-bottom: 1rem;"></i>
        <p>Menu tidak ditemukan untuk kata kunci "${currentSearchQuery}".</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(item => `
    <div class="catalog-card">
      <div class="catalog-card-img-box">
        <img src="${item.image}" alt="${item.title}" loading="lazy">
        ${item.badge ? `<span class="tag-badge-corner ${item.badgeType}">${item.badge}</span>` : ''}
      </div>
      <div class="catalog-card-body">
        <div class="catalog-card-head-row">
          <h3 class="catalog-card-title">${item.title}</h3>
          <span class="catalog-card-price">Rp ${item.price.toLocaleString("id-ID")}</span>
        </div>
        <p class="catalog-card-desc">${item.description}</p>
        <button class="btn-add-simple" onclick="openCustomModal('${item.id}')">+ Tambah</button>
      </div>
    </div>
  `).join('');
}

function filterCategoryPill(category, el) {
  currentCategoryFilter = category;
  document.querySelectorAll(".pill-filter-item").forEach(p => p.classList.remove("active"));
  el.classList.add("active");
  renderFullMenuCatalog();
}

function filterFullMenuCatalog() {
  const input = document.getElementById("menuSearchInput");
  currentSearchQuery = input ? input.value.trim().toLowerCase() : "";
  renderFullMenuCatalog();
}

// Global Event Listeners
function setupEventListeners() {
  const cartBtn = document.getElementById("cartBtn");
  const closeCartBtn = document.getElementById("closeCartBtn");
  const cartDrawer = document.getElementById("cartDrawer");
  const cartBackdrop = document.getElementById("cartBackdrop");

  cartBtn?.addEventListener("click", openCartDrawer);

  const closeCart = () => {
    cartDrawer?.classList.remove("open");
    cartBackdrop?.classList.remove("open");
  };

  closeCartBtn?.addEventListener("click", closeCart);
  cartBackdrop?.addEventListener("click", closeCart);

  // Admin Portal Button Listener
  const adminBtn = document.getElementById("adminBtn");
  adminBtn?.addEventListener("click", openAdminPanel);

  // ESC Key listener
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeCheckoutModal();
      closeCustomModal();
      closeWriteReviewModal();
      closePaymentModal();
      closeCart();
      closeAdminPanel();
      closeManualOrderModal();
      document.getElementById("mobileMenuOverlay")?.classList.remove("active");
    }
  });

  // Backdrop click listeners
  document.querySelectorAll(".modal-overlay").forEach(overlay => {
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) {
        overlay.classList.remove("active");
      }
    });
  });
}

function openCartDrawer() {
  const cartDrawer = document.getElementById("cartDrawer");
  const cartBackdrop = document.getElementById("cartBackdrop");
  cartDrawer?.classList.add("open");
  cartBackdrop?.classList.add("open");
}

// Customization Modal
function openCustomModal(itemId) {
  let item = FULL_CATALOG_DATA.find(m => m.id === itemId) || { id: itemId, title: "Es Jeruk Peras Original", price: 15000, image: "images/es_jeruk.png", description: "Perasan jeruk murni 100%." };
  const customOpts = ITEM_CUSTOMIZATION_OPTIONS[itemId] || ITEM_CUSTOMIZATION_OPTIONS["sruput-ori"];

  activeItem = {
    ...item,
    quantity: 1,
    selectedSugar: customOpts.sugar ? customOpts.sugar[1]?.val || customOpts.sugar[0]?.val : null,
    selectedIce: customOpts.ice ? customOpts.ice[1]?.val || customOpts.ice[0]?.val : null,
    selectedDressing: customOpts.dressing ? customOpts.dressing[0]?.val : null,
    selectedToppings: []
  };

  document.getElementById("modalHeroImg").src = item.image;
  document.getElementById("modalProductTitle").innerText = item.title;
  document.getElementById("modalProductDesc").innerText = item.description;
  document.getElementById("modalBasePriceDisplay").innerText = `Rp ${item.price.toLocaleString("id-ID")}`;
  document.getElementById("modalQtyNum").innerText = 1;

  const dynamicBox = document.getElementById("modalDynamicOptions");
  let html = "";

  if (customOpts.sugar) {
    html += `
      <div style="margin-bottom: 1.25rem;">
        <div class="option-section-head">
          <span>Tingkat Kemanisan</span>
          <span class="badge-wajib">Wajib</span>
        </div>
        <div class="radio-card-list">
          ${customOpts.sugar.map(s => `
            <div class="radio-card-item ${activeItem.selectedSugar === s.val ? 'selected' : ''}" onclick="selectSugar('${s.val}', this)">
              <div class="custom-radio-circle">${activeItem.selectedSugar === s.val ? '<div class="radio-dot-inner"></div>' : ''}</div>
              <span>${s.label}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  if (customOpts.ice) {
    html += `
      <div style="margin-bottom: 1.25rem;">
        <div class="option-section-head">
          <span>Jumlah Es</span>
          <span class="badge-wajib">Wajib</span>
        </div>
        <div class="ice-grid-options">
          ${customOpts.ice.map(i => `
            <div class="ice-option-card ${activeItem.selectedIce === i.val ? 'selected' : ''}" onclick="selectIce('${i.val}', this)">
              <div>${Array(i.icons).fill('<i class="fa-solid fa-snowflake"></i>').join('')}</div>
              <span>${i.label}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  if (customOpts.toppings) {
    html += `
      <div style="margin-bottom: 1.25rem;">
        <div class="option-section-head">
          <span>Tambahan Topping</span>
          <span class="badge-opsional">Opsional</span>
        </div>
        <div>
          ${customOpts.toppings.map(t => `
            <div class="checkbox-card-item" onclick="toggleModalTopping('${t.name}', ${t.price}, this)">
              <div style="display: flex; align-items: center; gap: 0.75rem;">
                <div class="custom-checkbox-box"><i class="fa-solid fa-check"></i></div>
                <span>${t.name}</span>
              </div>
              <span style="font-weight: 600; color: #475569;">+ Rp ${t.price.toLocaleString('id-ID')}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  dynamicBox.innerHTML = html;
  updateModalCalculatedPrice();
  document.getElementById("customModal").classList.add("active");
}

function selectSugar(val, el) {
  activeItem.selectedSugar = val;
  el.parentElement.querySelectorAll(".radio-card-item").forEach(c => { c.classList.remove("selected"); c.querySelector(".custom-radio-circle").innerHTML = ""; });
  el.classList.add("selected");
  el.querySelector(".custom-radio-circle").innerHTML = '<div class="radio-dot-inner"></div>';
}

function selectIce(val, el) {
  activeItem.selectedIce = val;
  el.parentElement.querySelectorAll(".ice-option-card").forEach(c => c.classList.remove("selected"));
  el.classList.add("selected");
}

function toggleModalTopping(name, price, el) {
  const idx = activeItem.selectedToppings.findIndex(t => t.name === name);
  if (idx > -1) { activeItem.selectedToppings.splice(idx, 1); el.classList.remove("selected"); }
  else { activeItem.selectedToppings.push({ name, price }); el.classList.add("selected"); }
  updateModalCalculatedPrice();
}

function adjustModalQty(delta) {
  if (!activeItem) return;
  activeItem.quantity = Math.max(1, activeItem.quantity + delta);
  document.getElementById("modalQtyNum").innerText = activeItem.quantity;
  updateModalCalculatedPrice();
}

function updateModalCalculatedPrice() {
  if (!activeItem) return;
  let unit = activeItem.price;
  activeItem.selectedToppings.forEach(t => unit += t.price);
  const total = unit * activeItem.quantity;
  document.getElementById("modalCalculatedPrice").innerText = `Rp ${total.toLocaleString("id-ID")}`;
}

function closeCustomModal() { document.getElementById("customModal").classList.remove("active"); }

function confirmAddToCart() {
  if (!activeItem) return;
  let unitPrice = activeItem.price;
  activeItem.selectedToppings.forEach(t => unitPrice += t.price);

  const newItem = {
    cartId: Date.now() + Math.random(),
    id: activeItem.id,
    title: activeItem.title,
    image: activeItem.image,
    basePrice: activeItem.price,
    quantity: activeItem.quantity,
    sugar: activeItem.selectedSugar,
    ice: activeItem.selectedIce,
    dressing: activeItem.selectedDressing,
    toppings: [...activeItem.selectedToppings],
    unitPrice
  };

  cart.push(newItem);
  updateCartUI();
  closeCustomModal();
  showToast(`Berhasil menambahkan ${newItem.title} ke keranjang!`);

  openCartDrawer();
}

// Update Cart & Mobile Sticky Cart Bar
function updateCartUI() {
  const list = document.getElementById("cartItemsList");
  const badgeMain = document.getElementById("cartBadgeCount");
  const badgeDrawer = document.getElementById("cartDrawerBadge");
  const mobileBadge = document.getElementById("mobileCartBadge");
  const mobileCartBar = document.getElementById("mobileStickyCartBar");

  const totalCount = cart.reduce((acc, i) => acc + i.quantity, 0);
  if (badgeMain) badgeMain.innerText = totalCount;
  if (badgeDrawer) badgeDrawer.innerText = totalCount;
  if (mobileBadge) mobileBadge.innerText = totalCount;

  if (cart.length === 0) {
    list.innerHTML = `<div style="text-align: center; color: var(--text-muted); padding: 3rem 1rem;"><p>Keranjang kamu masih kosong.</p></div>`;
    updateCartSummary(0);
    if (mobileCartBar) mobileCartBar.style.display = "none";
    return;
  }

  let subtotal = 0;

  list.innerHTML = cart.map(item => {
    const itemTotal = item.unitPrice * item.quantity;
    subtotal += itemTotal;

    const opts = [];
    if (item.sugar) opts.push(item.sugar);
    if (item.ice) opts.push(item.ice);
    if (item.dressing) opts.push(item.dressing);
    if (item.toppings && item.toppings.length > 0) opts.push("+" + item.toppings.map(t => t.name).join(", "));

    return `
      <div class="cart-item-card">
        <img src="${item.image}" alt="${item.title}">
        <div class="cart-item-info">
          <div class="cart-item-head-row">
            <h5 class="cart-item-name">${item.title}</h5>
            <span class="btn-delete-cart-item" onclick="removeCartItem(${item.cartId})"><i class="fa-regular fa-trash-can"></i></span>
          </div>
          <div class="cart-item-subopts">${opts.join(", ")}</div>
          <div class="cart-item-price-row">
            <span class="cart-item-price-text">Rp ${itemTotal.toLocaleString("id-ID")}</span>
            <div class="qty-stepper-capsule" style="padding: 0.2rem 0.6rem;">
              <button class="btn-stepper-minus" onclick="changeCartQty(${item.cartId}, -1)">-</button>
              <span class="stepper-val" style="font-size: 0.9rem;">${item.quantity}</span>
              <button class="btn-stepper-plus" onclick="changeCartQty(${item.cartId}, 1)">+</button>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');

  updateCartSummary(subtotal);
}

function changeCartQty(cartId, delta) {
  const item = cart.find(i => i.cartId === cartId);
  if (!item) return;
  item.quantity += delta;
  if (item.quantity <= 0) cart = cart.filter(i => i.cartId !== cartId);
  updateCartUI();
}

function removeCartItem(cartId) {
  cart = cart.filter(i => i.cartId !== cartId);
  updateCartUI();
}

function applyPromoCode() {
  const code = document.getElementById("promoInput").value.trim().toUpperCase();
  if (code === "SRUPUTNYAM10") {
    discountRate = 0.10;
    showToast("Kode promo SRUPUTNYAM10 berhasil!");
  } else {
    showToast("Kode promo tidak valid!");
    return;
  }
  updateCartUI();
}

function updateCartSummary(subtotal) {
  const discountAmount = subtotal * discountRate;
  const shippingFee = subtotal > 0 ? 10000 : 0;
  const total = Math.max(0, subtotal - discountAmount + shippingFee);

  if (document.getElementById("cartSubtotal")) document.getElementById("cartSubtotal").innerText = `Rp ${subtotal.toLocaleString("id-ID")}`;
  if (document.getElementById("cartShipping")) document.getElementById("cartShipping").innerText = `Rp ${shippingFee.toLocaleString("id-ID")}`;
  if (document.getElementById("cartDiscount")) document.getElementById("cartDiscount").innerText = `- Rp ${discountAmount.toLocaleString("id-ID")}`;
  if (document.getElementById("cartTotal")) document.getElementById("cartTotal").innerText = `Rp ${total.toLocaleString("id-ID")}`;
  if (document.getElementById("mobileCartTotal")) document.getElementById("mobileCartTotal").innerText = `Rp ${total.toLocaleString("id-ID")}`;
}

function openDemoModal() { openCustomModal("sruput-ori"); }

// CHECKOUT MODAL HANDLERS
function openCheckoutModal() {
  if (cart.length === 0) {
    showToast("Keranjang kamu masih kosong!");
    return;
  }

  document.getElementById("cartDrawer")?.classList.remove("open");
  document.getElementById("cartBackdrop")?.classList.remove("open");

  const summaryBox = document.getElementById("checkoutSummaryItemsList");
  let subtotal = 0;

  summaryBox.innerHTML = cart.map(item => {
    const itemTotal = item.unitPrice * item.quantity;
    subtotal += itemTotal;
    const optText = item.sugar || item.dressing || "Normal";

    return `
      <div class="summary-item-row">
        <img src="${item.image}" class="summary-item-thumb">
        <div class="summary-item-meta">
          <h5 class="summary-item-name">${item.title}</h5>
          <span class="summary-item-opt">${optText}</span>
        </div>
        <span class="summary-item-price">Rp ${itemTotal.toLocaleString("id-ID")}</span>
      </div>
    `;
  }).join('');

  const shippingFee = 10000;
  const discountAmount = subtotal * discountRate;
  const total = Math.max(0, subtotal + shippingFee - discountAmount);

  if (document.getElementById("checkoutSubtotal")) document.getElementById("checkoutSubtotal").innerText = `Rp ${subtotal.toLocaleString("id-ID")}`;
  if (document.getElementById("checkoutShipping")) document.getElementById("checkoutShipping").innerText = `Rp ${shippingFee.toLocaleString("id-ID")}`;
  if (document.getElementById("checkoutTotal")) document.getElementById("checkoutTotal").innerText = `Rp ${total.toLocaleString("id-ID")}`;

  document.getElementById("checkoutModal")?.classList.add("active");
}

function closeCheckoutModal() {
  const modal = document.getElementById("checkoutModal");
  if (modal) modal.classList.remove("active");
}

// Payment Selection
function selectPaymentCard(type, el) {
  document.querySelectorAll(".pay-option-card").forEach(c => c.classList.remove("selected"));
  el.classList.add("selected");
  showToast(`Metode Pembayaran: ${type.toUpperCase()}`);
}

function triggerCheckoutPayment() {
  const name = document.getElementById("checkNameVal")?.value;
  const phone = document.getElementById("checkPhoneVal")?.value;
  if (!name || !phone) {
    showToast("Harap isi nama dan nomor telepon penerima!");
    return;
  }

  currentPaymentOrderId = "SN-" + Math.floor(100000 + Math.random() * 900000);
  const subtotal = cart.reduce((acc, i) => acc + (i.unitPrice * i.quantity), 0);
  const total = subtotal + 10000 - (subtotal * discountRate);

  closeCheckoutModal();
  openPaymentModal(currentPaymentOrderId, total);
}

// DYNAMIC QRIS & COUNTDOWN TIMER ENGINE
function openPaymentModal(orderId, total) {
  currentPaymentOrderId = orderId;
  document.getElementById("paymentOrderId").innerText = orderId;
  document.getElementById("paymentAmount").innerText = `Rp ${total.toLocaleString("id-ID")}`;
  document.getElementById("paymentModal").classList.add("active");

  startPaymentCountdown(15 * 60); // 15 Minutes Countdown
}

function startPaymentCountdown(durationSeconds) {
  if (countdownTimerInterval) clearInterval(countdownTimerInterval);
  let timer = durationSeconds;

  const display = document.getElementById("payCountdown");
  countdownTimerInterval = setInterval(() => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;

    if (display) {
      display.innerText = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }

    if (--timer < 0) {
      clearInterval(countdownTimerInterval);
      if (display) display.innerText = "KEDALUWARSA";
      showToast("Batas waktu pembayaran QRIS telah habis!");
    }
  }, 1000);
}

function closePaymentModal() {
  if (countdownTimerInterval) clearInterval(countdownTimerInterval);
  document.getElementById("paymentModal")?.classList.remove("active");
}

function copyTransactionCode() {
  navigator.clipboard.writeText(currentPaymentOrderId).then(() => {
    showToast(`Kode Transaksi ${currentPaymentOrderId} berhasil disalin!`);
  }).catch(() => {
    showToast(`Kode Transaksi: ${currentPaymentOrderId}`);
  });
}

function simulatePaymentSuccess() {
  showToast("Pembayaran QRIS Berhasil! Webhook menerima notifikasi LUNAS.");
  closePaymentModal();

  // Update Order Status Stepper in Checkout View
  const step2 = document.getElementById("step2");
  const line1 = document.getElementById("line1");
  if (step2) step2.classList.add("active", "completed");
  if (line1) line1.classList.add("completed");

  // Add order to Kitchen Admin Portal
  const newOrder = {
    orderId: currentPaymentOrderId,
    customerName: document.getElementById("checkNameVal")?.value || "Budi Santoso",
    phone: document.getElementById("checkPhoneVal")?.value || "08123456789",
    items: [...cart],
    total: cart.reduce((acc, i) => acc + (i.unitPrice * i.quantity), 0) + 10000,
    status: "Diproses",
    paymentMethod: "QRIS",
    timestamp: new Date().toLocaleTimeString("id-ID", { hour: '2-digit', minute: '2-digit' }) + " WIB"
  };
  kitchenOrders.unshift(newOrder);

  // Clear cart
  cart = [];
  updateCartUI();

  setTimeout(() => {
    showToast("Pesanan kamu otomatis dikirim ke Dapur (Mode Dapur)!");
  }, 1500);
}

// Review Submission
function openWriteReviewModal() { document.getElementById("writeReviewModal").classList.add("active"); }
function closeWriteReviewModal() { document.getElementById("writeReviewModal").classList.remove("active"); }

function setReviewRating(stars) {
  currentRatingSelected = stars;
  const icons = document.querySelectorAll("#starSelector i");
  icons.forEach((ic, index) => {
    ic.className = index < stars ? "fa-solid fa-star active-star" : "fa-regular fa-star";
  });
}

function submitUserReview() {
  const name = document.getElementById("revName").value.trim();
  const text = document.getElementById("revText").value.trim();

  if (!name || !text) {
    showToast("Harap isi nama dan ulasan Anda!");
    return;
  }

  const container = document.getElementById("userReviewsContainer");
  const newCard = document.createElement("div");
  newCard.className = "user-review-card";
  newCard.innerHTML = `
    <div class="review-card-head">
      <div><h4 class="user-name">${name}</h4><span class="review-time">Baru saja</span></div>
      <div class="review-stars-row">${Array(currentRatingSelected).fill('<i class="fa-solid fa-star"></i>').join('')}</div>
    </div>
    <div class="badge-verified"><i class="fa-solid fa-circle-check"></i> Verified Purchase</div>
    <p class="user-review-text">${text}</p>
  `;

  container.prepend(newCard);
  closeWriteReviewModal();
  showToast("Terima kasih! Ulasan Anda berhasil ditambahkan.");
}

/* ==========================================================================
   ADMIN PORTAL & FINANCIAL LEDGER ENGINE
   ========================================================================== */

function openAdminPanel() {
  document.getElementById("adminPanelModal")?.classList.add("active");
  renderAdminOrders();
  renderFinanceLedger();
  populateManualProductDropdown();
}

function closeAdminPanel() {
  document.getElementById("adminPanelModal")?.classList.remove("active");
}

function switchAdminTab(tab) {
  currentAdminTab = tab;
  document.getElementById("tabBtnOrders")?.classList.toggle("active", tab === "orders");
  document.getElementById("tabBtnFinance")?.classList.toggle("active", tab === "finance");
  document.getElementById("adminTabOrders")?.classList.toggle("active", tab === "orders");
  document.getElementById("adminTabFinance")?.classList.toggle("active", tab === "finance");

  if (tab === "orders") renderAdminOrders();
  if (tab === "finance") renderFinanceLedger();
}

function filterAdminOrders(status, el) {
  currentOrderFilter = status;
  if (el) {
    document.querySelectorAll(".admin-filter-pill").forEach(p => p.classList.remove("active"));
    el.classList.add("active");
  }
  renderAdminOrders();
}

function updateOrderStatus(orderId, newStatus) {
  const order = kitchenOrders.find(o => o.orderId === orderId);
  if (!order) return;

  const oldStatus = order.status;
  order.status = newStatus;

  // Jika pesanan selesai, otomatis catat Pemasukan di Jurnal Keuangan jika belum ada
  if (newStatus === "Selesai" && oldStatus !== "Selesai") {
    const existingLog = financialLogs.find(f => f.orderId === order.orderId);
    if (!existingLog) {
      financialLogs.unshift({
        id: "FIN-" + Math.floor(100 + Math.random() * 900),
        date: new Date().toLocaleDateString("id-ID"),
        time: new Date().toLocaleTimeString("id-ID", { hour: '2-digit', minute: '2-digit' }) + " WIB",
        type: "Pemasukan",
        category: order.paymentMethod || "QRIS",
        description: `Pembayaran Pesanan ${order.orderId} (${order.customerName})`,
        amount: order.total,
        orderId: order.orderId
      });
    }
    showToast(`Pesanan ${orderId} SELESAI & Otomatis masuk Pembukuan Keuangan!`);
  } else {
    showToast(`Status Pesanan ${orderId} diperbarui ke: ${newStatus.toUpperCase()}`);
  }

  renderAdminOrders();
  renderFinanceLedger();
}

function cancelAdminOrder(orderId) {
  const reason = prompt("Masukkan alasan pembatalan pesanan (opsional):", "Stok habis / Permintaan pelanggan");
  if (reason === null) return; // user batalkan prompt

  const order = kitchenOrders.find(o => o.orderId === orderId);
  if (!order) return;

  order.status = "Dibatalkan";
  order.cancelReason = reason;

  // Hapus log keuangan jika sebelumnya pesanan ini pernah ditandai selesai
  financialLogs = financialLogs.filter(f => f.orderId !== orderId);

  showToast(`Pesanan ${orderId} DIBATALKAN.`);
  renderAdminOrders();
  renderFinanceLedger();
}

function renderAdminOrders() {
  const grid = document.getElementById("adminOrdersGrid");
  const pendingBadge = document.getElementById("pendingOrderBadge");

  const activePendingCount = kitchenOrders.filter(o => o.status === "Diproses" || o.status === "Pending").length;
  if (pendingBadge) pendingBadge.innerText = activePendingCount;

  if (!grid) return;

  let filtered = kitchenOrders;
  if (currentOrderFilter !== "all") {
    filtered = kitchenOrders.filter(o => o.status === currentOrderFilter);
  }

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; color: #94A3B8; padding: 2.5rem;">
        <i class="fa-solid fa-clipboard-list" style="font-size: 2.5rem; opacity: 0.3; margin-bottom: 0.75rem;"></i>
        <p style="font-size: 0.9rem;">Tidak ada pesanan dengan status "${currentOrderFilter}".</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(o => {
    let statusClass = "status-pending";
    if (o.status === "Diproses") statusClass = "status-diproses";
    if (o.status === "Siap") statusClass = "status-siap";
    if (o.status === "Selesai") statusClass = "status-selesai";
    if (o.status === "Dibatalkan") statusClass = "status-dibatalkan";

    let nextButton = "";
    if (o.status === "Pending" || o.status === "Diproses") {
      nextButton = `<button class="btn-action-status" onclick="updateOrderStatus('${o.orderId}', 'Siap')"><i class="fa-solid fa-check"></i> Tandai Siap</button>`;
    } else if (o.status === "Siap") {
      nextButton = `<button class="btn-action-status" style="background: #10B981;" onclick="updateOrderStatus('${o.orderId}', 'Selesai')"><i class="fa-solid fa-flag-checkered"></i> Selesaikan</button>`;
    }

    let cancelButton = "";
    if (o.status !== "Selesai" && o.status !== "Dibatalkan") {
      cancelButton = `<button class="btn-action-cancel" onclick="cancelAdminOrder('${o.orderId}')"><i class="fa-solid fa-ban"></i> Batal</button>`;
    }

    return `
      <div class="admin-order-card">
        <div class="order-card-header">
          <span class="order-id-tag">${o.orderId}</span>
          <span class="order-status-badge ${statusClass}">${o.status}</span>
        </div>
        <div class="order-cust-info">
          <strong>${o.customerName}</strong>
          <div style="font-size: 0.75rem; color: #64748B;">Metode: ${o.paymentMethod || 'QRIS'} • Waktu: ${o.timestamp}</div>
        </div>
        <div class="order-items-list">
          ${o.items.map(i => `
            <div class="order-item-single">
              <span>${i.quantity}x ${i.title}</span>
              <span>Rp ${(i.unitPrice * i.quantity).toLocaleString('id-ID')}</span>
            </div>
          `).join('')}
        </div>
        ${o.cancelReason ? `<div style="font-size: 0.75rem; color: #DC2626; background: #FEF2F2; padding: 0.35rem 0.6rem; border-radius: 6px;">Alasan Batal: ${o.cancelReason}</div>` : ''}
        <div class="order-footer-row">
          <span class="order-total-price">Rp ${o.total.toLocaleString('id-ID')}</span>
          <div class="order-action-buttons">
            ${nextButton}
            ${cancelButton}
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function populateManualProductDropdown() {
  const select = document.getElementById("manualProductSelect");
  if (!select) return;
  select.innerHTML = FULL_CATALOG_DATA.map(p => `
    <option value="${p.id}">${p.title} - Rp ${p.price.toLocaleString('id-ID')}</option>
  `).join('');
}

function openManualOrderModal() {
  populateManualProductDropdown();
  document.getElementById("manualOrderModal")?.classList.add("active");
}

function closeManualOrderModal() {
  document.getElementById("manualOrderModal")?.classList.remove("active");
}

function submitManualOrder() {
  const name = document.getElementById("manualCustName")?.value.trim();
  const prodId = document.getElementById("manualProductSelect")?.value;
  const qty = parseInt(document.getElementById("manualQty")?.value || 1);
  const payMethod = document.getElementById("manualPaymentMethod")?.value;

  if (!name) {
    showToast("Harap isi nama pelanggan / meja!");
    return;
  }

  const product = FULL_CATALOG_DATA.find(p => p.id === prodId);
  if (!product) return;

  const orderId = "SN-" + Math.floor(100000 + Math.random() * 900000);
  const total = product.price * qty;

  const newOrder = {
    orderId: orderId,
    customerName: name,
    phone: "-",
    items: [{ id: product.id, title: product.title, unitPrice: product.price, quantity: qty }],
    total: total,
    status: "Diproses",
    paymentMethod: payMethod,
    timestamp: new Date().toLocaleTimeString("id-ID", { hour: '2-digit', minute: '2-digit' }) + " WIB"
  };

  kitchenOrders.unshift(newOrder);
  closeManualOrderModal();
  showToast(`Pesanan Kasir ${orderId} berhasil dibuat!`);
  renderAdminOrders();
}

function handleAddExpense(e) {
  e.preventDefault();
  const desc = document.getElementById("expenseDesc")?.value.trim();
  const cat = document.getElementById("expenseCategory")?.value;
  const amount = parseFloat(document.getElementById("expenseAmount")?.value || 0);

  if (!desc || amount <= 0) {
    showToast("Harap isi deskripsi dan nominal pengeluaran!");
    return;
  }

  const newLog = {
    id: "EXP-" + Math.floor(100 + Math.random() * 900),
    date: new Date().toLocaleDateString("id-ID"),
    time: new Date().toLocaleTimeString("id-ID", { hour: '2-digit', minute: '2-digit' }) + " WIB",
    type: "Pengeluaran",
    category: cat,
    description: desc,
    amount: amount,
    orderId: null
  };

  financialLogs.unshift(newLog);
  document.getElementById("addExpenseForm")?.reset();
  showToast("Pengeluaran operasional berhasil dicatat!");
  renderFinanceLedger();
}

function deleteFinanceLog(logId) {
  if (!confirm("Hapus catatan transaksi ini dari jurnal keuangan?")) return;
  financialLogs = financialLogs.filter(f => f.id !== logId);
  showToast("Catatan transaksi dihapus.");
  renderFinanceLedger();
}

function filterFinanceJournal() {
  const filter = document.getElementById("journalTypeFilter")?.value || "all";
  currentJournalFilter = filter;
  renderFinanceLedger();
}

function renderFinanceLedger() {
  const totalRevEl = document.getElementById("financeTotalRevenue");
  const totalExpEl = document.getElementById("financeTotalExpense");
  const netIncEl = document.getElementById("financeNetIncome");
  const tableBody = document.getElementById("financeTableBody");

  // Calculate totals
  const totalRevenue = financialLogs.filter(f => f.type === "Pemasukan").reduce((acc, f) => acc + f.amount, 0);
  const totalExpense = financialLogs.filter(f => f.type === "Pengeluaran").reduce((acc, f) => acc + f.amount, 0);
  const netIncome = totalRevenue - totalExpense;

  if (totalRevEl) totalRevEl.innerText = `Rp ${totalRevenue.toLocaleString('id-ID')}`;
  if (totalExpEl) totalExpEl.innerText = `Rp ${totalExpense.toLocaleString('id-ID')}`;
  if (netIncEl) netIncEl.innerText = `Rp ${netIncome.toLocaleString('id-ID')}`;

  if (!tableBody) return;

  let filtered = financialLogs;
  if (currentJournalFilter !== "all") {
    filtered = financialLogs.filter(f => f.type === currentJournalFilter);
  }

  if (filtered.length === 0) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="6" style="text-align: center; color: #94A3B8; padding: 1.5rem;">Belum ada catatan transaksi keuangan.</td>
      </tr>
    `;
    return;
  }

  tableBody.innerHTML = filtered.map(f => {
    const isIncome = f.type === "Pemasukan";
    const typeBadge = isIncome ? '<span class="badge-fin-type type-pemasukan">Pemasukan</span>' : '<span class="badge-fin-type type-pengeluaran">Pengeluaran</span>';
    const amountText = isIncome ? `+ Rp ${f.amount.toLocaleString('id-ID')}` : `- Rp ${f.amount.toLocaleString('id-ID')}`;
    const amountClass = isIncome ? 'val-positive' : 'val-negative';

    return `
      <tr>
        <td><strong>${f.id}</strong></td>
        <td>${f.date} <span style="font-size:0.7rem; color:#94A3B8;">${f.time}</span></td>
        <td>${typeBadge}</td>
        <td>${f.description} <div style="font-size:0.72rem; color:#64748B;">Kategori: ${f.category}</div></td>
        <td class="${amountClass}">${amountText}</td>
        <td>
          <button class="btn-delete-log" onclick="deleteFinanceLog('${f.id}')" title="Hapus"><i class="fa-regular fa-trash-can"></i></button>
        </td>
      </tr>
    `;
  }).join('');
}


function showToast(message) {
  const container = document.getElementById("toastContainer");
  if (!container) return;
  const toast = document.createElement("div");
  toast.className = "toast-msg";
  toast.innerHTML = `<i class="fa-solid fa-circle-check" style="color: #10B981;"></i> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}
