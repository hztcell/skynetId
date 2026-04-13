import { useState, useEffect } from "react";
import type { ReactNode } from "react";
import { LogoContext } from "../contexts/LogoContext";
import type { Logo } from "../interfaces/Logo.interface";
import defaultLogo from "../assets/logo_invoice_1.png";

interface LogoProviderProps {
  children: ReactNode;
}

export const LogoProvider = ({ children }: LogoProviderProps) => {
  const [logo, setLogo] = useState<Logo>({
    src: defaultLogo,
    alt: "Default Logo",
    width: 240,
    height: 160,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLogoFromAPI = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/settings/logo");
      if (!response.ok) throw new Error("Gagal mengambil data logo");
      const data = await response.json();
      setLogo({
        src: data.url,
        alt: data.alt,
        width: data.width,
        height: data.height,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
      console.error("Error fetching logo:", err);
    } finally {
      setLoading(false);
    }
  };

  const updateLogo = async (newLogo: Logo) => {
    try {
      const response = await fetch("/api/settings/logo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newLogo),
      });
      if (!response.ok) throw new Error("Gagal menyimpan logo");
      setLogo(newLogo);
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  useEffect(() => {
    fetchLogoFromAPI();
  }, []);

  const value = {
    logo,
    setLogo: updateLogo,
    reloadLogo: fetchLogoFromAPI,
    loading,
    error,
  };

  return <LogoContext.Provider value={value}>{children}</LogoContext.Provider>;
};
