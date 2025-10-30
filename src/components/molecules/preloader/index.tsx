"use client";

import React from "react";
import Logo from "../logo";

export default function Preloader() {
  return (
    <main className="h-full w-screen bg-black">
      <div className="flex h-screen w-full flex-col items-center justify-center text-brand-orange">
        <div className="px-8 lg:px-0 z-50 flex max-w-4xl flex-col items-center justify-center gap-10">
          <h1 className="text-center text-[9vw] font-extrabold uppercase leading-[0.8] tracking-[-0.03em]">
            series seed <br /> Made©2025
          </h1>
          <div className="h-25 flex w-full items-center justify-center xl:justify-between gap-4 xl:gap-0">
            <Logo />
            <h3 className="text-2xl font-extrabold uppercase leading-[0.9] tracking-[-0.06em]">
              Powered by <br /> Series Seed
            </h3>
          </div>
          <h1 className="text-center text-[9vw] font-extrabold uppercase leading-[0.8] tracking-[-0.06em]">
            Nurture leaders of tomorrow.
          </h1>
        </div>
        <div className="absolute inset-0 z-20">
          <video className="h-full w-full object-cover" autoPlay muted playsInline>
            <source src="/preloader/video-bg.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    </main>
  );
}
