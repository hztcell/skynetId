// components/Header.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogo } from "../../hooks/useLogo"; // import custom hook
import type { HeaderProps } from "../../interfaces/Header.Interface";

const Header: React.FC<HeaderProps> = ({
  title = "",
  logo: propLogo, // logo dari props (opsional)
  navItems = [],
  user = null,
  onLogin,
  onLogout,
  onLogoClick,
  className = "",
}) => {
  const { logo: contextLogo, loading } = useLogo(); // ambil dari context
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Prioritas: props.logo > contextLogo > fallback (ikon bawaan)
  const finalLogo = propLogo || contextLogo;

  const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev);

  const handleNavClick = (href: string, onClick?: () => void) => {
    if (onClick) {
      onClick();
    } else if (href) {
      navigate(href);
    }
    setMobileMenuOpen(false);
  };

  // Skeleton loading sementara (opsional)
  if (loading) {
    return <div className="h-16 bg-mono-900 animate-pulse"></div>;
  }

  return (
    <>
      <nav
        className={`fixed w-full z-50 glass-effect border-b border-mono-800 ${className}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo / Brand */}
            <div
              className="flex items-center space-x-2 cursor-pointer"
              onClick={onLogoClick}
            >
              {finalLogo ? (
                <img
                  src={finalLogo.src}
                  alt={finalLogo.alt}
                  width={finalLogo.width || 32}
                  height={finalLogo.height || 32}
                  className="rounded-lg object-contain"
                />
              ) : (
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                  <span className="text-mono-900 text-lg">📶</span>
                </div>
              )}
              <span className="text-xl font-bold tracking-tight">{title}</span>
            </div>

            {/* Menu desktop (sama seperti kode Anda) */}
            <div className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleNavClick(item.href, item.onClick)}
                  className={`hover:text-mono-400 transition ${
                    item.active ? "text-mono-400 font-semibold" : ""
                  }`}
                >
                  {item.label}
                </button>
              ))}
              {user ? (
                <div className="flex items-center gap-4">
                  <span className="text-sm">{user.name}</span>
                  <button
                    onClick={onLogout}
                    className="px-4 py-2 border border-red-500 rounded-lg hover:bg-red-500 hover:text-white transition"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={onLogin}
                  className="px-4 py-2 border border-white rounded-lg hover:bg-white hover:text-mono-900 transition flex items-center gap-2"
                >
                  Login
                </button>
              )}
            </div>

            {/* Tombol mobile menu */}
            <button
              className="md:hidden text-2xl"
              onClick={toggleMobileMenu}
              aria-label="Menu"
            >
              ☰
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu (sama seperti kode Anda) */}
      <div
        className={`fixed inset-0 z-40 bg-mono-950 transform transition-transform duration-300 md:hidden ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-8 flex flex-col space-y-6">
          <button
            onClick={toggleMobileMenu}
            className="self-end text-2xl"
            aria-label="Tutup"
          >
            ✕
          </button>
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => handleNavClick(item.href, item.onClick)}
              className="text-xl"
            >
              {item.label}
            </button>
          ))}
          {user ? (
            <>
              <span className="text-xl">Halo, {user.name}</span>
              <button
                onClick={() => {
                  onLogout?.();
                  setMobileMenuOpen(false);
                }}
                className="text-xl text-red-400"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                onLogin?.();
                setMobileMenuOpen(false);
              }}
              className="text-xl text-mono-400"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
