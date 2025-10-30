"use client";

import Preloader from "@/components/molecules/preloader";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Menu from "@/components/molecules/menu";

export default function Home() {
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
            <section className="relative h-full bg-black">
              <Menu />
            </section>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
