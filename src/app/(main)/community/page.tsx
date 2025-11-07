import Image, { type StaticImageData } from "next/image";
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
import { Text } from "@/components/atomic/text";

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

const eventTypes: Array<{
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  imageClassName?: string;
}> = [
  {
    id: "roundtable-events",
    title: "Roundtable Events",
    description:
      "Monthly small-group mentoring sessions with leading executives and operators tailored to each division’s needs.",
    imageUrl: "/community/bento1.png",
    imageClassName: "object-left",
  },
  {
    id: "social-evenings",
    title: "Social Evenings",
    description:
      "Quarterly gatherings that create space for members to connect, collaborate, and build long-term relationships.",
    imageUrl: "/community/bento3.png",
  },
  {
    id: "mentorship-program",
    title: "Mentorship Program",
    description:
      "One-to-one mentorship and curated sessions designed to help members learn directly from the top leaders in their fields.",
    imageUrl: "/community/bento4.png",
    imageClassName: "object-left",
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
        "group relative overflow-hidden rounded-lg transition-transform hover:scale-[1.02] min-h-72",
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
          <div className="mx-auto mt-16 grid auto-rows-fr grid-cols-1 gap-8 sm:mt-20 lg:grid-cols-3">
            {eventTypes.map((event) => (
              <article
                key={event.id}
                className="group relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-brand-background px-8 pb-8 pt-80 text-brand-orange ring-1 ring-brand-orange/10 transition-transform duration-300 hover:scale-[1.01] sm:pt-56 lg:pt-80"
              >
                <Image
                  src={event.imageUrl}
                  alt={event.title}
                  fill
                  className={cn(
                    "absolute inset-0 -z-10 object-cover transition-transform duration-500 group-hover:scale-105",
                    event.imageClassName
                  )}
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black via-black/40 to-transparent" />
                <div className="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-black/10" />

                <h3 className="text-lg font-semibold uppercase tracking-wide text-brand-orange">
                  {event.title}
                </h3>
                <Text maxLines={3}>{event.description}</Text>
              </article>
            ))}
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
    </div>
  );
}
