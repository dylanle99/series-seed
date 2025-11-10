"use client";

import Image from "next/image";
import { Badge } from "@/components/atomic/badge";
import { cn } from "@/lib/utils";
import { EventCarousel } from "@/components/molecules/event-carousel";
import SplitText from "@/components/molecules/split-text";

import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import Lenis from "lenis";
import { useEffect, useRef, useState } from "react";

const galleryImages = Array.from({ length: 12 }, (_, i) => `/community/gallery/${i + 1}.png`);

const categories: Array<{
  title: string;
  image: string;
  className?: string;
}> = [
  {
    title: "Raw Materials",
    image: "/community/industries/raw-materials.png",
    className: "md:row-span-2",
  },
  {
    title: "Retail",
    image: "/community/industries/retail.png",
  },
  {
    title: "Manufacturing",
    image: "/community/industries/manufacturing.png",
  },
  {
    title: "Life Sciences",
    image: "/community/industries/life-sciences.png",
  },
  {
    title: "Healthcare",
    image: "/community/industries/healthcare.png",
  },
  {
    title: "Energy",
    image: "/community/industries/energy.png",
  },
  {
    title: "Finance",
    image: "/community/industries/finance.png",
  },
  {
    title: "Agriculture",
    image: "/community/industries/agriculture.png",
    className: "md:row-span-2",
  },
  {
    title: "Aerospace",
    image: "/community/industries/aerospace.png",
  },
  {
    title: "Defense",
    image: "/community/industries/defense.png",
  },
];

const eventTypes: Array<{
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  imageClassName?: string;
}> = [
  {
    id: "monthly-intimate-dinners",
    title: "Monthly Intimate Dinners",
    description:
      "Curated small-format dinners that foster deeper connections and candid conversations among members.",
    imageUrl: "/community/event-types/monthly-intimate-dinners.png",
  },
  {
    id: "social-evenings",
    title: "Social Evenings",
    description:
      "Quarterly gatherings that create space for members to connect, collaborate, and build long-term relationships.",
    imageUrl: "/community/event-types/social-evenings.png",
  },
  {
    id: "roundtable-events",
    title: "Roundtable Events",
    description:
      "Monthly small-group mentoring sessions with leading executives and operators tailored to each division’s needs.",
    imageUrl: "/community/event-types/roundtable-events.png",
    imageClassName: "object-top",
  },
  {
    id: "mentorship-program",
    title: "Mentorship Program",
    description:
      "One-to-one mentorship and curated sessions designed to help members learn directly from the top leaders in their fields.",
    imageUrl: "/community/event-types/mentorship-program.png",
    imageClassName: "object-center",
  },
];

function CategoriesGrid() {
  return (
    <div className="mt-10 mx-auto max-w-7xl">
      <div className="grid grid-cols-1 gap-8 auto-rows-[240px] md:grid-cols-3 md:auto-rows-[280px]">
        {categories.map((category) => (
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
      className="relative -top-[45%] flex h-full w-1/4 min-w-[250px] flex-col gap-[2vw] first:top-[-45%] [&:nth-child(2)]:top-[-95%] [&:nth-child(3)]:top-[-45%] [&:nth-child(4)]:top-[-75%]"
      style={{ y }}
    >
      {images.map((src, i) => (
        <div key={i} className="relative h-full w-full overflow-hidden">
          <img src={`${src}`} alt="image" className="pointer-events-none object-cover" />
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

  const { height } = dimension;
  const y = useTransform(scrollYProgress, [0, 1], [0, height * 2]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, height * 3.3]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, height * 1.25]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, height * 3]);

  useEffect(() => {
    const lenis = new Lenis();

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    const resize = () => {
      setDimension({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", resize);
    requestAnimationFrame(raf);
    resize();

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <main className="w-full bg-black text-brand-orange">
      <div
        ref={gallery}
        className="relative box-border flex h-[175vh] gap-[2vw] overflow-hidden bg-black p-[2vw]"
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
          <div className="mt-16 sm:mt-20 text-left">
            <EventCarousel
              events={eventTypes}
              loop={true}
              showNavigation={true}
              showPagination={true}
            />
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
