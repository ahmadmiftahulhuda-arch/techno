/* ==========================================================================
   SRUPUT & NYAM - Core Application Engine & Interactive Logic
   ========================================================================== */

// Menu Database
const MENU_DATA = [
  {
    id: "sruput-ori",
    title: "Es Jeruk Peras Original",
    category: "sruput",
    price: 15000,
    rating: 4.9,
    reviews: 184,
    badge: "Best Seller",
    tagType: "tag-sruput",
    image: "images/es_jeruk.png",
    description: "100% perasan jeruk segar asli tanpa pemanis buatan, disajikan dingin dengan es batu kristal.",
    options: {
      sugar: ["Tanpa Gula", "Normal (100%)", "Less Sweet (50%)", "Extra Sweet (120%)"],
      ice: ["Normal Ice", "Less Ice", "Extra Cold Ice"],
      toppings: [
        { name: "Biji Selasih", price: 3000 },
        { name: "Jelly Citrus", price: 4000 },
        { name: "Extra Bulir Jeruk", price: 5000 }
      ]
    }
  },
  {
    id: "nyam-salad-green",
    title: "Gourmet Salad Bowl",
    category: "nyam",
    price: 35000,
    rating: 4.8,
    reviews: 142,
    badge: "Fresh Everyday",
    tagType: "tag-nyam",
    image: "images/salad.png",
    description: "Kombinasi daun selada organik, alpukat, tomat ceri, mentimun, dada ayam panggang, dan roasted sesame dressing.",
    options: {
      dressing: ["Roasted Sesame", "Honey Mustard", "Caesar Dressing", "Spicy Thai Dressing"],
      protein: [
        { name: "Dada Ayam Panggang (+Rp 10.000)", price: 10000 },
        { name: "Smoked Beef (+Rp 12.000)", price: 12000 },
        { name: "Telur Rebus (+Rp 5.000)", price: 5000 },
        { name: "Extra Avocado (+Rp 8.000)", price: 8000 }
      ]
    }
  },
  {
    id: "combo-sruput-nyam",
    title: "Paket Combo Sruput & Nyam",
    category: "combo",
    price: 45000,
    rating: 5.0,
    reviews: 230,
    badge: "Hemat Rp 5.000",
    tagType: "tag-combo",
    image: "images/es_jeruk.png",
    description: "Paket hemat lengkap: 1x Es Jeruk Peras Original + 1x Gourmet Salad Bowl pilihanmu.",
    options: {
      sugar: ["Normal (100%)", "Less Sweet (50%)"],
      dressing: ["Roasted Sesame", "Honey Mustard", "Caesar"]
    }
  }
];

// State Management
let cart = [];
let activeCustomizingItem = null;
let currentDiscount = 0;
let appliedPromoCode = "";
let kitchenOrders = [];

// DOM Ready
document.addEventListener("DOMContentLoaded", () => {
  renderMenu("all");
  setupEventListeners();
});

// Render Menu Cards
function renderMenu(category = "all") {
  const container = document.getElementById("menuContainer");
  if (!container) return;

  const filtered = category === "all" 
    ? MENU_DATA 
    : MENU_DATA.filter(item => item.category === category);

  container.innerHTML = filtered.map(item => `
    <div class="menu-card" data-id="${item.id}">
      <div class="card-img-wrapper">
        <img src="${item.image}" alt="${item.title}" loading="lazy">
        <span class="card-tag ${item.tagType}">${item.badge}</span>
        <div class="card-rating">
          <i class="fa-solid fa-star"></i>
          <span>${item.rating} (${item.reviews})</span>
        </div>
      </div>
      <div class="card-body">
        <h3 class="card-title">${item.title}</h3>
        <p class="card-desc">${item.description}</p>
        <div class="card-foot">
          <div class="card-price">
            <span class="price-label">Harga Mulai</span>
            <span class="price-value">Rp ${item.price.toLocaleString("id-ID")}</span>
          </div>
          <button class="btn-add-item ${item.category === 'sruput' ? 'sruput-btn' : 'nyam-btn'}" onclick="openCustomModal('${item.id}')">
            <i class="fa-solid fa-plus"></i> Custom & Pesan
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

// Category Tabs
function setupEventListeners() {
  document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const category = btn.getAttribute("data-category");
      renderMenu(category);
    });
  });

  // Cart Drawer Toggle
  const cartBtn = document.getElementById("cartBtn");
  const closeCartBtn = document.getElementById("closeCartBtn");
  const cartDrawer = document.getElementById("cartDrawer");
  const cartBackdrop = document.getElementById("cartBackdrop");

  cartBtn?.addEventListener("click", () => {
    cartDrawer.classList.add("open");
    cartBackdrop.classList.add("open");
  });

  const closeCart = () => {
    cartDrawer.classList.remove("open");
    cartBackdrop.classList.remove("open");
  };

  closeCartBtn?.addEventListener("click", closeCart);
  cartBackdrop?.addEventListener("click", closeCart);

  // Admin Drawer Toggle
  const adminBtn = document.getElementById("adminBtn");
  const closeAdminBtn = document.getElementById("closeAdminBtn");
  const adminDrawer = document.getElementById("adminDrawer");

  adminBtn?.addEventListener("click", () => {
    adminDrawer.classList.toggle("open");
    renderKitchenOrders();
  });

  closeAdminBtn?.addEventListener("click", () => {
    adminDrawer.classList.remove("open");
  });
}

// Open Customization Modal
function openCustomModal(itemId) {
  const item = MENU_DATA.find(m => m.id === itemId);
  if (!item) return;

  activeCustomizingItem = {
    ...item,
    quantity: 1,
    selectedSugar: item.options.sugar ? item.options.sugar[1] || item.options.sugar[0] : null,
    selectedIce: item.options.ice ? item.options.ice[0] : null,
    selectedDressing: item.options.dressing ? item.options.dressing[0] : null,
    selectedToppings: []
  };

  const modalOverlay = document.getElementById("customModal");
  const modalBody = document.getElementById("modalBodyContent");
  const modalPrice = document.getElementById("modalCalculatedPrice");

  let optionsHTML = `
    <div style="display: flex; gap: 1rem; margin-bottom: 1.5rem; align-items: center;">
      <img src="${item.image}" style="width: 80px; height: 80px; border-radius: 12px; object-fit: cover;">
      <div>
        <h4 style="font-size: 1.1rem; color: var(--text-main);">${item.title}</h4>
        <p style="font-size: 0.85rem; color: var(--text-muted);">${item.description}</p>
      </div>
    </div>
  `;

  if (item.options.sugar) {
    optionsHTML += `
      <div class="option-group">
        <div class="option-title"><span>Level Manis Gula</span></div>
        <div class="option-pills">
          ${item.options.sugar.map((s, idx) => `
            <div class="option-chip ${activeCustomizingItem.selectedSugar === s ? 'selected' : ''}" onclick="selectOption('selectedSugar', '${s}', this)">${s}</div>
          `).join('')}
        </div>
      </div>
    `;
  }

  if (item.options.ice) {
    optionsHTML += `
      <div class="option-group">
        <div class="option-title"><span>Jumlah Es batu</span></div>
        <div class="option-pills">
          ${item.options.ice.map(i => `
            <div class="option-chip ${activeCustomizingItem.selectedIce === i ? 'selected' : ''}" onclick="selectOption('selectedIce', '${i}', this)">${i}</div>
          `).join('')}
        </div>
      </div>
    `;
  }

  if (item.options.dressing) {
    optionsHTML += `
      <div class="option-group">
        <div class="option-title"><span>Pilihan Dressing Salad</span></div>
        <div class="option-pills">
          ${item.options.dressing.map(d => `
            <div class="option-chip ${activeCustomizingItem.selectedDressing === d ? 'selected' : ''}" onclick="selectOption('selectedDressing', '${d}', this)">${d}</div>
          `).join('')}
        </div>
      </div>
    `;
  }

  if (item.options.toppings) {
    optionsHTML += `
      <div class="option-group">
        <div class="option-title"><span>Topping Tambahan (Opsional)</span></div>
        <div class="option-pills">
          ${item.options.toppings.map(t => `
            <div class="option-chip" onclick="toggleTopping('${t.name}', ${t.price}, this)">${t.name} (+Rp ${t.price.toLocaleString('id-ID')})</div>
          `).join('')}
        </div>
      </div>
    `;
  }

  modalBody.innerHTML = optionsHTML;
  updateModalPrice();

  modalOverlay.classList.add("active");
}

function selectOption(key, value, el) {
  activeCustomizingItem[key] = value;
  el.parentElement.querySelectorAll('.option-chip').forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');
}

function toggleTopping(name, price, el) {
  const index = activeCustomizingItem.selectedToppings.findIndex(t => t.name === name);
  if (index > -1) {
    activeCustomizingItem.selectedToppings.splice(index, 1);
    el.classList.remove('selected');
  } else {
    activeCustomizingItem.selectedToppings.push({ name, price });
    el.classList.add('selected');
  }
  updateModalPrice();
}

function adjustModalQty(delta) {
  if (!activeCustomizingItem) return;
  activeCustomizingItem.quantity = Math.max(1, activeCustomizingItem.quantity + delta);
  document.getElementById("modalQtyNum").innerText = activeCustomizingItem.quantity;
  updateModalPrice();
}

function updateModalPrice() {
  if (!activeCustomizingItem) return;
  let unitPrice = activeCustomizingItem.price;
  activeCustomizingItem.selectedToppings.forEach(t => {
    unitPrice += t.price;
  });
  const total = unitPrice * activeCustomizingItem.quantity;
  document.getElementById("modalCalculatedPrice").innerText = `Rp ${total.toLocaleString("id-ID")}`;
}

function closeCustomModal() {
  document.getElementById("customModal").classList.remove("active");
}

// Add to Cart
function confirmAddToCart() {
  if (!activeCustomizingItem) return;

  const cartItem = {
    cartId: Date.now() + Math.random(),
    id: activeCustomizingItem.id,
    title: activeCustomizingItem.title,
    image: activeCustomizingItem.image,
    basePrice: activeCustomizingItem.price,
    quantity: activeCustomizingItem.quantity,
    sugar: activeCustomizingItem.selectedSugar,
    ice: activeCustomizingItem.selectedIce,
    dressing: activeCustomizingItem.selectedDressing,
    toppings: [...activeCustomizingItem.selectedToppings]
  };

  cart.push(cartItem);
  updateCartUI();
  closeCustomModal();
  showToast(`Berhasil menambahkan ${cartItem.title} ke keranjang!`);

  // Open Cart Drawer automatically
  document.getElementById("cartDrawer").classList.add("open");
  document.getElementById("cartBackdrop").classList.add("open");
}

// Update Cart UI
function updateCartUI() {
  const cartList = document.getElementById("cartItemsList");
  const badge = document.getElementById("cartBadgeCount");
  
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  badge.innerText = totalItems;
  badge.classList.add("bump");
  setTimeout(() => badge.classList.remove("bump"), 300);

  if (cart.length === 0) {
    cartList.innerHTML = `
      <div style="text-align: center; color: var(--text-muted); padding: 3rem 1rem;">
        <i class="fa-solid fa-basket-shopping" style="font-size: 3rem; opacity: 0.3; margin-bottom: 1rem;"></i>
        <p>Keranjang kamu masih kosong.</p>
        <p style="font-size: 0.8rem; opacity: 0.7;">Pilih menu Es Jeruk atau Salad favoritmu!</p>
      </div>
    `;
    updateCartSummary(0);
    return;
  }

  let subtotal = 0;

  cartList.innerHTML = cart.map(item => {
    let itemUnitPrice = item.basePrice;
    item.toppings.forEach(t => itemUnitPrice += t.price);
    const itemTotal = itemUnitPrice * item.quantity;
    subtotal += itemTotal;

    const details = [];
    if (item.sugar) details.push(`Sugar: ${item.sugar}`);
    if (item.ice) details.push(`Ice: ${item.ice}`);
    if (item.dressing) details.push(`Dressing: ${item.dressing}`);
    if (item.toppings.length > 0) details.push(`Toppings: ${item.toppings.map(t => t.name).join(', ')}`);

    return `
      <div class="cart-item">
        <img src="${item.image}" class="cart-item-img">
        <div class="cart-item-details">
          <div style="display: flex; justify-content: space-between; align-items: flex-start;">
            <h5 class="cart-item-title">${item.title}</h5>
            <button class="cart-item-remove" onclick="removeCartItem(${item.cartId})"><i class="fa-solid fa-trash"></i></button>
          </div>
          <div class="cart-item-options">${details.join(' | ')}</div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 0.5rem;">
            <span class="cart-item-price">Rp ${itemTotal.toLocaleString('id-ID')}</span>
            <div class="qty-control" style="padding: 0.1rem 0.4rem;">
              <button class="btn-qty" onclick="changeCartQty(${item.cartId}, -1)">-</button>
              <span class="qty-number" style="font-size: 0.9rem;">${item.quantity}</span>
              <button class="btn-qty" onclick="changeCartQty(${item.cartId}, 1)">+</button>
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
  if (item.quantity <= 0) {
    cart = cart.filter(i => i.cartId !== cartId);
  }
  updateCartUI();
}

function removeCartItem(cartId) {
  cart = cart.filter(i => i.cartId !== cartId);
  updateCartUI();
}

function applyPromoCode() {
  const code = document.getElementById("promoInput").value.trim().toUpperCase();
  if (code === "SRUPUTNYAM10") {
    currentDiscount = 0.10;
    appliedPromoCode = code;
    showToast("Kode promo SRUPUTNYAM10 berhasil! Diskon 10% applied.");
  } else if (code === "FREESHIP") {
    currentDiscount = 0.05;
    appliedPromoCode = code;
    showToast("Kode promo FREESHIP berhasil! Diskon Ongkir diterapkan.");
  } else {
    showToast("Kode promo tidak valid!");
    return;
  }
  updateCartUI();
}

function updateCartSummary(subtotal) {
  const discountAmount = subtotal * currentDiscount;
  const shippingFee = subtotal > 0 ? 10000 : 0;
  const total = Math.max(0, subtotal - discountAmount + shippingFee);

  document.getElementById("cartSubtotal").innerText = `Rp ${subtotal.toLocaleString('id-ID')}`;
  document.getElementById("cartDiscount").innerText = `-Rp ${discountAmount.toLocaleString('id-ID')}`;
  document.getElementById("cartShipping").innerText = `Rp ${shippingFee.toLocaleString('id-ID')}`;
  document.getElementById("cartTotal").innerText = `Rp ${total.toLocaleString('id-ID')}`;
}

// Checkout Modal
function proceedToCheckout() {
  if (cart.length === 0) {
    showToast("Keranjang kamu masih kosong!");
    return;
  }

  document.getElementById("cartDrawer").classList.remove("open");
  document.getElementById("cartBackdrop").classList.remove("open");

  const checkoutModal = document.getElementById("checkoutModal");
  checkoutModal.classList.add("active");
}

function closeCheckoutModal() {
  document.getElementById("checkoutModal").classList.remove("active");
}

function submitCheckout() {
  const name = document.getElementById("checkName").value;
  const phone = document.getElementById("checkPhone").value;
  const address = document.getElementById("checkAddress").value;

  if (!name || !phone || !address) {
    showToast("Harap lengkapi nama, nomor telepon, dan alamat pengiriman!");
    return;
  }

  const orderId = "SN-" + Math.floor(100000 + Math.random() * 900000);
  const subtotal = cart.reduce((acc, i) => acc + (i.basePrice * i.quantity), 0);
  const total = subtotal + 10000 - (subtotal * currentDiscount);

  const newOrder = {
    orderId,
    customerName: name,
    phone,
    address,
    items: [...cart],
    total,
    status: "Pesanan Diterima",
    timestamp: new Date().toLocaleTimeString("id-ID")
  };

  kitchenOrders.unshift(newOrder);

  // Clear Cart
  cart = [];
  currentDiscount = 0;
  updateCartUI();

  closeCheckoutModal();
  openPaymentModal(orderId, total);
}

// Payment & Tracking Modal
function openPaymentModal(orderId, total) {
  const modal = document.getElementById("paymentModal");
  document.getElementById("paymentOrderId").innerText = orderId;
  document.getElementById("paymentAmount").innerText = `Rp ${total.toLocaleString('id-ID')}`;
  
  modal.classList.add("active");
  startPaymentTimer();
}

function closePaymentModal() {
  document.getElementById("paymentModal").classList.remove("active");
}

function simulatePaymentSuccess() {
  showToast("Pembayaran Lunas! Pesanan segera disiapkan oleh dapur Sruput & Nyam.");
  closePaymentModal();

  // Open Tracking
  const trackingModal = document.getElementById("trackingModal");
  trackingModal.classList.add("active");
}

function closeTrackingModal() {
  document.getElementById("trackingModal").classList.remove("active");
}

// Kitchen Admin Simulator
function renderKitchenOrders() {
  const container = document.getElementById("kitchenOrdersList");
  if (kitchenOrders.length === 0) {
    container.innerHTML = `<p style="color: var(--text-muted); text-align: center;">Belum ada pesanan masuk.</p>`;
    return;
  }

  container.innerHTML = kitchenOrders.map(o => `
    <div class="kitchen-card">
      <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
        <strong style="color: var(--primary-amber);">${o.orderId}</strong>
        <span style="font-size: 0.8rem; color: var(--text-muted);">${o.timestamp}</span>
      </div>
      <p style="font-size: 0.9rem; color: var(--text-main);"><strong>${o.customerName}</strong> (${o.phone})</p>
      <p style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 0.75rem;">${o.address}</p>
      <ul style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 0.75rem; padding-left: 1rem;">
        ${o.items.map(i => `<li>${i.quantity}x ${i.title}</li>`).join('')}
      </ul>
      <div style="display: flex; gap: 0.5rem;">
        <button class="btn-secondary-glass" style="padding: 0.4rem 0.8rem; font-size: 0.75rem;" onclick="updateOrderStatus('${o.orderId}', 'Dimasak')">Set Dimasak</button>
        <button class="btn-secondary-glass" style="padding: 0.4rem 0.8rem; font-size: 0.75rem;" onclick="updateOrderStatus('${o.orderId}', 'Dalam Pengiriman')">Set Pengiriman</button>
        <button class="btn-primary-amber" style="padding: 0.4rem 0.8rem; font-size: 0.75rem;" onclick="updateOrderStatus('${o.orderId}', 'Selesai')">Set Selesai</button>
      </div>
    </div>
  `).join('');
}

function updateOrderStatus(orderId, newStatus) {
  const order = kitchenOrders.find(o => o.orderId === orderId);
  if (order) {
    order.status = newStatus;
    renderKitchenOrders();
    showToast(`Status Pesanan ${orderId} diubah menjadi: ${newStatus}`);
  }
}

// Toast Notification Engine
function showToast(message) {
  const container = document.getElementById("toastContainer");
  const toast = document.createElement("div");
  toast.className = "toast-msg";
  toast.innerHTML = `<i class="fa-solid fa-circle-check" style="color: var(--primary-emerald);"></i> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// Countdown Timer Simulation
function startPaymentTimer() {
  let duration = 15 * 60;
  const timerEl = document.getElementById("payCountdown");
  const interval = setInterval(() => {
    const min = Math.floor(duration / 60);
    const sec = duration % 60;
    timerEl.innerText = `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
    if (--duration < 0) {
      clearInterval(interval);
      timerEl.innerText = "EXPIRED";
    }
  }, 1000);
}
