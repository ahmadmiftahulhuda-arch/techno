<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">
  <title>Sruput & Nyam - Analisis Penjualan & Performa Store (F&B HQ)</title>
  
  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Outfit:wght@500;600;700;800&display=swap" rel="stylesheet">
  
  <!-- FontAwesome Icons -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  
  <!-- Stylesheet -->
  <link rel="stylesheet" href="admin.css">
</head>
<body class="hq-app-body">

  <!-- ADMIN LOGIN OVERLAY GATE -->
  <div class="admin-login-overlay" id="adminLoginModal" style="display: flex;">
    <div class="admin-login-card">
      
      <div class="admin-login-header">
        <div class="brand-avatar-large">
          <span>S</span>
        </div>
        <h2 class="admin-login-title">Sruput & Nyam F&B HQ</h2>
        <p class="admin-login-subtitle">Masukan kredensial akun untuk mengakses Panel Admin</p>
      </div>

      <form id="adminLoginForm" onsubmit="handleAdminLogin(event)" class="admin-login-form">
        
        <div class="login-field-group">
          <label class="login-field-label">
            <i class="fa-solid fa-user-shield"></i> Email / Username Admin
          </label>
          <div class="login-input-wrapper">
            <i class="fa-solid fa-envelope login-input-icon"></i>
            <input type="text" id="adminLoginEmail" class="login-input-field" placeholder="Ketik email (misal: admin@sruputnyam.com)" required autocomplete="username">
          </div>
        </div>

        <div class="login-field-group">
          <label class="login-field-label">
            <i class="fa-solid fa-key"></i> Password Akses
          </label>
          <div class="login-input-wrapper">
            <i class="fa-solid fa-lock login-input-icon"></i>
            <input type="password" id="adminLoginPassword" class="login-input-field" placeholder="Ketik password (misal: admin123)" required autocomplete="current-password">
            <button type="button" class="btn-toggle-pwd" onclick="togglePasswordVisibility()" title="Tampilkan / Sembunyikan Password">
              <i class="fa-solid fa-eye" id="togglePasswordIcon"></i>
            </button>
          </div>
        </div>

        <div id="loginErrorMessage" class="login-error-alert" style="display: none;">
          <i class="fa-solid fa-circle-exclamation"></i> <span>Email atau password salah!</span>
        </div>

        <button type="submit" class="btn-login-submit">
          <span>Masuk ke Panel Admin</span>
          <i class="fa-solid fa-arrow-right"></i>
        </button>

      </form>

      <div class="admin-login-footer">
        <div class="demo-credentials-badge">
          <i class="fa-solid fa-circle-info"></i>
          <span>Akun Demo: <strong>admin@sruputnyam.com</strong> | Password: <strong>admin123</strong></span>
        </div>
        <a href="index.html" class="btn-back-to-store">
          <i class="fa-solid fa-arrow-left"></i> Kembali ke Tampilan Customer
        </a>
      </div>

    </div>
  </div>

  <!-- APP CONTAINER & SIDEBAR LAYOUT -->
  <div class="hq-app-shell" id="appShell">

    <!-- LEFT SIDEBAR NAVIGATION -->
    <aside class="hq-sidebar" id="hqSidebar">
      
      <!-- Brand Logo Section -->
      <div class="hq-brand-box">
        <div class="hq-brand-avatar">S</div>
        <div class="hq-brand-info">
          <h2 class="hq-brand-title">Sruput & Nyam</h2>
          <span class="hq-brand-subtitle">F&B HQ</span>
        </div>
      </div>

      <!-- Main Navigation Links -->
      <nav class="hq-nav-menu">
        <button class="hq-nav-item" data-tab="dashboard" onclick="switchHqTab('dashboard', this)">
          <i class="fa-solid fa-shapes"></i>
          <span>Dashboard</span>
        </button>

        <button class="hq-nav-item" data-tab="menu-mgmt" onclick="switchHqTab('menu-mgmt', this)">
          <i class="fa-solid fa-utensils"></i>
          <span>Menu Management</span>
        </button>

        <button class="hq-nav-item" data-tab="orders" onclick="switchHqTab('orders', this)">
          <i class="fa-solid fa-receipt"></i>
          <span>Orders</span>
        </button>

        <button class="hq-nav-item active" data-tab="analytics" onclick="switchHqTab('analytics', this)">
          <i class="fa-solid fa-chart-column"></i>
          <span>Analytics</span>
        </button>

        <button class="hq-nav-item" data-tab="staff" onclick="switchHqTab('staff', this)">
          <i class="fa-solid fa-users"></i>
          <span>Staff</span>
        </button>

        <button class="hq-nav-item" data-tab="settings" onclick="switchHqTab('settings', this)">
          <i class="fa-solid fa-gear"></i>
          <span>Settings</span>
        </button>
      </nav>

      <!-- Sidebar Bottom Action Section -->
      <div class="hq-sidebar-bottom">
        <button class="btn-hq-new-report" onclick="openNewReportModal()">
          <i class="fa-solid fa-plus"></i> New Report
        </button>

        <div class="hq-bottom-links">
          <button class="hq-link-item" onclick="openHelpCenterModal()">
            <i class="fa-regular fa-circle-question"></i>
            <span>Help Center</span>
          </button>

          <button class="hq-link-item" onclick="handleAdminLogout()">
            <i class="fa-solid fa-arrow-right-from-bracket"></i>
            <span>Logout</span>
          </button>
        </div>
      </div>

    </aside>

    <!-- RIGHT MAIN CONTENT WORKSPACE -->
    <div class="hq-main-wrapper">
      
      <!-- TOP HEADER BAR -->
      <header class="hq-topbar">
        
        <!-- Left: Mobile Sidebar Toggle & Search Input -->
        <div class="hq-topbar-left">
          <button class="hq-mobile-toggle" onclick="toggleHqSidebar()">
            <i class="fa-solid fa-bars"></i>
          </button>
          
          <div class="hq-search-box">
            <i class="fa-solid fa-magnifying-glass hq-search-icon"></i>
            <input type="text" class="hq-search-input" id="hqGlobalSearch" placeholder="Cari data..." oninput="handleHqSearch(this.value)">
          </div>
        </div>

        <!-- Right: Actions, Notifications, Avatar -->
        <div class="hq-topbar-right">
          
          <!-- Toggle Store View Button -->
          <button class="btn-toggle-storefront" onclick="toggleStoreFrontView()" title="Lihat Tampilan Toko / Customer">
            <i class="fa-solid fa-store"></i> <span class="hide-mobile">Toko Online</span>
          </button>

          <!-- Notification Bell -->
          <button class="hq-icon-btn" title="Notifikasi" onclick="showNotificationToast()">
            <i class="fa-regular fa-bell"></i>
            <span class="hq-badge-dot"></span>
          </button>

          <!-- Grid App Icon -->
          <button class="hq-icon-btn" title="Aplikasi F&B" onclick="showAppGridToast()">
            <i class="fa-solid fa-grip"></i>
          </button>

          <!-- Profile User Avatar -->
          <div class="hq-user-profile" title="Klik untuk Edit Profil Manajer" onclick="openEditProfileModal()">
            <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80" alt="Avatar Pengguna" class="hq-avatar-img" id="topbarAvatarImg">
          </div>

        </div>

      </header>

      <!-- MAIN CONTENT CONTAINERS -->
      <main class="hq-content-body">
        
        <!-- VIEW 1: ANALYTICS TAB (MATCHING SCREENSHOT EXACTLY) -->
        <div class="hq-tab-pane active" id="paneAnalytics">
          
          <!-- Page Title & Date Filter Header -->
          <div class="hq-page-header">
            <div class="hq-page-title-meta">
              <h1 class="hq-page-title">Analisis Penjualan & Performa Store</h1>
              <p class="hq-page-subtitle">Ringkasan tren pendapatan, metode pembayaran, dan produk paling laris</p>
            </div>

            <div class="hq-page-actions">
              <div class="hq-dropdown-date-wrapper">
                <button class="btn-dropdown-date" id="dateFilterBtn" onclick="toggleDateFilterMenu()">
                  <i class="fa-regular fa-calendar"></i>
                  <span id="selectedDateLabel">7 Hari Terakhir</span>
                  <i class="fa-solid fa-chevron-down hq-caret"></i>
                </button>

                <!-- Date Range Dropdown Menu -->
                <div class="hq-dropdown-menu" id="dateFilterMenu">
                  <div class="dropdown-item active" onclick="selectDateRange('7 Hari Terakhir', this)">7 Hari Terakhir</div>
                  <div class="dropdown-item" onclick="selectDateRange('30 Hari Terakhir', this)">30 Hari Terakhir</div>
                  <div class="dropdown-item" onclick="selectDateRange('Bulan Ini', this)">Bulan Ini</div>
                  <div class="dropdown-item" onclick="selectDateRange('Tahun Ini', this)">Tahun Ini</div>
                </div>
              </div>
            </div>
          </div>

          <!-- 4 KPI SUMMARY CARDS GRID -->
          <div class="hq-kpi-grid">
            
            <!-- KPI 1: TOTAL OMZET -->
            <div class="hq-kpi-card">
              <div class="hq-kpi-head">
                <span class="hq-kpi-label">TOTAL OMZET</span>
                <span class="hq-kpi-badge badge-green">
                  <i class="fa-solid fa-chart-line"></i> +14.2%
                </span>
              </div>
              <div class="hq-kpi-value" id="valTotalOmzet">Rp 12.850.000</div>
            </div>

            <!-- KPI 2: TOTAL TRANSAKSI -->
            <div class="hq-kpi-card">
              <div class="hq-kpi-head">
                <span class="hq-kpi-label">TOTAL TRANSAKSI</span>
                <div class="hq-kpi-icon-box box-blue">
                  <i class="fa-solid fa-receipt"></i>
                </div>
              </div>
              <div class="hq-kpi-value">
                <span id="valTotalTransaksi">342</span>
                <span class="hq-kpi-unit">Pesanan</span>
              </div>
            </div>

            <!-- KPI 3: RATA-RATA TRANSAKSI -->
            <div class="hq-kpi-card">
              <div class="hq-kpi-head">
                <span class="hq-kpi-label">RATA-RATA TRANSAKSI</span>
                <div class="hq-kpi-icon-box box-orange">
                  <i class="fa-solid fa-bag-shopping"></i>
                </div>
              </div>
              <div class="hq-kpi-value">
                <span id="valRataRata">Rp 37.500</span>
                <span class="hq-kpi-unit">/ order</span>
              </div>
            </div>

            <!-- KPI 4: PRODUK TERFAVORIT -->
            <div class="hq-kpi-card">
              <div class="hq-kpi-head">
                <span class="hq-kpi-label">PRODUK TERFAVORIT</span>
                <div class="hq-kpi-icon-box box-red">
                  <i class="fa-solid fa-wine-glass"></i>
                </div>
              </div>
              <div class="hq-kpi-value-text" id="valProdukTerfavorit">Es Jeruk Peras Ori</div>
              <span class="hq-kpi-subtext" id="valTerfavoritSub">180 pcs terjual</span>
            </div>

          </div>

          <!-- MIDDLE ROW: CHARTS GRID -->
          <div class="hq-charts-grid">
            
            <!-- LEFT CHART: TREN PENDAPATAN OMZET PENJUALAN (HARIAN) -->
            <div class="hq-chart-card hq-trend-card">
              <div class="hq-card-header">
                <h3 class="hq-card-title">TREN PENDAPATAN OMZET PENJUALAN (HARIAN)</h3>
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                  <div style="display: flex; gap: 0.35rem;">
                    <button class="btn-hq-outline" id="btnTrendOmzet" style="padding: 0.25rem 0.65rem; font-size: 0.75rem; background: var(--hq-brown-dark); color: #FFF; border-color: var(--hq-brown-dark);" onclick="switchTrendMetric('omzet', this)">Omzet (Rp)</button>
                    <button class="btn-hq-outline" id="btnTrendTrx" style="padding: 0.25rem 0.65rem; font-size: 0.75rem;" onclick="switchTrendMetric('trx', this)">Volume (Trx)</button>
                  </div>
                  <button class="hq-btn-dots" title="Opsi Chart" onclick="showChartToast()">
                    <i class="fa-solid fa-ellipsis"></i>
                  </button>
                </div>
              </div>

              <!-- Interactive SVG Smooth Line & Area Chart Container -->
              <div class="hq-chart-stage">
                
                <!-- Y-Axis Labels -->
                <div class="hq-chart-y-axis">
                  <span>3M</span>
                  <span>2M</span>
                  <span>1M</span>
                  <span>0</span>
                </div>

                <!-- SVG Canvas Container -->
                <div class="hq-chart-canvas-wrapper" id="trendChartWrapper">
                  
                  <svg class="hq-svg-chart" id="trendChartSvg" viewBox="0 0 540 220" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="brownGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stop-color="#782E00" stop-opacity="0.25" />
                        <stop offset="100%" stop-color="#782E00" stop-opacity="0.0" />
                      </linearGradient>
                    </defs>

                    <!-- Horizontal Dotted Gridlines -->
                    <line x1="0" y1="20" x2="540" y2="20" class="hq-grid-line" />
                    <line x1="0" y1="75" x2="540" y2="75" class="hq-grid-line" />
                    <line x1="0" y1="130" x2="540" y2="130" class="hq-grid-line" />
                    <line x1="0" y1="185" x2="540" y2="185" class="hq-grid-line" />

                    <!-- Area Fill Under Path -->
                    <path id="chartAreaPath" d="M 15 140 C 45 120, 60 125, 90 125 C 120 125, 140 140, 170 100 C 200 60, 220 70, 250 85 C 280 100, 300 135, 330 135 C 360 135, 380 50, 410 40 C 440 30, 480 45, 525 50 L 525 185 L 15 185 Z" fill="url(#brownGradient)" />

                    <!-- Smooth Curved Line -->
                    <path id="chartLinePath" d="M 15 140 C 45 120, 60 125, 90 125 C 120 125, 140 140, 170 100 C 200 60, 220 70, 250 85 C 280 100, 300 135, 330 135 C 360 135, 380 50, 410 40 C 440 30, 480 45, 525 50" fill="none" stroke="#782E00" stroke-width="4.5" stroke-linecap="round" />

                    <!-- Vertical Dotted Line for Active Saturday Point -->
                    <line id="activeGuideLine" x1="410" y1="40" x2="410" y2="185" stroke="#782E00" stroke-width="1.5" stroke-dasharray="3,3" opacity="0.6" />

                    <!-- Data Point Circle -->
                    <circle id="activeChartDot" cx="410" cy="40" r="5" fill="#FFFFFF" stroke="#782E00" stroke-width="3.5" />
                  </svg>

                  <!-- FLOATING TOOLTIP BOX MATCHING SCREENSHOT EXACTLY -->
                  <div class="hq-chart-tooltip" id="chartTooltip" style="left: 360px; top: -10px;">
                    <span class="tooltip-label">Rp</span>
                    <span class="tooltip-val" id="tooltipValText">2.450.000</span>
                  </div>

                </div>

              </div>

              <!-- X-Axis Days Labels -->
              <div class="hq-chart-x-axis" id="xAxisLabels">
                <span onclick="setChartActiveDay(0)">Sen</span>
                <span onclick="setChartActiveDay(1)">Sel</span>
                <span onclick="setChartActiveDay(2)">Rab</span>
                <span onclick="setChartActiveDay(3)">Kam</span>
                <span onclick="setChartActiveDay(4)">Jum</span>
                <span class="active-day" onclick="setChartActiveDay(5)">Sab</span>
                <span onclick="setChartActiveDay(6)">Min</span>
              </div>

            </div>

            <!-- RIGHT CHART: METODE PEMBAYARAN -->
            <div class="hq-chart-card hq-donut-card">
              <div class="hq-card-header">
                <h3 class="hq-card-title">METODE PEMBAYARAN</h3>
              </div>

              <!-- Donut Container -->
              <div class="hq-donut-wrapper">
                <svg class="hq-donut-svg" viewBox="0 0 180 180">
                  <!-- Donut Base Background Track -->
                  <circle cx="90" cy="90" r="70" fill="none" stroke="#F1F5F9" stroke-width="20" />

                  <!-- Segment 1: QRIS (Orange - 65%) -->
                  <circle cx="90" cy="90" r="70" fill="none" stroke="#FF7000" stroke-width="20"
                          stroke-dasharray="285.88 153.94" stroke-dashoffset="0" transform="rotate(-90 90 90)" />

                  <!-- Segment 2: Cash (Dark Brown - 25%) -->
                  <circle cx="90" cy="90" r="70" fill="none" stroke="#782E00" stroke-width="20"
                          stroke-dasharray="109.95 329.87" stroke-dashoffset="-285.88" transform="rotate(-90 90 90)" />

                  <!-- Segment 3: Bank Transfer (Royal Blue - 10%) -->
                  <circle cx="90" cy="90" r="70" fill="none" stroke="#1D4ED8" stroke-width="20"
                          stroke-dasharray="43.98 395.84" stroke-dashoffset="-395.83" transform="rotate(-90 90 90)" />
                </svg>

                <!-- Center Text Overlay -->
                <div class="hq-donut-center">
                  <span class="hq-donut-big-val" id="donutTotalVal">342</span>
                  <span class="hq-donut-sub-label">Total Trx</span>
                </div>
              </div>

              <!-- Legend Breakdown List -->
              <div class="hq-legend-list">
                <div class="hq-legend-item">
                  <div class="hq-legend-left">
                    <span class="legend-dot dot-orange"></span>
                    <span class="legend-name">QRIS</span>
                  </div>
                  <span class="legend-percent" id="pctQris">65%</span>
                </div>

                <div class="hq-legend-item">
                  <div class="hq-legend-left">
                    <span class="legend-dot dot-brown"></span>
                    <span class="legend-name">Cash</span>
                  </div>
                  <span class="legend-percent" id="pctCash">25%</span>
                </div>

                <div class="hq-legend-item">
                  <div class="hq-legend-left">
                    <span class="legend-dot dot-blue"></span>
                    <span class="legend-name">Bank Transfer</span>
                  </div>
                  <span class="legend-percent" id="pctBank">10%</span>
                </div>
              </div>

            </div>

          </div>

          <!-- BOTTOM ROW: TOP 5 PRODUK TERLARIS -->
          <div class="hq-top-products-card">
            <div class="hq-card-header">
              <h3 class="hq-card-title">TOP 5 PRODUK TERLARIS</h3>
              <a href="#menu-mgmt" class="hq-link-orange" onclick="switchHqTab('menu-mgmt', null); return false;">Lihat Semua</a>
            </div>

            <!-- Progress Bar List -->
            <div class="hq-products-progress-list">
              
              <!-- Item 1: Es Jeruk Peras Original -->
              <div class="hq-product-bar-row">
                <div class="hq-product-bar-meta">
                  <span class="hq-product-name">1. Es Jeruk Peras Original</span>
                  <span class="hq-product-count" id="countProd1">180 pcs</span>
                </div>
                <div class="hq-bar-track">
                  <div class="hq-bar-fill bar-fill-1" id="barProd1" style="width: 100%;"></div>
                </div>
              </div>

              <!-- Item 2: Gourmet Salad Bowl -->
              <div class="hq-product-bar-row">
                <div class="hq-product-bar-meta">
                  <span class="hq-product-name">2. Gourmet Salad Bowl</span>
                  <span class="hq-product-count" id="countProd2">145 pcs</span>
                </div>
                <div class="hq-bar-track">
                  <div class="hq-bar-fill bar-fill-2" id="barProd2" style="width: 80.5%;"></div>
                </div>
              </div>

              <!-- Item 3: Paket Combo Ayam -->
              <div class="hq-product-bar-row">
                <div class="hq-product-bar-meta">
                  <span class="hq-product-name">3. Paket Combo Ayam</span>
                  <span class="hq-product-count" id="countProd3">112 pcs</span>
                </div>
                <div class="hq-bar-track">
                  <div class="hq-bar-fill bar-fill-3" id="barProd3" style="width: 62.2%;"></div>
                </div>
              </div>

              <!-- Item 4: Es Kopi Susu Aren -->
              <div class="hq-product-bar-row">
                <div class="hq-product-bar-meta">
                  <span class="hq-product-name">4. Es Kopi Susu Aren</span>
                  <span class="hq-product-count" id="countProd4">89 pcs</span>
                </div>
                <div class="hq-bar-track">
                  <div class="hq-bar-fill bar-fill-4" id="barProd4" style="width: 49.4%;"></div>
                </div>
              </div>

              <!-- Item 5: Tahu Cabe Garam -->
              <div class="hq-product-bar-row">
                <div class="hq-product-bar-meta">
                  <span class="hq-product-name">5. Tahu Cabe Garam</span>
                  <span class="hq-product-count" id="countProd5">64 pcs</span>
                </div>
                <div class="hq-bar-track">
                  <div class="hq-bar-fill bar-fill-5" id="barProd5" style="width: 35.5%;"></div>
                </div>
              </div>

            </div>

          </div>

          <!-- NEW ANALYTICS SECTION: JAM SIBUK OUTLET & OPERATIONAL HIGHLIGHTS -->
          <div class="hq-analytics-secondary-grid" style="display: grid; grid-template-columns: 1.4fr 1fr; gap: 1.15rem; margin-top: 1.5rem;">
            
            <!-- Hourly Traffic Heatmap Card -->
            <div class="hq-chart-card">
              <div class="hq-card-header">
                <div>
                  <h3 class="hq-card-title"><i class="fa-solid fa-clock-rotate-left" style="color: var(--hq-orange-bright);"></i> JAM SIBUK OUTLET (HOURLY TRAFFIC)</h3>
                  <p class="hq-page-subtitle" style="font-size: 0.78rem; margin-top: 0.2rem;">Distribusi volume pesanan berdasarkan jam operasional toko</p>
                </div>
                <span class="badge-tag-sm" style="background: #FEF3C7; color: #B45309;"><i class="fa-solid fa-fire"></i> Peak Rush: 12.00 & 19.00</span>
              </div>

              <!-- Hourly Traffic Bars -->
              <div class="hourly-bars-container" style="display: flex; align-items: flex-end; justify-content: space-between; height: 160px; padding-top: 1.5rem; gap: 0.5rem;">
                <div class="hourly-bar-col" style="flex: 1; display: flex; flex-direction: column; align-items: center; gap: 0.35rem;">
                  <span style="font-size: 0.7rem; font-weight: 700; color: #64748B;">12 trx</span>
                  <div style="width: 100%; height: 35px; background: #E2E8F0; border-radius: 6px 6px 0 0;" title="09:00 - 11:00 (12 Pesanan)"></div>
                  <span style="font-size: 0.72rem; color: #94A3B8; font-weight: 600;">09.00</span>
                </div>

                <div class="hourly-bar-col" style="flex: 1; display: flex; flex-direction: column; align-items: center; gap: 0.35rem;">
                  <span style="font-size: 0.7rem; font-weight: 800; color: var(--hq-brown-medium);">58 trx</span>
                  <div style="width: 100%; height: 110px; background: linear-gradient(180deg, var(--hq-orange-bright), var(--hq-brown-medium)); border-radius: 6px 6px 0 0; box-shadow: 0 4px 10px rgba(255,112,0,0.3);" title="11:00 - 13:00 (58 Pesanan - Makan Siang)"></div>
                  <span style="font-size: 0.72rem; color: var(--hq-brown-medium); font-weight: 800;">12.00</span>
                </div>

                <div class="hourly-bar-col" style="flex: 1; display: flex; flex-direction: column; align-items: center; gap: 0.35rem;">
                  <span style="font-size: 0.7rem; font-weight: 700; color: #64748B;">24 trx</span>
                  <div style="width: 100%; height: 55px; background: #CBD5E1; border-radius: 6px 6px 0 0;" title="13:00 - 15:00 (24 Pesanan)"></div>
                  <span style="font-size: 0.72rem; color: #94A3B8; font-weight: 600;">14.00</span>
                </div>

                <div class="hourly-bar-col" style="flex: 1; display: flex; flex-direction: column; align-items: center; gap: 0.35rem;">
                  <span style="font-size: 0.7rem; font-weight: 700; color: #64748B;">36 trx</span>
                  <div style="width: 100%; height: 75px; background: #94A3B8; border-radius: 6px 6px 0 0;" title="15:00 - 17:00 (36 Pesanan)"></div>
                  <span style="font-size: 0.72rem; color: #94A3B8; font-weight: 600;">16.00</span>
                </div>

                <div class="hourly-bar-col" style="flex: 1; display: flex; flex-direction: column; align-items: center; gap: 0.35rem;">
                  <span style="font-size: 0.7rem; font-weight: 800; color: var(--hq-brown-medium);">64 trx</span>
                  <div style="width: 100%; height: 125px; background: linear-gradient(180deg, var(--hq-orange-bright), var(--hq-brown-medium)); border-radius: 6px 6px 0 0; box-shadow: 0 4px 10px rgba(255,112,0,0.3);" title="17:00 - 19:00 (64 Pesanan - Makan Malam)"></div>
                  <span style="font-size: 0.72rem; color: var(--hq-brown-medium); font-weight: 800;">19.00</span>
                </div>

                <div class="hourly-bar-col" style="flex: 1; display: flex; flex-direction: column; align-items: center; gap: 0.35rem;">
                  <span style="font-size: 0.7rem; font-weight: 700; color: #64748B;">18 trx</span>
                  <div style="width: 100%; height: 42px; background: #E2E8F0; border-radius: 6px 6px 0 0;" title="19:00 - 21:00 (18 Pesanan)"></div>
                  <span style="font-size: 0.72rem; color: #94A3B8; font-weight: 600;">21.00</span>
                </div>
              </div>
            </div>

            <!-- Operational Metrics Summary Card -->
            <div class="hq-chart-card">
              <div class="hq-card-header">
                <h3 class="hq-card-title"><i class="fa-solid fa-sliders" style="color: #1D4ED8;"></i> METRIK OPERASIONAL</h3>
              </div>

              <div style="display: flex; flex-direction: column; gap: 1rem; margin-top: 0.5rem;">
                <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.75rem 1rem; background: #F8FAFC; border-radius: 12px; border: 1px solid #E2E8F0;">
                  <div>
                    <span style="font-size: 0.78rem; color: #64748B; font-weight: 600; display: block;">Rata-rata Waktu Dapur</span>
                    <strong style="font-size: 1.1rem; color: #0F172A; font-family: 'Outfit', sans-serif;">6.4 Menit</strong>
                  </div>
                  <span class="badge-status success"><i class="fa-solid fa-bolt"></i> Sangat Cepat</span>
                </div>

                <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.75rem 1rem; background: #F8FAFC; border-radius: 12px; border: 1px solid #E2E8F0;">
                  <div>
                    <span style="font-size: 0.78rem; color: #64748B; font-weight: 600; display: block;">Akurasi Pesanan</span>
                    <strong style="font-size: 1.1rem; color: #0F172A; font-family: 'Outfit', sans-serif;">99.5%</strong>
                  </div>
                  <span class="badge-status success"><i class="fa-solid fa-check-double"></i> Optimal</span>
                </div>

                <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.75rem 1rem; background: #F8FAFC; border-radius: 12px; border: 1px solid #E2E8F0;">
                  <div>
                    <span style="font-size: 0.78rem; color: #64748B; font-weight: 600; display: block;">Kanal Aplikasi Web</span>
                    <strong style="font-size: 1.1rem; color: var(--hq-brown-medium); font-family: 'Outfit', sans-serif;">62% Online</strong>
                  </div>
                  <span class="badge-status info">38% POS Kasir</span>
                </div>
              </div>
            </div>

          </div>

        </div>

        <!-- VIEW 2: DASHBOARD OVERVIEW TAB -->
        <div class="hq-tab-pane" id="paneDashboard">
          <div class="hq-page-header">
            <div>
              <h1 class="hq-page-title">Ringkasan Operational Dashboard</h1>
              <p class="hq-page-subtitle">Status real-time kitchen display system (KDS) & omzet hari ini</p>
            </div>
            <button class="btn-solid-brown-sm" onclick="showToast('Memperbarui data antrean dapur...')"><i class="fa-solid fa-rotate"></i> Refresh KDS</button>
          </div>

          <div class="hq-kpi-grid">
            <div class="hq-kpi-card">
              <div class="hq-kpi-head"><span class="hq-kpi-label">PESANAN AKTIF</span><div class="hq-kpi-icon-box box-orange"><i class="fa-solid fa-fire-burner"></i></div></div>
              <div class="hq-kpi-value" id="kpiActiveOrders">0 <span class="hq-kpi-unit">Di Dapur</span></div>
            </div>

            <div class="hq-kpi-card">
              <div class="hq-kpi-head"><span class="hq-kpi-label">PESANAN SELESAI HARI INI</span><div class="hq-kpi-icon-box box-blue"><i class="fa-solid fa-circle-check"></i></div></div>
              <div class="hq-kpi-value" id="kpiCompletedOrders">0 <span class="hq-kpi-unit">Pesanan</span></div>
            </div>

            <div class="hq-kpi-card">
              <div class="hq-kpi-head"><span class="hq-kpi-label">ESTIMASI OMZET HARI INI</span><div class="hq-kpi-icon-box box-green"><i class="fa-solid fa-wallet"></i></div></div>
              <div class="hq-kpi-value" id="kpiTodayOmzet">Rp 0</div>
            </div>

            <div class="hq-kpi-card">
              <div class="hq-kpi-head"><span class="hq-kpi-label">STAF BERTUGAS</span><div class="hq-kpi-icon-box box-red"><i class="fa-solid fa-user-gear"></i></div></div>
              <div class="hq-kpi-value" id="kpiActiveStaff">0 <span class="hq-kpi-unit">Personil</span></div>
            </div>
          </div>

          <!-- Real-time Kitchen Orders Grid -->
          <div class="hq-top-products-card" style="margin-top: 1.5rem;">
            <div class="hq-card-header">
              <h3 class="hq-card-title">ANTREAN DAPUR REAL-TIME (KDS)</h3>
              <span class="hq-kpi-badge badge-green"><i class="fa-solid fa-circle"></i> Live Sync</span>
            </div>
            <div class="kds-grid" id="kdsOrdersContainer">
              <!-- Rendered via JS -->
            </div>
          </div>
        </div>

        <!-- VIEW 3: MENU MANAGEMENT TAB -->
        <div class="hq-tab-pane" id="paneMenuMgmt">
          
          <!-- Page Header -->
          <div class="hq-page-header">
            <div>
              <h1 class="hq-page-title">Manajemen Menu & Stok</h1>
              <p class="hq-page-subtitle">Kelola katalog produk, penetapan harga, foto, dan status ketersediaan stok</p>
            </div>
            <button class="btn-hq-primary" onclick="openAddMenuModal()"><i class="fa-solid fa-plus"></i> Tambah Menu Baru</button>
          </div>

          <!-- Menu Summary KPI Stats -->
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-bottom: 1.25rem;">
            <div style="background: #FFF; border: 1px solid var(--hq-border); border-radius: 14px; padding: 0.9rem 1.15rem; display: flex; align-items: center; justify-content: space-between;">
              <div>
                <span style="font-size: 0.75rem; font-weight: 700; color: var(--hq-text-muted); text-transform: uppercase;">TOTAL KATALOG MENU</span>
                <div style="font-family: 'Outfit', sans-serif; font-size: 1.35rem; font-weight: 800; color: var(--hq-text-title);" id="menuStatTotal">7 Item</div>
              </div>
              <div style="width: 38px; height: 38px; border-radius: 10px; background: #EFF6FF; color: #2563EB; display: flex; align-items: center; justify-content: center; font-size: 1rem;">
                <i class="fa-solid fa-utensils"></i>
              </div>
            </div>

            <div style="background: #FFF; border: 1px solid var(--hq-border); border-radius: 14px; padding: 0.9rem 1.15rem; display: flex; align-items: center; justify-content: space-between;">
              <div>
                <span style="font-size: 0.75rem; font-weight: 700; color: var(--hq-text-muted); text-transform: uppercase;">MENU TERSEDIA</span>
                <div style="font-family: 'Outfit', sans-serif; font-size: 1.35rem; font-weight: 800; color: #16A34A;" id="menuStatAvailable">6 Item</div>
              </div>
              <div style="width: 38px; height: 38px; border-radius: 10px; background: #DCFCE7; color: #16A34A; display: flex; align-items: center; justify-content: center; font-size: 1rem;">
                <i class="fa-solid fa-circle-check"></i>
              </div>
            </div>

            <div style="background: #FFF; border: 1px solid var(--hq-border); border-radius: 14px; padding: 0.9rem 1.15rem; display: flex; align-items: center; justify-content: space-between;">
              <div>
                <span style="font-size: 0.75rem; font-weight: 700; color: var(--hq-text-muted); text-transform: uppercase;">STOK HABIS</span>
                <div style="font-family: 'Outfit', sans-serif; font-size: 1.35rem; font-weight: 800; color: #DC2626;" id="menuStatOutOfStock">1 Item</div>
              </div>
              <div style="width: 38px; height: 38px; border-radius: 10px; background: #FEF2F2; color: #DC2626; display: flex; align-items: center; justify-content: center; font-size: 1rem;">
                <i class="fa-solid fa-triangle-exclamation"></i>
              </div>
            </div>
          </div>

          <!-- Controls Bar: Search, Category Filter, and View Mode Switcher -->
          <div class="hq-card-box mb-3" style="padding: 1rem 1.25rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
              
              <!-- Search & Category Filter -->
              <div style="display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap; flex: 1;">
                <div class="hq-search-box" style="min-width: 220px;">
                  <i class="fa-solid fa-magnifying-glass hq-search-icon"></i>
                  <input type="text" class="hq-search-input" id="menuSearchInput" placeholder="Cari nama menu..." oninput="handleMenuSearchFilter(this.value)">
                </div>

                <div class="pill-group">
                  <button class="hq-pill active" onclick="filterMenuCategory('all', this)">Semua</button>
                  <button class="hq-pill" onclick="filterMenuCategory('Sruput Juice', this)">Sruput Juice</button>
                  <button class="hq-pill" onclick="filterMenuCategory('Nyam Salad', this)">Nyam Salad</button>
                  <button class="hq-pill" onclick="filterMenuCategory('Paket Combo', this)">Paket Combo</button>
                </div>
              </div>

              <!-- View Mode Toggle Buttons -->
              <div style="display: flex; gap: 0.35rem;">
                <button class="btn-hq-outline" id="btnMenuViewGrid" style="padding: 0.4rem 0.85rem; font-size: 0.8rem; background: var(--hq-brown-dark); color: #FFF; border-color: var(--hq-brown-dark);" onclick="switchMenuViewMode('grid', this)">
                  <i class="fa-solid fa-grip"></i> Grid
                </button>
                <button class="btn-hq-outline" id="btnMenuViewTable" style="padding: 0.4rem 0.85rem; font-size: 0.8rem;" onclick="switchMenuViewMode('table', this)">
                  <i class="fa-solid fa-list"></i> Tabel
                </button>
              </div>

            </div>
          </div>

          <!-- Grid Cards View Container -->
          <div id="menuMgmtGridContainer" class="kds-cards-grid" style="margin-bottom: 1.5rem;">
            <!-- Rendered via JS -->
          </div>

          <!-- Table View Container (Hidden by default or toggled) -->
          <div id="menuMgmtTableContainer" class="hq-table-card" style="display: none;">
            <table class="hq-data-table">
              <thead>
                <tr>
                  <th>Gambar</th>
                  <th>Nama Menu</th>
                  <th>Kategori</th>
                  <th>Harga</th>
                  <th>Status Stok</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody id="menuMgmtTableBody">
                <!-- Rendered via JS -->
              </tbody>
            </table>
          </div>

        </div>

        <!-- VIEW 4: ORDERS TAB -->
        <div class="hq-tab-pane" id="paneOrders">
          
          <!-- Page Header -->
          <div class="hq-page-header">
            <div>
              <h1 class="hq-page-title">Manajemen Transaksi & Orders</h1>
              <p class="hq-page-subtitle">Daftar transaksi masuk, pemrosesan dapur, cetak struk thermal, dan status pembayaran</p>
            </div>
            <button class="btn-hq-outline" onclick="renderOrdersTable(); showToast('Memperbarui daftar transaksi pesanan...');">
              <i class="fa-solid fa-rotate"></i> Refresh Orders
            </button>
          </div>

          <!-- Orders KPI Summary Cards -->
          <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; margin-bottom: 1.25rem;">
            <div style="background: #FFF; border: 1px solid var(--hq-border); border-radius: 14px; padding: 0.9rem 1.15rem; display: flex; align-items: center; justify-content: space-between;">
              <div>
                <span style="font-size: 0.72rem; font-weight: 700; color: var(--hq-text-muted); text-transform: uppercase;">TOTAL TRANSAKSI</span>
                <div style="font-family: 'Outfit', sans-serif; font-size: 1.35rem; font-weight: 800; color: var(--hq-text-title);" id="orderStatTotal">0</div>
              </div>
              <div style="width: 36px; height: 36px; border-radius: 10px; background: #EFF6FF; color: #2563EB; display: flex; align-items: center; justify-content: center; font-size: 0.95rem;">
                <i class="fa-solid fa-receipt"></i>
              </div>
            </div>

            <div style="background: #FFF; border: 1px solid var(--hq-border); border-radius: 14px; padding: 0.9rem 1.15rem; display: flex; align-items: center; justify-content: space-between;">
              <div>
                <span style="font-size: 0.72rem; font-weight: 700; color: var(--hq-text-muted); text-transform: uppercase;">DIPROSES DAPUR</span>
                <div style="font-family: 'Outfit', sans-serif; font-size: 1.35rem; font-weight: 800; color: #B45309;" id="orderStatProcessing">0</div>
              </div>
              <div style="width: 36px; height: 36px; border-radius: 10px; background: #FEF3C7; color: #B45309; display: flex; align-items: center; justify-content: center; font-size: 0.95rem;">
                <i class="fa-solid fa-fire-burner"></i>
              </div>
            </div>

            <div style="background: #FFF; border: 1px solid var(--hq-border); border-radius: 14px; padding: 0.9rem 1.15rem; display: flex; align-items: center; justify-content: space-between;">
              <div>
                <span style="font-size: 0.72rem; font-weight: 700; color: var(--hq-text-muted); text-transform: uppercase;">SIAP DISAJIKAN</span>
                <div style="font-family: 'Outfit', sans-serif; font-size: 1.35rem; font-weight: 800; color: #1D4ED8;" id="orderStatReady">0</div>
              </div>
              <div style="width: 36px; height: 36px; border-radius: 10px; background: #DBEAFE; color: #1D4ED8; display: flex; align-items: center; justify-content: center; font-size: 0.95rem;">
                <i class="fa-solid fa-bell-concierge"></i>
              </div>
            </div>

            <div style="background: #FFF; border: 1px solid var(--hq-border); border-radius: 14px; padding: 0.9rem 1.15rem; display: flex; align-items: center; justify-content: space-between;">
              <div>
                <span style="font-size: 0.72rem; font-weight: 700; color: var(--hq-text-muted); text-transform: uppercase;">TRANSAKSI SELESAI</span>
                <div style="font-family: 'Outfit', sans-serif; font-size: 1.35rem; font-weight: 800; color: #15803D;" id="orderStatCompleted">0</div>
              </div>
              <div style="width: 36px; height: 36px; border-radius: 10px; background: #DCFCE7; color: #15803D; display: flex; align-items: center; justify-content: center; font-size: 0.95rem;">
                <i class="fa-solid fa-circle-check"></i>
              </div>
            </div>
          </div>

          <!-- Controls Bar: Search & Status Filters -->
          <div class="hq-card-box mb-3" style="padding: 1rem 1.25rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
              
              <!-- Search Box -->
              <div class="hq-search-box" style="min-width: 260px;">
                <i class="fa-solid fa-magnifying-glass hq-search-icon"></i>
                <input type="text" class="hq-search-input" id="orderSearchInput" placeholder="Cari ID / Pelanggan..." oninput="handleOrderSearchFilter(this.value)">
              </div>

              <!-- Status Filter Pills -->
              <div class="pill-group">
                <button class="hq-pill active" onclick="filterOrderStatus('all', this)">Semua Transaksi</button>
                <button class="hq-pill" onclick="filterOrderStatus('Diproses', this)">Diproses Dapur</button>
                <button class="hq-pill" onclick="filterOrderStatus('Siap', this)">Siap Disajikan</button>
                <button class="hq-pill" onclick="filterOrderStatus('Selesai', this)">Selesai</button>
              </div>

            </div>
          </div>

          <!-- Table Container -->
          <div id="ordersListTableContainer" class="hq-table-card">
            <!-- Rendered via JS -->
          </div>

        </div>

        <!-- VIEW 5: STAFF TAB -->
        <div class="hq-tab-pane" id="paneStaff">
          
          <!-- Page Header -->
          <div class="hq-page-header">
            <div>
              <h1 class="hq-page-title">Tim & Staf Restoran</h1>
              <p class="hq-page-subtitle">Kelola anggota tim, peran pengguna (Manager/Barista/Chef/Kasir), shift kerja, dan status jadwal</p>
            </div>
            <button class="btn-hq-primary" onclick="openAddStaffModal()"><i class="fa-solid fa-user-plus"></i> Tambah Staf Baru</button>
          </div>

          <!-- Staff KPI Summary Bar -->
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-bottom: 1.25rem;">
            <div style="background: #FFF; border: 1px solid var(--hq-border); border-radius: 14px; padding: 0.9rem 1.15rem; display: flex; align-items: center; justify-content: space-between;">
              <div>
                <span style="font-size: 0.72rem; font-weight: 700; color: var(--hq-text-muted); text-transform: uppercase;">TOTAL STAF TERDAFTAR</span>
                <div style="font-family: 'Outfit', sans-serif; font-size: 1.35rem; font-weight: 800; color: var(--hq-text-title);" id="staffStatTotal">0 Personil</div>
              </div>
              <div style="width: 38px; height: 38px; border-radius: 10px; background: #EFF6FF; color: #2563EB; display: flex; align-items: center; justify-content: center; font-size: 1rem;">
                <i class="fa-solid fa-users"></i>
              </div>
            </div>

            <div style="background: #FFF; border: 1px solid var(--hq-border); border-radius: 14px; padding: 0.9rem 1.15rem; display: flex; align-items: center; justify-content: space-between;">
              <div>
                <span style="font-size: 0.72rem; font-weight: 700; color: var(--hq-text-muted); text-transform: uppercase;">STAF SHIFT AKTIF</span>
                <div style="font-family: 'Outfit', sans-serif; font-size: 1.35rem; font-weight: 800; color: #16A34A;" id="staffStatActive">0 Personil</div>
              </div>
              <div style="width: 38px; height: 38px; border-radius: 10px; background: #DCFCE7; color: #16A34A; display: flex; align-items: center; justify-content: center; font-size: 1rem;">
                <i class="fa-solid fa-user-check"></i>
              </div>
            </div>

            <div style="background: #FFF; border: 1px solid var(--hq-border); border-radius: 14px; padding: 0.9rem 1.15rem; display: flex; align-items: center; justify-content: space-between;">
              <div>
                <span style="font-size: 0.72rem; font-weight: 700; color: var(--hq-text-muted); text-transform: uppercase;">STAF CUTI / OFF</span>
                <div style="font-family: 'Outfit', sans-serif; font-size: 1.35rem; font-weight: 800; color: #B45309;" id="staffStatOff">0 Personil</div>
              </div>
              <div style="width: 38px; height: 38px; border-radius: 10px; background: #FEF3C7; color: #B45309; display: flex; align-items: center; justify-content: center; font-size: 1rem;">
                <i class="fa-solid fa-user-clock"></i>
              </div>
            </div>
          </div>

          <!-- Controls Bar: Search, Role Filter, and View Mode Switcher -->
          <div class="hq-card-box mb-3" style="padding: 1rem 1.25rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
              
              <!-- Search Box & Role Pills -->
              <div style="display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap; flex: 1;">
                <div class="hq-search-box" style="min-width: 220px;">
                  <i class="fa-solid fa-magnifying-glass hq-search-icon"></i>
                  <input type="text" class="hq-search-input" id="staffSearchInput" placeholder="Cari nama / peran..." oninput="handleStaffSearchFilter(this.value)">
                </div>

                <div class="pill-group">
                  <button class="hq-pill active" onclick="filterStaffRole('all', this)">Semua Staf</button>
                  <button class="hq-pill" onclick="filterStaffRole('Store Manager', this)">Manager</button>
                  <button class="hq-pill" onclick="filterStaffRole('Head Barista', this)">Barista</button>
                  <button class="hq-pill" onclick="filterStaffRole('Head Chef', this)">Chef</button>
                  <button class="hq-pill" onclick="filterStaffRole('Kasir Senior', this)">Kasir</button>
                </div>
              </div>

              <!-- View Mode Toggle Buttons -->
              <div style="display: flex; gap: 0.35rem;">
                <button class="btn-hq-outline" id="btnStaffViewGrid" style="padding: 0.4rem 0.85rem; font-size: 0.8rem; background: var(--hq-brown-dark); color: #FFF; border-color: var(--hq-brown-dark);" onclick="switchStaffViewMode('grid', this)">
                  <i class="fa-solid fa-address-card"></i> Card
                </button>
                <button class="btn-hq-outline" id="btnStaffViewTable" style="padding: 0.4rem 0.85rem; font-size: 0.8rem;" onclick="switchStaffViewMode('table', this)">
                  <i class="fa-solid fa-list"></i> Tabel
                </button>
              </div>

            </div>
          </div>

          <!-- Grid Cards View Container -->
          <div id="staffGridContainer" class="kds-cards-grid" style="margin-bottom: 1.5rem;">
            <!-- Rendered via JS -->
          </div>

          <!-- Table View Container -->
          <div id="staffTableContainer" class="hq-table-card" style="display: none;">
            <table class="hq-data-table">
              <thead>
                <tr>
                  <th>Anggota Staf</th>
                  <th>Peran / Jabatan</th>
                  <th>Shift Kerja</th>
                  <th>Status Hadir</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody id="staffTableBody">
                <!-- Rendered via JS -->
              </tbody>
            </table>
          </div>

        </div>

        <!-- VIEW 6: SETTINGS TAB -->
        <div class="hq-tab-pane" id="paneSettings">
          
          <!-- Page Header -->
          <div class="hq-page-header">
            <div>
              <h1 class="hq-page-title">Pengaturan Outlet & Restoran</h1>
              <p class="hq-page-subtitle">Konfigurasi informasi restoran, merchant QRIS, pajak PPN, dan printer thermal struk</p>
            </div>
            <button class="btn-hq-primary" onclick="saveStoreSettings(event)">
              <i class="fa-solid fa-floppy-disk"></i> Simpan Semua Pengaturan
            </button>
          </div>

          <div class="hq-settings-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem;">
            
            <!-- Store Profile Settings Card -->
            <div class="hq-card-box">
              <h3 class="card-box-title"><i class="fa-solid fa-store"></i> Profil Restoran & Outlet</h3>
              <form onsubmit="saveStoreSettings(event)">
                
                <div class="form-group-clean">
                  <label class="input-label-sm">Nama Restoran / Outlet</label>
                  <input type="text" class="input-clean-box" id="settingStoreName" placeholder="Contoh: Sruput & Nyam (F&B HQ)" value="Sruput & Nyam (F&B HQ)">
                </div>

                <div class="form-group-clean">
                  <label class="input-label-sm">Alamat Lengkap Store</label>
                  <input type="text" class="input-clean-box" id="settingStoreAddress" placeholder="Contoh: Jl. Boulevard Kuliner No. 88, Jakarta" value="Jl. Boulevard Kuliner No. 88, Jakarta Selatan">
                </div>

                <div class="form-group-clean">
                  <label class="input-label-sm">Nomor Telepon / WhatsApp CS</label>
                  <input type="text" class="input-clean-box" id="settingStorePhone" placeholder="Contoh: 0812-9876-543" value="0812-9876-543">
                </div>

                <button type="submit" class="btn-hq-primary" style="margin-top: 0.5rem;">
                  <i class="fa-solid fa-check"></i> Simpan Profil Outlet
                </button>
              </form>
            </div>

            <!-- Payment & Receipt Printer Settings Card -->
            <div class="hq-card-box">
              <h3 class="card-box-title"><i class="fa-solid fa-credit-card"></i> Pembayaran QRIS & Thermal Printer</h3>
              <form onsubmit="saveStoreSettings(event)">
                
                <div class="form-group-clean">
                  <label class="input-label-sm">ID Merchant DANA / QRIS Pembayaran</label>
                  <input type="text" class="input-clean-box" id="settingQrisId" placeholder="Contoh: DANA-MERCHANT-SN892" value="DANA-MERCHANT-SN892">
                </div>

                <div class="form-group-clean">
                  <label class="input-label-sm">Tarif Pajak PPN & Service Charge</label>
                  <input type="text" class="input-clean-box" id="settingTax" placeholder="Contoh: 10% PPN + 5% Service Charge" value="10% PPN + 5% Service Charge">
                </div>

                <div class="form-group-clean">
                  <label class="input-label-sm">Printer Thermal Struk</label>
                  <select class="input-clean-box" id="settingPrinter">
                    <option value="epson">Epson TM-T82 Thermal (USB/LAN)</option>
                    <option value="star">Star Micronics TSP100 (Bluetooth)</option>
                    <option value="sunmi">Sunmi POS Built-in Thermal Printer</option>
                  </select>
                </div>

                <button type="submit" class="btn-hq-primary" style="margin-top: 0.5rem;">
                  <i class="fa-solid fa-check"></i> Simpan Konfigurasi
                </button>
              </form>
            </div>

            <!-- Operational System Info Card -->
            <div class="hq-card-box" style="grid-column: 1 / -1;">
              <h3 class="card-box-title"><i class="fa-solid fa-server"></i> Status Sistem & Database Integration</h3>
              <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem;">
                
                <div style="padding: 1rem; background: #F8FAFC; border-radius: 12px; border: 1px solid #E2E8F0;">
                  <span style="font-size: 0.75rem; font-weight: 700; color: #64748B; display: block; text-transform: uppercase;">MODE SYNC DATABASE</span>
                  <strong style="font-size: 1rem; color: #16A34A; font-family: 'Outfit', sans-serif; display: flex; align-items: center; gap: 0.35rem; margin-top: 0.25rem;">
                    <i class="fa-solid fa-circle-check"></i> Real-time LocalStorage
                  </strong>
                </div>

                <div style="padding: 1rem; background: #F8FAFC; border-radius: 12px; border: 1px solid #E2E8F0;">
                  <span style="font-size: 0.75rem; font-weight: 700; color: #64748B; display: block; text-transform: uppercase;">VERSI POS ENGINE</span>
                  <strong style="font-size: 1rem; color: #0F172A; font-family: 'Outfit', sans-serif; display: flex; align-items: center; gap: 0.35rem; margin-top: 0.25rem;">
                    <i class="fa-solid fa-code-branch"></i> v2.4.0 (Build 2026)
                  </strong>
                </div>

                <div style="padding: 1rem; background: #F8FAFC; border-radius: 12px; border: 1px solid #E2E8F0;">
                  <span style="font-size: 0.75rem; font-weight: 700; color: #64748B; display: block; text-transform: uppercase;">STATUS LOGIN GATE ADMIN</span>
                  <strong style="font-size: 1rem; color: var(--hq-brown-medium); font-family: 'Outfit', sans-serif; display: flex; align-items: center; gap: 0.35rem; margin-top: 0.25rem;">
                    <i class="fa-solid fa-shield-halved"></i> Terautentikasi (Session Active)
                  </strong>
                </div>

              </div>
            </div>

          </div>
        </div>

      </main>

    </div>

  </div>


  <!-- MODAL 1: NEW REPORT GENERATOR -->
  <div class="modal-overlay" id="newReportModal">
    <div class="modal-card" style="max-width: 480px;">
      <div class="modal-header-sticky">
        <h3 class="modal-title"><i class="fa-solid fa-file-invoice"></i> Buat Laporan Penjualan Baru</h3>
        <button class="btn-close-modal" onclick="closeNewReportModal()"><i class="fa-solid fa-xmark"></i></button>
      </div>

      <div class="modal-body-wrapper" style="padding: 1.25rem;">
        <p style="font-size: 0.85rem; color: #64748B; margin-bottom: 1rem;">Pilih rentang tanggal dan format ekspor laporan keuangan outlet Sruput & Nyam.</p>
        
        <div style="margin-bottom: 1rem;">
          <label style="font-size: 0.8rem; font-weight: 700; color: #0F172A; display: block; margin-bottom: 0.3rem;">Rentang Laporan</label>
          <select class="input-select-sm" style="width: 100%; padding: 0.6rem;" id="reportPeriodSelect">
            <option value="7_days">7 Hari Terakhir</option>
            <option value="30_days">30 Hari Terakhir</option>
            <option value="this_month">Bulan Ini (Agustus 2026)</option>
          </select>
        </div>

        <div style="margin-bottom: 1.25rem;">
          <label style="font-size: 0.8rem; font-weight: 700; color: #0F172A; display: block; margin-bottom: 0.3rem;">Format File</label>
          <div style="display: flex; gap: 0.75rem;">
            <label style="flex: 1; border: 1px solid #E2E8F0; padding: 0.6rem; border-radius: 8px; font-size: 0.8rem; cursor: pointer; text-align: center; background: #F8FAFC;">
              <input type="radio" name="reportFormat" value="PDF" checked> PDF Format
            </label>
            <label style="flex: 1; border: 1px solid #E2E8F0; padding: 0.6rem; border-radius: 8px; font-size: 0.8rem; cursor: pointer; text-align: center; background: #F8FAFC;">
              <input type="radio" name="reportFormat" value="Excel"> Excel (.xlsx)
            </label>
          </div>
        </div>

        <button class="btn-hq-new-report" style="width: 100%;" onclick="generateReportDownload()">
          <i class="fa-solid fa-download"></i> Unduh Laporan LENGKAP
        </button>
      </div>
    </div>
  </div>


  <!-- MODAL 2: ADD / EDIT MENU MODAL -->
  <div class="modal-overlay" id="addMenuModal">
    <div class="modal-card" style="max-width: 500px;">
      <div class="modal-header-sticky">
        <h3 class="modal-title" id="addMenuModalTitle"><i class="fa-solid fa-utensils"></i> Tambah Menu Baru</h3>
        <button class="btn-close-modal" onclick="closeAddMenuModal()"><i class="fa-solid fa-xmark"></i></button>
      </div>
      <div class="modal-body-wrapper" style="padding: 1.25rem;">
        <form onsubmit="handleSaveMenuForm(event)">
          <input type="hidden" id="menuFormId" value="">
          <div style="margin-bottom: 0.85rem;">
            <label style="font-size: 0.8rem; font-weight: 700; color: #0F172A; display: block; margin-bottom: 0.3rem;">Nama Menu / Hidangan</label>
            <input type="text" class="input-select-sm" id="menuFormTitle" required style="width: 100%; padding: 0.6rem;" placeholder="mis. Es Jeruk Peras Original">
          </div>
          <div style="margin-bottom: 0.85rem;">
            <label style="font-size: 0.8rem; font-weight: 700; color: #0F172A; display: block; margin-bottom: 0.3rem;">Kategori</label>
            <select class="input-select-sm" id="menuFormCategory" style="width: 100%; padding: 0.6rem;">
              <option value="Sruput Juice">Sruput Juice</option>
              <option value="Nyam Salad">Nyam Salad</option>
              <option value="Paket Combo">Paket Combo</option>
              <option value="Sruput Beverage">Sruput Beverage</option>
            </select>
          </div>
          <div style="margin-bottom: 0.85rem;">
            <label style="font-size: 0.8rem; font-weight: 700; color: #0F172A; display: block; margin-bottom: 0.3rem;">Harga (Rp)</label>
            <input type="number" class="input-select-sm" id="menuFormPrice" required style="width: 100%; padding: 0.6rem;" placeholder="15000">
          </div>
          <div style="margin-bottom: 0.85rem;">
            <label style="font-size: 0.8rem; font-weight: 700; color: #0F172A; display: block; margin-bottom: 0.3rem;">Status Ketersediaan</label>
            <select class="input-select-sm" id="menuFormStock" style="width: 100%; padding: 0.6rem;">
              <option value="Tersedia">Tersedia</option>
              <option value="Habis">Habis (Out of Stock)</option>
            </select>
          </div>
          <div style="margin-bottom: 1.25rem;">
            <label style="font-size: 0.8rem; font-weight: 700; color: #0F172A; display: block; margin-bottom: 0.3rem;">URL Gambar Hidangan</label>
            <input type="text" class="input-select-sm" id="menuFormImage" style="width: 100%; padding: 0.6rem;" value="images/es_jeruk.png">
          </div>
          <button type="submit" class="btn-solid-brown-sm" style="width: 100%; padding: 0.75rem;"><i class="fa-solid fa-floppy-disk"></i> Simpan Menu</button>
        </form>
      </div>
    </div>
  </div>


  <!-- MODAL 3: DIGITAL RECEIPT / ORDER DETAIL MODAL -->
  <div class="modal-overlay" id="orderDetailModal">
    <div class="modal-card" style="max-width: 420px; background: #FFF;">
      <div class="modal-header-sticky">
        <h3 class="modal-title"><i class="fa-solid fa-receipt"></i> Struk Transaksi Digital</h3>
        <button class="btn-close-modal" onclick="closeOrderDetailModal()"><i class="fa-solid fa-xmark"></i></button>
      </div>
      <div class="modal-body-wrapper" style="padding: 1.25rem;" id="receiptBodyContent">
        <!-- Rendered via JS -->
      </div>
    </div>
  </div>


  <!-- MODAL 4: ADD STAFF MODAL -->
  <div class="modal-overlay" id="addStaffModal">
    <div class="modal-card" style="max-width: 450px;">
      <div class="modal-header-sticky">
        <h3 class="modal-title"><i class="fa-solid fa-user-plus"></i> Tambah Anggota Staf</h3>
        <button class="btn-close-modal" onclick="closeAddStaffModal()"><i class="fa-solid fa-xmark"></i></button>
      </div>
      <div class="modal-body-wrapper" style="padding: 1.25rem;">
        <form onsubmit="handleSaveStaffForm(event)">
          <div style="margin-bottom: 0.85rem;">
            <label style="font-size: 0.8rem; font-weight: 700; color: #0F172A; display: block; margin-bottom: 0.3rem;">Nama Lengkap Staf</label>
            <input type="text" class="input-select-sm" id="staffFormName" required style="width: 100%; padding: 0.6rem;" placeholder="mis. Rizky Pratama">
          </div>
          <div style="margin-bottom: 0.85rem;">
            <label style="font-size: 0.8rem; font-weight: 700; color: #0F172A; display: block; margin-bottom: 0.3rem;">Peran / Posisi</label>
            <select class="input-select-sm" id="staffFormRole" style="width: 100%; padding: 0.6rem;">
              <option value="Store Manager">Store Manager</option>
              <option value="Head Barista & Kitchen Lead">Head Barista & Kitchen Lead</option>
              <option value="Kasir / Frontend POS">Kasir / Frontend POS</option>
              <option value="Kitchen Helper">Kitchen Helper</option>
            </select>
          </div>
          <div style="margin-bottom: 1.25rem;">
            <label style="font-size: 0.8rem; font-weight: 700; color: #0F172A; display: block; margin-bottom: 0.3rem;">Shift Kerja</label>
            <select class="input-select-sm" id="staffFormShift" style="width: 100%; padding: 0.6rem;">
              <option value="Pagi (08.00 - 16.00)">Pagi (08.00 - 16.00)</option>
              <option value="Siang (12.00 - 20.00)">Siang (12.00 - 20.00)</option>
              <option value="Malam (16.00 - 23.00)">Malam (16.00 - 23.00)</option>
            </select>
          </div>
          <button type="submit" class="btn-solid-brown-sm" style="width: 100%; padding: 0.75rem;"><i class="fa-solid fa-user-check"></i> Tambah Staf</button>
        </form>
      </div>
    </div>
  </div>


  <!-- MODAL 4B: EDIT STAFF MODAL -->
  <div class="modal-overlay" id="editStaffModal">
    <div class="modal-card" style="max-width: 450px;">
      <div class="modal-header-sticky">
        <h3 class="modal-title"><i class="fa-solid fa-user-pen"></i> Edit Data Staf</h3>
        <button class="btn-close-modal" onclick="closeEditStaffModal()"><i class="fa-solid fa-xmark"></i></button>
      </div>
      <div class="modal-body-wrapper" style="padding: 1.25rem;">
        <form onsubmit="handleSaveEditStaffForm(event)">
          <input type="hidden" id="editStaffFormId" value="">
          <div style="margin-bottom: 0.85rem;">
            <label style="font-size: 0.8rem; font-weight: 700; color: #0F172A; display: block; margin-bottom: 0.3rem;">Nama Lengkap Staf</label>
            <input type="text" class="input-select-sm" id="editStaffFormName" required style="width: 100%; padding: 0.6rem;" placeholder="mis. Rizky Pratama">
          </div>
          <div style="margin-bottom: 0.85rem;">
            <label style="font-size: 0.8rem; font-weight: 700; color: #0F172A; display: block; margin-bottom: 0.3rem;">Peran / Posisi</label>
            <select class="input-select-sm" id="editStaffFormRole" style="width: 100%; padding: 0.6rem;">
              <option value="Store Manager">Store Manager</option>
              <option value="Head Barista & Kitchen Lead">Head Barista & Kitchen Lead</option>
              <option value="Kasir / Frontend POS">Kasir / Frontend POS</option>
              <option value="Kitchen Helper">Kitchen Helper</option>
            </select>
          </div>
          <div style="margin-bottom: 0.85rem;">
            <label style="font-size: 0.8rem; font-weight: 700; color: #0F172A; display: block; margin-bottom: 0.3rem;">Shift Kerja</label>
            <select class="input-select-sm" id="editStaffFormShift" style="width: 100%; padding: 0.6rem;">
              <option value="Pagi (08.00 - 16.00)">Pagi (08.00 - 16.00)</option>
              <option value="Siang (12.00 - 20.00)">Siang (12.00 - 20.00)</option>
              <option value="Malam (16.00 - 23.00)">Malam (16.00 - 23.00)</option>
            </select>
          </div>
          <div style="margin-bottom: 1.25rem;">
            <label style="font-size: 0.8rem; font-weight: 700; color: #0F172A; display: block; margin-bottom: 0.3rem;">Status Staf</label>
            <select class="input-select-sm" id="editStaffFormStatus" style="width: 100%; padding: 0.6rem;">
              <option value="Aktif">Aktif</option>
              <option value="Non-Aktif">Non-Aktif</option>
            </select>
          </div>
          <button type="submit" class="btn-solid-brown-sm" style="width: 100%; padding: 0.75rem;"><i class="fa-solid fa-floppy-disk"></i> Simpan Perubahan Staf</button>
        </form>
      </div>
    </div>
  </div>


  <!-- MODAL 5: EDIT PROFILE MANAGER MODAL (COMPACT & SLIM DESIGN) -->
  <div class="modal-overlay" id="editProfileModal">
    <div class="modal-card" style="max-width: 360px;">
      <div class="modal-header-sticky" style="padding: 0.75rem 1rem;">
        <h3 class="modal-title" style="font-size: 0.95rem;"><i class="fa-solid fa-id-card"></i> Edit Profil Manajer</h3>
        <button class="btn-close-modal" style="width: 28px; height: 28px; font-size: 0.85rem;" onclick="closeEditProfileModal()"><i class="fa-solid fa-xmark"></i></button>
      </div>
      <div class="modal-body-wrapper" style="padding: 0.85rem 1rem;">
        <form onsubmit="handleSaveProfileForm(event)">
          <div style="text-align: center; margin-bottom: 0.75rem;">
            <img id="profilePreviewImg" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80" alt="Preview Foto Profil" style="width: 58px; height: 58px; border-radius: 50%; object-fit: cover; border: 2px solid #782E00; margin: 0 auto 0.3rem;">
            <p style="font-size: 0.7rem; color: #64748B;">Foto Profil Manajer</p>
          </div>

          <div style="margin-bottom: 0.5rem;">
            <label style="font-size: 0.75rem; font-weight: 700; color: #0F172A; display: block; margin-bottom: 0.2rem;">Nama Lengkap</label>
            <input type="text" class="input-select-sm" id="profileNameInput" required style="width: 100%; padding: 0.4rem 0.6rem; font-size: 0.78rem;" value="Rizka Ika Maulida">
          </div>

          <div style="margin-bottom: 0.5rem;">
            <label style="font-size: 0.75rem; font-weight: 700; color: #0F172A; display: block; margin-bottom: 0.2rem;">Jabatan / Peran</label>
            <input type="text" class="input-select-sm" id="profileRoleInput" required style="width: 100%; padding: 0.4rem 0.6rem; font-size: 0.78rem;" value="Store Manager & Kitchen Lead">
          </div>

          <div style="margin-bottom: 0.5rem;">
            <label style="font-size: 0.75rem; font-weight: 700; color: #0F172A; display: block; margin-bottom: 0.2rem;">Email Akun</label>
            <input type="email" class="input-select-sm" id="profileEmailInput" required style="width: 100%; padding: 0.4rem 0.6rem; font-size: 0.78rem;" value="rizka.ika@mhs.politala.ac.id">
          </div>

          <div style="margin-bottom: 0.5rem;">
            <label style="font-size: 0.75rem; font-weight: 700; color: #0F172A; display: block; margin-bottom: 0.2rem;">Nomor WhatsApp</label>
            <input type="text" class="input-select-sm" id="profilePhoneInput" style="width: 100%; padding: 0.4rem 0.6rem; font-size: 0.78rem;" value="0812-9876-5432">
          </div>

          <div style="margin-bottom: 0.85rem;">
            <label style="font-size: 0.75rem; font-weight: 700; color: #0F172A; display: block; margin-bottom: 0.2rem;">URL Foto Profil</label>
            <input type="text" class="input-select-sm" id="profileImageInput" style="width: 100%; padding: 0.4rem 0.6rem; font-size: 0.78rem;" value="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80" oninput="document.getElementById('profilePreviewImg').src = this.value">
          </div>

          <button type="submit" class="btn-solid-brown-sm" style="width: 100%; padding: 0.55rem; font-size: 0.8rem;"><i class="fa-solid fa-floppy-disk"></i> Simpan Profil</button>
        </form>
      </div>
    </div>
  </div>


  <!-- CUSTOMER STORE FRONT OVERLAY (ACCESSIBLE VIA MODE SWITCHER) -->
  <div class="storefront-overlay" id="storefrontOverlay">
    
    <!-- Navbar Header for Customer View -->
    <header class="navbar">
      <div class="container nav-container">
        
        <button class="mobile-nav-toggle" id="mobileNavBtn" onclick="toggleMobileMenu()" aria-label="Buka Menu">
          <i class="fa-solid fa-bars"></i>
        </button>

        <div class="brand-logo" onclick="scrollToSection('hero')" style="cursor: pointer;">
          <div class="brand-text">
            <span class="text-sruput">Sruput</span>
            <span class="text-amp">&</span>
            <span class="text-nyam">Nyam</span>
          </div>
        </div>

        <ul class="nav-links" id="desktopNavLinks">
          <li><a href="#hero" class="nav-link active" onclick="setActiveNav(this)">Beranda</a></li>
          <li><a href="#menu" class="nav-link" onclick="setActiveNav(this)">Menu Utama</a></li>
          <li><a href="#combo" class="nav-link" onclick="setActiveNav(this)">Paket Combo</a></li>
          <li><a href="#reviews" class="nav-link" onclick="setActiveNav(this)">Ulasan</a></li>
        </ul>

        <div class="nav-actions">
          <button class="btn-dapur-orange" onclick="toggleStoreFrontView()" title="Kembali ke HQ Analytics">
            <i class="fa-solid fa-chart-column"></i> <span class="dapur-btn-text">F&B Analytics HQ</span>
          </button>
          <button class="btn-icon-cart" id="cartBtn" title="Buka Keranjang Belanja">
            <i class="fa-solid fa-cart-shopping"></i>
            <span class="cart-badge" id="cartBadgeCount">2</span>
          </button>
        </div>

      </div>
    </header>

    <main style="margin-top: 70px;">
      <!-- Hero & Menu for Customer View -->
      <section class="hero" id="hero">
        <div class="container hero-grid">
          <div class="hero-content">
            <div class="badge-tag-drop">
              <i class="fa-solid fa-droplet icon-citrus-drop"></i> 100% Jeruk Peras Asli
            </div>
            <h1 class="hero-title-clean">
              Segarnya Sruput Jeruk,<br>
              Lezatnya Nyam Salad<br>
              dalam Satu Tempat
            </h1>
            <p class="hero-description-clean">
              Nikmati kesegaran jus jeruk murni tanpa tambahan gula dan kelezatan salad organik segar yang disiapkan khusus untuk Anda setiap hari.
            </p>
            <div class="hero-buttons-stacked">
              <button class="btn-solid-brown" onclick="scrollToSection('menu')">
                Pesan Sruput & Nyam <i class="fa-solid fa-arrow-right"></i>
              </button>
              <button class="btn-outline-pill" onclick="toggleStoreFrontView()">
                Buka HQ Analytics Panel
              </button>
            </div>
          </div>
          <div class="hero-visual-stage">
            <div class="hero-image-card-bg">
              <img src="images/combo.png" alt="Es Jeruk dan Salad Sruput & Nyam" class="hero-img-showcase">
            </div>
          </div>
        </div>
      </section>

      <section class="section-full-menu" id="menu">
        <div class="container">
          <div class="menu-page-header-row">
            <div class="menu-page-title-box">
              <h2 class="menu-page-title">Menu Utama</h2>
              <p class="menu-page-subtitle">Jelajahi kesegaran alami dalam setiap tegukan dan gigitan.</p>
            </div>
          </div>
          <div class="full-catalog-grid" id="fullCatalogGrid"></div>
        </div>
      </section>
    </main>

  </div>


  <!-- Toast Notification Container -->
  <div class="toast-container" id="toastContainer"></div>

  <!-- Script Engine -->
  <script src="admin.js"></script>
</body>
</html>
