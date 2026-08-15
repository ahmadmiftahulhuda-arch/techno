<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">
  <title>Sruput & Nyam - Menu & Kontak</title>

  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">

  <!-- FontAwesome -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

  <style>
    /* ===== RESET & BASE ===== */
    *, *::before, *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      -webkit-tap-highlight-color: transparent;
    }

    body {
      font-family: 'Plus Jakarta Sans', sans-serif;
      background: #F4F6FA;
      color: #0F172A;
      touch-action: manipulation;
      -webkit-font-smoothing: antialiased;
    }

    /* ===== SHELL ===== */
    .shell {
      max-width: 430px;
      margin: 0 auto;
      background: #FFFFFF;
      min-height: 100dvh;
      display: flex;
      flex-direction: column;
    }

    /* ===== TOP HEADER ===== */
    .top-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1rem 1.1rem 0.75rem;
      background: #FFFFFF;
      border-bottom: 1px solid #F1F5F9;
      position: sticky;
      top: 0;
      z-index: 50;
    }

    .brand-name {
      font-family: 'Outfit', sans-serif;
      font-weight: 800;
      font-size: 1.3rem;
      color: #8C3B00;
    }

    .open-badge {
      display: flex;
      align-items: center;
      gap: 0.3rem;
      background: #ECFDF5;
      color: #065F46;
      font-size: 0.7rem;
      font-weight: 700;
      padding: 0.25rem 0.6rem;
      border-radius: 9999px;
      border: 1px solid #A7F3D0;
    }

    .open-dot {
      width: 7px;
      height: 7px;
      background: #10B981;
      border-radius: 50%;
      animation: pulse-dot 1.8s ease-in-out infinite;
    }

    @keyframes pulse-dot {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.4; }
    }

    /* ===== SECTION LABEL ===== */
    .sec-label {
      padding: 1rem 1.1rem 0.5rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .sec-title {
      font-family: 'Outfit', sans-serif;
      font-weight: 800;
      font-size: 1rem;
      color: #0F172A;
    }

    .sec-badge {
      font-size: 0.68rem;
      color: #10B981;
      font-weight: 700;
      display: flex;
      align-items: center;
      gap: 0.25rem;
    }

    /* ===== PRODUCT CARDS ===== */
    .products-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0.75rem;
      padding: 0 1.1rem 0.75rem;
    }

    .p-card {
      background: #FFFFFF;
      border: 1.5px solid #F1F5F9;
      border-radius: 18px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      box-shadow: 0 2px 10px rgba(0,0,0,0.04);
      transition: transform 0.18s ease, box-shadow 0.18s ease;
    }

    .p-card:active {
      transform: scale(0.97);
    }

    .p-img-wrap {
      position: relative;
      width: 100%;
      aspect-ratio: 4/3;
      overflow: hidden;
      background: #FDF4EB;
    }

    .p-img-wrap img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    /* Fallback ketika foto tidak load */
    .p-img-wrap img.broken {
      display: none;
    }

    .p-img-fallback {
      display: none;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      font-size: 3rem;
      background: #FDF4EB;
    }

    .p-chip {
      position: absolute;
      top: 0.4rem;
      left: 0.4rem;
      font-size: 0.6rem;
      font-weight: 800;
      color: #FFFFFF;
      padding: 0.15rem 0.45rem;
      border-radius: 5px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .chip-orange { background: #FF7000; }
    .chip-green  { background: #10B981; }

    .p-body {
      padding: 0.65rem 0.75rem 0.75rem;
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      gap: 0.25rem;
    }

    .p-name {
      font-size: 0.88rem;
      font-weight: 700;
      color: #0F172A;
      line-height: 1.25;
    }

    .p-desc {
      font-size: 0.68rem;
      color: #64748B;
      line-height: 1.35;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .p-foot {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 0.45rem;
      padding-top: 0.45rem;
      border-top: 1px solid #F1F5F9;
    }

    .p-price {
      font-family: 'Outfit', sans-serif;
      font-weight: 800;
      font-size: 0.95rem;
      color: #8C3B00;
    }

    .btn-add {
      background: #8C3B00;
      color: #FFFFFF;
      border: none;
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 0.72rem;
      font-weight: 700;
      padding: 0.3rem 0.65rem;
      border-radius: 9999px;
      cursor: pointer;
      transition: background 0.15s;
    }

    .btn-add:active {
      background: #6B2C00;
    }

    /* ===== DIVIDER ===== */
    .divider {
      height: 1px;
      background: #F1F5F9;
      margin: 0 1.1rem;
    }

    /* ===== COMBO BANNER ===== */
    .combo-banner {
      margin: 0.85rem 1.1rem;
      background: linear-gradient(135deg, #FFF7ED, #FFEDD5);
      border: 1.5px solid #FDBA74;
      border-radius: 16px;
      padding: 0.85rem 1rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.5rem;
    }

    .combo-info { display: flex; flex-direction: column; gap: 0.15rem; }

    .combo-chip {
      font-size: 0.62rem;
      font-weight: 800;
      color: #C2410C;
      text-transform: uppercase;
      display: flex;
      align-items: center;
      gap: 0.2rem;
    }

    .combo-name {
      font-family: 'Outfit', sans-serif;
      font-weight: 800;
      font-size: 0.85rem;
      color: #7C2D12;
    }

    .combo-prices {
      display: flex;
      align-items: center;
      gap: 0.35rem;
    }

    .combo-strike {
      font-size: 0.72rem;
      color: #9A3412;
      text-decoration: line-through;
    }

    .combo-price {
      font-family: 'Outfit', sans-serif;
      font-weight: 800;
      font-size: 0.92rem;
      color: #8C3B00;
    }

    /* ===== REVIEWS ===== */
    .reviews-section {
      padding: 0 1.1rem 0.5rem;
    }

    .rev-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 0.65rem;
    }

    .rev-title {
      font-family: 'Outfit', sans-serif;
      font-weight: 800;
      font-size: 0.95rem;
      color: #0F172A;
      display: flex;
      align-items: center;
      gap: 0.3rem;
    }

    .rev-avg {
      font-size: 0.72rem;
      color: #64748B;
      font-weight: 500;
    }

    .btn-write-rev {
      background: #FFFFFF;
      border: 1.5px solid #E2E8F0;
      color: #8C3B00;
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 0.7rem;
      font-weight: 700;
      padding: 0.25rem 0.6rem;
      border-radius: 9999px;
      cursor: pointer;
    }

    .rev-card {
      background: #F8FAFC;
      border: 1px solid #E2E8F0;
      border-radius: 14px;
      padding: 0.65rem 0.85rem;
      margin-bottom: 0.55rem;
    }

    .rev-top-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 0.25rem;
    }

    .rev-user {
      font-size: 0.78rem;
      font-weight: 700;
      color: #0F172A;
    }

    .rev-stars {
      color: #F59E0B;
      font-size: 0.68rem;
      letter-spacing: 1px;
    }

    .rev-text {
      font-size: 0.73rem;
      color: #64748B;
      line-height: 1.4;
    }

    /* ===== CONTACT SECTION ===== */
    .contact-section {
      padding: 0 1.1rem 0.5rem;
    }

    .contact-title {
      font-family: 'Outfit', sans-serif;
      font-weight: 800;
      font-size: 0.95rem;
      color: #0F172A;
      margin-bottom: 0.65rem;
      display: flex;
      align-items: center;
      gap: 0.3rem;
    }

    .contact-list {
      display: flex;
      flex-direction: column;
      gap: 0.65rem;
    }

    .contact-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 0.9rem 1rem;
      border-radius: 16px;
      text-decoration: none;
      background: #F8FAFC;
      border: 1.5px solid #E2E8F0;
      transition: background 0.15s, transform 0.15s;
    }

    .contact-item:active {
      background: #F1F5F9;
      transform: scale(0.98);
    }

    .icon-wa {
      width: 46px;
      height: 46px;
      border-radius: 14px;
      background: linear-gradient(145deg, #25D366, #128C7E);
      color: #FFFFFF;
      font-size: 1.55rem;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      box-shadow: 0 4px 12px rgba(37,211,102,0.3);
    }

    .icon-ig {
      width: 46px;
      height: 46px;
      border-radius: 14px;
      background: linear-gradient(45deg, #f09433, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888);
      color: #FFFFFF;
      font-size: 1.55rem;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      box-shadow: 0 4px 12px rgba(220,39,67,0.3);
    }

    .contact-meta { display: flex; flex-direction: column; }

    .contact-val {
      font-family: 'Outfit', sans-serif;
      font-weight: 800;
      font-size: 1.1rem;
      line-height: 1.2;
    }

    .contact-val.green { color: #14532D; }
    .contact-val.pink  { color: #9D174D; }

    .contact-sub {
      font-size: 0.7rem;
      color: #94A3B8;
      font-weight: 500;
      margin-top: 0.1rem;
    }

    /* ===== FOOTER ===== */
    .page-footer {
      padding: 1.25rem 1.1rem;
      text-align: center;
      font-size: 0.68rem;
      color: #94A3B8;
      border-top: 1px solid #F1F5F9;
      margin-top: auto;
    }
  </style>
</head>
<body>

<div class="shell">

  <!-- TOP BAR -->
  <header class="top-bar">
    <span class="brand-name">Sruput &amp; Nyam</span>
    <div class="open-badge">
      <span class="open-dot"></span>
      Buka Sekarang
    </div>
  </header>

  <!-- SECTION: PILIHAN MENU & HARGA -->
  <div class="sec-label">
    <span class="sec-title">Pilihan Menu &amp; Harga</span>
    <span class="sec-badge"><i class="fa-solid fa-leaf"></i> Bahan Segar 100%</span>
  </div>

  <div class="products-grid">

    <!-- Card 1: Es Jeruk Peras 8k -->
    <div class="p-card">
      <div class="p-img-wrap" id="wrap-jeruk">
        <img
          src="images/es_jeruk.png"
          alt="Es Jeruk Peras Original"
          onerror="this.style.display='none'; document.getElementById('fb-jeruk').style.display='flex';"
        >
        <div class="p-img-fallback" id="fb-jeruk">&#127819;</div>
        <span class="p-chip chip-orange">Best Seller</span>
      </div>
      <div class="p-body">
        <span class="p-name">Es Jeruk Peras</span>
        <span class="p-desc">100% perasan jeruk asli, segar tanpa campuran.</span>
        <div class="p-foot">
          <span class="p-price">Rp 7.000</span>
          <button class="btn-add" onclick="pesan('Es Jeruk Peras', 7000)">+ Pesan</button>
        </div>
      </div>
    </div>

    <!-- Card 2: Salad Buah Segar 12k -->
    <div class="p-card">
      <div class="p-img-wrap" id="wrap-salad">
        <img
          src="images/fruit_salad.png"
          alt="Gourmet Salad Buah Segar"
          onerror="this.style.display='none'; document.getElementById('fb-salad').style.display='flex';"
        >
        <div class="p-img-fallback" id="fb-salad">&#127815;</div>
        <span class="p-chip chip-green">Segar</span>
      </div>
      <div class="p-body">
        <span class="p-name">Salad Buah Segar</span>
        <span class="p-desc">Stroberi, mangga, kiwi, anggur &amp; dressing keju.</span>
        <div class="p-foot">
          <span class="p-price">Rp 8.000</span>
          <button class="btn-add" onclick="pesan('Salad Buah Segar', 8000)">+ Pesan</button>
        </div>
      </div>
    </div>

  </div>

  <div class="divider"></div>

  <!-- SECTION: KONTAK (WA & IG persis seperti screenshot) -->
  <div class="contact-section" style="margin-top: 0.85rem;">
    <div class="contact-title">
      <i class="fa-solid fa-headset" style="color: #8C3B00;"></i>
      Hubungi &amp; Pesan Langsung
    </div>

    <div class="contact-list">
      <a href="https://wa.me/6285246966228" target="_blank" rel="noopener" class="contact-item">
        <div class="icon-wa">
          <i class="fa-brands fa-whatsapp"></i>
        </div>
        <div class="contact-meta">
          <span class="contact-val green">085246966228</span>
          <span class="contact-sub">Pesan via WhatsApp</span>
        </div>
      </a>

      <a href="https://instagram.com/sruputnyam.official" target="_blank" rel="noopener" class="contact-item">
        <div class="icon-ig">
          <i class="fa-brands fa-instagram"></i>
        </div>
        <div class="contact-meta">
          <span class="contact-val pink">@sruputnyam.official</span>
          <span class="contact-sub">Ikuti Instagram Resmi</span>
        </div>
      </a>
    </div>
  </div>

  <!-- PAGE FOOTER -->
  <footer class="page-footer">
    &copy; 2024 Sruput &amp; Nyam &bull; Segar Setiap Hari
  </footer>

</div>

<!-- TOAST NOTIFICATION -->
<div id="snackbar" style="
  display:none;
  position:fixed;
  bottom:1.5rem;
  left:50%;
  transform:translateX(-50%);
  background:#0F172A;
  color:#FFFFFF;
  font-family:'Plus Jakarta Sans',sans-serif;
  font-size:0.82rem;
  font-weight:600;
  padding:0.65rem 1.25rem;
  border-radius:12px;
  z-index:999;
  box-shadow:0 8px 24px rgba(0,0,0,0.18);
  white-space:nowrap;
"></div>

<!-- WRITE REVIEW MODAL -->
<div id="reviewModal" style="
  display:none;
  position:fixed;
  inset:0;
  background:rgba(0,0,0,0.45);
  z-index:200;
  align-items:flex-end;
  justify-content:center;
">
  <div style="
    background:#FFFFFF;
    border-radius:20px 20px 0 0;
    padding:1.5rem 1.25rem 2rem;
    width:100%;
    max-width:430px;
  ">
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1rem;">
      <span style="font-family:'Outfit',sans-serif;font-weight:800;font-size:1rem;color:#0F172A;">Tulis Ulasan</span>
      <button onclick="closeReview()" style="background:none;border:none;font-size:1.2rem;color:#64748B;cursor:pointer;"><i class="fa-solid fa-xmark"></i></button>
    </div>
    <input id="revName" type="text" placeholder="Nama Anda" style="width:100%;padding:0.65rem 0.85rem;border:1.5px solid #E2E8F0;border-radius:12px;font-family:'Plus Jakarta Sans',sans-serif;font-size:0.85rem;margin-bottom:0.65rem;outline:none;">
    <textarea id="revText" rows="3" placeholder="Ceritakan pengalaman Anda..." style="width:100%;padding:0.65rem 0.85rem;border:1.5px solid #E2E8F0;border-radius:12px;font-family:'Plus Jakarta Sans',sans-serif;font-size:0.85rem;resize:none;outline:none;margin-bottom:0.85rem;"></textarea>
    <button onclick="kirimUlasan()" style="width:100%;padding:0.8rem;background:#8C3B00;color:#FFFFFF;font-family:'Outfit',sans-serif;font-weight:800;font-size:0.92rem;border:none;border-radius:14px;cursor:pointer;">
      Kirim Ulasan
    </button>
  </div>
</div>

<script>
  // Toast snackbar
  function showToast(msg) {
    const el = document.getElementById('snackbar');
    el.textContent = msg;
    el.style.display = 'block';
    setTimeout(() => { el.style.display = 'none'; }, 2500);
  }

  // Pesan button handler
  function pesan(nama, harga) {
    const formatted = 'Rp ' + harga.toLocaleString('id-ID').replace(/,/g, '.').replace('.', '.');
    showToast(nama + ' ditambahkan ke pesanan!');
  }

  // Write review modal
  function tulisUlasan() {
    const modal = document.getElementById('reviewModal');
    modal.style.display = 'flex';
  }

  function closeReview() {
    document.getElementById('reviewModal').style.display = 'none';
  }

  function kirimUlasan() {
    const name = document.getElementById('revName').value.trim();
    const text = document.getElementById('revText').value.trim();
    if (!name || !text) { showToast('Nama dan ulasan wajib diisi!'); return; }

    const container = document.getElementById('reviewsContainer');
    const card = document.createElement('div');
    card.className = 'rev-card';
    card.innerHTML = `
      <div class="rev-top-row">
        <span class="rev-user">${name}</span>
        <span class="rev-stars">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
      </div>
      <p class="rev-text">${text}</p>`;
    container.prepend(card);

    document.getElementById('revName').value = '';
    document.getElementById('revText').value = '';
    closeReview();
    showToast('Ulasan berhasil dikirim!');
  }

  // Close review modal when clicking backdrop
  document.getElementById('reviewModal').addEventListener('click', function(e) {
    if (e.target === this) closeReview();
  });
</script>

</body>
</html>
