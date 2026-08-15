/* ==========================================================================
   SRUPUT & NYAM - Mobile & Desktop Responsive Engine
   Seamless SPA Scroll, Dynamic QRIS Payment & Real-time Webhook Simulation
   Integrated with Admin LocalStorage Persistence
   ========================================================================== */

// Default Catalog Fallback
const FULL_CATALOG_DATA = [
  { id: "es-jeruk-ori", title: "Es Jeruk Peras Original", category: "Sruput Juice", price: 15000, stock: "Tersedia", badge: "Best Seller", badgeType: "tag-corner-bestseller", image: "images/es_jeruk.png", description: "100% murni perasan jeruk asli tanpa gula buatan." },
  { id: "gourmet-salad", title: "Gourmet Salad Bowl", category: "Nyam Salad", price: 35000, stock: "Tersedia", badge: "Organic", badgeType: "tag-corner-vegan", image: "images/salad.png", description: "Sayuran hidroponik segar dengan pilihan dressing premium." },
  { id: "combo-ayam", title: "Paket Combo Ayam", category: "Paket Combo", price: 45000, stock: "Tersedia", badge: "Hemat Rp 5.000", badgeType: "tag-corner-save", image: "images/combo.png", description: "Penyatuan sempurna: 1 Es Jeruk Peras + 1 Gourmet Salad Bowl." },
  { id: "kopi-aren", title: "Es Kopi Susu Aren", category: "Sruput Beverage", price: 20000, stock: "Tersedia", badge: null, image: "images/mango.png", description: "Kopi susu gula aren kekinian dengan cita rasa gurih legit." },
  { id: "tahu-cabe-garam", title: "Tahu Cabe Garam", category: "Nyam Salad", price: 18000, stock: "Tersedia", badge: null, image: "images/watermelon.png", description: "Tahu renyah dengan taburan cabe garam pedas gurih." },
  { id: "mango-juice", title: "Mango Juice", category: "Sruput Juice", price: 28000, stock: "Tersedia", badge: "Best Seller", badgeType: "tag-corner-bestseller", image: "images/mango.png", description: "Mangga harum manis segar dipadu dengan sentuhan jeruk nipis." },
  { id: "watermelon-juice", title: "Watermelon Juice", category: "Sruput Juice", price: 25000, stock: "Tersedia", badge: null, image: "images/watermelon.png", description: "Jus semangka murni tanpa gula tambahan, 100% menyegarkan." }
];

// Dynamic Catalog Getter (reads from Admin sn_menu_catalog)
function getCatalogData() {
  try {
    const stored = localStorage.getItem("sn_menu_catalog");
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.map(m => ({
          id: m.id,
          title: m.name || m.title,
          category: m.category || "Sruput Juice",
          price: m.price || 0,
          stock: m.stock || "Tersedia",
          badge: m.badge || (m.sales > 100 ? "Popular" : null),
          badgeType: m.badgeType || "tag-corner-bestseller",
          image: m.image || "images/es_jeruk.png",
          description: m.description || `${m.name || m.title} segar dan nikmat khas Sruput & Nyam.`
        }));
      }
    }
  } catch (e) {
    console.error("Error reading catalog from storage:", e);
  }
  return FULL_CATALOG_DATA;
}

// Product Customization Options
const ITEM_CUSTOMIZATION_OPTIONS = {
  "es-jeruk-ori": {
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
  "gourmet-salad": {
    dressing: [{ label: "Roasted Sesame Dressing", val: "Roasted Sesame Dressing" }, { label: "Honey Mustard Dressing", val: "Honey Mustard Dressing" }, { label: "Caesar Dressing", val: "Caesar Dressing" }],
    toppings: [{ name: "Dada Ayam Panggang", price: 10000 }, { name: "Smoked Beef", price: 12000 }, { name: "Telur Rebus", price: 5000 }]
  }
};

// Initial Clean Cart (no dummy items)
let cart = [];

let activeItem = null;
let currentCategoryFilter = "all";
let currentSearchQuery = "";
let discountRate = 0;
let kitchenOrders = [];
let currentRatingSelected = 5;
let countdownTimerInterval = null;
let currentPaymentOrderId = "SN-892103";

// DOM Ready
document.addEventListener("DOMContentLoaded", () => {
  renderFullMenuCatalog();
  updateCartUI();
  setupEventListeners();
  initScrollObserver();

  // Listen to Admin live updates
  window.addEventListener("storage", () => {
    renderFullMenuCatalog();
    updateCartUI();
  });
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

// Render Menu Catalog with Live Admin Sync & Stock Status
function renderFullMenuCatalog() {
  const grid = document.getElementById("fullCatalogGrid");
  if (!grid) return;

  const catalog = getCatalogData();
  let filtered = catalog;

  if (currentCategoryFilter !== "all") {
    filtered = filtered.filter(i => {
      const catLower = (i.category || "").toLowerCase();
      if (currentCategoryFilter === "sruput") return catLower.includes("sruput") || catLower.includes("juice") || catLower.includes("beverage");
      if (currentCategoryFilter === "nyam") return catLower.includes("nyam") || catLower.includes("salad");
      if (currentCategoryFilter === "combo") return catLower.includes("combo") || catLower.includes("paket");
      return catLower.includes(currentCategoryFilter);
    });
  }

  if (currentSearchQuery) {
    filtered = filtered.filter(i => 
      (i.title || "").toLowerCase().includes(currentSearchQuery) || 
      (i.description || "").toLowerCase().includes(currentSearchQuery)
    );
  }

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; color: var(--text-muted); padding: 3rem;">
        <i class="fa-solid fa-magnifying-glass" style="font-size: 2.5rem; opacity: 0.3; margin-bottom: 1rem;"></i>
        <p>Menu tidak ditemukan untuk kata kunci "${currentSearchQuery}".</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(item => {
    const isOutOfStock = item.stock === "Habis";
    return `
      <div class="catalog-card" style="opacity: ${isOutOfStock ? '0.75' : '1'};">
        <div class="catalog-card-img-box" style="position: relative;">
          <img src="${item.image}" alt="${item.title}" loading="lazy">
          ${item.badge ? `<span class="tag-badge-corner ${item.badgeType}">${item.badge}</span>` : ''}
          ${isOutOfStock ? `<span style="position: absolute; top: 10px; right: 10px; background: #DC2626; color: #FFF; font-size: 0.72rem; font-weight: 700; padding: 0.25rem 0.6rem; border-radius: 6px; z-index: 2;">Stok Habis</span>` : ''}
        </div>
        <div class="catalog-card-body">
          <div class="catalog-card-head-row">
            <h3 class="catalog-card-title">${item.title}</h3>
            <span class="catalog-card-price">Rp ${item.price.toLocaleString("id-ID")}</span>
          </div>
          <p class="catalog-card-desc">${item.description}</p>
          <button class="btn-add-simple" ${isOutOfStock ? 'disabled style="background: #94A3B8; cursor: not-allowed;"' : `onclick="openCustomModal('${item.id}')"`}>
            ${isOutOfStock ? 'Stok Habis' : '+ Tambah'}
          </button>
        </div>
      </div>
    `;
  }).join('');
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

  // Admin Drawer
  const adminBtn = document.getElementById("adminBtn");
  const closeAdminBtn = document.getElementById("closeAdminBtn");
  const adminDrawer = document.getElementById("adminDrawer");

  adminBtn?.addEventListener("click", () => {
    if (adminDrawer) {
      adminDrawer.classList.toggle("open");
      renderKitchenOrders();
    } else {
      window.location.href = "admin.html";
    }
  });

  closeAdminBtn?.addEventListener("click", () => {
    adminDrawer?.classList.remove("open");
  });

  // ESC Key listener
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeCheckoutModal();
      closeCustomModal();
      closeWriteReviewModal();
      closePaymentModal();
      closeCart();
      adminDrawer?.classList.remove("open");
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
  const catalog = getCatalogData();
  let item = catalog.find(m => m.id === itemId) || catalog[0] || { id: itemId, title: "Es Jeruk Peras Original", price: 15000, image: "images/es_jeruk.png", description: "Perasan jeruk murni 100%." };

  if (item.stock === "Habis") {
    showToast(`Maaf, menu ${item.title} sedang habis!`);
    return;
  }

  const customOpts = ITEM_CUSTOMIZATION_OPTIONS[itemId] || ITEM_CUSTOMIZATION_OPTIONS["es-jeruk-ori"] || {};

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
    if (list) list.innerHTML = `<div style="text-align: center; color: var(--text-muted); padding: 3rem 1rem;"><p>Keranjang kamu masih kosong.</p></div>`;
    updateCartSummary(0);
    if (mobileCartBar) mobileCartBar.style.display = "none";
    return;
  }

  let subtotal = 0;

  if (list) {
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
  }

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

function openDemoModal() { openCustomModal("es-jeruk-ori"); }

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

  if (summaryBox) {
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
  }

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
  const total = Math.max(0, subtotal + 10000 - (subtotal * discountRate));

  closeCheckoutModal();
  openPaymentModal(currentPaymentOrderId, total);
}

// DYNAMIC QRIS & COUNTDOWN TIMER ENGINE
function openPaymentModal(orderId, total) {
  currentPaymentOrderId = orderId;
  const orderIdEl = document.getElementById("paymentOrderId");
  const amountEl = document.getElementById("paymentAmount");
  if (orderIdEl) orderIdEl.innerText = orderId;
  if (amountEl) amountEl.innerText = `Rp ${total.toLocaleString("id-ID")}`;
  document.getElementById("paymentModal")?.classList.add("active");

  startPaymentCountdown(15 * 60);
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

// SIMULATE PAYMENT & PUSH ORDER TO ADMIN PERSISTENT ORDERS LIST
function simulatePaymentSuccess() {
  showToast("Pembayaran QRIS Berhasil! Webhook menerima notifikasi LUNAS.");
  closePaymentModal();

  const step2 = document.getElementById("step2");
  const line1 = document.getElementById("line1");
  if (step2) step2.classList.add("active", "completed");
  if (line1) line1.classList.add("completed");

  const customerName = document.getElementById("checkNameVal")?.value || "Pelanggan Online";
  const phone = document.getElementById("checkPhoneVal")?.value || "";
  const subtotal = cart.reduce((acc, i) => acc + (i.unitPrice * i.quantity), 0);
  const total = Math.max(0, subtotal + 10000 - (subtotal * discountRate));

  const newOrder = {
    id: currentPaymentOrderId,
    customer: `${customerName}${phone ? ' (' + phone + ')' : ''}`,
    items: cart.map(i => ({ name: `${i.quantity}x ${i.title}`, price: i.unitPrice * i.quantity })),
    total: total,
    method: "QRIS",
    status: "Diproses",
    time: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }) + " WIB"
  };

  // Push order directly into Admin sn_orders_list in localStorage
  try {
    let existingOrders = JSON.parse(localStorage.getItem("sn_orders_list") || "[]");
    existingOrders.unshift(newOrder);
    localStorage.setItem("sn_orders_list", JSON.stringify(existingOrders));
    window.dispatchEvent(new Event("storage"));
  } catch (e) {
    console.error("Error saving new order to storage:", e);
  }

  // Clear cart
  cart = [];
  updateCartUI();

  setTimeout(() => {
    showToast("Pesanan kamu otomatis dikirim ke Dapur (Mode Dapur / Admin KDS)!");
  }, 1500);
}

// Review Submission
function openWriteReviewModal() { document.getElementById("writeReviewModal")?.classList.add("active"); }
function closeWriteReviewModal() { document.getElementById("writeReviewModal")?.classList.remove("active"); }

function setReviewRating(stars) {
  currentRatingSelected = stars;
  const icons = document.querySelectorAll("#starSelector i");
  icons.forEach((ic, index) => {
    ic.className = index < stars ? "fa-solid fa-star active-star" : "fa-regular fa-star";
  });
}

function submitUserReview() {
  const name = document.getElementById("revName")?.value.trim();
  const text = document.getElementById("revText")?.value.trim();

  if (!name || !text) {
    showToast("Harap isi nama dan ulasan Anda!");
    return;
  }

  const container = document.getElementById("userReviewsContainer");
  if (container) {
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
  }

  closeWriteReviewModal();
  showToast("Terima kasih! Ulasan Anda berhasil ditambahkan.");
}

function renderKitchenOrders() {
  const box = document.getElementById("kitchenOrdersList");
  if (!box) return;

  let storedOrders = [];
  try {
    storedOrders = JSON.parse(localStorage.getItem("sn_orders_list") || "[]");
  } catch (e) {
    storedOrders = [];
  }

  const activeOnly = storedOrders.filter(o => o.status === "Diproses" || o.status === "Siap");

  if (activeOnly.length === 0) {
    box.innerHTML = `<p style="color: #64748B; text-align: center; padding: 2rem;">Tidak ada pesanan aktif di dapur.</p>`;
    return;
  }

  box.innerHTML = activeOnly.map(o => `
    <div class="kitchen-card">
      <div style="display: flex; justify-content: space-between; margin-bottom: 0.3rem;">
        <strong style="color: #8C3B00;">${o.id}</strong>
        <span style="font-size: 0.75rem; color: #64748B;">${o.time}</span>
      </div>
      <p style="font-size: 0.88rem; font-weight: 700; color: #0F172A;">${o.customer}</p>
      <ul style="font-size: 0.8rem; color: #475569; margin: 0.4rem 0 0.6rem; padding-left: 1rem;">
        ${(o.items || []).map(i => `<li>${i.name || i.title} (Rp ${(i.price || 0).toLocaleString('id-ID')})</li>`).join('')}
      </ul>
      <span class="badge-verified"><i class="fa-solid fa-fire-burner"></i> Status: ${o.status}</span>
    </div>
  `).join('');
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
