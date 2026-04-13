import { useContext } from "react";
import { LogoContext } from "../contexts/LogoContext";
import type { LogoContextValue } from "../interfaces/Logo.interface";

export const useLogo = (): LogoContextValue => {
  const context = useContext(LogoContext);
  if (context === undefined) {
    throw new Error("useLogo must be used within a LogoProvider");
  }
  return context;
};
