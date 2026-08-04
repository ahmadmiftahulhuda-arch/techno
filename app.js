/* ==========================================================================
   SRUPUT & NYAM - F&B HQ Store Analytics & Management Engine
   Interactive chart tooltips, KPI date filtering, view tab switching,
   product progress bars recalculation, report exporter, search filter,
   Menu CRUD, Digital Receipts POS, KDS Kitchen Display System, Staff Manager.
   ========================================================================== */

// Chart Data per Day (Matching reference image)
const DAILY_TREND_DATA = [
  { day: "Sen", fullDay: "Senin", omzet: 1050000, valText: "1.050.000", cx: 15, cy: 140 },
  { day: "Sel", fullDay: "Selasa", omzet: 1250000, valText: "1.250.000", cx: 90, cy: 125 },
  { day: "Rab", fullDay: "Rabu", omzet: 1100000, valText: "1.100.000", cx: 170, cy: 140 },
  { day: "Kam", fullDay: "Kamis", omzet: 2200000, valText: "2.200.000", cx: 250, cy: 70 },
  { day: "Jum", fullDay: "Jumat", omzet: 1300000, valText: "1.300.000", cx: 330, cy: 135 },
  { day: "Sab", fullDay: "Sabtu", omzet: 2450000, valText: "2.450.000", cx: 410, cy: 40 }, // Screenshot Active
  { day: "Min", fullDay: "Minggu", omzet: 2100000, valText: "2.100.000", cx: 525, cy: 50 }
];

// Catalog Data for Menu Management
let menuCatalog = [
  { id: "es-jeruk-ori", name: "Es Jeruk Peras Original", category: "Sruput Juice", price: 15000, stock: "Tersedia", sales: 180, image: "images/es_jeruk.png" },
  { id: "gourmet-salad", name: "Gourmet Salad Bowl", category: "Nyam Salad", price: 35000, stock: "Tersedia", sales: 145, image: "images/salad.png" },
  { id: "combo-ayam", name: "Paket Combo Ayam", category: "Paket Combo", price: 45000, stock: "Tersedia", sales: 112, image: "images/combo.png" },
  { id: "kopi-aren", name: "Es Kopi Susu Aren", category: "Sruput Beverage", price: 20000, stock: "Tersedia", sales: 89, image: "images/mango.png" },
  { id: "tahu-cabe-garam", name: "Tahu Cabe Garam", category: "Nyam Salad", price: 18000, stock: "Tersedia", sales: 64, image: "images/watermelon.png" }
];

// Active KDS Orders Queue
let activeOrders = [
  { id: "SN-892101", customer: "Ahmad Miftah (Meja 04)", items: [{ name: "2x Es Jeruk Peras Original", price: 30000 }, { name: "1x Gourmet Salad Bowl", price: 35000 }], total: 65000, method: "QRIS", status: "Diproses", time: "14:15 WIB" },
  { id: "SN-892102", customer: "Siti Rahma (Takeaway)", items: [{ name: "1x Mango Juice", price: 28000 }, { name: "1x Tropical Fruit Bowl", price: 38000 }], total: 66000, method: "Cash", status: "Siap", time: "14:20 WIB" },
  { id: "SN-892103", customer: "Budi Santoso (Delivery)", items: [{ name: "1x Green Detox Combo", price: 55000 }], total: 55000, method: "Bank Transfer", status: "Diproses", time: "14:25 WIB" }
];

// Staff List
let staffList = [
  { id: "stf-1", name: "Ahmad Miftahul Huda", role: "Store Manager", shift: "Pagi (08.00 - 16.00)", status: "Aktif" },
  { id: "stf-2", name: "Riska Ika Maulida", role: "Head Barista & Kitchen Lead", shift: "Pagi (08.00 - 16.00)", status: "Aktif" },
  { id: "stf-3", name: "Budi Setiawan", role: "Kasir / Frontend POS", shift: "Siang (12.00 - 20.00)", status: "Aktif" }
];

let currentMenuCategoryFilter = "all";

// Initial Setup
document.addEventListener("DOMContentLoaded", () => {
  renderMenuMgmtTable();
  renderOrdersTable();
  renderKdsOrders();
  renderStaffTable();
  renderStoreFrontCatalog();
  
  // Set default active day to Saturday (Index 5) as shown in image
  setChartActiveDay(5);
});

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

  if (tooltipVal) {
    tooltipVal.textContent = data.valText;
  }

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
    if (i === index) {
      span.classList.add("active-day");
    } else {
      span.classList.remove("active-day");
    }
  });
}

/* ==========================================
   2. DATE RANGE FILTER ENGINE
   ========================================== */

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

  const valOmzet = document.getElementById("valTotalOmzet");
  const valTrx = document.getElementById("valTotalTransaksi");
  const valRata = document.getElementById("valRataRata");
  const valFav = document.getElementById("valProdukTerfavorit");
  const valFavSub = document.getElementById("valTerfavoritSub");

  if (rangeText === "7 Hari Terakhir") {
    if (valOmzet) valOmzet.textContent = "Rp 12.850.000";
    if (valTrx) valTrx.textContent = "342";
    if (valRata) valRata.textContent = "Rp 37.500";
    if (valFav) valFav.textContent = "Es Jeruk Peras Ori";
    if (valFavSub) valFavSub.textContent = "180 pcs terjual";
    updateProgressBars(180, 145, 112, 89, 64);
  } else if (rangeText === "30 Hari Terakhir") {
    if (valOmzet) valOmzet.textContent = "Rp 54.200.000";
    if (valTrx) valTrx.textContent = "1.440";
    if (valRata) valRata.textContent = "Rp 37.638";
    if (valFav) valFav.textContent = "Es Jeruk Peras Ori";
    if (valFavSub) valFavSub.textContent = "780 pcs terjual";
    updateProgressBars(780, 610, 480, 390, 280);
  } else if (rangeText === "Bulan Ini") {
    if (valOmzet) valOmzet.textContent = "Rp 48.950.000";
    if (valTrx) valTrx.textContent = "1.305";
    if (valRata) valRata.textContent = "Rp 37.509";
    if (valFav) valFav.textContent = "Es Jeruk Peras Ori";
    if (valFavSub) valFavSub.textContent = "710 pcs terjual";
    updateProgressBars(710, 560, 440, 350, 250);
  } else if (rangeText === "Tahun Ini") {
    if (valOmzet) valOmzet.textContent = "Rp 412.500.000";
    if (valTrx) valTrx.textContent = "11.000";
    if (valRata) valRata.textContent = "Rp 37.500";
    if (valFav) valFav.textContent = "Es Jeruk Peras Ori";
    if (valFavSub) valFavSub.textContent = "5.800 pcs terjual";
    updateProgressBars(5800, 4200, 3100, 2400, 1900);
  }

  showToast(`Filter rentang waktu diubah ke: ${rangeText}`);
}

function updateProgressBars(c1, c2, c3, c4, c5) {
  const counts = [c1, c2, c3, c4, c5];
  const maxVal = Math.max(...counts);

  counts.forEach((val, index) => {
    const countEl = document.getElementById(`countProd${index + 1}`);
    const barEl = document.getElementById(`barProd${index + 1}`);
    if (countEl) countEl.textContent = `${val.toLocaleString('id-ID')} pcs`;
    if (barEl) {
      const pct = (val / maxVal) * 100;
      barEl.style.width = `${pct}%`;
    }
  });
}

/* ==========================================
   3. NAVIGATION TAB SWITCHER
   ========================================== */

function switchHqTab(tabName, clickedEl) {
  const items = document.querySelectorAll(".hq-nav-item");
  items.forEach(item => {
    if (item.getAttribute("data-tab") === tabName) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
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
    if (pane.id === targetId) {
      pane.classList.add("active");
    } else {
      pane.classList.remove("active");
    }
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
    } else {
      showToast("Kembali ke F&B HQ Analytics Dashboard");
    }
  }
}

/* ==========================================
   4. MENU MANAGEMENT CRUD
   ========================================== */

function filterMenuCategory(cat, el) {
  currentMenuCategoryFilter = cat;
  const pills = document.querySelectorAll(".hq-filter-pills-row .pill-filter-item");
  pills.forEach(p => p.classList.remove("active"));
  if (el) el.classList.add("active");
  renderMenuMgmtTable();
}

function renderMenuMgmtTable() {
  const tbody = document.getElementById("menuMgmtTableBody");
  if (!tbody) return;

  let filtered = menuCatalog;
  if (currentMenuCategoryFilter !== "all") {
    filtered = menuCatalog.filter(m => m.category === currentMenuCategoryFilter);
  }

  tbody.innerHTML = filtered.map(item => `
    <tr>
      <td>
        <img src="${item.image}" alt="${item.name}" style="width: 44px; height: 44px; object-fit: cover; border-radius: 8px;">
      </td>
      <td><strong>${item.name}</strong></td>
      <td>${item.category}</td>
      <td><strong>Rp ${item.price.toLocaleString('id-ID')}</strong></td>
      <td>
        <button class="badge-fin-type ${item.stock === 'Tersedia' ? 'type-pemasukan' : 'type-pengeluaran'}" 
                onclick="toggleMenuStockStatus('${item.id}')" style="cursor: pointer; border: none;">
          ${item.stock}
        </button>
      </td>
      <td>
        <div style="display: flex; gap: 0.35rem;">
          <button class="btn-solid-brown-sm" style="padding: 0.3rem 0.65rem; font-size: 0.72rem;" onclick="openEditMenuModal('${item.id}')">Edit</button>
          <button class="btn-solid-brown-sm" style="padding: 0.3rem 0.65rem; font-size: 0.72rem; background: #DC2626;" onclick="deleteMenuItem('${item.id}')">Hapus</button>
        </div>
      </td>
    </tr>
  `).join("");
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
  const name = document.getElementById("menuFormTitle").value;
  const category = document.getElementById("menuFormCategory").value;
  const price = parseInt(document.getElementById("menuFormPrice").value) || 0;
  const stock = document.getElementById("menuFormStock").value;
  const image = document.getElementById("menuFormImage").value;

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

  closeAddMenuModal();
  renderMenuMgmtTable();
  renderStoreFrontCatalog();
}

function toggleMenuStockStatus(id) {
  const item = menuCatalog.find(m => m.id === id);
  if (item) {
    item.stock = item.stock === "Tersedia" ? "Habis" : "Tersedia";
    renderMenuMgmtTable();
    showToast(`Status stok ${item.name} diubah menjadi: ${item.stock}`);
  }
}

function deleteMenuItem(id) {
  const item = menuCatalog.find(m => m.id === id);
  if (item && confirm(`Apakah Anda yakin ingin menghapus menu "${item.name}"?`)) {
    menuCatalog = menuCatalog.filter(m => m.id !== id);
    renderMenuMgmtTable();
    renderStoreFrontCatalog();
    showToast(`Menu ${item.name} berhasil dihapus.`);
  }
}

/* ==========================================
   5. KDS & ORDERS RECEIPT ENGINE
   ========================================== */

function renderKdsOrders() {
  const container = document.getElementById("kdsOrdersContainer");
  if (!container) return;

  container.innerHTML = activeOrders.map(order => `
    <div class="kds-card">
      <div>
        <div class="kds-card-head">
          <span class="kds-order-id">${order.id}</span>
          <span class="badge-fin-type ${order.status === 'Siap' ? 'type-pemasukan' : 'type-pengeluaran'}">${order.status}</span>
        </div>
        <p style="font-size: 0.78rem; font-weight: 700; color: #64748B; margin-bottom: 0.5rem;">${order.customer} • ${order.time}</p>
        <div class="kds-items-list">
          ${order.items.map(i => `<div>• ${i.name}</div>`).join("")}
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
    renderKdsOrders();
    renderOrdersTable();
  }
}

function renderOrdersTable() {
  const container = document.getElementById("ordersListTableContainer");
  if (!container) return;

  container.innerHTML = `
    <div class="table-responsive">
      <table class="finance-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Pelanggan</th>
            <th>Rincian Pesanan</th>
            <th>Total Pembayaran</th>
            <th>Metode</th>
            <th>Status</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          ${activeOrders.map(o => `
            <tr>
              <td><strong style="color: #782E00; cursor: pointer;" onclick="openOrderDetailModal('${o.id}')">${o.id}</strong></td>
              <td>${o.customer}</td>
              <td>${o.items.map(i => i.name).join(", ")}</td>
              <td><strong>Rp ${o.total.toLocaleString('id-ID')}</strong></td>
              <td><span class="badge-fin-type" style="background: #FFF7ED; color: #FF7000;">${o.method}</span></td>
              <td><span class="badge-fin-type ${o.status === 'Selesai' ? 'type-pemasukan' : 'type-pengeluaran'}">${o.status}</span></td>
              <td>
                <button class="btn-solid-brown-sm" style="padding: 0.3rem 0.65rem; font-size: 0.72rem;" onclick="openOrderDetailModal('${o.id}')">Struk</button>
              </td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function openOrderDetailModal(orderId) {
  const order = activeOrders.find(o => o.id === orderId);
  if (!order) return;

  const content = document.getElementById("receiptBodyContent");
  if (content) {
    content.innerHTML = `
      <div style="text-align: center; border-bottom: 1px stroke #E2E8F0; padding-bottom: 0.75rem; margin-bottom: 1rem;">
        <h2 style="font-family: 'Outfit', sans-serif; font-weight: 800; font-size: 1.3rem; color: #782E00;">SRUPUT & NYAM</h2>
        <p style="font-size: 0.75rem; color: #64748B;">F&B HQ - Outlet Utama</p>
        <p style="font-size: 0.72rem; color: #94A3B8;">Order ID: <strong>${order.id}</strong> • ${order.time}</p>
      </div>

      <div style="font-size: 0.82rem; margin-bottom: 1rem;">
        <p>Pelanggan: <strong>${order.customer}</strong></p>
        <p>Metode Pembayaran: <strong>${order.method} (LUNAS)</strong></p>
      </div>

      <div style="border-top: 1px dashed #CBD5E1; border-bottom: 1px dashed #CBD5E1; padding: 0.75rem 0; margin-bottom: 1rem;">
        ${order.items.map(item => `
          <div style="display: flex; justify-content: space-between; font-size: 0.82rem; margin-bottom: 0.35rem;">
            <span>${item.name}</span>
            <strong>Rp ${item.price.toLocaleString('id-ID')}</strong>
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
   6. STAFF MANAGEMENT ENGINE
   ========================================== */

function renderStaffTable() {
  const tbody = document.getElementById("staffTableBody");
  if (!tbody) return;

  tbody.innerHTML = staffList.map(stf => `
    <tr>
      <td><strong>${stf.name}</strong></td>
      <td>${stf.role}</td>
      <td>${stf.shift}</td>
      <td><span class="badge-fin-type type-pemasukan">${stf.status}</span></td>
      <td>
        <button class="btn-solid-brown-sm" style="padding: 0.3rem 0.65rem; font-size: 0.72rem; background: #DC2626;" onclick="deleteStaff('${stf.id}')">Hapus</button>
      </td>
    </tr>
  `).join("");
}

function openAddStaffModal() {
  const modal = document.getElementById("addStaffModal");
  if (modal) modal.classList.add("active");
}

function closeAddStaffModal() {
  const modal = document.getElementById("addStaffModal");
  if (modal) modal.classList.remove("active");
}

function handleSaveStaffForm(e) {
  e.preventDefault();
  const name = document.getElementById("staffFormName").value;
  const role = document.getElementById("staffFormRole").value;
  const shift = document.getElementById("staffFormShift").value;

  const newId = `stf-${Date.now()}`;
  staffList.push({ id: newId, name, role, shift, status: "Aktif" });
  
  closeAddStaffModal();
  renderStaffTable();
  showToast(`Anggota staf baru "${name}" berhasil ditambahkan!`);
}

function deleteStaff(id) {
  const stf = staffList.find(s => s.id === id);
  if (stf && confirm(`Hapus staf ${stf.name}?`)) {
    staffList = staffList.filter(s => s.id !== id);
    renderStaffTable();
    showToast(`Staf ${stf.name} berhasil dihapus.`);
  }
}

/* ==========================================
   7. STORE FRONT CATALOG RENDERER
   ========================================== */

function renderStoreFrontCatalog() {
  const grid = document.getElementById("fullCatalogGrid");
  if (!grid) return;

  grid.innerHTML = menuCatalog.map(item => `
    <div style="background: #FFF; border: 1px solid #E2E8F0; border-radius: 16px; padding: 1rem; display: flex; flex-direction: column; justify-content: space-between;">
      <img src="${item.image}" alt="${item.name}" style="width: 100%; height: 140px; object-fit: cover; border-radius: 12px; margin-bottom: 0.75rem;">
      <h4 style="font-size: 0.95rem; font-weight: 700; color: #0F172A;">${item.name}</h4>
      <p style="font-size: 0.8rem; color: #64748B; margin-bottom: 0.5rem;">${item.category}</p>
      <div style="display: flex; align-items: center; justify-content: space-between; margin-top: auto;">
        <span style="font-family: 'Outfit', sans-serif; font-size: 1.1rem; font-weight: 800; color: #782E00;">Rp ${item.price.toLocaleString('id-ID')}</span>
        <button class="btn-solid-brown-sm" onclick="showToast('Ditambahkan ke Keranjang!')">+ Pesan</button>
      </div>
    </div>
  `).join("");
}

/* ==========================================
   8. NEW REPORT MODAL & DOWNLOAD SIMULATOR
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
  const format = document.querySelector('input[name="reportFormat"]:checked').value;

  closeNewReportModal();
  showToast(`Mengunduh Laporan (${format}) untuk periode: ${period}...`);
}

function saveStoreSettings(e) {
  e.preventDefault();
  showToast("Pengaturan Outlet Sruput & Nyam berhasil disimpan!");
}

/* ==========================================
   9. GLOBAL SEARCH FUNCTION
   ========================================== */

function handleHqSearch(query) {
  if (!query || query.trim() === "") return;
  showToast(`Mencari data: "${query}"`);
}

/* ==========================================
   10. TOAST NOTIFICATION ENGINE
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
  showToast("Anda memiliki 3 notifikasi pesanan baru!");
}

function showAppGridToast() {
  showToast("Modul F&B Apps: POS, KDS, & Inventory Aktif.");
}

function showChartToast() {
  showToast("Chart Tren Penjualan Harian diperbarui secara real-time.");
}

function openHelpCenterModal() {
  showToast("Pusat Bantuan Sruput & Nyam HQ (Hubungi WhatsApp Support: 0812-9876-543)");
}
