"use client";

import Image from "next/image";
import { Badge } from "@/components/atomic/badge";
import { cn } from "@/lib/utils";
import SplitText from "@/components/molecules/split-text";
import { EventTypesCarousel } from "./event-types";
import { industryCategories, eventTypes } from "@/lib/constants";

import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState, useMemo } from "react";

const galleryImages = Array.from({ length: 12 }, (_, i) => `/community/gallery/${i + 1}.png`);

function CategoriesGrid() {
  return (
    <div className="mt-10 mx-auto max-w-7xl">
      <div className="grid grid-cols-1 gap-8 auto-rows-[240px] md:grid-cols-3 md:auto-rows-[280px]">
        {industryCategories.map((category) => (
          <CategoryCard
            key={category.title}
            title={category.title}
            image={category.image}
            className={category.className}
          />
        ))}
      </div>
    </div>
  );
}

function CategoryCard({
  title,
  image,
  className,
}: {
  title: string;
  image: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-xl transition-transform hover:scale-[1.02] h-full",
        className
      )}
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
        style={{
          backgroundImage: `url(${image})`,
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50 transition-opacity group-hover:bg-black/60" />

      {/* Content */}
      <div className="relative flex h-full items-center justify-center p-6">
        <h2 className="text-center text-2xl md:text-3xl font-semibold text-brand-orange text-balance leading-tight tracking-responsive">
          {title}
        </h2>
      </div>
    </div>
  );
}

type ColumnProps = {
  images: string[];
  y: MotionValue<number>;
};

const Column = ({ images, y }: ColumnProps) => {
  return (
    <motion.div
      className="relative -top-[45%] flex h-full w-1/4 min-w-[250px] flex-col gap-[2vw] first:top-[-45%] [&:nth-child(2)]:top-[-95%] [&:nth-child(3)]:top-[-45%] [&:nth-child(4)]:top-[-75%] will-change-transform transform-gpu"
      style={{ y }}
    >
      {images.map((src, i) => (
        <div
          key={i}
          className="relative h-full w-full overflow-hidden will-change-transform transform-gpu"
        >
          <img
            src={`${src}`}
            alt="image"
            className="pointer-events-none object-cover will-change-transform transform-gpu"
            loading="lazy"
            decoding="async"
          />
        </div>
      ))}
    </motion.div>
  );
};

const Skiper30 = () => {
  const gallery = useRef<HTMLDivElement>(null);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });

  const { scrollYProgress } = useScroll({
    target: gallery,
    offset: ["start end", "end start"],
  });

  const { height, width } = dimension;
  const isMobile = useMemo(() => width <= 768, [width]);
  // Reduce parallax strength on mobile to minimize jank
  const strength = isMobile ? 1 : 2;
  const y = useTransform(scrollYProgress, [0, 1], [0, height * strength]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, height * (isMobile ? 1.65 : 3.3)]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, height * (isMobile ? 0.7 : 1.25)]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, height * (isMobile ? 1.5 : 3)]);

  useEffect(() => {
    const updateSize = () => {
      const current = gallery.current;
      if (!current) {
        setDimension({ width: window.innerWidth, height: window.innerHeight });
        return;
      }
      // Use the element's height to avoid mobile address bar resize jitter
      setDimension({
        width: window.innerWidth,
        height: current.getBoundingClientRect().height || window.innerHeight,
      });
    };

    // Observe only the gallery container instead of window resize to avoid frequent reflows on mobile
    const ro = new ResizeObserver(() => {
      // Throttle via rAF
      requestAnimationFrame(updateSize);
    });
    if (gallery.current) {
      ro.observe(gallery.current);
    }
    // Orientation change can significantly affect viewport
    const onOrientation = () => requestAnimationFrame(updateSize);
    window.addEventListener("orientationchange", onOrientation, { passive: true });

    // Initial measurement
    updateSize();

    return () => {
      ro.disconnect();
      window.removeEventListener("orientationchange", onOrientation);
    };
  }, []);

  return (
    <main className="w-full bg-black text-brand-orange">
      <div
        ref={gallery}
        className="relative box-border flex h-[175vh] gap-[2vw] overflow-hidden bg-black p-[2vw] will-change-transform transform-gpu"
      >
        <Column images={[galleryImages[0], galleryImages[1], galleryImages[2]]} y={y} />
        <Column images={[galleryImages[3], galleryImages[4], galleryImages[5]]} y={y2} />
        <Column images={[galleryImages[6], galleryImages[7], galleryImages[8]]} y={y3} />
        <Column images={[galleryImages[6], galleryImages[7], galleryImages[8]]} y={y4} />
      </div>
    </main>
  );
};

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-black text-brand-orange">
      {/* Hero Section - Full Screen */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/community/background.png"
            alt="Community Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" aria-hidden="true" />
          <div
            className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black/80"
            aria-hidden="true"
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex h-full items-center justify-center">
          <SplitText
            text="Community"
            tag="h1"
            className="text-[9vw] font-semibold uppercase leading-[0.8] tracking-[-0.03em] text-brand-orange tracking-responsive"
            splitType="chars"
            delay={100}
            duration={0.8}
            textAlign="center"
          />
        </div>
      </section>

      <Skiper30 />

      <div className="bg-black py-24 sm:py-32 space-y-32">
        <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8 text-left lg:text-center">
          <Badge
            variant="outline"
            className="text-base font-semibold uppercase tracking-wide text-brand-orange border-brand-orange bg-brand-background mx-auto tracking-responsive"
          >
            Your access to success
          </Badge>
          <p className="mt-2 max-w-2xl mx-auto text-4xl font-semibold tracking-tight text-pretty text-brand-orange sm:text-5xl dark:text-brand-orange tracking-responsive">
            Mentoring, educating, and activating the new generation of builders.
          </p>
          <div className="mt-16 sm:mt-20">
            <EventTypesCarousel events={eventTypes} autoPlayInterval={5000} />
          </div>
        </div>

        <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8 text-left lg:text-center">
          <Badge
            variant="outline"
            className="text-base font-semibold uppercase tracking-wide text-brand-orange border-brand-orange bg-brand-background mx-auto"
          >
            Industry Networks
          </Badge>
          <p className="mt-2 max-w-2xl mx-auto text-4xl font-semibold tracking-tight text-pretty text-brand-orange sm:text-5xl dark:text-brand-orange tracking-responsive">
            There's no other network like Series Seed.
          </p>
          <p className="mt-6 mx-auto max-w-2xl lg:text-center text-lg/8 md:text-xl/8 text-brand-orange tracking-responsive">
            Series Seed has a variety of industry networks. Our members gain access to the best
            mentors in their industries.
          </p>
          <CategoriesGrid />
        </div>
      </div>
    </div>
  );
}
