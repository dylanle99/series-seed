"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from "@/components/atomic/carousel";
import { Text } from "@/components/atomic/text";

interface EventCarouselProps {
  events: Array<{
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    imageClassName?: string;
  }>;
  className?: string;
  autoplay?: boolean;
  loop?: boolean;
  showNavigation?: boolean;
  showPagination?: boolean;
}

export const EventCarousel = ({
  events,
  className,
  loop = true,
  showNavigation = true,
  showPagination = true,
}: EventCarouselProps) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <Carousel
      setApi={setApi}
      className={cn("w-full", className)}
      opts={{
        loop,
        slidesToScroll: 1,
      }}
    >
      <CarouselContent className="flex h-[550px] w-full">
        {events.map((event, index) => (
          <CarouselItem
            key={event.id}
            className={cn(
              "relative flex w-full basis-[73%] items-center justify-center sm:basis-[50%] md:basis-[40%] lg:basis-[35%]",
              current === index ? "h-[90%]" : "h-[81.5%]"
            )}
          >
            <motion.div
              initial={false}
              animate={{
                clipPath:
                  current !== index ? "inset(15% 0 15% 0 round 2rem)" : "inset(0 0 0 0 round 2rem)",
                scale: current === index ? 1 : 0.965,
              }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="h-full w-full overflow-hidden rounded-3xl"
            >
              <div className="relative h-full w-full rounded-3xl">
                <Image
                  src={event.imageUrl}
                  alt={event.title}
                  fill
                  className={cn(
                    "scale-105 object-cover transition-transform duration-500",
                    event.imageClassName
                  )}
                  sizes="(max-width: 768px) 73vw, (max-width: 1024px) 40vw, 35vw"
                />
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-black via-black/40 to-transparent" />

                {/* Content overlay */}
                <motion.div
                  layout
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-x-0 bottom-15 p-6 text-brand-orange rounded-b-3xl"
                >
                  <h3 className="text-xl lg:text-2xl font-semibold tracking-wide tracking-responsive">
                    {event.title}
                  </h3>
                  <motion.div
                    initial={false}
                    animate={{
                      opacity: current === index ? 1 : 0,
                    }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className={cn(
                      "overflow-hidden transition-[max-height,margin] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                      current === index ? "max-h-24 mt-2" : "max-h-0 mt-0"
                    )}
                  >
                    <p className="text-base font-medium text-brand-orange tracking-responsive">
                      {event.description}
                    </p>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
            {/* Title outside clipped area - visible for inactive slides */}
          </CarouselItem>
        ))}
      </CarouselContent>

      {showNavigation && (
        <div className="absolute -bottom-4 right-0 flex w-full items-center justify-between gap-2">
          <button
            aria-label="Previous slide"
            onClick={() => {
              if (!api) return;
              if (current === 0) {
                api.scrollTo(events.length - 1);
              } else {
                api.scrollPrev();
              }
            }}
            className="rounded-full bg-brand-orange/10 p-2 transition-colors hover:bg-brand-orange/20 cursor-pointer"
          >
            <ChevronLeft className="text-brand-orange" />
          </button>
          <button
            aria-label="Next slide"
            onClick={() => {
              if (!api) return;
              if (current === events.length - 1) {
                api.scrollTo(0);
              } else {
                api.scrollNext();
              }
            }}
            className="rounded-full bg-brand-orange/10 p-2 transition-colors hover:bg-brand-orange/20 cursor-pointer"
          >
            <ChevronRight className="text-brand-orange" />
          </button>
        </div>
      )}

      {showPagination && (
        <div className="flex w-full items-center justify-center">
          <div className="flex items-center justify-center gap-2">
            {Array.from({ length: events.length }).map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={cn(
                  "h-2 w-2 cursor-pointer rounded-full transition-all",
                  current === index ? "bg-brand-orange" : "bg-brand-orange/30"
                )}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      )}
    </Carousel>
  );
};
