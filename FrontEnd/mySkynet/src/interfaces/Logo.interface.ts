export interface Logo {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface LogoContextValue {
  logo: Logo;
  setLogo: (logo: Logo) => void;
  reloadLogo: () => Promise<void>;
  loading: boolean;
  error: string | null;
}
