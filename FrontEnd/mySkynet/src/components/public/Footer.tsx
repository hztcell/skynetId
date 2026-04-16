// components/Footer.tsx
import React from "react";
import { useNavigate } from "react-router-dom";

export interface FooterLink {
  label: string;
  href?: string;
  onClick?: () => void;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export interface ContactInfo {
  phone?: string;
  email?: string;
  address?: string;
}

export interface SocialLink {
  icon: string; // class fontawesome, misal: "fab fa-facebook"
  href: string;
  label?: string;
}

export interface Logo {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
}

export interface FooterProps {
  logo?: Logo;
  title?: string;
  columns?: FooterColumn[];
  contactInfo?: ContactInfo;
  socialLinks?: SocialLink[];
  copyrightText?: string;
  className?: string;
  onLogoClick?: () => void;
}

const Footer: React.FC<FooterProps> = ({
  logo,
  title = "SKYNET",
  columns,
  contactInfo,
  socialLinks,
  copyrightText = "© 2026 Skynet. All rights reserved.",
  className = "",
  onLogoClick,
}) => {
  const navigate = useNavigate();

  const handleLinkClick = (link: FooterLink) => {
    if (link.onClick) {
      link.onClick();
    } else if (link.href) {
      if (link.href.startsWith("http")) {
        window.open(link.href, "_blank", "noopener noreferrer");
      } else {
        navigate(link.href);
      }
    }
  };

  // Data default jika tidak ada props
  const defaultColumns: FooterColumn[] = [
    {
      title: "Layanan",
      links: [
        { label: "Internet Rumah", href: "/layanan/internet-rumah" },
        { label: "Internet Bisnis", href: "/layanan/internet-bisnis" },
        { label: "Dedicated Server", href: "/layanan/dedicated-server" },
        { label: "Cloud Services", href: "/layanan/cloud" },
      ],
    },
    {
      title: "Dukungan",
      links: [
        { label: "Pusat Bantuan", href: "/dukungan" },
        { label: "Cek Coverage", href: "/coverage" },
        { label: "Status Jaringan", href: "/status" },
        { label: "Kontak Kami", href: "/kontak" },
      ],
    },
  ];

  const defaultContactInfo: ContactInfo = {
    phone: "1500-123",
    email: "info@netstream.id",
    address: "Jakarta, Indonesia",
  };

  const finalColumns = columns && columns.length > 0 ? columns : defaultColumns;
  const finalContactInfo = contactInfo || defaultContactInfo;
  const finalSocialLinks = socialLinks || [];

  return (
    <footer
      className={`bg-mono-950 border-t border-mono-800 pt-16 pb-8 px-4 ${className}`}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        {/* Kolom Brand & Deskripsi */}
        <div>
          <div
            className="flex items-center space-x-2 mb-4 cursor-pointer"
            onClick={onLogoClick}
          >
            {logo ? (
              <img
                src={logo.src}
                alt={logo.alt || "logo"}
                width={logo.width || 32}
                height={logo.height || 32}
                className="rounded-lg object-contain"
              />
            ) : (
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <i className="fas fa-wifi text-mono-900"></i>
              </div>
            )}
            <span className="text-xl font-bold">{title}</span>
          </div>
          <p className="text-mono-500">
            Penyedia layanan internet berkecepatan tinggi untuk rumah dan bisnis
            Anda.
          </p>
          {finalSocialLinks.length > 0 && (
            <div className="flex space-x-4 mt-4">
              {finalSocialLinks.map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-mono-500 hover:text-white transition"
                  aria-label={social.label}
                >
                  <i className={social.icon}></i>
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Kolom dinamis berdasarkan columns */}
        {finalColumns.map((col, idx) => (
          <div key={idx}>
            <h4 className="font-semibold mb-4">{col.title}</h4>
            <ul className="space-y-2 text-mono-500">
              {col.links.map((link, linkIdx) => (
                <li key={linkIdx}>
                  <button
                    onClick={() => handleLinkClick(link)}
                    className="hover:text-white transition"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Kolom Kontak */}
        <div>
          <h4 className="font-semibold mb-4">Kontak</h4>
          <ul className="space-y-2 text-mono-500">
            {finalContactInfo.phone && (
              <li>
                <i className="fas fa-phone mr-2"></i>
                <button
                  onClick={() =>
                    (window.location.href = `tel:${finalContactInfo.phone}`)
                  }
                  className="hover:text-white transition"
                >
                  {finalContactInfo.phone}
                </button>
              </li>
            )}
            {finalContactInfo.email && (
              <li>
                <i className="fas fa-envelope mr-2"></i>
                <button
                  onClick={() =>
                    (window.location.href = `mailto:${finalContactInfo.email}`)
                  }
                  className="hover:text-white transition"
                >
                  {finalContactInfo.email}
                </button>
              </li>
            )}
            {finalContactInfo.address && (
              <li>
                <i className="fas fa-map-marker-alt mr-2"></i>
                <span>{finalContactInfo.address}</span>
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className="border-t border-mono-800 pt-8 text-center text-mono-600">
        <p>{copyrightText}</p>
      </div>
    </footer>
  );
};

export default Footer;
