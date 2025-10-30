"use client";

import Preloader from "@/components/molecules/preloader";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const [showPreloader, setShowPreloader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPreloader(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="h-full w-screen bg-black">
      <AnimatePresence mode="popLayout">
        {showPreloader ? (
          <motion.div
            key="preloader"
            initial={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 1, ease: [0.785, 0.135, 0.15, 0.86] }}
          >
            <Preloader />
          </motion.div>
        ) : (
          <motion.div className="size-full" key="main">
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
