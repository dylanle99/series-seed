"use client";
import { useMotionValueEvent, useScroll, useTransform, motion } from "motion/react";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      // Subtract bottom padding (pb-20 = 80px) to stop line at last content
      setHeight(rect.height - 80);
    }
  }, [data]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div className="w-full bg-black font-sans md:px-10" ref={containerRef}>
      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item) => (
          <div key={item.title} className="flex justify-start py-10 md:py-40 md:gap-10">
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              <div className="h-6 absolute left-[13px] w-6 rounded-full bg-black flex items-center justify-center">
                <div className="h-3 w-3 rounded-full bg-brand-orange border border-brand-orange" />
              </div>
              <h3 className="hidden md:block text-xl md:pl-20 md:text-3xl font-medium text-brand-orange tracking-responsive ">
                {item.title}
              </h3>
            </div>

            <div className="relative pl-20 pr-6 md:pl-6 w-full">
              <h3 className="md:hidden block text-2xl mb-4 text-left font-semibold text-brand-orange tracking-responsive">
                {item.title}
              </h3>
              {React.Children.toArray(item.content)}
            </div>
          </div>
        ))}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-6 left-6 top-0 overflow-hidden w-[2px] bg-black [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] "
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] bg-brand-orange rounded-full"
          />
        </div>
      </div>
    </div>
  );
};
