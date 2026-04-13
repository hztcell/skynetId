// contexts/LogoContext.tsx
import { createContext } from "react";
import type { LogoContextValue } from "../interfaces/Logo.interface";

export const LogoContext = createContext<LogoContextValue | undefined>(
  undefined,
);
