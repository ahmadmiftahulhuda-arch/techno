/* ==========================================================================
   SRUPUT & NYAM - F&B HQ Store Analytics & Management Engine
   Full Persistent CRUD (Menu, Staff, Orders/KDS, Settings, Profile)
   Shared Data Persistence via LocalStorage & Dynamic Real-time KPI Calculation
   ========================================================================== */

// --- DEFAULT INITIAL DATA STRUCTURES ---
const DEFAULT_MENU_CATALOG = [
  { id: "es-jeruk-ori", name: "Es Jeruk Peras Original", category: "Sruput Juice", price: 15000, stock: "Tersedia", sales: 180, image: "images/es_jeruk.png" },
  { id: "gourmet-salad", name: "Gourmet Salad Bowl", category: "Nyam Salad", price: 35000, stock: "Tersedia", sales: 145, image: "images/salad.png" },
  { id: "combo-ayam", name: "Paket Combo Ayam", category: "Paket Combo", price: 45000, stock: "Tersedia", sales: 112, image: "images/combo.png" },
  { id: "kopi-aren", name: "Es Kopi Susu Aren", category: "Sruput Beverage", price: 20000, stock: "Tersedia", sales: 89, image: "images/mango.png" },
  { id: "tahu-cabe-garam", name: "Tahu Cabe Garam", category: "Nyam Salad", price: 18000, stock: "Tersedia", sales: 64, image: "images/watermelon.png" }
];

const DEFAULT_STAFF_LIST = [
  { id: "stf-1", name: "Ahmad Miftahul Huda", role: "Store Manager", shift: "Pagi (08.00 - 16.00)", status: "Aktif" },
  { id: "stf-2", name: "Riska Ika Maulida", role: "Head Barista & Kitchen Lead", shift: "Pagi (08.00 - 16.00)", status: "Aktif" },
  { id: "stf-3", name: "Budi Setiawan", role: "Kasir / Frontend POS", shift: "Siang (12.00 - 20.00)", status: "Aktif" }
];

const DEFAULT_ORDERS_LIST = [
  { id: "SN-892101", customer: "Ahmad Miftah (Meja 04)", items: [{ name: "2x Es Jeruk Peras Original", price: 30000 }, { name: "1x Gourmet Salad Bowl", price: 35000 }], total: 65000, method: "QRIS", status: "Diproses", time: "14:15 WIB" },
  { id: "SN-892102", customer: "Siti Rahma (Takeaway)", items: [{ name: "1x Mango Juice", price: 28000 }, { name: "1x Tropical Fruit Bowl", price: 38000 }], total: 66000, method: "Cash", status: "Siap", time: "14:20 WIB" },
  { id: "SN-892103", customer: "Budi Santoso (Delivery)", items: [{ name: "1x Green Detox Combo", price: 55000 }], total: 55000, method: "Bank Transfer", status: "Selesai", time: "14:25 WIB" }
];

const DEFAULT_STORE_SETTINGS = {
  name: "Sruput & Nyam (F&B HQ)",
  address: "Jl. Boulevard Kuliner No. 88, Jakarta Selatan",
  phone: "0812-9876-543",
  qrisId: "DANA-MERCHANT-SN89210",
  tax: "10% PPN + 5% Service Charge",
  printer: "epson"
};

const DEFAULT_MANAGER_PROFILE = {
  name: "Rizka Ika Maulida",
  role: "Store Manager & Kitchen Lead",
  email: "rizka.ika@mhs.politala.ac.id",
  phone: "0812-9876-5432",
  avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
};

const DAILY_TREND_DATA = [
  { day: "Sen", fullDay: "Senin", omzet: 1050000, valText: "1.050.000", cx: 15, cy: 140 },
  { day: "Sel", fullDay: "Selasa", omzet: 1250000, valText: "1.250.000", cx: 90, cy: 125 },
  { day: "Rab", fullDay: "Rabu", omzet: 1100000, valText: "1.100.000", cx: 170, cy: 140 },
  { day: "Kam", fullDay: "Kamis", omzet: 2200000, valText: "2.200.000", cx: 250, cy: 70 },
  { day: "Jum", fullDay: "Jumat", omzet: 1300000, valText: "1.300.000", cx: 330, cy: 135 },
  { day: "Sab", fullDay: "Sabtu", omzet: 2450000, valText: "2.450.000", cx: 410, cy: 40 },
  { day: "Min", fullDay: "Minggu", omzet: 2100000, valText: "2.100.000", cx: 525, cy: 50 }
];

// --- LOCALSTORAGE PERSISTENCE HELPERS & AUTO SEEDING ---
function seedDefaultStorageIfEmpty() {
  try {
    if (!localStorage.getItem("sn_menu_catalog")) localStorage.setItem("sn_menu_catalog", JSON.stringify(DEFAULT_MENU_CATALOG));
    if (!localStorage.getItem("sn_staff_list")) localStorage.setItem("sn_staff_list", JSON.stringify(DEFAULT_STAFF_LIST));
    if (!localStorage.getItem("sn_orders_list")) localStorage.setItem("sn_orders_list", JSON.stringify(DEFAULT_ORDERS_LIST));
    if (!localStorage.getItem("sn_store_settings")) localStorage.setItem("sn_store_settings", JSON.stringify(DEFAULT_STORE_SETTINGS));
    if (!localStorage.getItem("sn_manager_profile")) localStorage.setItem("sn_manager_profile", JSON.stringify(DEFAULT_MANAGER_PROFILE));
  } catch (e) {
    console.error("Error seeding default storage:", e);
  }
}
seedDefaultStorageIfEmpty();

function loadFromStorage(key, fallback) {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  } catch (e) {
    console.error("Storage load error:", e);
    return fallback;
  }
}

function saveToStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    window.dispatchEvent(new Event("storage"));
  } catch (e) {
    console.error("Storage save error:", e);
  }
}

// Global In-Memory State synced with localStorage
let menuCatalog = loadFromStorage("sn_menu_catalog", DEFAULT_MENU_CATALOG);
let staffList = loadFromStorage("sn_staff_list", DEFAULT_STAFF_LIST);
let activeOrders = loadFromStorage("sn_orders_list", DEFAULT_ORDERS_LIST);
let storeSettings = loadFromStorage("sn_store_settings", DEFAULT_STORE_SETTINGS);
let managerProfile = loadFromStorage("sn_manager_profile", DEFAULT_MANAGER_PROFILE);

let currentMenuCategoryFilter = "all";

// --- ADMIN AUTHENTICATION ENGINE ---
function checkAdminAuthentication() {
  const session = localStorage.getItem("sn_admin_session");
  const loginModal = document.getElementById("adminLoginModal");
  const appShell = document.getElementById("appShell");

  if (session) {
    try {
      const parsed = JSON.parse(session);
      if (parsed && parsed.loggedIn) {
        if (loginModal) loginModal.style.display = "none";
        if (appShell) {
          appShell.style.display = "flex";
          appShell.style.filter = "none";
        }
        return true;
      }
    } catch (e) {
      console.error("Invalid admin session", e);
    }
  }

  // Not logged in: show login overlay and hide app shell
  if (loginModal) loginModal.style.display = "flex";
  if (appShell) appShell.style.display = "none";
  return false;
}

function handleAdminLogin(event) {
  if (event) event.preventDefault();
  const emailInput = document.getElementById("adminLoginEmail")?.value.trim().toLowerCase();
  const passwordInput = document.getElementById("adminLoginPassword")?.value.trim();
  const errorMsg = document.getElementById("loginErrorMessage");

  if ((emailInput === "admin@sruputnyam.com" || emailInput === "admin") && passwordInput === "admin123") {
    const sessionData = {
      loggedIn: true,
      user: "Admin Manager",
      email: emailInput,
      loginTime: new Date().toISOString()
    };
    localStorage.setItem("sn_admin_session", JSON.stringify(sessionData));

    if (errorMsg) errorMsg.style.display = "none";
    showToast("Login Berhasil! Selamat datang di Panel F&B HQ.");

    const loginModal = document.getElementById("adminLoginModal");
    const appShell = document.getElementById("appShell");
    if (loginModal) loginModal.style.display = "none";
    if (appShell) {
      appShell.style.display = "flex";
      appShell.style.filter = "none";
    }
  } else {
    if (errorMsg) {
      errorMsg.style.display = "block";
      errorMsg.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i> Email atau password salah! (Gunakan: admin@sruputnyam.com / admin123)';
    }
    showToast("Login gagal! Periksa email dan password.");
  }
}

function togglePasswordVisibility() {
  const passInput = document.getElementById("adminLoginPassword");
  const icon = document.getElementById("togglePasswordIcon");
  if (passInput && icon) {
    if (passInput.type === "password") {
      passInput.type = "text";
      icon.className = "fa-solid fa-eye-slash";
    } else {
      passInput.type = "password";
      icon.className = "fa-solid fa-eye";
    }
  }
}

function handleAdminLogout() {
  if (confirm("Apakah Anda yakin ingin keluar (logout) dari Panel Admin?")) {
    localStorage.removeItem("sn_admin_session");
    showToast("Anda telah logout dari Panel Admin.");
    checkAdminAuthentication();
  }
}

// Initial Setup
document.addEventListener("DOMContentLoaded", () => {
  checkAdminAuthentication();

  renderMenuMgmtTable();
  renderOrdersTable();
  renderKdsOrders();
  renderStaffTable();
  renderStoreFrontCatalog();
  loadStoreSettingsUI();
  loadManagerProfileUI();
  updateDynamicKpis();
  
  setChartActiveDay(5);

  window.addEventListener("storage", () => {
    menuCatalog = loadFromStorage("sn_menu_catalog", DEFAULT_MENU_CATALOG);
    staffList = loadFromStorage("sn_staff_list", DEFAULT_STAFF_LIST);
    activeOrders = loadFromStorage("sn_orders_list", DEFAULT_ORDERS_LIST);
    storeSettings = loadFromStorage("sn_store_settings", DEFAULT_STORE_SETTINGS);
    managerProfile = loadFromStorage("sn_manager_profile", DEFAULT_MANAGER_PROFILE);
    
    renderMenuMgmtTable();
    renderOrdersTable();
    renderKdsOrders();
    renderStaffTable();
    renderStoreFrontCatalog();
    loadStoreSettingsUI();
    loadManagerProfileUI();
    updateDynamicKpis();
  });
});

// --- DYNAMIC KPI & STATS ENGINE ---
function updateDynamicKpis() {
  const activeOrdersCount = activeOrders.filter(o => o.status === "Diproses" || o.status === "Siap").length;
  const completedOrdersCount = activeOrders.filter(o => o.status === "Selesai").length;
  const todayOmzet = activeOrders
    .filter(o => o.status === "Selesai")
    .reduce((sum, o) => sum + (o.total || 0), 0);
  const activeStaffCount = staffList.filter(s => s.status === "Aktif").length;

  const activeOrdersEl = document.getElementById("kpiActiveOrders");
  const completedOrdersEl = document.getElementById("kpiCompletedOrders");
  const todayOmzetEl = document.getElementById("kpiTodayOmzet");
  const activeStaffEl = document.getElementById("kpiActiveStaff");

  if (activeOrdersEl) activeOrdersEl.innerHTML = `${activeOrdersCount} <span class="hq-kpi-unit">Di Dapur</span>`;
  if (completedOrdersEl) completedOrdersEl.innerHTML = `${completedOrdersCount} <span class="hq-kpi-unit">Pesanan</span>`;
  if (todayOmzetEl) todayOmzetEl.textContent = `Rp ${todayOmzet.toLocaleString("id-ID")}`;
  if (activeStaffEl) activeStaffEl.innerHTML = `${activeStaffCount} <span class="hq-kpi-unit">Personil</span>`;
}

/* ==========================================
   1. CHART INTERACTIVITY ENGINE
   ========================================== */
function setChartActiveDay(index) {
  const data = DAILY_TREND_DATA[index];
  if (!data) return;

  const activeDot = document.getElementById("activeChartDot");
  const guideLine = document.getElementById("activeGuideLine");
  const tooltip = document.getElementById("chartTooltip");
  const tooltipVal = document.getElementById("tooltipValText");

  if (activeDot) {
    activeDot.setAttribute("cx", data.cx);
    activeDot.setAttribute("cy", data.cy);
  }

  if (guideLine) {
    guideLine.setAttribute("x1", data.cx);
    guideLine.setAttribute("x2", data.cx);
    guideLine.setAttribute("y1", data.cy);
  }

  if (tooltipVal) tooltipVal.textContent = data.valText;

  if (tooltip) {
    const wrapper = document.getElementById("trendChartWrapper");
    if (wrapper) {
      const wrapperWidth = wrapper.offsetWidth || 500;
      const pixelX = (data.cx / 540) * wrapperWidth;
      const pixelY = (data.cy / 220) * 190 - 45;
      tooltip.style.left = `${pixelX}px`;
      tooltip.style.top = `${pixelY}px`;
    }
  }

  const xLabels = document.querySelectorAll("#xAxisLabels span");
  xLabels.forEach((span, i) => {
    if (i === index) span.classList.add("active-day");
    else span.classList.remove("active-day");
  });
}

function toggleDateFilterMenu() {
  const menu = document.getElementById("dateFilterMenu");
  if (menu) menu.classList.toggle("show");
}

document.addEventListener("click", (e) => {
  const dateBtn = document.getElementById("dateFilterBtn");
  const dateMenu = document.getElementById("dateFilterMenu");
  if (dateBtn && dateMenu && !dateBtn.contains(e.target) && !dateMenu.contains(e.target)) {
    dateMenu.classList.remove("show");
  }
});

function selectDateRange(rangeText, el) {
  const label = document.getElementById("selectedDateLabel");
  if (label) label.textContent = rangeText;

  const items = document.querySelectorAll("#dateFilterMenu .dropdown-item");
  items.forEach(item => item.classList.remove("active"));
  if (el) el.classList.add("active");

  const menu = document.getElementById("dateFilterMenu");
  if (menu) menu.classList.remove("show");

  showToast(`Filter rentang waktu diubah ke: ${rangeText}`);
}

/* ==========================================
   2. NAVIGATION TAB SWITCHER
   ========================================== */
function switchHqTab(tabName, clickedEl) {
  const items = document.querySelectorAll(".hq-nav-item");
  items.forEach(item => {
    if (item.getAttribute("data-tab") === tabName) item.classList.add("active");
    else item.classList.remove("active");
  });

  const map = {
    "dashboard": "paneDashboard",
    "menu-mgmt": "paneMenuMgmt",
    "orders": "paneOrders",
    "analytics": "paneAnalytics",
    "staff": "paneStaff",
    "settings": "paneSettings"
  };

  const targetId = map[tabName];
  if (!targetId) return;

  const panes = document.querySelectorAll(".hq-tab-pane");
  panes.forEach(pane => {
    if (pane.id === targetId) pane.classList.add("active");
    else pane.classList.remove("active");
  });

  const sidebar = document.getElementById("hqSidebar");
  if (sidebar) sidebar.classList.remove("mobile-open");
}

function toggleHqSidebar() {
  const sidebar = document.getElementById("hqSidebar");
  if (sidebar) sidebar.classList.toggle("mobile-open");
}

function toggleStoreFrontView() {
  const overlay = document.getElementById("storefrontOverlay");
  if (overlay) {
    overlay.classList.toggle("active");
    if (overlay.classList.contains("active")) {
      showToast("Beralih ke Tampilan Toko Online (Customer Mode)");
      renderStoreFrontCatalog();
    } else {
      showToast("Kembali ke F&B HQ Analytics Dashboard");
    }
  }
}

/* ==========================================
   3. EDIT MANAGER PROFILE ENGINE (PERSISTENT CRUD)
   ========================================== */
function loadManagerProfileUI() {
  const topbarAvatar = document.getElementById("topbarAvatarImg");
  if (topbarAvatar && managerProfile.avatarUrl) topbarAvatar.src = managerProfile.avatarUrl;
}

function openEditProfileModal() {
  document.getElementById("profileNameInput").value = managerProfile.name || "";
  document.getElementById("profileRoleInput").value = managerProfile.role || "";
  document.getElementById("profileEmailInput").value = managerProfile.email || "";
  document.getElementById("profilePhoneInput").value = managerProfile.phone || "";
  document.getElementById("profileImageInput").value = managerProfile.avatarUrl || "";
  document.getElementById("profilePreviewImg").src = managerProfile.avatarUrl || "";

  const modal = document.getElementById("editProfileModal");
  if (modal) modal.classList.add("active");
}

function closeEditProfileModal() {
  const modal = document.getElementById("editProfileModal");
  if (modal) modal.classList.remove("active");
}

function handleSaveProfileForm(e) {
  e.preventDefault();
  managerProfile = {
    name: document.getElementById("profileNameInput").value.trim(),
    role: document.getElementById("profileRoleInput").value.trim(),
    email: document.getElementById("profileEmailInput").value.trim(),
    phone: document.getElementById("profilePhoneInput").value.trim(),
    avatarUrl: document.getElementById("profileImageInput").value.trim()
  };

  saveToStorage("sn_manager_profile", managerProfile);
  loadManagerProfileUI();
  closeEditProfileModal();
  showToast(`Profil Manajer (${managerProfile.name}) berhasil diperbarui dan tersimpan!`);
}

/* ==========================================
   4. STORE SETTINGS ENGINE (PERSISTENT CRUD)
   ========================================== */
function loadStoreSettingsUI() {
  const nameEl = document.getElementById("settingStoreName");
  const addrEl = document.getElementById("settingStoreAddress");
  const phoneEl = document.getElementById("settingStorePhone");
  const qrisEl = document.getElementById("settingQrisId");
  const taxEl = document.getElementById("settingTax");
  const printEl = document.getElementById("settingPrinter");

  if (nameEl && storeSettings.name) nameEl.value = storeSettings.name;
  if (addrEl && storeSettings.address) addrEl.value = storeSettings.address;
  if (phoneEl && storeSettings.phone) phoneEl.value = storeSettings.phone;
  if (qrisEl && storeSettings.qrisId) qrisEl.value = storeSettings.qrisId;
  if (taxEl && storeSettings.tax) taxEl.value = storeSettings.tax;
  if (printEl && storeSettings.printer) printEl.value = storeSettings.printer;
}

function saveStoreSettings(e) {
  e.preventDefault();
  const nameEl = document.getElementById("settingStoreName");
  const addrEl = document.getElementById("settingStoreAddress");
  const phoneEl = document.getElementById("settingStorePhone");
  const qrisEl = document.getElementById("settingQrisId");
  const taxEl = document.getElementById("settingTax");
  const printEl = document.getElementById("settingPrinter");

  storeSettings = {
    name: nameEl ? nameEl.value.trim() : storeSettings.name,
    address: addrEl ? addrEl.value.trim() : storeSettings.address,
    phone: phoneEl ? phoneEl.value.trim() : storeSettings.phone,
    qrisId: qrisEl ? qrisEl.value.trim() : storeSettings.qrisId,
    tax: taxEl ? taxEl.value.trim() : storeSettings.tax,
    printer: printEl ? printEl.value : storeSettings.printer
  };

  saveToStorage("sn_store_settings", storeSettings);
  showToast("Pengaturan Outlet Sruput & Nyam berhasil disimpan!");
}

/* ==========================================
   5. MENU MANAGEMENT CRUD (PERSISTENT & RICH DUAL VIEW)
   ========================================== */
let menuViewMode = "grid";
let menuSearchQuery = "";

function switchMenuViewMode(mode, el) {
  menuViewMode = mode;
  const btnGrid = document.getElementById("btnMenuViewGrid");
  const btnTable = document.getElementById("btnMenuViewTable");

  if (btnGrid) {
    btnGrid.style.background = mode === "grid" ? "var(--hq-brown-dark)" : "#FFF";
    btnGrid.style.color = mode === "grid" ? "#FFF" : "var(--hq-text-title)";
    btnGrid.style.borderColor = mode === "grid" ? "var(--hq-brown-dark)" : "var(--hq-border)";
  }

  if (btnTable) {
    btnTable.style.background = mode === "table" ? "var(--hq-brown-dark)" : "#FFF";
    btnTable.style.color = mode === "table" ? "#FFF" : "var(--hq-text-title)";
    btnTable.style.borderColor = mode === "table" ? "var(--hq-brown-dark)" : "var(--hq-border)";
  }

  const gridBox = document.getElementById("menuMgmtGridContainer");
  const tableBox = document.getElementById("menuMgmtTableContainer");

  if (gridBox) gridBox.style.display = mode === "grid" ? "grid" : "none";
  if (tableBox) tableBox.style.display = mode === "table" ? "block" : "none";

  renderMenuMgmtViews();
}

function handleMenuSearchFilter(val) {
  menuSearchQuery = (val || "").trim().toLowerCase();
  renderMenuMgmtViews();
}

function updateMenuStats() {
  const totalEl = document.getElementById("menuStatTotal");
  const availEl = document.getElementById("menuStatAvailable");
  const outEl = document.getElementById("menuStatOutOfStock");

  const total = menuCatalog.length;
  const avail = menuCatalog.filter(m => m.stock === "Tersedia").length;
  const out = menuCatalog.filter(m => m.stock === "Habis").length;

  if (totalEl) totalEl.innerText = `${total} Item`;
  if (availEl) availEl.innerText = `${avail} Item`;
  if (outEl) outEl.innerText = `${out} Item`;
}

function filterMenuCategory(cat, el) {
  currentMenuCategoryFilter = cat;
  const pills = document.querySelectorAll(".hq-card-box .hq-pill");
  pills.forEach(p => p.classList.remove("active"));
  if (el) el.classList.add("active");
  renderMenuMgmtViews();
}

function renderMenuMgmtViews() {
  updateMenuStats();

  let filtered = menuCatalog;
  if (currentMenuCategoryFilter !== "all") {
    filtered = filtered.filter(m => m.category === currentMenuCategoryFilter);
  }
  if (menuSearchQuery) {
    filtered = filtered.filter(m => (m.name || m.title || "").toLowerCase().includes(menuSearchQuery));
  }

  // 1. Render Grid Cards View
  const gridContainer = document.getElementById("menuMgmtGridContainer");
  if (gridContainer) {
    if (filtered.length === 0) {
      gridContainer.innerHTML = `<div style="grid-column: 1/-1; text-align: center; color: #64748B; padding: 2.5rem; background: #FFF; border-radius: 16px; border: 1px solid var(--hq-border);">Tidak ada menu ditemukan.</div>`;
    } else {
      gridContainer.innerHTML = filtered.map(item => {
        const isAvail = item.stock === "Tersedia";
        return `
          <div class="hq-card-box" style="display: flex; flex-direction: column; justify-content: space-between; padding: 1.15rem; margin-bottom: 0; position: relative;">
            <div>
              <div style="position: relative; border-radius: 12px; overflow: hidden; height: 160px; margin-bottom: 0.85rem; background: #F8FAFC;">
                <img src="${item.image}" alt="${item.name}" style="width: 100%; height: 100%; object-fit: cover;">
                <span class="badge-status ${isAvail ? 'success' : 'danger'}" style="position: absolute; top: 10px; right: 10px; box-shadow: 0 2px 6px rgba(0,0,0,0.15);">
                  ${isAvail ? '<i class="fa-solid fa-circle-check"></i> Tersedia' : '<i class="fa-solid fa-circle-xmark"></i> Stok Habis'}
                </span>
                <span class="badge-tag-sm" style="position: absolute; bottom: 10px; left: 10px;">${item.category}</span>
              </div>
              <h3 style="font-size: 1.05rem; font-weight: 800; color: var(--hq-text-title); margin-bottom: 0.25rem; font-family: 'Outfit', sans-serif;">${item.name}</h3>
              <p style="font-size: 0.8rem; color: var(--hq-text-muted); margin-bottom: 0.85rem;">${item.description || 'Hidangan khas Sruput & Nyam dengan bahan pilihan.'}</p>
            </div>
            <div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.85rem; padding-top: 0.75rem; border-top: 1px solid #F1F5F9;">
                <span style="font-size: 0.75rem; color: #64748B; font-weight: 600;">Harga Satuan</span>
                <strong style="font-family: 'Outfit', sans-serif; font-size: 1.15rem; font-weight: 800; color: var(--hq-brown-medium);">Rp ${item.price.toLocaleString('id-ID')}</strong>
              </div>
              <div style="display: flex; gap: 0.4rem;">
                <button class="btn-action-sm" style="flex: 1; justify-content: center;" onclick="toggleMenuStockStatus('${item.id}')">
                  <i class="fa-solid fa-arrows-rotate"></i> ${isAvail ? 'Set Habis' : 'Set Tersedia'}
                </button>
                <button class="btn-action-sm" onclick="openEditMenuModal('${item.id}')" title="Edit Menu"><i class="fa-solid fa-pen"></i> Edit</button>
                <button class="btn-action-sm btn-action-danger" onclick="deleteMenuItem('${item.id}')" title="Hapus Menu"><i class="fa-solid fa-trash"></i></button>
              </div>
            </div>
          </div>
        `;
      }).join("");
    }
  }

  // 2. Render Table View
  const tbody = document.getElementById("menuMgmtTableBody");
  if (tbody) {
    if (filtered.length === 0) {
      tbody.innerHTML = `<tr><td colspan="6" style="text-align: center; color: #64748B; padding: 2rem;">Tidak ada menu ditemukan.</td></tr>`;
    } else {
      tbody.innerHTML = filtered.map(item => {
        const isAvail = item.stock === "Tersedia";
        return `
          <tr>
            <td>
              <img src="${item.image}" alt="${item.name}" style="width: 46px; height: 46px; object-fit: cover; border-radius: 10px;">
            </td>
            <td><strong>${item.name}</strong></td>
            <td><span class="badge-tag-sm">${item.category}</span></td>
            <td><strong style="color: var(--hq-brown-medium); font-family: 'Outfit', sans-serif;">Rp ${item.price.toLocaleString('id-ID')}</strong></td>
            <td>
              <span class="badge-status ${isAvail ? 'success' : 'danger'}" style="cursor: pointer;" onclick="toggleMenuStockStatus('${item.id}')">
                ${isAvail ? '<i class="fa-solid fa-circle-check"></i> Tersedia' : '<i class="fa-solid fa-circle-xmark"></i> Stok Habis'}
              </span>
            </td>
            <td>
              <div style="display: flex; gap: 0.3rem;">
                <button class="btn-action-sm" onclick="toggleMenuStockStatus('${item.id}')" title="Ubah Stok Status"><i class="fa-solid fa-arrows-rotate"></i> Stok</button>
                <button class="btn-action-sm" onclick="openEditMenuModal('${item.id}')" title="Edit Menu"><i class="fa-solid fa-pen"></i> Edit</button>
                <button class="btn-action-sm btn-action-danger" onclick="deleteMenuItem('${item.id}')" title="Hapus Menu"><i class="fa-solid fa-trash"></i> Hapus</button>
              </div>
            </td>
          </tr>
        `;
      }).join("");
    }
  }
}

// Backward compatibility wrapper
function renderMenuMgmtTable() {
  renderMenuMgmtViews();
}

function openAddMenuModal() {
  document.getElementById("menuFormId").value = "";
  document.getElementById("menuFormTitle").value = "";
  document.getElementById("menuFormCategory").value = "Sruput Juice";
  document.getElementById("menuFormPrice").value = "";
  document.getElementById("menuFormStock").value = "Tersedia";
  document.getElementById("menuFormImage").value = "images/es_jeruk.png";
  document.getElementById("addMenuModalTitle").innerHTML = `<i class="fa-solid fa-utensils"></i> Tambah Menu Baru`;
  
  const modal = document.getElementById("addMenuModal");
  if (modal) modal.classList.add("active");
}

function openEditMenuModal(id) {
  const item = menuCatalog.find(m => m.id === id);
  if (!item) return;

  document.getElementById("menuFormId").value = item.id;
  document.getElementById("menuFormTitle").value = item.name;
  document.getElementById("menuFormCategory").value = item.category;
  document.getElementById("menuFormPrice").value = item.price;
  document.getElementById("menuFormStock").value = item.stock;
  document.getElementById("menuFormImage").value = item.image;
  document.getElementById("addMenuModalTitle").innerHTML = `<i class="fa-solid fa-pen-to-square"></i> Edit Menu`;

  const modal = document.getElementById("addMenuModal");
  if (modal) modal.classList.add("active");
}

function closeAddMenuModal() {
  const modal = document.getElementById("addMenuModal");
  if (modal) modal.classList.remove("active");
}

function handleSaveMenuForm(e) {
  e.preventDefault();
  const id = document.getElementById("menuFormId").value;
  const name = document.getElementById("menuFormTitle").value.trim();
  const category = document.getElementById("menuFormCategory").value;
  const price = parseInt(document.getElementById("menuFormPrice").value) || 0;
  const stock = document.getElementById("menuFormStock").value;
  const image = document.getElementById("menuFormImage").value.trim() || "images/es_jeruk.png";

  if (id) {
    const existing = menuCatalog.find(m => m.id === id);
    if (existing) {
      existing.name = name;
      existing.category = category;
      existing.price = price;
      existing.stock = stock;
      existing.image = image;
    }
    showToast(`Menu "${name}" berhasil diperbarui!`);
  } else {
    const newId = `menu-${Date.now()}`;
    menuCatalog.unshift({ id: newId, name, category, price, stock, sales: 0, image });
    showToast(`Menu baru "${name}" berhasil ditambahkan!`);
  }

  saveToStorage("sn_menu_catalog", menuCatalog);
  closeAddMenuModal();
  renderMenuMgmtViews();
  renderStoreFrontCatalog();
}

function toggleMenuStockStatus(id) {
  const item = menuCatalog.find(m => m.id === id);
  if (item) {
    item.stock = item.stock === "Tersedia" ? "Habis" : "Tersedia";
    saveToStorage("sn_menu_catalog", menuCatalog);
    renderMenuMgmtViews();
    renderStoreFrontCatalog();
    showToast(`Status stok ${item.name} diubah menjadi: ${item.stock}`);
  }
}

function deleteMenuItem(id) {
  const item = menuCatalog.find(m => m.id === id);
  if (item && confirm(`Apakah Anda yakin ingin menghapus menu "${item.name}"?`)) {
    menuCatalog = menuCatalog.filter(m => m.id !== id);
    saveToStorage("sn_menu_catalog", menuCatalog);
    renderMenuMgmtViews();
    renderStoreFrontCatalog();
    showToast(`Menu ${item.name} berhasil dihapus.`);
  }
}

/* ==========================================
   6. STAFF MANAGEMENT CRUD (FULL PERSISTENT & EDIT MODAL)
   ========================================== */
let staffViewMode = "grid";
let staffRoleFilter = "all";
let staffSearchQuery = "";

function switchStaffViewMode(mode, el) {
  staffViewMode = mode;
  const btnGrid = document.getElementById("btnStaffViewGrid");
  const btnTable = document.getElementById("btnStaffViewTable");

  if (btnGrid) {
    btnGrid.style.background = mode === "grid" ? "var(--hq-brown-dark)" : "#FFF";
    btnGrid.style.color = mode === "grid" ? "#FFF" : "var(--hq-text-title)";
    btnGrid.style.borderColor = mode === "grid" ? "var(--hq-brown-dark)" : "var(--hq-border)";
  }

  if (btnTable) {
    btnTable.style.background = mode === "table" ? "var(--hq-brown-dark)" : "#FFF";
    btnTable.style.color = mode === "table" ? "#FFF" : "var(--hq-text-title)";
    btnTable.style.borderColor = mode === "table" ? "var(--hq-brown-dark)" : "var(--hq-border)";
  }

  const gridBox = document.getElementById("staffGridContainer");
  const tableBox = document.getElementById("staffTableContainer");

  if (gridBox) gridBox.style.display = mode === "grid" ? "grid" : "none";
  if (tableBox) tableBox.style.display = mode === "table" ? "block" : "none";

  renderStaffViews();
}

function handleStaffSearchFilter(val) {
  staffSearchQuery = (val || "").trim().toLowerCase();
  renderStaffViews();
}

function filterStaffRole(role, el) {
  staffRoleFilter = role;
  const pills = document.querySelectorAll("#paneStaff .hq-pill");
  pills.forEach(p => p.classList.remove("active"));
  if (el) el.classList.add("active");
  renderStaffViews();
}

function updateStaffStats() {
  const totalEl = document.getElementById("staffStatTotal");
  const activeEl = document.getElementById("staffStatActive");
  const offEl = document.getElementById("staffStatOff");

  const total = staffList.length;
  const active = staffList.filter(s => s.status === "Aktif").length;
  const off = staffList.filter(s => s.status !== "Aktif").length;

  if (totalEl) totalEl.innerText = `${total} Personil`;
  if (activeEl) activeEl.innerText = `${active} Personil`;
  if (offEl) offEl.innerText = `${off} Personil`;
}

function toggleStaffStatus(id) {
  const stf = staffList.find(s => s.id === id);
  if (stf) {
    stf.status = stf.status === "Aktif" ? "Cuti" : "Aktif";
    saveToStorage("sn_staff_list", staffList);
    renderStaffViews();
    updateDynamicKpis();
    showToast(`Status staf ${stf.name} diubah ke: ${stf.status}`);
  }
}

function renderStaffViews() {
  updateStaffStats();

  let filtered = staffList;
  if (staffRoleFilter !== "all") {
    filtered = filtered.filter(s => (s.role || "").toLowerCase().includes(staffRoleFilter.toLowerCase()));
  }
  if (staffSearchQuery) {
    filtered = filtered.filter(s => 
      (s.name || "").toLowerCase().includes(staffSearchQuery) || 
      (s.role || "").toLowerCase().includes(staffSearchQuery)
    );
  }

  // 1. Render Grid Cards View
  const gridContainer = document.getElementById("staffGridContainer");
  if (gridContainer) {
    if (filtered.length === 0) {
      gridContainer.innerHTML = `<div style="grid-column: 1/-1; text-align: center; color: #64748B; padding: 2.5rem; background: #FFF; border-radius: 16px; border: 1px solid var(--hq-border);">Tidak ada staf ditemukan.</div>`;
    } else {
      gridContainer.innerHTML = filtered.map(stf => {
        const isAktif = stf.status === "Aktif";
        const initials = (stf.name || "ST").split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase();

        return `
          <div class="hq-card-box" style="display: flex; flex-direction: column; justify-content: space-between; padding: 1.25rem; margin-bottom: 0;">
            <div>
              <div style="display: flex; align-items: center; gap: 0.85rem; margin-bottom: 1rem;">
                <div style="width: 48px; height: 48px; border-radius: 50%; background: linear-gradient(135deg, var(--hq-brown-medium), var(--hq-orange-bright)); color: #FFF; font-family: 'Outfit', sans-serif; font-weight: 800; font-size: 1.1rem; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 10px rgba(140,59,0,0.25);">
                  ${initials}
                </div>
                <div>
                  <h3 style="font-size: 1.05rem; font-weight: 800; color: var(--hq-text-title); font-family: 'Outfit', sans-serif;">${stf.name}</h3>
                  <span class="badge-tag-sm" style="margin-top: 0.2rem; display: inline-block;">${stf.role}</span>
                </div>
              </div>

              <div style="display: flex; flex-direction: column; gap: 0.45rem; font-size: 0.82rem; color: #475569; padding: 0.75rem 0.85rem; background: #F8FAFC; border-radius: 10px; border: 1px solid #E2E8F0; margin-bottom: 1rem;">
                <div style="display: flex; align-items: center; justify-content: space-between;">
                  <span>Shift Kerja:</span>
                  <strong>${stf.shift}</strong>
                </div>
                <div style="display: flex; align-items: center; justify-content: space-between;">
                  <span>Status Presensi:</span>
                  <span class="badge-status ${isAktif ? 'success' : 'warning'}">
                    <i class="fa-solid ${isAktif ? 'fa-circle-check' : 'fa-clock'}"></i> ${stf.status}
                  </span>
                </div>
              </div>
            </div>

            <div style="display: flex; gap: 0.4rem; border-top: 1px solid #F1F5F9; padding-top: 0.75rem;">
              <button class="btn-action-sm" style="flex: 1; justify-content: center;" onclick="toggleStaffStatus('${stf.id}')">
                <i class="fa-solid fa-arrows-rotate"></i> ${isAktif ? 'Set Cuti' : 'Set Aktif'}
              </button>
              <button class="btn-action-sm" onclick="openEditStaffModal('${stf.id}')" title="Edit Staf"><i class="fa-solid fa-pen"></i> Edit</button>
              <button class="btn-action-sm btn-action-danger" onclick="deleteStaff('${stf.id}')" title="Hapus Staf"><i class="fa-solid fa-trash"></i></button>
            </div>
          </div>
        `;
      }).join("");
    }
  }

  // 2. Render Table View
  const tbody = document.getElementById("staffTableBody");
  if (tbody) {
    if (filtered.length === 0) {
      tbody.innerHTML = `<tr><td colspan="5" style="text-align: center; color: #64748B; padding: 2rem;">Tidak ada staf ditemukan.</td></tr>`;
    } else {
      tbody.innerHTML = filtered.map(stf => {
        const isAktif = stf.status === "Aktif";
        const initials = (stf.name || "ST").split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase();

        return `
          <tr>
            <td>
              <div style="display: flex; align-items: center; gap: 0.75rem;">
                <div style="width: 36px; height: 36px; border-radius: 50%; background: var(--hq-brown-medium); color: #FFF; font-weight: 800; font-size: 0.85rem; display: flex; align-items: center; justify-content: center;">
                  ${initials}
                </div>
                <strong style="color: var(--hq-text-title);">${stf.name}</strong>
              </div>
            </td>
            <td><span class="badge-tag-sm">${stf.role}</span></td>
            <td><span style="font-size: 0.85rem; color: #475569;">${stf.shift}</span></td>
            <td>
              <span class="badge-status ${isAktif ? 'success' : 'warning'}" style="cursor: pointer;" onclick="toggleStaffStatus('${stf.id}')">
                <i class="fa-solid ${isAktif ? 'fa-circle-check' : 'fa-clock'}"></i> ${stf.status}
              </span>
            </td>
            <td>
              <div style="display: flex; gap: 0.3rem;">
                <button class="btn-action-sm" onclick="toggleStaffStatus('${stf.id}')" title="Ubah Status Presensi"><i class="fa-solid fa-arrows-rotate"></i> Status</button>
                <button class="btn-action-sm" onclick="openEditStaffModal('${stf.id}')" title="Edit Staf"><i class="fa-solid fa-pen"></i> Edit</button>
                <button class="btn-action-sm btn-action-danger" onclick="deleteStaff('${stf.id}')" title="Hapus Staf"><i class="fa-solid fa-trash"></i> Hapus</button>
              </div>
            </td>
          </tr>
        `;
      }).join("");
    }
  }
}

// Backward compatibility wrapper
function renderStaffTable() {
  renderStaffViews();
}

function openAddStaffModal() {
  document.getElementById("staffFormName").value = "";
  document.getElementById("staffFormRole").value = "Store Manager";
  document.getElementById("staffFormShift").value = "Pagi (08.00 - 16.00)";
  const modal = document.getElementById("addStaffModal");
  if (modal) modal.classList.add("active");
}

function closeAddStaffModal() {
  const modal = document.getElementById("addStaffModal");
  if (modal) modal.classList.remove("active");
}

function handleSaveStaffForm(e) {
  e.preventDefault();
  const name = document.getElementById("staffFormName").value.trim();
  const role = document.getElementById("staffFormRole").value;
  const shift = document.getElementById("staffFormShift").value;

  const newId = `stf-${Date.now()}`;
  staffList.push({ id: newId, name, role, shift, status: "Aktif" });
  
  saveToStorage("sn_staff_list", staffList);
  closeAddStaffModal();
  renderStaffViews();
  updateDynamicKpis();
  showToast(`Anggota staf baru "${name}" berhasil ditambahkan!`);
}

function openEditStaffModal(id) {
  const stf = staffList.find(s => s.id === id);
  if (!stf) return;

  document.getElementById("editStaffFormId").value = stf.id;
  document.getElementById("editStaffFormName").value = stf.name;
  document.getElementById("editStaffFormRole").value = stf.role;
  document.getElementById("editStaffFormShift").value = stf.shift;
  document.getElementById("editStaffFormStatus").value = stf.status;

  const modal = document.getElementById("editStaffModal");
  if (modal) modal.classList.add("active");
}

function closeEditStaffModal() {
  const modal = document.getElementById("editStaffModal");
  if (modal) modal.classList.remove("active");
}

function handleSaveEditStaffForm(e) {
  e.preventDefault();
  const id = document.getElementById("editStaffFormId").value;
  const name = document.getElementById("editStaffFormName").value.trim();
  const role = document.getElementById("editStaffFormRole").value;
  const shift = document.getElementById("editStaffFormShift").value;
  const status = document.getElementById("editStaffFormStatus").value;

  const stf = staffList.find(s => s.id === id);
  if (stf) {
    stf.name = name;
    stf.role = role;
    stf.shift = shift;
    stf.status = status;
    saveToStorage("sn_staff_list", staffList);
    showToast(`Data staf "${name}" berhasil diperbarui!`);
  }

  closeEditStaffModal();
  renderStaffViews();
  updateDynamicKpis();
}

function deleteStaff(id) {
  const stf = staffList.find(s => s.id === id);
  if (stf && confirm(`Hapus staf ${stf.name}?`)) {
    staffList = staffList.filter(s => s.id !== id);
    saveToStorage("sn_staff_list", staffList);
    renderStaffViews();
    updateDynamicKpis();
    showToast(`Staf ${stf.name} berhasil dihapus.`);
  }
}

/* ==========================================
   7. KDS & ORDERS RECEIPT ENGINE (FULL PERSISTENT)
   ========================================== */
function renderKdsOrders() {
  const container = document.getElementById("kdsOrdersContainer");
  if (!container) return;

  const activeOnly = activeOrders.filter(o => o.status === "Diproses" || o.status === "Siap");

  if (activeOnly.length === 0) {
    container.innerHTML = `<div style="grid-column: 1/-1; text-align: center; color: #64748B; padding: 2rem;">Tidak ada pesanan aktif di dapur saat ini.</div>`;
    return;
  }

  container.innerHTML = activeOnly.map(order => `
    <div class="kds-card">
      <div>
        <div class="kds-card-head">
          <span class="kds-order-id">${order.id}</span>
          <span class="badge-fin-type ${order.status === 'Siap' ? 'type-pemasukan' : 'type-pengeluaran'}">${order.status}</span>
        </div>
        <p style="font-size: 0.78rem; font-weight: 700; color: #64748B; margin-bottom: 0.5rem;">${order.customer} • ${order.time}</p>
        <div class="kds-items-list">
          ${(order.items || []).map(i => `<div>• ${i.name || i.title}</div>`).join("")}
        </div>
      </div>
      <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 0.75rem; border-top: 1px solid #F1F5F9; padding-top: 0.5rem;">
        <span style="font-family: 'Outfit', sans-serif; font-weight: 800; font-size: 0.95rem; color: #782E00;">Rp ${order.total.toLocaleString('id-ID')}</span>
        <button class="btn-solid-brown-sm" onclick="advanceKdsStatus('${order.id}')">
          ${order.status === 'Diproses' ? 'Tandai Siap' : 'Selesaikan'}
        </button>
      </div>
    </div>
  `).join("");
}

function advanceKdsStatus(orderId) {
  const order = activeOrders.find(o => o.id === orderId);
  if (order) {
    if (order.status === "Diproses") {
      order.status = "Siap";
      showToast(`Pesanan ${order.id} ditandai SIAP disajikan!`);
    } else if (order.status === "Siap") {
      order.status = "Selesai";
      showToast(`Pesanan ${order.id} telah SELESAI.`);
    }
    saveToStorage("sn_orders_list", activeOrders);
    renderKdsOrders();
    renderOrdersTable();
    updateDynamicKpis();
  }
}

function deleteOrder(orderId) {
  const order = activeOrders.find(o => o.id === orderId);
  if (order && confirm(`Batalkan/Hapus pesanan ${order.id}?`)) {
    activeOrders = activeOrders.filter(o => o.id !== orderId);
    saveToStorage("sn_orders_list", activeOrders);
    renderKdsOrders();
    renderOrdersTable();
    updateDynamicKpis();
    showToast(`Pesanan ${orderId} telah dihapus.`);
  }
}

let orderStatusFilter = "all";
let orderSearchQuery = "";

function filterOrderStatus(status, el) {
  orderStatusFilter = status;
  const pills = document.querySelectorAll("#paneOrders .hq-pill");
  pills.forEach(p => p.classList.remove("active"));
  if (el) el.classList.add("active");
  renderOrdersTable();
}

function handleOrderSearchFilter(val) {
  orderSearchQuery = (val || "").trim().toLowerCase();
  renderOrdersTable();
}

function updateOrderStats() {
  const totalEl = document.getElementById("orderStatTotal");
  const procEl = document.getElementById("orderStatProcessing");
  const readyEl = document.getElementById("orderStatReady");
  const compEl = document.getElementById("orderStatCompleted");

  const total = activeOrders.length;
  const proc = activeOrders.filter(o => o.status === "Diproses").length;
  const ready = activeOrders.filter(o => o.status === "Siap").length;
  const comp = activeOrders.filter(o => o.status === "Selesai").length;

  if (totalEl) totalEl.innerText = `${total}`;
  if (procEl) procEl.innerText = `${proc}`;
  if (readyEl) readyEl.innerText = `${ready}`;
  if (compEl) compEl.innerText = `${comp}`;
}

function renderOrdersTable() {
  updateOrderStats();
  const container = document.getElementById("ordersListTableContainer");
  if (!container) return;

  let filtered = activeOrders;
  if (orderStatusFilter !== "all") {
    filtered = filtered.filter(o => o.status === orderStatusFilter);
  }
  if (orderSearchQuery) {
    filtered = filtered.filter(o => 
      (o.id || "").toLowerCase().includes(orderSearchQuery) || 
      (o.customer || "").toLowerCase().includes(orderSearchQuery)
    );
  }

  if (filtered.length === 0) {
    container.innerHTML = `<div style="text-align: center; color: #64748B; padding: 2.5rem;">Tidak ada transaksi pesanan ditemukan.</div>`;
    return;
  }

  container.innerHTML = `
    <table class="hq-data-table">
      <thead>
        <tr>
          <th>Order ID</th>
          <th>Waktu & Pelanggan</th>
          <th>Rincian Menu</th>
          <th>Total Pembayaran</th>
          <th>Metode</th>
          <th>Status Pesanan</th>
          <th>Aksi</th>
        </tr>
      </thead>
      <tbody>
        ${filtered.map(o => {
          let statusBadgeClass = "warning";
          let statusIcon = "fa-fire-burner";
          if (o.status === "Siap") {
            statusBadgeClass = "info";
            statusIcon = "fa-bell-concierge";
          } else if (o.status === "Selesai") {
            statusBadgeClass = "success";
            statusIcon = "fa-circle-check";
          }

          const itemsText = (o.items || []).map(i => `${i.name || i.title} (x${i.qty || 1})`).join(", ");

          return `
            <tr>
              <td>
                <strong style="color: var(--hq-brown-medium); font-family: 'Outfit', sans-serif; cursor: pointer;" onclick="openOrderDetailModal('${o.id}')">
                  ${o.id}
                </strong>
              </td>
              <td>
                <div>
                  <strong style="display: block; color: var(--hq-text-title);">${o.customer || 'Pelanggan'}</strong>
                  <span style="font-size: 0.78rem; color: var(--hq-text-muted);">${o.time || 'Hari Ini'}</span>
                </div>
              </td>
              <td style="max-width: 240px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${itemsText}">
                <span style="font-size: 0.85rem; color: #475569;">${itemsText}</span>
              </td>
              <td>
                <strong style="font-family: 'Outfit', sans-serif; color: var(--hq-text-title); font-size: 0.95rem;">
                  Rp ${o.total.toLocaleString('id-ID')}
                </strong>
              </td>
              <td>
                <span class="badge-tag-sm" style="background: #FFF7ED; color: var(--hq-orange-bright); border: 1px solid #FFEDD5;">
                  <i class="fa-solid fa-qrcode"></i> ${o.method || 'QRIS'}
                </span>
              </td>
              <td>
                <span class="badge-status ${statusBadgeClass}" style="cursor: pointer;" onclick="advanceKdsStatus('${o.id}')">
                  <i class="fa-solid ${statusIcon}"></i> ${o.status}
                </span>
              </td>
              <td>
                <div style="display: flex; gap: 0.3rem;">
                  <button class="btn-action-sm" onclick="advanceKdsStatus('${o.id}')" title="Ubah Status Pesanan">
                    <i class="fa-solid fa-arrows-rotate"></i> Status
                  </button>
                  <button class="btn-action-sm" onclick="openOrderDetailModal('${o.id}')" title="Lihat Struk Digital">
                    <i class="fa-solid fa-receipt"></i> Struk
                  </button>
                  <button class="btn-action-sm btn-action-danger" onclick="deleteOrder('${o.id}')" title="Hapus Pesanan">
                    <i class="fa-solid fa-trash"></i>
                  </button>
                </div>
              </td>
            </tr>
          `;
        }).join("")}
      </tbody>
    </table>
  `;
}

function openOrderDetailModal(orderId) {
  const order = activeOrders.find(o => o.id === orderId);
  if (!order) return;

  const content = document.getElementById("receiptBodyContent");
  if (content) {
    content.innerHTML = `
      <div style="text-align: center; border-bottom: 1px stroke #E2E8F0; padding-bottom: 0.75rem; margin-bottom: 1rem;">
        <h2 style="font-family: 'Outfit', sans-serif; font-weight: 800; font-size: 1.3rem; color: #782E00;">${storeSettings.name || 'SRUPUT & NYAM'}</h2>
        <p style="font-size: 0.75rem; color: #64748B;">${storeSettings.address || 'F&B HQ - Outlet Utama'}</p>
        <p style="font-size: 0.72rem; color: #94A3B8;">Order ID: <strong>${order.id}</strong> • ${order.time}</p>
      </div>

      <div style="font-size: 0.82rem; margin-bottom: 1rem;">
        <p>Pelanggan: <strong>${order.customer}</strong></p>
        <p>Metode Pembayaran: <strong>${order.method || 'QRIS'} (LUNAS)</strong></p>
      </div>

      <div style="border-top: 1px dashed #CBD5E1; border-bottom: 1px dashed #CBD5E1; padding: 0.75rem 0; margin-bottom: 1rem;">
        ${(order.items || []).map(item => `
          <div style="display: flex; justify-content: space-between; font-size: 0.82rem; margin-bottom: 0.35rem;">
            <span>${item.name || item.title}</span>
            <strong>Rp ${(item.price || item.unitPrice || 0).toLocaleString('id-ID')}</strong>
          </div>
        `).join("")}
      </div>

      <div style="display: flex; justify-content: space-between; font-size: 1rem; font-weight: 800; color: #0F172A; margin-bottom: 1.25rem;">
        <span>TOTAL:</span>
        <span style="color: #782E00;">Rp ${order.total.toLocaleString('id-ID')}</span>
      </div>

      <button class="btn-hq-new-report" style="width: 100%; margin-bottom: 0.5rem;" onclick="simulatePrintReceipt('${order.id}')">
        <i class="fa-solid fa-print"></i> Cetak Struk (Thermal Printer)
      </button>
    `;
  }

  const modal = document.getElementById("orderDetailModal");
  if (modal) modal.classList.add("active");
}

function closeOrderDetailModal() {
  const modal = document.getElementById("orderDetailModal");
  if (modal) modal.classList.remove("active");
}

function simulatePrintReceipt(orderId) {
  showToast(`Mencetak Struk Thermal untuk Pesanan ${orderId}...`);
}

/* ==========================================
   8. STORE FRONT CATALOG RENDERER (SHARED WITH CUSTOMER)
   ========================================== */
function renderStoreFrontCatalog() {
  const grid = document.getElementById("fullCatalogGrid");
  if (!grid) return;

  grid.innerHTML = menuCatalog.map(item => {
    const isOutOfStock = item.stock === "Habis";
    return `
      <div style="background: #FFF; border: 1px solid #E2E8F0; border-radius: 16px; padding: 1rem; display: flex; flex-direction: column; justify-content: space-between; opacity: ${isOutOfStock ? '0.75' : '1'};">
        <div style="position: relative;">
          <img src="${item.image}" alt="${item.name}" style="width: 100%; height: 140px; object-fit: cover; border-radius: 12px; margin-bottom: 0.75rem;">
          ${isOutOfStock ? `<span style="position: absolute; top: 10px; right: 10px; background: #DC2626; color: #FFF; font-size: 0.7rem; font-weight: 700; padding: 0.2rem 0.5rem; border-radius: 6px;">Stok Habis</span>` : ''}
        </div>
        <h4 style="font-size: 0.95rem; font-weight: 700; color: #0F172A;">${item.name}</h4>
        <p style="font-size: 0.8rem; color: #64748B; margin-bottom: 0.5rem;">${item.category}</p>
        <div style="display: flex; align-items: center; justify-content: space-between; margin-top: auto;">
          <span style="font-family: 'Outfit', sans-serif; font-size: 1.1rem; font-weight: 800; color: #782E00;">Rp ${item.price.toLocaleString('id-ID')}</span>
          <button class="btn-solid-brown-sm" ${isOutOfStock ? 'disabled style="background: #94A3B8; cursor: not-allowed;"' : `onclick="showToast('Ditambahkan ke Keranjang!')"`}>
            ${isOutOfStock ? 'Habis' : '+ Pesan'}
          </button>
        </div>
      </div>
    `;
  }).join("");
}

/* ==========================================
   9. NEW REPORT MODAL & DOWNLOAD SIMULATOR
   ========================================== */
function openNewReportModal() {
  const modal = document.getElementById("newReportModal");
  if (modal) modal.classList.add("active");
}

function closeNewReportModal() {
  const modal = document.getElementById("newReportModal");
  if (modal) modal.classList.remove("active");
}

function generateReportDownload() {
  const period = document.getElementById("reportPeriodSelect").value;
  const selectedRadio = document.querySelector('input[name="reportFormat"]:checked');
  const format = selectedRadio ? selectedRadio.value : "PDF";

  closeNewReportModal();
  showToast(`Mengunduh Laporan (${format}) untuk periode: ${period}...`);
}

/* ==========================================
   10. GLOBAL SEARCH FUNCTION
   ========================================== */
function handleHqSearch(query) {
  if (!query || query.trim() === "") return;
  showToast(`Mencari data: "${query}"`);
}

/* ==========================================
   11. TOAST NOTIFICATION ENGINE
   ========================================== */
function showToast(message) {
  const container = document.getElementById("toastContainer");
  if (!container) return;

  const toast = document.createElement("div");
  toast.style.cssText = `
    background: #0F172A;
    color: #FFFFFF;
    padding: 0.75rem 1.25rem;
    border-radius: 12px;
    font-size: 0.82rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    box-shadow: 0 10px 25px rgba(0,0,0,0.2);
    display: flex;
    align-items: center;
    gap: 0.5rem;
    animation: fadeIn 0.3s ease;
  `;
  toast.innerHTML = `<i class="fa-solid fa-circle-check" style="color: #10B981;"></i> ${message}`;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transition = "opacity 0.3s ease";
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}

function showNotificationToast() {
  showToast("Anda memiliki notifikasi pesanan terbaru!");
}

function showAppGridToast() {
  showToast("Modul F&B Apps: POS, KDS, & Inventory Aktif.");
}

function showChartToast() {
  showToast("Chart Tren Penjualan Harian diperbarui secara real-time.");
}

function openHelpCenterModal() {
  const phone = storeSettings.phone || "0812-9876-543";
  showToast(`Pusat Bantuan Sruput & Nyam HQ (WhatsApp Support: ${phone})`);
}

/* ==========================================
   12. INTERACTIVE ANALYTICS ENGINE
   ========================================== */
const ANALYTICS_DATASETS = {
  "7 Hari Terakhir": {
    omzet: "Rp 12.850.000",
    trx: "342",
    avg: "Rp 37.500",
    fav: "Es Jeruk Peras Ori",
    favSub: "180 pcs terjual",
    qris: "65%", cash: "25%", bank: "10%"
  },
  "30 Hari Terakhir": {
    omzet: "Rp 54.200.000",
    trx: "1.420",
    avg: "Rp 38.150",
    fav: "Es Jeruk Peras Ori",
    favSub: "720 pcs terjual",
    qris: "70%", cash: "20%", bank: "10%"
  },
  "Bulan Ini": {
    omzet: "Rp 68.450.000",
    trx: "1.780",
    avg: "Rp 38.450",
    fav: "Gourmet Salad Bowl",
    favSub: "890 pcs terjual",
    qris: "68%", cash: "22%", bank: "10%"
  },
  "Tahun Ini": {
    omzet: "Rp 642.000.000",
    trx: "16.890",
    avg: "Rp 38.010",
    fav: "Es Jeruk Peras Ori",
    favSub: "8.450 pcs terjual",
    qris: "72%", cash: "18%", bank: "10%"
  }
};

let currentTrendMetric = "omzet";
const TREND_METRIC_DATA = {
  omzet: [
    { day: "Sen", val: "1.050.000", prefix: "Rp ", cy: 140 },
    { day: "Sel", val: "1.250.000", prefix: "Rp ", cy: 125 },
    { day: "Rab", val: "1.100.000", prefix: "Rp ", cy: 140 },
    { day: "Kam", val: "2.200.000", prefix: "Rp ", cy: 70 },
    { day: "Jum", val: "1.300.000", prefix: "Rp ", cy: 135 },
    { day: "Sab", val: "2.450.000", prefix: "Rp ", cy: 40 },
    { day: "Min", val: "2.100.000", prefix: "Rp ", cy: 50 }
  ],
  trx: [
    { day: "Sen", val: "28 Pesanan", prefix: "", cy: 150 },
    { day: "Sel", val: "34 Pesanan", prefix: "", cy: 130 },
    { day: "Rab", val: "30 Pesanan", prefix: "", cy: 145 },
    { day: "Kam", val: "58 Pesanan", prefix: "", cy: 75 },
    { day: "Jum", val: "36 Pesanan", prefix: "", cy: 135 },
    { day: "Sab", val: "68 Pesanan", prefix: "", cy: 35 },
    { day: "Min", val: "56 Pesanan", prefix: "", cy: 60 }
  ]
};

function toggleDateFilterMenu() {
  const menu = document.getElementById("dateFilterMenu");
  if (menu) menu.classList.toggle("show");
}

function selectDateRange(rangeLabel, el) {
  const labelEl = document.getElementById("selectedDateLabel");
  if (labelEl) labelEl.innerText = rangeLabel;

  document.querySelectorAll(".dropdown-item").forEach(i => i.classList.remove("active"));
  if (el) el.classList.add("active");
  toggleDateFilterMenu();

  const data = ANALYTICS_DATASETS[rangeLabel] || ANALYTICS_DATASETS["7 Hari Terakhir"];
  
  const totalOmzetEl = document.getElementById("valTotalOmzet");
  const totalTrxEl = document.getElementById("valTotalTransaksi");
  const avgEl = document.getElementById("valRataRata");
  const favEl = document.getElementById("valProdukTerfavorit");
  const favSubEl = document.getElementById("valTerfavoritSub");

  if (totalOmzetEl) totalOmzetEl.innerText = data.omzet;
  if (totalTrxEl) totalTrxEl.innerText = data.trx;
  if (avgEl) avgEl.innerText = data.avg;
  if (favEl) favEl.innerText = data.fav;
  if (favSubEl) favSubEl.innerText = data.favSub;

  const pctQris = document.getElementById("pctQris");
  const pctCash = document.getElementById("pctCash");
  const pctBank = document.getElementById("pctBank");
  if (pctQris) pctQris.innerText = data.qris;
  if (pctCash) pctCash.innerText = data.cash;
  if (pctBank) pctBank.innerText = data.bank;

  showToast(`Analisis Data Diperbarui: ${rangeLabel}`);
}

function switchTrendMetric(metric, el) {
  currentTrendMetric = metric;
  const btnOmzet = document.getElementById("btnTrendOmzet");
  const btnTrx = document.getElementById("btnTrendTrx");

  if (btnOmzet) {
    btnOmzet.style.background = metric === "omzet" ? "var(--hq-brown-dark)" : "#FFF";
    btnOmzet.style.color = metric === "omzet" ? "#FFF" : "var(--hq-text-title)";
    btnOmzet.style.borderColor = metric === "omzet" ? "var(--hq-brown-dark)" : "var(--hq-border)";
  }

  if (btnTrx) {
    btnTrx.style.background = metric === "trx" ? "var(--hq-brown-dark)" : "#FFF";
    btnTrx.style.color = metric === "trx" ? "#FFF" : "var(--hq-text-title)";
    btnTrx.style.borderColor = metric === "trx" ? "var(--hq-brown-dark)" : "var(--hq-border)";
  }

  setChartActiveDay(5);
  showToast(`Tampilan Grafik: ${metric === "omzet" ? "Omzet (Rp)" : "Volume Pesanan"}`);
}

function setChartActiveDay(index, el) {
  const dataset = TREND_METRIC_DATA[currentTrendMetric] || TREND_METRIC_DATA["omzet"];
  const item = dataset[index] || dataset[5];

  const tooltipLabel = document.querySelector(".tooltip-label");
  const tooltipVal = document.getElementById("tooltipValText");
  const activeDot = document.getElementById("activeChartDot");
  const guideLine = document.getElementById("activeGuideLine");

  if (tooltipLabel) tooltipLabel.innerText = item.prefix || "";
  if (tooltipVal) tooltipVal.innerText = item.val;

  const pointsX = [15, 90, 170, 250, 330, 410, 525];
  const targetX = pointsX[index] || 410;

  if (activeDot) {
    activeDot.setAttribute("cx", targetX);
    activeDot.setAttribute("cy", item.cy);
  }

  if (guideLine) {
    guideLine.setAttribute("x1", targetX);
    guideLine.setAttribute("x2", targetX);
    guideLine.setAttribute("y1", item.cy);
  }

  const tooltipBox = document.getElementById("chartTooltip");
  if (tooltipBox) {
    tooltipBox.style.left = `${targetX - 50}px`;
  }

  if (el) {
    document.querySelectorAll("#xAxisLabels span").forEach(s => s.classList.remove("active-day"));
    el.classList.add("active-day");
  }
}
