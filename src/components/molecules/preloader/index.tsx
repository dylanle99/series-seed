"use client";

// import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import Image from "next/image";

// import { useIsMobile } from '@/components/hooks/use-is-mobile'

const Preloader = () => {
  // const [showPreloader, setShowPreloader] = useState(true);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setShowPreloader(false);
  //   }, 2500);
  //
  //   return () => clearTimeout(timer);
  // }, []);

  return (
    <main className="h-full w-screen bg-black">
      {/*
      <AnimatePresence mode="popLayout">
        {showPreloader ? (
          <motion.div
            key="preloader"
            initial={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 1, ease: [0.785, 0.135, 0.15, 0.86] }}
          >
            <Preloader_001 />
          </motion.div>
        ) : (
          <motion.div className="size-full" key="main">
            <Main />
          </motion.div>
        )}
      </AnimatePresence>
      */}
      <Preloader_001 />
    </main>
  );
};

export { Preloader };

/* const Main = () => {
  const list = [
    {
      name: "Sydney",
      value: 21.1,
      date: "2025-01-01",
    },
    {
      name: "Melbourne",
      value: 15.2,
      date: "2025-01-02",
    },
    {
      name: "Brisbane",
      value: 10.3,
      date: "2025-01-03",
    },
    {
      name: "Mumbai",
      value: 8.4,
      date: "2025-01-04",
    },
    {
      name: "Los Angeles",
      value: 6.5,
      date: "2025-01-05",
    },
    {
      name: "Mexico City",
      value: 4.6,
      date: "2025-01-06",
    },
    {
      name: "London",
      value: 2.7,
      date: "2025-01-07",
    },
  ];

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const isMobile = useIsMobile();

  return (
    <div className="relative flex h-full w-screen flex-col items-center justify-center overflow-hidden font-sans text-[#FF4F00]">
      <motion.ul
        layout
        className="mt-25 z-10 flex w-full flex-col items-center justify-center gap-1"
      >
        {list.map((item, index) => (
          <motion.li
            initial={{ y: 350, opacity: 0 }}
            animate={{
              y: 0,
              opacity: 1,
              height:
                hoveredIndex === index
                  ? !isMobile
                    ? 120
                    : 60
                  : !isMobile
                    ? 83
                    : 40,
            }}
            transition={{
              duration: 0.7,
              ease: [0.215, 0.61, 0.355, 1],
              delay: index * 0.035 + 0.5,

              height: {
                duration: 0.15,
                ease: "easeOut",
              },
            }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            className="relative my-2 flex w-fit cursor-pointer flex-col items-center lg:px-20"
            key={index}
          >
            <div className="relative flex items-start gap-5">
              <span className="text-[7vw] font-extrabold uppercase leading-[0.8] tracking-[-0.03em]">
                {item.name}
              </span>
              <span className="absolute -right-2 top-1 w-fit translate-x-full text-[2vw] font-bold leading-[0.9] tracking-tighter">
                {item.value}k
              </span>
            </div>

            <AnimatePresence mode="popLayout">
              {hoveredIndex === index && (
                <motion.h2
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="whitespace-nowrap text-[2vw] font-bold uppercase leading-[0.9] tracking-[-0.06em]"
                >
                  {item.date}
                </motion.h2>
              )}
            </AnimatePresence>
          </motion.li>
        ))}
        <motion.li
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut", delay: 0.6 }}
          className="font-inter mt-10 font-black uppercase leading-[0.8] tracking-[-0.03em] text-white lg:text-3xl"
        >
          find your race
        </motion.li>
      </motion.ul>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.5 }}
        className="absolute bottom-0 z-0 h-[50vh]"
      >
        <img
          src="/preloader/bottom-bg.png"
          alt=""
          className="size-full object-cover"
        />
      </motion.div>
    </div>
  );
}; */

const Preloader_001 = () => {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center text-[#FF4F00]">
      <div className="px-8 lg:px-0 z-50 flex max-w-4xl flex-col items-center justify-center gap-10">
        <h1 className="text-center text-[9vw] font-extrabold uppercase leading-[0.8] tracking-[-0.03em]">
          series seed <br /> Made©2025
        </h1>
        <div className="h-25 flex w-full items-center justify-center xl:justify-between gap-4 xl:gap-0">
          <div>
            <SeriesSeedLogo className="w-18 h-10" />
          </div>
          <h3 className="text-2xl font-extrabold uppercase leading-[0.9] tracking-[-0.06em]">
            Powered by <br /> Series Seed
          </h3>
        </div>
        <h1 className="text-center text-[9vw] font-extrabold uppercase leading-[0.8] tracking-[-0.06em]">
          Nurture leaders of tomorrow.
        </h1>
      </div>
      <div className="absolute inset-0 z-20">
        <video
          className="h-full w-full object-cover"
          autoPlay
          muted
          playsInline
        >
          <source src="/preloader/video-bg.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  );
};

const SeriesSeedLogo = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <Image src="/logo/series-seed.svg" alt="Series Seed Logo" width={42} height={22} />
  );
};

/**
 * Skiper 7 Preloader_001 — React + Framer Motion
 * Inspired by and adapted from https://afterdarktour.nike.com/en/home
 * We respect the original creators. This is an inspired rebuild with our own taste and does not claim any ownership.
 * Illustrations by https://afterdarktour.nike.com/en/home
 *
 * License & Usage:
 * - Free to use and modify in both personal and commercial projects.
 * - Attribution to Skiper UI is required when using the free version.
 * - No attribution required with Skiper UI Pro.
 * - Cannot use original Nike illustrations or videos for commercial purposes.
 *
 * Feedback and contributions are welcome.
 *
 * Author: @gurvinder-singh02
 * Website: https://gxuri.in
 * Twitter: https://x.com/Gur__vi
 */
