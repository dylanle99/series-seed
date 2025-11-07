"use client";

import Preloader from "@/components/molecules/preloader";
import { useState, useEffect, useRef, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import NavigationMenu from "@/components/molecules/navigation-menu";
import Logo from "@/components/molecules/logo";
import Footer from "@/components/molecules/footer";
import { usePathname } from "next/navigation";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [showPreloader, setShowPreloader] = useState(() => pathname === "/");
  const hasTriggeredRef = useRef(false);

  const markPreloaderComplete = useCallback(() => {
    if (typeof window === "undefined") return;
    (window as any).__PRELOADER_DONE__ = true;
  }, []);

  const startExit = useCallback(() => {
    if (hasTriggeredRef.current) return;
    hasTriggeredRef.current = true;
    markPreloaderComplete();
    try {
      window.dispatchEvent(new CustomEvent("preloader:exit-start"));
    } catch (error) {
      console.error("[Preloader] Failed to dispatch exit event", error);
    }
    setShowPreloader(false);
  }, [markPreloaderComplete]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const hasSeenPreloader = (window as any).__PRELOADER_DONE__ === true;
    const shouldShow = pathname === "/" && !hasSeenPreloader;

    setShowPreloader(shouldShow);

    if (!shouldShow) {
      hasTriggeredRef.current = false;
      markPreloaderComplete();
    }
  }, [pathname, markPreloaderComplete]);

  useEffect(() => {
    if (!showPreloader) return;

    // Safety fallback: in case the video "ended" event doesn't fire
    const failSafe = setTimeout(() => {
      startExit();
    }, 4000);

    return () => clearTimeout(failSafe);
  }, [showPreloader, startExit]);

  return (
    <main className="h-full w-screen bg-black">
      <div className="relative size-full">
        {/* Main content stays mounted underneath */}
        <div className="size-full">
          <header className="absolute inset-x-0 top-0 z-50">
            <nav
              aria-label="Global"
              className="relative z-10 flex items-start justify-between p-8 md:px-16 [word-spacing:-0.05em] md:[word-spacing:normal]"
            >
              <div className="flex lg:flex-1">
                <a href="/" className="-m-1.5 p-1.5">
                  <Logo className="size-8 lg:size-10" />
                </a>
              </div>
              <NavigationMenu placement="inline" />
            </nav>
          </header>
          {children}

          <Footer />
        </div>

        {/* Preloader overlay that slides up to reveal content */}
        <AnimatePresence mode="wait">
          {showPreloader && (
            <motion.div
              key="preloader"
              className="fixed inset-0 z-50"
              initial={{ y: 0 }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ duration: 1.2, ease: [0.785, 0.135, 0.15, 0.86] }}
            >
              <Preloader onFinished={startExit} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
