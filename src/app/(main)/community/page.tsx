import Image, { type StaticImageData } from "next/image";
import Footer from "@/components/molecules/footer";
import { Badge } from "@/components/atomic/badge";

import { cn } from "@/lib/utils";

import agricultureImage from "./agriculture.png";
import consumerGoodsImage from "./consumer-goods.png";
import energyImage from "./energy.png";
import financeImage from "./finance.png";
import healthcareImage from "./healthcare.png";
import lifeSciencesImage from "./life-sciences.png";
import manufacturingImage from "./manufacturing.png";
import rawMaterialsImage from "./raw-materials.png";
import aerospaceImage from "./aerospace.png";
import defenseImage from "./defense.png";

const categories: Array<{
  title: string;
  image: StaticImageData;
  className?: string;
}> = [
  {
    title: "Raw Materials",
    image: rawMaterialsImage,
    className: "md:row-span-2",
  },
  {
    title: "Consumer Goods",
    image: consumerGoodsImage,
  },
  {
    title: "Manufacturing",
    image: manufacturingImage,
  },
  {
    title: "Life Sciences",
    image: lifeSciencesImage,
  },
  {
    title: "Healthcare",
    image: healthcareImage,
  },
  {
    title: "Energy",
    image: energyImage,
  },
  {
    title: "Finance",
    image: financeImage,
  },
  {
    title: "Agriculture",
    image: agricultureImage,
    className: "md:row-span-2",
  },
  {
    title: "Aerospace",
    image: aerospaceImage,
  },
  {
    title: "Defense",
    image: defenseImage,
  },
];

function CategoriesGrid() {
  return (
    <div className="mt-10 mx-auto max-w-7xl">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:auto-rows-[280px]">
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
  image: StaticImageData | string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-lg cursor-pointer transition-transform hover:scale-[1.02] min-h-72",
        className
      )}
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
        style={{
          backgroundImage: `url(${typeof image === "string" ? image : image.src})`,
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50 transition-opacity group-hover:bg-black/60" />

      {/* Content */}
      <div className="relative flex h-full items-center justify-center p-6">
        <h2 className="text-center text-2xl md:text-3xl font-bold text-brand-orange text-balance leading-tight">
          {title}
        </h2>
      </div>
    </div>
  );
}

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
          <h1 className="text-[9vw] font-extrabold uppercase leading-[0.8] tracking-[-0.03em] text-brand-orange">
            Community
          </h1>
        </div>
      </section>

      <div className="bg-black py-24 sm:py-32 space-y-32">
        <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
          <Badge
            variant="outline"
            className="text-base font-semibold uppercase tracking-wide text-brand-orange border-brand-orange bg-brand-background"
          >
            Your access to success
          </Badge>
          <p className="mt-2 max-w-2xl text-4xl font-semibold tracking-tight text-pretty text-brand-orange sm:text-5xl dark:text-brand-orange">
            Mentoring, educating, and activating the new generation of builders.
          </p>
          <div className="mt-10 grid grid-cols-1 gap-8 sm:mt-16 lg:grid-cols-7 lg:grid-rows-2">
            <div className="lg:col-span-4">
              <div className="h-full overflow-hidden rounded-lg bg-brand-background shadow-sm outline outline-black/5 max-lg:rounded-t-4xl lg:rounded-tl-4xl dark:shadow-none dark:outline-white/15">
                <div className="relative h-56 w-full sm:h-64 lg:h-72">
                  <img
                    alt=""
                    src="/community/bento1.png"
                    className="h-full w-full object-cover object-left"
                  />
                </div>
                <div className="p-10 text-brand-orange">
                  <p className="mt-2 text-xl font-medium tracking-tight">Roundtable Events</p>
                  <p className="mt-2 text-base/6">
                    Roundtables are open exclusively to Series Seed members. Every division meets
                    monthly for a small group mentoring session with a leading executive or operator
                    in that industry.
                  </p>
                </div>
              </div>
            </div>
            <div className="lg:col-span-3">
              <div className="h-full overflow-hidden rounded-lg bg-brand-background shadow-sm outline outline-black/5 lg:rounded-tr-4xl dark:shadow-none dark:outline-white/15">
                <div className="relative h-56 w-full sm:h-64 lg:h-72">
                  <img alt="" src="/community/bento2.png" className="h-full w-full object-cover" />
                </div>
                <div className="p-10 text-brand-orange">
                  <p className="mt-2 text-xl font-medium tracking-tight">Facetiming Series</p>
                  <p className="mt-2 max-w-lg text-base/6">
                    Open to the Series Seed members virtually, this series welcomes some of the top
                    executives in the world for intimate and interactive conversations among peers
                    and leaders.
                  </p>
                </div>
              </div>
            </div>
            <div className="lg:col-span-3">
              <div className="h-full overflow-hidden rounded-lg bg-brand-background shadow-sm outline outline-black/5 lg:rounded-bl-4xl dark:shadow-none dark:outline-white/15">
                <div className="relative h-56 w-full sm:h-64 lg:h-72">
                  <img alt="" src="/community/bento3.png" className="h-full w-full object-cover" />
                </div>
                <div className="p-10 text-brand-orange">
                  <p className="mt-2 text-xl font-medium tracking-tight">Social Evenings</p>
                  <p className="mt-2 max-w-lg text-base/6">
                    The Series Seed Social Club functions primarily as a social platform for our
                    members. Social events are held quarterly and are opportunities for members to
                    network with each other in a relaxed setting.
                  </p>
                </div>
              </div>
            </div>
            <div className="lg:col-span-4">
              <div className="h-full overflow-hidden rounded-lg bg-brand-background shadow-sm outline outline-black/5 max-lg:rounded-b-4xl lg:rounded-br-4xl dark:shadow-none dark:outline-white/15">
                <div className="relative h-56 w-full sm:h-64 lg:h-72">
                  <img
                    alt=""
                    src="/community/bento4.png"
                    className="h-full w-full object-cover object-left"
                  />
                </div>
                <div className="p-10 text-brand-orange">
                  <p className="mt-2 text-xl font-medium tracking-tight">Mentorship Program</p>
                  <p className="mt-2 text-base/6">
                    Between our sessions and one-to-one mentoring, Series Seed is committed to
                    providing a platform where our members can meet and learn from the top business
                    leaders in their industry.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
          <p className="mt-2 max-w-2xl text-4xl font-semibold tracking-tight text-pretty text-brand-orange sm:text-5xl dark:text-brand-orange">
            Our networks
          </p>
          <p className="mt-6 text-lg/8 md:text-xl/8 text-brand-orange">
            Series Seed has a variety of industry networks. Our members participate in custom
            programs and gain access to the best mentors in their industries.
          </p>
          <CategoriesGrid />
        </div>
      </div>

      {/* Footer with Background Image */}
      <Footer />
    </div>
  );
}
