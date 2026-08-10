<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Katalog Produk & Menu Admin</title>

        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600,700" rel="stylesheet" />

        @if (file_exists(public_path('build/manifest.json')) || file_exists(public_path('hot')))
            @vite(['resources/css/app.css', 'resources/js/app.js'])
        @else
            <style>
                /*! tailwindcss v4.0.7 | MIT License | https://tailwindcss.com */@layer theme{:root,:host{--font-sans:'Instrument Sans',ui-sans-serif,system-ui,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";--font-serif:ui-serif,Georgia,Cambria,"Times New Roman",Times,serif;--font-mono:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace;--color-red-50:oklch(.971 .013 17.38);--color-red-100:oklch(.936 .032 17.717);--color-red-200:oklch(.885 .062 18.334);--color-red-300:oklch(.808 .114 19.571);--color-red-400:oklch(.704 .191 22.216);--color-red-500:oklch(.637 .237 25.331);--color-red-600:oklch(.577 .245 27.325);--color-red-700:oklch(.505 .213 27.518);--color-red-800:oklch(.444 .177 26.899);--color-red-900:oklch(.396 .141 25.723);--color-red-950:oklch(.258 .092 26.042);--color-orange-50:oklch(.98 .016 73.684);--color-orange-100:oklch(.954 .038 75.164);--color-orange-200:oklch(.901 .076 70.697);--color-orange-300:oklch(.837 .128 66.29);--color-orange-400:oklch(.75 .183 55.934);--color-orange-500:oklch(.705 .213 47.604);--color-orange-600:oklch(.646 .222 41.116);--color-orange-700:oklch(.553 .195 38.402);--color-orange-800:oklch(.47 .157 37.304);--color-orange-900:oklch(.408 .123 38.172);--color-orange-950:oklch(.266 .079 36.259);--color-amber-50:oklch(.987 .022 95.277);--color-amber-100:oklch(.962 .059 95.617);--color-amber-200:oklch(.924 .12 95.746);--color-amber-300:oklch(.879 .169 91.605);--color-amber-400:oklch(.828 .189 84.429);--color-amber-500:oklch(.769 .188 70.08);--color-amber-600:oklch(.666 .179 58.318);--color-amber-700:oklch(.555 .163 48.998);--color-amber-800:oklch(.473 .137 46.201);--color-amber-900:oklch(.414 .112 45.904);--color-amber-950:oklch(.279 .077 45.635);--color-yellow-50:oklch(.987 .026 102.212);--color-yellow-100:oklch(.973 .071 103.193);--color-yellow-200:oklch(.945 .129 101.54);--color-yellow-300:oklch(.905 .182 98.111);--color-yellow-400:oklch(.852 .199 91.936);--color-yellow-500:oklch(.769 .188 70.08);--color-yellow-600:oklch(.666 .179 58.318);--color-yellow-700:oklch(.555 .163 48.998);--color-yellow-800:oklch(.473 .137 46.201);--color-yellow-900:oklch(.414 .112 45.904);--color-yellow-950:oklch(.279 .077 45.635);--color-lime-50:oklch(.986 .031 120.727);--color-lime-100:oklch(.967 .071 120.992);--color-lime-200:oklch(.938 .128 121.287);--color-lime-300:oklch(.897 .176 109.15);--color-lime-400:oklch(.841 .188 84.43);--color-lime-500:oklch(.768 .202 78.123);--color-lime-600:oklch(.689 .196 75.995);--color-lime-700:oklch(.593 .181 72.528);--color-lime-800:oklch(.51 .159 71.116);--color-lime-900:oklch(.434 .13 68.013);--color-lime-950:oklch(.283 .087 69.5);--color-green-50:oklch(.982 .018 155.652);--color-green-100:oklch(.962 .044 156.744);--color-green-200:oklch(.925 .078 166.912);--color-green-300:oklch(.871 .15 163.935);--color-green-400:oklch(.792 .17 160.111);--color-green-500:oklch(.723 .15 161.34);--color-green-600:oklch(.627 .143 162.186);--color-green-700:oklch(.527 .13 160.187);--color-green-800:oklch(.445 .11 160.197);--color-green-900:oklch(.38 .09 160.051);--color-green-950:oklch(.25 .064 160.25);--color-emerald-50:oklch(.978 .018 167.756);--color-emerald-100:oklch(.953 .055 168.826);--color-emerald-200:oklch(.904 .099 167.756);--color-emerald-300:oklch(.845 .149 164.593);--color-emerald-400:oklch(.775 .15 163.12);--color-emerald-500:oklch(.696 .16 160.683);--color-emerald-600:oklch(.596 .149 160.733);--color-emerald-700:oklch(.5 .13 160.626);--color-emerald-800:oklch(.43 .112 159.953);--color-emerald-900:oklch(.368 .095 160.29);--color-emerald-950:oklch(.244 .068 160.362);--color-teal-50:oklch(.98 .018 180.059);--color-teal-100:oklch(.958 .038 180.074);--color-teal-200:oklch(.915 .071 180.124);--color-teal-300:oklch(.857 .121 181.673);--color-teal-400:oklch(.785 .14 179.109);--color-teal-500:oklch(.704 .129 177.763);--color-teal-600:oklch(.6 .123 177.812);--color-teal-700:oklch(.5 .107 177.086);--color-teal-800:oklch(.43 .092 177.248);--color-teal-900:oklch(.368 .077 177.576);--color-teal-950:oklch(.245 .051 178.132);--color-cyan-50:oklch(.97 .018 195.87);--color-cyan-100:oklch(.95 .037 193.529);--color-cyan-200:oklch(.91 .08 194.382);--color-cyan-300:oklch(.852 .126 194.073);--color-cyan-400:oklch(.777 .137 196.14);--color-cyan-500:oklch(.696 .129 197.061);--color-cyan-600:oklch(.592 .123 197.016);--color-cyan-700:oklch(.5 .104 197.213);--color-cyan-800:oklch(.427 .089 198.258);--color-cyan-900:oklch(.365 .075 202.204);--color-cyan-950:oklch(.244 .05 203.101);--color-sky-50:oklch(.971 .018 207.839);--color-sky-100:oklch(.946 .057 207.301);--color-sky-200:oklch(.904 .089 207.246);--color-sky-300:oklch(.847 .129 207.38);--color-sky-400:oklch(.777 .143 206.634);--color-sky-500:oklch(.705 .127 205.75);--color-sky-600:oklch(.6 .118 205.832);--color-sky-700:oklch(.5 .105 205.674);--color-sky-800:oklch(.43 .09 205.79);--color-sky-900:oklch(.37 .076 205.636);--color-sky-950:oklch(.247 .05 205.747);--color-blue-50:oklch(.97 .016 250.371);--color-blue-100:oklch(.946 .034 250.371);--color-blue-200:oklch(.904 .063 250.571);--color-blue-300:oklch(.846 .093 251.209);--color-blue-400:oklch(.776 .129 250.989);--color-blue-500:oklch(.708 .13 250.512);--color-blue-600:oklch(.608 .129 250.437);--color-blue-700:oklch(.5 .117 250.161);--color-blue-800:oklch(.43 .101 250.157);--color-blue-900:oklch(.37 .086 250.506);--color-blue-950:oklch(.247 .058 250.647);--color-indigo-50:oklch(.969 .016 254.3);--color-indigo-100:oklch(.944 .036 255.964);--color-indigo-200:oklch(.902 .064 255.936);--color-indigo-300:oklch(.849 .093 255.658);--color-indigo-400:oklch(.779 .125 255.5);--color-indigo-500:oklch(.707 .129 255.186);--color-indigo-600:oklch(.607 .129 254.204);--color-indigo-700:oklch(.5 .116 253.789);--color-indigo-800:oklch(.43 .1 254.291);--color-indigo-900:oklch(.369 .085 255.774);--color-indigo-950:oklch(.246 .058 256.472);--color-violet-50:oklch(.969 .017 309.123);--color-violet-100:oklch(.946 .037 309.537);--color-violet-200:oklch(.904 .066 308.434);--color-violet-300:oklch(.849 .093 308.389);--color-violet-400:oklch(.78 .125 308.561);--color-violet-500:oklch(.708 .13 307.995);--color-violet-600:oklch(.608 .129 306.98);--color-violet-700:oklch(.5 .116 306.582);--color-violet-800:oklch(.43 .1 306.616);--color-violet-900:oklch(.37 .085 306.914);--color-violet-950:oklch(.247 .057 309.487);--color-purple-50:oklch(.977 .016 306.291);--color-purple-100:oklch(.953 .038 307.448);--color-purple-200:oklch(.908 .071 307.014);--color-purple-300:oklch(.854 .113 307.657);--color-purple-400:oklch(.783 .134 307.427);--color-purple-500:oklch(.711 .13 308.139);--color-purple-600:oklch(.611 .129 307.089);--color-purple-700:oklch(.5 .116 308.499);--color-purple-800:oklch(.43 .1 306.918);--color-purple-900:oklch(.37 .085 306.57);--color-purple-950:oklch(.247 .057 306.427);--color-fuchsia-50:oklch(.977 .017 323.12);--color-fuchsia-100:oklch(.955 .045 320.894);--color-fuchsia-200:oklch(.911 .081 320.6);--color-fuchsia-300:oklch(.854 .124 320.11);--color-fuchsia-400:oklch(.785 .143 321.264);--color-fuchsia-500:oklch(.713 .133 323.721);--color-fuchsia-600:oklch(.611 .129 323.1);--color-fuchsia-700:oklch(.5 .116 322.565);--color-fuchsia-800:oklch(.43 .1 321.189);--color-fuchsia-900:oklch(.37 .085 320.7);--color-fuchsia-950:oklch(.247 .057 322.569);--color-pink-50:oklch(.971 .014 351.7);--color-pink-100:oklch(.947 .039 352.599);--color-pink-200:oklch(.903 .074 351.13);--color-pink-300:oklch(.848 .117 352.619);--color-pink-400:oklch(.78 .142 352.172);--color-pink-500:oklch(.71 .132 352.807);--color-pink-600:oklch(.61 .129 350.563);--color-pink-700:oklch(.5 .116 350.321);--color-pink-800:oklch(.43 .1 349.566);--color-pink-900:oklch(.37 .085 349.568);--color-pink-950:oklch(.247 .057 349.569);--color-rose-50:oklch(.969 .015 349.331);--color-rose-100:oklch(.946 .038 349.051);--color-rose-200:oklch(.902 .071 348.592);--color-rose-300:oklch(.846 .114 348.042);--color-rose-400:oklch(.777 .144 348.239);--color-rose-500:oklch(.707 .13 349.551);--color-rose-600:oklch(.607 .129 348.536);--color-rose-700:oklch(.5 .116 348.272);--color-rose-800:oklch(.43 .1 348.394);--color-rose-900:oklch(.37 .085 348.398);--color-rose-950:oklch(.247 .057 348.4);--color-slate-50:oklch(.985 .003 247.862);--color-slate-100:oklch(.967 .003 247.862);--color-slate-200:oklch(.929 .013 255.508);--color-slate-300:oklch(.869 .022 252.894);--color-slate-400:oklch(.708 .016 252.695);--color-slate-500:oklch(.554 .02 252.657);--color-slate-600:oklch(.446 .017 252.237);--color-slate-700:oklch(.372 .015 252.181);--color-slate-800:oklch(.279 .011 252.209);--color-slate-900:oklch(.208 .01 251.978);--color-slate-950:oklch(.129 .007 248.449);--color-gray-50:oklch(.985 .002 247.839);--color-gray-100:oklch(.967 .003 247.862);--color-gray-200:oklch(.929 .013 255.508);--color-gray-300:oklch(.869 .022 252.894);--color-gray-400:oklch(.708 .016 252.695);--color-gray-500:oklch(.554 .02 252.657);--color-gray-600:oklch(.446 .017 252.237);--color-gray-700:oklch(.372 .015 252.181);--color-gray-800:oklch(.279 .011 252.209);--color-gray-900:oklch(.208 .01 251.978);--color-gray-950:oklch(.129 .007 248.449);--color-zinc-50:oklch(.985 .002 247.839);--color-zinc-100:oklch(.967 .003 247.862);--color-zinc-200:oklch(.929 .013 255.508);--color-zinc-300:oklch(.869 .022 252.894);--color-zinc-400:oklch(.708 .016 252.695);--color-zinc-500:oklch(.554 .02 252.657);--color-zinc-600:oklch(.446 .017 252.237);--color-zinc-700:oklch(.372 .015 252.181);--color-zinc-800:oklch(.279 .011 252.209);--color-zinc-900:oklch(.208 .01 251.978);--color-zinc-950:oklch(.129 .007 248.449);--color-neutral-50:oklch(.985 .002 247.839);--color-neutral-100:oklch(.967 .003 247.862);--color-neutral-200:oklch(.929 .013 255.508);--color-neutral-300:oklch(.869 .022 252.894);--color-neutral-400:oklch(.708 .016 252.695);--color-neutral-500:oklch(.554 .02 252.657);--color-neutral-600:oklch(.446 .017 252.237);--color-neutral-700:oklch(.372 .015 252.181);--color-neutral-800:oklch(.279 .011 252.209);--color-neutral-900:oklch(.208 .01 251.978);--color-neutral-950:oklch(.129 .007 248.449);--color-stone-50:oklch(.985 .002 247.839);--color-stone-100:oklch(.967 .003 247.862);--color-stone-200:oklch(.929 .013 255.508);--color-stone-300:oklch(.869 .022 252.894);--color-stone-400:oklch(.708 .016 252.695);--color-stone-500:oklch(.554 .02 252.657);--color-stone-600:oklch(.446 .017 252.237);--color-stone-700:oklch(.372 .015 252.181);--color-stone-800:oklch(.279 .011 252.209);--color-stone-900:oklch(.208 .01 251.978);--color-stone-950:oklch(.129 .007 248.449);--color-black:#000;--color-white:#fff;--spacing:0.25rem;--breakpoint-sm:40rem;--breakpoint-md:48rem;--breakpoint-lg:64rem;--breakpoint-xl:80rem;--breakpoint-2xl:96rem;--container-0:0;--container-xs:20rem;--container-sm:24rem;--container-md:28rem;--container-lg:32rem;--container-xl:36rem;--container-2xl:42rem;--container-3xl:48rem;--container-4xl:56rem;--container-5xl:64rem;--container-6xl:72rem;--container-7xl:80rem;--container-8xl:80rem;--text-xs:.75rem;--text-xs--line-height:calc(1 / .75);--text-sm:.875rem;--text-sm--line-height:1.25rem;--text-base:1rem;--text-base--line-height:1.5rem;--text-lg:1.125rem;--text-lg--line-height:1.75rem;--text-xl:1.25rem;--text-xl--line-height:1.75rem;--text-2xl:1.5rem;--text-2xl--line-height:2rem;--text-3xl:1.875rem;--text-3xl--line-height:2.25rem;--text-4xl:2.25rem;--text-4xl--line-height:2.5rem;--text-5xl:3rem;--text-5xl--line-height:1;--text-6xl:3.75rem;--text-6xl--line-height:1;--text-7xl:4.5rem;--text-7xl--line-height:1;--text-8xl:6rem;--text-8xl--line-height:1;--text-9xl:8rem;--text-9xl--line-height:1}
            </style>
        @endif
    </head>
    <body class="min-h-screen bg-[#f6f3ee] px-3 py-4 text-slate-800 sm:px-4 lg:px-6 lg:py-6">
        <div class="mx-auto flex max-w-7xl flex-col gap-4 lg:flex-row">
            <aside class="w-full rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm lg:w-72">
                <div class="flex items-center gap-3">
                    <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f08b2e] text-lg font-semibold text-white">K</div>
                    <div>
                        <p class="text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-400">Admin Panel</p>
                        <h1 class="text-lg font-semibold text-slate-900">Katalog Menu</h1>
                    </div>
                </div>

                <nav class="mt-8 space-y-2">
                    @php
                        $navItems = [
                            ['label' => 'Dashboard', 'active' => false],
                            ['label' => 'Katalog Produk', 'active' => true],
                            ['label' => 'Pesanan', 'active' => false],
                            ['label' => 'Pelanggan', 'active' => false],
                            ['label' => 'Pengaturan', 'active' => false],
                        ];
                    @endphp

                    @foreach ($navItems as $item)
                        <a href="#" class="flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-medium transition {{ $item['active'] ? 'bg-[#fff6e8] text-[#b45d00]' : 'text-slate-600 hover:bg-slate-50' }}">
                            <span>{{ $item['label'] }}</span>
                            @if ($item['active'])
                                <span class="h-2.5 w-2.5 rounded-full bg-[#f08b2e]"></span>
                            @endif
                        </a>
                    @endforeach
                </nav>

                <div class="mt-8 rounded-[24px] border border-[#f3e2c8] bg-[#fffaf2] p-4">
                    <p class="text-sm font-semibold text-slate-900">Promo Mingguan</p>
                    <p class="mt-2 text-sm leading-6 text-slate-600">Diskon 20% untuk produk yang belum terjual minggu ini.</p>
                    <button class="mt-4 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white">Lihat Detail</button>
                </div>
            </aside>

            <main class="flex-1 rounded-[32px] border border-slate-200 bg-[#fcfbf8] p-4 shadow-sm sm:p-6 lg:p-8">
                <header class="flex flex-col gap-4 rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-5">
                    <div>
                        <p class="text-sm font-semibold text-[#f08b2e]">Katalog Produk & Menu</p>
                        <h2 class="mt-1 text-2xl font-semibold text-slate-900">Kelola produk favoritmu</h2>
                    </div>
                    <div class="flex flex-col gap-3 sm:flex-row sm:items-center">
                        <label class="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-500">
                            <span>🔎</span>
                            <input type="text" placeholder="Cari menu..." class="w-full bg-transparent outline-none sm:w-40" />
                        </label>
                        <button class="rounded-full bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white">+ Tambah Produk</button>
                    </div>
                </header>

                <section class="mt-6 grid gap-4 xl:grid-cols-[1.5fr_0.8fr]">
                    <div class="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
                        <div class="flex items-start justify-between gap-3">
                            <div>
                                <p class="text-sm font-semibold text-slate-500">Statistik Hari Ini</p>
                                <h3 class="mt-1 text-xl font-semibold text-slate-900">25 item menu siap ditampilkan</h3>
                            </div>
                            <span class="rounded-full bg-[#fff3e2] px-3 py-1 text-sm font-semibold text-[#b45d00]">+12%</span>
                        </div>

                        <div class="mt-5 grid gap-3 md:grid-cols-3">
                            <div class="rounded-[20px] bg-[#f9f7f2] p-4">
                                <p class="text-sm text-slate-500">Produk Aktif</p>
                                <p class="mt-2 text-2xl font-semibold text-slate-900">148</p>
                            </div>
                            <div class="rounded-[20px] bg-[#fff7ed] p-4">
                                <p class="text-sm text-slate-500">Menu Unggulan</p>
                                <p class="mt-2 text-2xl font-semibold text-slate-900">24</p>
                            </div>
                            <div class="rounded-[20px] bg-[#fef8ec] p-4">
                                <p class="text-sm text-slate-500">Penjualan</p>
                                <p class="mt-2 text-2xl font-semibold text-slate-900">Rp 12,8 jt</p>
                            </div>
                        </div>
                    </div>

                    <div class="rounded-[24px] border border-slate-200 bg-[#fff7ed] p-5 shadow-sm">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-sm font-semibold text-slate-500">Menu Hari Ini</p>
                                <h3 class="mt-1 text-lg font-semibold text-slate-900">Yang paling laris</h3>
                            </div>
                            <span class="rounded-full bg-white px-3 py-1 text-sm font-semibold text-[#b45d00]">Top 3</span>
                        </div>

                        <ul class="mt-4 space-y-3">
                            @php
                                $topMenus = [
                                    ['name' => 'Matcha Latte', 'value' => '64 order'],
                                    ['name' => 'Croissant Keju', 'value' => '47 order'],
                                    ['name' => 'Mie Goreng Spesial', 'value' => '39 order'],
                                ];
                            @endphp

                            @foreach ($topMenus as $menu)
                                <li class="flex items-center justify-between rounded-2xl bg-white px-4 py-3">
                                    <div>
                                        <p class="font-semibold text-slate-900">{{ $menu['name'] }}</p>
                                        <p class="text-sm text-slate-500">{{ $menu['value'] }}</p>
                                    </div>
                                    <span class="text-sm font-semibold text-[#f08b2e]">★</span>
                                </li>
                            @endforeach
                        </ul>
                    </div>
                </section>

                <section class="mt-6">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-sm font-semibold text-slate-500">Produk Unggulan</p>
                            <h3 class="mt-1 text-xl font-semibold text-slate-900">Rilis terbaru</h3>
                        </div>
                        <a href="#" class="text-sm font-semibold text-[#b45d00]">Lihat Semua</a>
                    </div>

                    <div class="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                        @php
                            $products = [
                                ['name' => 'Cappuccino', 'desc' => 'Espresso dengan susu hangat', 'price' => 'Rp 28k', 'tag' => 'Baru', 'accent' => 'from-[#f7d6b3] to-[#f7c28d]'],
                                ['name' => 'Burger Keju', 'desc' => 'Roti lembut dan daging juicy', 'price' => 'Rp 42k', 'tag' => 'Best Seller', 'accent' => 'from-[#f3d8be] to-[#fde4ad]'],
                                ['name' => 'Tiramisu', 'desc' => 'Dessert lembut dengan kopi', 'price' => 'Rp 35k', 'tag' => 'Promo', 'accent' => 'from-[#e8d6c6] to-[#f3e5d3]'],
                                ['name' => 'Nasi Ayam', 'desc' => 'Nasi hangat dengan saus khas', 'price' => 'Rp 32k', 'tag' => 'Hemat', 'accent' => 'from-[#f4e5b8] to-[#f3d9a7]'],
                            ];
                        @endphp

                        @foreach ($products as $product)
                            <article class="rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm">
                                <div class="flex items-center justify-between">
                                    <span class="rounded-full bg-[#fff6e8] px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#b45d00]">{{ $product['tag'] }}</span>
                                    <span class="text-sm font-semibold text-slate-500">{{ $product['price'] }}</span>
                                </div>
                                <div class="mt-4 h-28 rounded-[20px] bg-gradient-to-br {{ $product['accent'] }}"></div>
                                <h4 class="mt-4 text-lg font-semibold text-slate-900">{{ $product['name'] }}</h4>
                                <p class="mt-1 text-sm leading-6 text-slate-500">{{ $product['desc'] }}</p>
                                <div class="mt-4 flex items-center justify-between">
                                    <span class="text-sm font-medium text-slate-500">Stok 12</span>
                                    <button class="rounded-full bg-slate-900 px-3 py-1.5 text-sm font-semibold text-white">Edit</button>
                                </div>
                            </article>
                        @endforeach
                    </div>
                </section>
            </main>
        </div>
    </body>
</html>
