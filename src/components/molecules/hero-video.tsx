"use client";

import React, { useEffect, useRef } from "react";

type HeroVideoProps = {
  src: string;
  className?: string;
};

export default function HeroVideo({ src, className = "" }: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const maybePlay = () => {
      const el = videoRef.current;
      if (!el) return;
      el.play().catch(() => {
        // Ignore play rejections (e.g., policies); overlay hides it until ready
      });
    };

    // If preloader already finished before mount, play immediately
    if (typeof window !== "undefined" && (window as any).__PRELOADER_DONE__) {
      maybePlay();
    }

    const onPreloaderExit = () => {
      maybePlay();
    };
    window.addEventListener("preloader:exit-start", onPreloaderExit);
    return () => window.removeEventListener("preloader:exit-start", onPreloaderExit);
  }, []);

  return (
    <video
      ref={videoRef}
      className={className}
      src={src}
      loop
      muted
      playsInline
      preload="metadata"
      aria-hidden="true"
    />
  );
}



