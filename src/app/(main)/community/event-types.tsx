"use client";

import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  Variants,
} from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useEffect, useState } from "react";
import Image from "next/image";

type EventType = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  imageClassName?: string;
  imagePosition?: string;
};

interface EventTypesCarouselProps {
  events: EventType[];
  autoPlayInterval?: number;
}

const EventTypesCarousel = ({ events, autoPlayInterval = 5000 }: EventTypesCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const progress = useMotionValue(100);
  const [direction, setDirection] = useState(1);

  const clipPath = useMotionTemplate`inset(0 ${progress}%  0 0 round 10px )`;

  useEffect(() => {
    const interval = setInterval(() => {
      const currentProgress = progress.get();
      if (currentProgress > 0) {
        progress.set(currentProgress - 1);
      } else {
        clearInterval(interval);
        progress.set(100);
        if (currentIndex < events.length - 1) {
          setCurrentIndex(currentIndex + 1);
          setDirection(1);
        } else {
          setCurrentIndex(0);
        }
      }
    }, autoPlayInterval / 100);

    return () => clearInterval(interval);
  }, [progress, currentIndex, events.length, autoPlayInterval]);

  return (
    <div className="relative flex w-full flex-col items-center justify-center gap-8">
      {/* Navigation Buttons */}
      <div className="flex items-center justify-center gap-5">
        <button
          onClick={() => {
            progress.set(100);
            currentIndex > 0
              ? setCurrentIndex(currentIndex - 1)
              : setCurrentIndex(events.length - 1);
            setDirection(-1);
          }}
          className="flex size-10 cursor-pointer items-center justify-center rounded-full bg-brand-orange/10 p-0.5 text-brand-orange hover:bg-brand-orange/20 active:scale-95 transition-all"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="flex items-center justify-center gap-2">
          {events.map((item, index) => (
            <motion.button
              initial={false}
              onClick={() => {
                progress.set(100);
                setCurrentIndex(index);
                if (index > currentIndex) {
                  setDirection(1);
                } else {
                  setDirection(-1);
                }
              }}
              animate={{
                width: index === currentIndex ? "40px" : "10px",
              }}
              className="relative flex h-2 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-brand-orange/20 p-0.5"
              key={index}
            >
              {currentIndex === index && (
                <motion.div
                  style={{ clipPath }}
                  className="absolute left-0 top-0 h-full w-full origin-left rounded-full bg-brand-orange"
                ></motion.div>
              )}
              <div></div>
            </motion.button>
          ))}
        </div>
        <button
          onClick={() => {
            progress.set(100);
            currentIndex < events.length - 1
              ? setCurrentIndex(currentIndex + 1)
              : setCurrentIndex(0);

            setDirection(1);
          }}
          className="flex size-10 cursor-pointer items-center justify-center rounded-full bg-brand-orange/10 p-0.5 text-brand-orange hover:bg-brand-orange/20 active:scale-95 transition-all"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <AnimatePresence initial={false} mode="popLayout" custom={direction}>
        {currentIndex !== null && (
          <motion.div
            key={currentIndex}
            variants={variants as Variants}
            initial="initial"
            animate="active"
            exit="exit"
            custom={direction}
            transition={{ type: "spring", stiffness: 100, damping: 30 }}
            className="flex w-full max-w-5xl flex-col items-center justify-center"
          >
            <div className="w-full overflow-hidden rounded-xl bg-black/20 p-1">
              <div className="relative h-[400px] md:h-[500px] w-full overflow-hidden rounded-xl">
                <Image
                  src={events[currentIndex].imageUrl}
                  alt={events[currentIndex].title}
                  fill
                  className={`object-cover ${
                    events[currentIndex].imageClassName || "object-center"
                  }`}
                  style={{
                    objectPosition: events[currentIndex].imagePosition || undefined,
                  }}
                  priority
                />
                {/* Gradient overlay for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                {/* Text overlay at bottom-left */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-left">
                  <h3 className="text-2xl md:text-3xl font-semibold text-brand-orange mb-2 tracking-responsive">
                    {events[currentIndex].title}
                  </h3>
                  <p className="text-base md:text-lg text-brand-orange tracking-responsive">
                    {events[currentIndex].description}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export { EventTypesCarousel };

const variants = {
  initial: (direction: number) => {
    return { opacity: 0, filter: "blur(4)" };
  },
  active: {
    x: "0%",
    opacity: 1,
    filter: "blur(0px)",
    transition: { delay: 0.3, duration: 0.3, ease: "easeOut" },
  },
  exit: (direction: number) => {
    return {
      x: `${-30 * direction}%`,
      opacity: 0,
      filter: "blur(4px)",
      transition: { duration: 0.25, ease: "easeOut" },
    };
  },
};
