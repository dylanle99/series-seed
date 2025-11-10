"use client";

import { useState } from "react";
import Link from "next/link";
import { X, Linkedin, Instagram } from "lucide-react";
import MenuButton from "./menu-button";
import Logo from "../logo";

type NavigationMenuProps = {
  placement?: "inline" | "fixed";
};

export default function NavigationMenu({ placement = "fixed" }: NavigationMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { label: "Vision", href: "/vision" },
    { label: "Community", href: "/community" },
    { label: "Events", href: "/events" },
    { label: "Contact", href: "/contact" },
  ];

  const footerLinks = [
    { label: "TERMS OF SERVICE", href: "/terms-of-service" },
    { label: "PRIVACY POLICY", href: "/privacy-policy" },
  ];

  return (
    <>
      {!isOpen && (
        <MenuButton
          onClick={() => setIsOpen(true)}
          variant={placement === "inline" ? "inline" : "fixed"}
          ariaLabel="Open menu"
        />
      )}

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black overflow-hidden">
          <div className="relative h-full flex flex-col">
            <div className="relative z-10 flex items-start justify-between p-8 md:px-16 [word-spacing:-0.05em] md:[word-spacing:normal]">
              <Logo className="size-8 lg:size-10" />
              <button
                onClick={() => setIsOpen(false)}
                className="w-12 h-12 rounded-full border border-brand-orange/30 flex items-center justify-center hover:bg-brand-orange/10 transition-colors"
                aria-label="Close menu"
              >
                <X className="w-5 h-5 text-brand-orange" />
              </button>
            </div>

            <nav className="relative z-10 flex-1 flex items-center px-8 md:px-16">
              <ul className="space-y-4 md:space-y-6">
                {menuItems.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-brand-orange font-semibold uppercase leading-[0.8] tracking-[-0.03em] hover:underline"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="relative z-10 flex items-end justify-between p-8 md:px-16 gap-8 flex-wrap">
              <div className="flex gap-6 flex-wrap">
                {footerLinks.map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-brand-orange text-xs tracking-wider hover:opacity-70 transition-opacity hover:underline text-medium"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              <div className="flex gap-4">
                <Link
                  href="https://instagram.com/seriesseed"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-orange hover:opacity-70 transition-opacity"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </Link>
                <Link
                  href="https://www.tiktok.com/@seriesseed"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-orange hover:opacity-70 transition-opacity"
                  aria-label="TikTok"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-.88-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
                  </svg>
                </Link>
              </div>
            </div>

            <div className="pointer-events-none absolute -top-20 right-0 w-[27rem] max-w-xl">
              <div className="relative w-full">
                <img
                  src="/menu/bg-image.png"
                  className="w-full animate-fade-in rounded-2xl object-cover"
                  alt=""
                />
                <div
                  className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/95 via-black/70 to-transparent"
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
