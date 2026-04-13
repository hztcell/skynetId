// interfaces/Header.interface.ts

export interface NavItem {
  label: string;
  href: string;
  active?: boolean;
  onClick?: () => void;
}

export interface User {
  id: string | number;
  name: string;
  email?: string;
  avatar?: string;
}

export interface HeaderProps {
  title?: string;
  logo?: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
  };
  navItems?: NavItem[];
  user?: User | null;
  onLogin?: () => void;
  onLogout?: () => void;
  onLogoClick?: () => void;
  className?: string;
}
