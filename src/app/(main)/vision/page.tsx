import Image from "next/image";
import { Skiper70, TextBoxReveal } from "@/components/atomic/text-box-reveal";

export default function VisionPage() {
  return (
    <div className="min-h-screen bg-black text-brand-orange">
      {/* Hero Section - Full Screen */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/vision/background.png"
            alt="Vision Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex h-full items-center justify-center">
          <h1 className="text-[9vw] font-semibold uppercase leading-[0.8] tracking-[-0.03em] text-brand-orange tracking-responsive">
            Vision
          </h1>
        </div>
      </section>

      <section className="py-32 px-8 2xl:px-0 mx-auto max-w-7xl">
        <div className="container space-y-10 lg:space-y-20">
          <div className="w-full grid-cols-6 gap-10 space-y-5 lg:grid lg:space-y-0">
            <h1 className="col-span-6 text-5xl font-semibold tracking-tighter lg:text-8xl tracking-responsive">
              We ask what drives the real economy, who shapes its future, and how to push it
              forward—together.
            </h1>
            <div />
          </div>

          <div className="text-lg gap-8 text-brand-orange tracking-responsive">
            <TextBoxReveal
              highlight="distributed"
              highlightTextClass="!text-orange-500"
              highlightBgClass="!bg-orange-500"
              className="font-old-school-grotesk"
            >
              At Series Seed, we curate a private mentorship circle of entrepreneurs, operators, and
              experts from America's backbone industries, designed to guide the next generation of
              builders. From ports to clinics, farms to labs, factory floors to control rooms, our
              members are united by the courage to tackle hard problems that move the real economy
              forward.
            </TextBoxReveal>
            <div>{/* <p className="text-2xl font-medium tracking-tight lg:text-3xl"></p> */}</div>
          </div>
        </div>
      </section>
    </div>
  );
}
