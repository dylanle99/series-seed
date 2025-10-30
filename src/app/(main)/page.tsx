"use client";

import { Separator } from "@/components/atomic/separator";
import Menu from "@/components/molecules/menu";
import { motion, useScroll, useTransform } from "framer-motion";
import React from "react";
import { useRef } from "react";

interface Speaker {
  name: string;
  title: string;
  origin: string;
}

const speakers: Speaker[] = [
  { name: "Alex Johnson", title: "CEO & Founder", origin: "right" },
  { name: "Sarah Chen", title: "CTO", origin: "left" },
  { name: "Marcus Rivera", title: "Lead Designer", origin: "left" },
  { name: "Emily Watson", title: "Product Manager", origin: "right" },
  { name: "David Kim", title: "Senior Developer", origin: "left" },
  { name: "Lisa Thompson", title: "Marketing Director", origin: "left" },
  { name: "James Wilson", title: "UX Researcher", origin: "right" },
  { name: "Rachel Green", title: "Data Scientist", origin: "left" },
  { name: "Michael Brown", title: "DevOps Engineer", origin: "left" },
  { name: "Anna Davis", title: "Content Strategist", origin: "left" },
  { name: "Tom Anderson", title: "Sales Manager", origin: "left" },
  { name: "Sophie Lee", title: "QA Lead", origin: "left" },
  { name: "Chris Taylor", title: "Backend Developer", origin: "right" },
  { name: "Maya Patel", title: "Frontend Developer", origin: "left" },
  { name: "Ryan O'Connor", title: "Mobile Developer", origin: "left" },
  { name: "Zoe Martinez", title: "Design Systems", origin: "right" },
  { name: "Jordan Smith", title: "Product Analyst", origin: "left" },
];

// Grid layout configuration
const gridLayout = [
  [0, null, 1, null],
  [null, 2, null, null],
  [3, null, null, 4],
  [null, 5, 6, null],
  [7, null, null, 8],
  [null, null, 9, null],
  [null, 10, null, 11],
  [12, null, 13, null],
  [null, 14, null, null],
  [15, null, null, 16],
];

interface TeamImageProps {
  speaker: Speaker;
}

const TeamImage: React.FC<TeamImageProps> = ({ speaker }) => {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.4, 0.695, 1], [-0.5, 1, 1, 0]);

  return (
    <motion.div
      ref={ref}
      className="relative h-full w-full"
      style={{
        transformOrigin: speaker.origin === "left" ? "bottom left" : "bottom right",
        scale,
      }}
    >
      <img
        src={`https://skiper-ui.com/images/oct25Coll/portraits/p_${
          speakers.indexOf(speaker) + 1
        }.png`}
        alt={speaker.name}
        className="contrast-120 h-full w-full object-cover saturate-0 filter transition-all ease-in-out hover:scale-95"
      />
      <div className="absolute -bottom-2 left-0 flex w-full translate-y-full justify-between text-center text-sm uppercase leading-tight opacity-40">
        <p>{speaker.name}</p>
        <p>({speaker.title})</p>
      </div>
    </motion.div>
  );
};

function MainPageContent() {
  return (
    <div className="w-full">
      <section className="relative w-full">
        <div className="pointer-events-none sticky top-1/2 z-20 -translate-y-1/2 text-center text-white mix-blend-exclusion">
          <div className="relative inline-block space-y-1">
            <motion.h2
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 2.9, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-[7vw] font-semibold tracking-tighter text-brand-orange leading-none"
            >
              Series Seed
            </motion.h2>
            <motion.span
              className="absolute left-1/2 -translate-x-1/2 -bottom-2 h-[0.3em] w-full bg-brand-orange rounded-full"
              initial={{ scaleX: 0.2, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ delay: 1.1, duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: "center" }}
              aria-hidden="true"
            />
          </div>
        </div>

        {/* Team Grid */}
        <div className="relative z-0 mb-[50vh] mt-[50vh]">
          {gridLayout.map((row, rowIndex) => (
            <div key={rowIndex} className="flex w-full">
              {row.map((imageIndex, colIndex) => (
                <div key={colIndex} className="aspect-square flex-1">
                  {imageIndex !== null && <TeamImage speaker={speakers[imageIndex]} />}
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default function MainPage() {
  return (
    <section className="relative h-full bg-black">
      <div className="pointer-events-none fixed inset-0 h-screen">
        <video
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        >
          <source src="/home/hero-video.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="relative z-10">
        <Menu />
        <MainPageContent />
      </div>
    </section>
  );
}
