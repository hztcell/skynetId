import Header from "./components/public/Header";
import Footer from "./components/public/Footer";
import { useState, useEffect, useRef } from "react";
import {
  MapPin,
  Search,
  ChevronDown,
  Navigation,
  Loader2,
  Cable,
  Wifi,
  Infinity as InfinityIcon,
} from "lucide-react";
interface City {
  id: string;
  name: string;
}

interface Street {
  id: string;
  name: string;
  CityId: string;
}

const Citys: City[] = [
  { id: "1", name: "DKI Jakarta" },
  { id: "2", name: "Jawa Barat" },
  { id: "3", name: "Jawa Timur" },
  { id: "4", name: "Jawa Tengah" },
  { id: "5", name: "Bali" },
];

const cities: Street[] = [
  { id: "1", name: "Jakarta Selatan", CityId: "1" },
  { id: "2", name: "Jakarta Utara", CityId: "1" },
  { id: "3", name: "Bandung", CityId: "2" },
  { id: "4", name: "Bekasi", CityId: "2" },
  { id: "5", name: "Surabaya", CityId: "3" },
  { id: "6", name: "Malang", CityId: "3" },
  { id: "7", name: "Semarang", CityId: "4" },
  { id: "8", name: "Yogyakarta", CityId: "4" },
  { id: "9", name: "Denpasar", CityId: "5" },
];

// Custom hook untuk click outside
// Ganti fungsi useClickOutside dengan ini:
function useClickOutside<T extends HTMLElement = HTMLElement>(
  ref: React.RefObject<T | null>,
  handler: () => void,
) {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [ref, handler]);
}

const PriceTag = () => {
  return (
    <div className="inline-flex flex-col items-start px-8 py-6 transform hover:scale-105 transition-transform cursor-default">
      {/* "Hanya" - Di atas angka */}
      <span className="text-white font-black text-2xl md:text-3xl tracking-tight leading-none italic drop-shadow-[2px_2px_0px_rgba(185,28,28,1)]">
        Hanya
      </span>

      <div className="flex items-start">
        {/* "Rp" - Di kiri atas */}
        <span className="text-white font-black text-2xl md:text-4xl italic leading-none pt-1 drop-shadow-[2px_2px_0px_rgba(185,28,28,1)]">
          Rp
        </span>

        {/* "100.000" - Utama */}
        <span className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-none italic drop-shadow-[4px_4px_0px_rgba(185,28,28,1)]">
          100.000
        </span>

        {/* "/ Bulan" - Di kanan bawah */}
        <span className="text-white font-bold text-lg md:text-3xl self-end mb-1 ml-1 italic drop-shadow-[2px_2px_0px_rgba(185,28,28,1)]">
          / Bulan
        </span>
      </div>
    </div>
  );
};

function App() {
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedStreet, setSelectedStreet] = useState<string>("");
  const [isCityOpen, setIsCityOpen] = useState(false);
  const [isStreetOpen, setIsStreetOpen] = useState(false);
  const [isLocating, setIsLocating] = useState(false);

  const CityRef = useRef<HTMLDivElement>(null);
  const StreetRef = useRef<HTMLDivElement>(null);

  // Handle click outside dengan custom hook
  useClickOutside(CityRef, () => setIsCityOpen(false));
  useClickOutside(StreetRef, () => setIsStreetOpen(false));

  const filteredCities = cities.filter(
    (Street) => Street.CityId === selectedCity,
  );

  const handleCitySelect = (CityId: string) => {
    setSelectedCity(CityId);
    setSelectedStreet("");
    setIsCityOpen(false);
  };

  const handleStreetSelect = (StreetId: string) => {
    setSelectedStreet(StreetId);
    setIsStreetOpen(false);
  };

  const handleSearch = () => {
    if (!selectedCity) {
      alert("Silakan pilih provinsi terlebih dahulu");
      return;
    }
    console.log("Searching for:", {
      City: Citys.find((p) => p.id === selectedCity)?.name,
      Street: cities.find((c) => c.id === selectedStreet)?.name,
    });
  };

  const handleMyLocation = () => {
    if (!navigator.geolocation) {
      alert("Browser Anda tidak mendukung geolocation");
      return;
    }

    setIsLocating(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setIsLocating(false);
        console.log("Location:", position.coords);
        alert(
          `Latitude: ${position.coords.latitude.toFixed(4)}\nLongitude: ${position.coords.longitude.toFixed(4)}`,
        );
      },
      (error) => {
        setIsLocating(false);
        let errorMessage = "Gagal mendapatkan lokasi";
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Izin lokasi ditolak. Mohon izinkan akses lokasi.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Informasi lokasi tidak tersedia.";
            break;
          case error.TIMEOUT:
            errorMessage = "Timeout saat mengambil lokasi.";
            break;
        }
        alert(errorMessage);
      },
      { timeout: 10000, enableHighAccuracy: true },
    );
  };

  const selectedCityName =
    Citys.find((p) => p.id === selectedCity)?.name || "Pilih Kota";
  const selectedStreetName =
    cities.find((c) => c.id === selectedStreet)?.name || "Pilih Jalan";

  return (
    <div className="bg-zinc-950 text-white font-sans antialiased min-h-screen">
      {/* CSS Custom untuk efek yang tidak ada di Tailwind default */}
      <style>{`
  .gradient-text {
    background: linear-gradient(135deg, #d97706 0%, #fbbf24 50%, #f59e0b 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .fade-in {
    animation: fadeIn 0.5s ease-in;
  }
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`}</style>

      <Header />

      <div id="userView" className="fade-in">
        {/* Hero Section dengan Search Bar */}
        <section className="relative pt-40 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="max-w-7xl mx-auto relative z-10 text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Internet <span className="gradient-text">Cepat & Stabil</span>
              <br />
              Untuk Masa Depan
            </h1>
            <p className="text-xl text-zinc-400 mb-10 max-w-2xl mx-auto">
              Nikmati pengalaman browsing tanpa batas dengan jaringan fiber
              optic berkecepatan tinggi hingga 1 Gbps
            </p>

            <div className="flex flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-white text-zinc-900 rounded-full font-semibold hover:bg-zinc-200 transition-all duration-200 transform hover:scale-105 shadow-lg">
                Lihat Paket
              </button>
              <button className="px-8 py-4 border border-zinc-600 rounded-full font-semibold hover:bg-zinc-900 hover:border-zinc-500 transition-all duration-200">
                Hubungi Kami
              </button>
            </div>

            <div className="flex justify-center mt-10">
              <PriceTag />
            </div>
          </div>
        </section>

        {/* SEARCH BAR */}
        <div className="max-w-4xl mx-auto mb-20 px-4">
          <div className="flex flex-col sm:flex-row gap-3 p-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl">
            {/* Dropdown Provinsi */}
            <div className="relative flex-1" ref={CityRef}>
              <button
                onClick={() => {
                  setIsCityOpen(!isCityOpen);
                  setIsStreetOpen(false);
                }}
                className="w-full flex items-center justify-between px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-600/50"
                aria-expanded={isCityOpen}
                aria-haspopup="listbox"
              >
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-red-700 flex-shrink-0" />
                  <span
                    className={`text-sm font-medium truncate ${
                      !selectedCity ? "text-zinc-400" : "text-white"
                    }`}
                  >
                    {selectedCityName}
                  </span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-zinc-400 transition-transform duration-200 flex-shrink-0 ${
                    isCityOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown Menu Provinsi */}
              {isCityOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 py-2 bg-zinc-900/95 backdrop-blur-xl border border-zinc-700 rounded-2xl shadow-2xl max-h-60 overflow-auto z-50">
                  {Citys.map((City) => (
                    <button
                      key={City.id}
                      onClick={() => handleCitySelect(City.id)}
                      className="w-full px-6 py-3 text-left text-sm text-zinc-300 hover:text-white hover:bg-white/5 transition-colors focus:outline-none focus:bg-white/10"
                      role="option"
                      aria-selected={selectedCity === City.id}
                    >
                      {City.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Dropdown City */}
            <div className="relative flex-1" ref={StreetRef}>
              <button
                onClick={() => {
                  if (selectedCity) {
                    setIsStreetOpen(!isStreetOpen);
                    setIsCityOpen(false);
                  }
                }}
                disabled={!selectedCity}
                className={`w-full flex items-center justify-between px-6 py-3 rounded-full border border-white/10 text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-600/50 ${
                  selectedCity
                    ? "bg-white/5 hover:bg-white/10 cursor-pointer"
                    : "bg-white/5 opaStreet-50 cursor-not-allowed"
                }`}
                aria-expanded={isStreetOpen}
                aria-haspopup="listbox"
              >
                <div className="flex items-center gap-3">
                  <Navigation className="w-5 h-5 text-red-700 flex-shrink-0" />
                  <span
                    className={`text-sm font-medium truncate ${
                      !selectedStreet ? "text-zinc-400" : "text-white"
                    }`}
                  >
                    {selectedStreetName}
                  </span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-zinc-400 transition-transform duration-200 flex-shrink-0 ${
                    isStreetOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown Menu City */}
              {isStreetOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 py-2 bg-zinc-900/95 backdrop-blur-xl border border-zinc-700 rounded-2xl shadow-2xl max-h-60 overflow-auto z-50">
                  {filteredCities.length > 0 ? (
                    filteredCities.map((Street) => (
                      <button
                        key={Street.id}
                        onClick={() => handleStreetSelect(Street.id)}
                        className="w-full px-6 py-3 text-left text-sm text-zinc-300 hover:text-white hover:bg-white/5 transition-colors focus:outline-none focus:bg-white/10"
                        role="option"
                        aria-selected={selectedStreet === Street.id}
                      >
                        {Street.name}
                      </button>
                    ))
                  ) : (
                    <div className="px-6 py-3 text-sm text-zinc-500 italic">
                      Tidak ada City tersedia
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Tombol Cari */}
            <button
              onClick={handleSearch}
              className="px-8 py-3 rounded-full bg-red-700 hover:bg-red-600 active:scale-95 text-white font-semibold text-sm transition-all duration-200 shadow-lg shadow-red-500/25 flex items-center justify-center gap-2 min-w-[100px] focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-zinc-950"
            >
              <Search className="w-4 h-4" />
              Cari
            </button>

            {/* Tombol Lokasi Saya */}
            <button
              onClick={handleMyLocation}
              disabled={isLocating}
              className="px-6 py-3 rounded-full bg-red-800 hover:bg-red-700 active:scale-95 text-white font-semibold text-sm transition-all duration-200 shadow-lg shadow-red-500/25 flex items-center justify-center gap-2 whitespace-nowrap disabled:opaStreet-70 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-zinc-950"
            >
              {isLocating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="hidden sm:inline">Mencari...</span>
                </>
              ) : (
                <>
                  <Navigation className="w-4 h-4" />
                  <span className="hidden sm:inline">Lokasi Saya</span>
                  <span className="sm:hidden">Lokasi</span>
                </>
              )}
            </button>
          </div>

          <p className="text-center text-zinc-500 text-xs mt-3">
            Pilih lokasi atau gunakan fitur lokasi saya untuk menemukan layanan
            terdekat
          </p>
        </div>

        {/* FEATURE CARDS - Keunggulan Layanan */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 mb-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1: 100% Fiber Optic */}
              <div className="group relative overflow-hidden rounded-3xl bg-zinc-900/40 border border-white/10 backdrop-blur-md p-8 text-center transition-all duration-300 hover:bg-zinc-900/70 hover:border-amber-500/30 hover:shadow-2xl hover:shadow-amber-500/10 hover:-translate-y-1">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10">
                  <div className="inline-flex items-center justify-center w-20 h-20 mb-6 rounded-2xl bg-zinc-950 border border-zinc-800 shadow-inner group-hover:scale-110 transition-transform duration-300">
                    <Cable
                      className="w-10 h-10 text-amber-400"
                      strokeWidth={1.5}
                    />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    100% Fiber Optic
                  </h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    Koneksi stabil berkecepatan tinggi dengan teknologi serat
                    optik terkini
                  </p>
                </div>
              </div>

              {/* Card 2: Modem WiFi */}
              <div className="group relative overflow-hidden rounded-3xl bg-zinc-900/40 border border-white/10 backdrop-blur-md p-8 text-center transition-all duration-300 hover:bg-zinc-900/70 hover:border-amber-500/30 hover:shadow-2xl hover:shadow-amber-500/10 hover:-translate-y-1">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10">
                  <div className="inline-flex items-center justify-center w-20 h-20 mb-6 rounded-2xl bg-zinc-950 border border-zinc-800 shadow-inner group-hover:scale-110 transition-transform duration-300">
                    <Wifi
                      className="w-10 h-10 text-amber-400"
                      strokeWidth={1.5}
                    />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">1 : 1</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    Simetris Download : Upload
                  </p>
                </div>
              </div>

              {/* Card 3: Tanpa Kuota */}
              <div className="group relative overflow-hidden rounded-3xl bg-zinc-900/40 border border-white/10 backdrop-blur-md p-8 text-center transition-all duration-300 hover:bg-zinc-900/70 hover:border-amber-500/30 hover:shadow-2xl hover:shadow-amber-500/10 hover:-translate-y-1">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10">
                  <div className="inline-flex items-center justify-center w-20 h-20 mb-6 rounded-2xl bg-zinc-950 border border-zinc-800 shadow-inner group-hover:scale-110 transition-transform duration-300">
                    <InfinityIcon
                      className="w-10 h-10 text-amber-400"
                      strokeWidth={1.5}
                    />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Tanpa Kuota
                  </h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    Internet unlimited tanpa batasan FUP atau pengurangan
                    kecepatan
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="packagesSection" className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Pilih Paket Internet
              </h2>
              <p className="text-zinc-400">
                Paket yang dapat disesuaikan dengan kebutuhan Anda
              </p>
            </div>

            <div
              id="userPackages"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {/* Package cards akan dirender di sini */}
            </div>
          </div>
        </section>

        <section
          id="promoBanner"
          className="py-16 px-4 bg-gradient-to-r from-zinc-900 to-zinc-800 border-y border-zinc-700 hidden"
        >
          <div className="max-w-7xl mx-auto text-center">
            <div className="inline-block px-4 py-1 bg-white text-zinc-900 rounded-full text-sm font-bold mb-4">
              PROMO SPESIAL
            </div>
            <h3
              id="promoText"
              className="text-3xl md:text-4xl font-bold mb-4"
            ></h3>
            <p id="promoDesc" className="text-zinc-400 text-lg"></p>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}

export default App;
