"use client";

import { Menu } from "lucide-react";
import React from "react";

type MenuButtonProps = {
  onClick: () => void;
  ariaLabel?: string;
  className?: string;
  variant?: "fixed" | "inline";
  dotColorClass?: string; // e.g. bg-white, bg-brand-orange
};

export default function MenuButton({
  onClick,
  ariaLabel = "Open menu",
  className = "",
  variant = "fixed",
}: MenuButtonProps) {
  const positionClasses = variant === "fixed" ? "fixed top-8 left-8 z-40" : "relative z-40";
  return (
    <button
      onClick={onClick}
      className={`${positionClasses} flex flex-col gap-1 hover:opacity-70 transition-opacity cursor-pointer ${className}`}
      aria-label={ariaLabel}
    >
      <Menu className="w-6 h-6 lg:w-8 lg:h-8 text-brand-orange" />
    </button>
  );
}
