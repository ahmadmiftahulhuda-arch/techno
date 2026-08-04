/* ==========================================================================
   SRUPUT & NYAM - F&B HQ Store Analytics & Management Engine
   Interactive chart tooltips, KPI date filtering, view tab switching,
   product progress bars recalculation, report exporter, and search filter.
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
  { id: "tahu-cabe-garam", name: "Tahu Cabe Garam", category: "Nyam Snack", price: 18000, stock: "Tersedia", sales: 64, image: "images/watermelon.png" }
];

// Initial Setup
document.addEventListener("DOMContentLoaded", () => {
  renderMenuMgmtTable();
  renderOrdersTable();
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

  // Move SVG dot & line
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
    // Map SVG cx coordinates (0 to 540) to pixel position
    const wrapper = document.getElementById("trendChartWrapper");
    if (wrapper) {
      const wrapperWidth = wrapper.offsetWidth || 500;
      const pixelX = (data.cx / 540) * wrapperWidth;
      const pixelY = (data.cy / 220) * 190 - 45;
      
      tooltip.style.left = `${pixelX}px`;
      tooltip.style.top = `${pixelY}px`;
    }
  }

  // Highlight X-axis day text
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
  if (menu) {
    menu.classList.toggle("show");
  }
}

// Close dropdown on outside click
document.addEventListener("click", (e) => {
  const dateBtn = document.getElementById("dateFilterBtn");
  const dateMenu = document.getElementById("dateFilterMenu");
  if (dateBtn && dateMenu && !dateBtn.contains(e.target) && !dateMenu.contains(e.target)) {
    dateMenu.classList.remove("show");
  }
});

function selectDateRange(rangeText, el) {
  // Update button label
  const label = document.getElementById("selectedDateLabel");
  if (label) label.textContent = rangeText;

  // Update active state in dropdown
  const items = document.querySelectorAll("#dateFilterMenu .dropdown-item");
  items.forEach(item => item.classList.remove("active"));
  if (el) el.classList.add("active");

  const menu = document.getElementById("dateFilterMenu");
  if (menu) menu.classList.remove("show");

  // Recalculate KPIs based on date filter
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
  // Update sidebar menu highlight
  const items = document.querySelectorAll(".hq-nav-item");
  items.forEach(item => {
    if (item.getAttribute("data-tab") === tabName) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });

  // Map tab name to pane ID
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

  // Close mobile sidebar if open
  const sidebar = document.getElementById("hqSidebar");
  if (sidebar) sidebar.classList.remove("mobile-open");
}

function toggleHqSidebar() {
  const sidebar = document.getElementById("hqSidebar");
  if (sidebar) sidebar.classList.toggle("mobile-open");
}

/* ==========================================
   4. STOREFRONT OVERLAY TOGGLE
   ========================================== */

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
   5. MENU MANAGEMENT TABLE RENDERER
   ========================================== */

function renderMenuMgmtTable() {
  const tbody = document.getElementById("menuMgmtTableBody");
  if (!tbody) return;

  tbody.innerHTML = menuCatalog.map(item => `
    <tr>
      <td>
        <img src="${item.image}" alt="${item.name}" style="width: 44px; height: 44px; object-fit: cover; border-radius: 8px;">
      </td>
      <td><strong>${item.name}</strong></td>
      <td>${item.category}</td>
      <td><strong>Rp ${item.price.toLocaleString('id-ID')}</strong></td>
      <td><span class="badge-fin-type type-pemasukan">${item.stock}</span></td>
      <td>
        <button class="btn-solid-brown-sm" style="padding: 0.35rem 0.75rem; font-size: 0.75rem;" onclick="editMenuItem('${item.id}')">Edit</button>
      </td>
    </tr>
  `).join("");
}

function openAddMenuModal() {
  showToast("Fitur Tambah Menu Baru siap digunakan!");
}

function editMenuItem(id) {
  const item = menuCatalog.find(m => m.id === id);
  if (item) {
    showToast(`Mengedit: ${item.name}`);
  }
}

/* ==========================================
   6. ORDERS TABLE RENDERER
   ========================================== */

function renderOrdersTable() {
  const container = document.getElementById("ordersListTableContainer");
  if (!container) return;

  const sampleOrders = [
    { id: "SN-892101", customer: "Ahmad Miftah", items: "2x Es Jeruk Ori, 1x Gourmet Salad", total: 65000, method: "QRIS", status: "Selesai" },
    { id: "SN-892102", customer: "Siti Rahma", items: "1x Mango Juice, 1x Fruit Bowl", total: 66000, method: "Cash", status: "Diproses" },
    { id: "SN-892103", customer: "Budi Santoso", items: "1x Green Detox Combo", total: 55000, method: "Bank Transfer", status: "Siap" }
  ];

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
          </tr>
        </thead>
        <tbody>
          ${sampleOrders.map(o => `
            <tr>
              <td><strong>${o.id}</strong></td>
              <td>${o.customer}</td>
              <td>${o.items}</td>
              <td><strong>Rp ${o.total.toLocaleString('id-ID')}</strong></td>
              <td>${o.method}</td>
              <td><span class="badge-fin-type type-pemasukan">${o.status}</span></td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;
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
