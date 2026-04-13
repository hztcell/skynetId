import Header from "./components/public/Header";

function App() {
  return (
    <>
      <div
        className="bg-mono-950 text-white font-sans antialiased
"
      >
        <Header />

        <div id="userView" className="fade-in">
          <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-mono-800 via-mono-950 to-mono-950 opacity-50"></div>
            <div className="max-w-7xl mx-auto relative z-10 text-center">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                Internet <span className="gradient-text">Cepat & Stabil</span>
                <br />
                Untuk Masa Depan
              </h1>
              <p className="text-xl text-mono-400 mb-10 max-w-2xl mx-auto">
                Nikmati pengalaman browsing tanpa batas dengan jaringan fiber
                optic berkecepatan tinggi hingga 1 Gbps
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-4 bg-white text-mono-900 rounded-full font-semibold hover:bg-mono-200 transition transform hover:scale-105">
                  Lihat Paket
                </button>
                <button className="px-8 py-4 border border-mono-600 rounded-full font-semibold hover:bg-mono-900 transition">
                  Hubungi Kami
                </button>
              </div>
            </div>
          </section>

          <section className="py-12 border-y border-mono-800 bg-mono-900/50">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-white">50K+</div>
                <div className="text-mono-500 mt-1">Pelanggan Aktif</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">99.9%</div>
                <div className="text-mono-500 mt-1">Uptime Jaringan</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">24/7</div>
                <div className="text-mono-500 mt-1">Dukungan Teknis</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">1Gbps</div>
                <div className="text-mono-500 mt-1">Kecepatan Maksimal</div>
              </div>
            </div>
          </section>

          <section id="packagesSection" className="py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Pilih Paket Internet
                </h2>
                <p className="text-mono-400">
                  Paket yang dapat disesuaikan dengan kebutuhan Anda
                </p>
              </div>

              <div
                id="userPackages"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              ></div>
            </div>
          </section>

          <section
            id="promoBanner"
            className="py-16 px-4 bg-linear-to-r from-mono-900 to-mono-800 border-y border-mono-700 hidden"
          >
            <div className="max-w-7xl mx-auto text-center">
              <div className="inline-block px-4 py-1 bg-white text-mono-900 rounded-full text-sm font-bold mb-4">
                PROMO SPESIAL
              </div>
              <h3
                id="promoText"
                className="text-3xl md:text-4xl font-bold mb-4"
              ></h3>
              <p id="promoDesc" className="text-mono-400 text-lg"></p>
            </div>
          </section>

          <footer className="bg-mono-950 border-t border-mono-800 pt-16 pb-8 px-4">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                    <i className="fas fa-wifi text-mono-900"></i>
                  </div>
                  <span className="text-xl font-bold">NETSTREAM</span>
                </div>
                <p className="text-mono-500">
                  Penyedia layanan internet berkecepatan tinggi untuk rumah dan
                  bisnis Anda.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Layanan</h4>
                <ul className="space-y-2 text-mono-500">
                  <li>Internet Rumah</li>
                  <li>Internet Bisnis</li>
                  <li>Dedicated Server</li>
                  <li>Cloud Services</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Dukungan</h4>
                <ul className="space-y-2 text-mono-500">
                  <li>Pusat Bantuan</li>
                  <li>Cek Coverage</li>
                  <li>Status Jaringan</li>
                  <li>Kontak Kami</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Kontak</h4>
                <ul className="space-y-2 text-mono-500">
                  <li>
                    <i className="fas fa-phone mr-2"></i>1500-123
                  </li>
                  <li>
                    <i className="fas fa-envelope mr-2"></i>info@netstream.id
                  </li>
                  <li>
                    <i className="fas fa-map-marker-alt mr-2"></i>Jakarta,
                    Indonesia
                  </li>
                </ul>
              </div>
            </div>
            <div className="border-t border-mono-800 pt-8 text-center text-mono-600">
              <p>&copy; 2026 NetStream. All rights reserved.</p>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}

export default App;
