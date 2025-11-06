import { Quote } from "lucide-react";
import Image from "next/image";
import Footer from "@/components/molecules/footer";

export default function VisionPage() {
  return (
    <div className="min-h-screen bg-[#1a1a1a] text-brand-orange">
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
          <h1 className="text-[9vw] font-extrabold uppercase leading-[0.8] tracking-[-0.03em] text-brand-orange">
            Vision
          </h1>
        </div>
      </section>

      {/* Mission Statement Section */}
      <section className="px-8 py-24 md:px-16 lg:px-32">
        <div className="mx-auto max-w-5xl space-y-12">
          <p className="text-2xl leading-relaxed md:text-3xl">
            At Series Seed, we curate a global community of entrepreneurs, operators, and domain
            experts across America's backbone industries, united by the courage to tackle hard
            problems that matter.
          </p>
          <p className="text-2xl leading-relaxed md:text-3xl">
            Our members are relentlessly curious world builders, change makers, visionaries, leaders
            and agents of transformation, who come from a range of ten distinct industries. As a
            community, we are committed to collective performance and the next generation, through
            mentorship, sponsorship, and a shared pledge to give back.
          </p>
        </div>
      </section>

      {/* Quote Section */}
      <section className="relative px-8 py-32 md:px-16 lg:px-32">
        <div className="mx-auto max-w-6xl">
          {/* Decorative Quote Marks */}
          <div className="mb-8 flex justify-center">
            <Quote className="size-10 lg:size-14 text-brand-orange" />
          </div>

          <blockquote className="text-center">
            <p className="mb-4 text-3xl leading-relaxed text-brand-orange md:text-4xl lg:text-5xl">
              <span className="italic">We don't have rules.</span> We provide the conditions for
              transformation, which means that people can freely conduct all facets of life here.
            </p>
          </blockquote>

          <div className="mt-8 flex justify-center">
            <Quote className="size-10 lg:size-14 text-brand-orange" />
          </div>
        </div>
      </section>

      {/* Culture & History Section */}
      <section className="px-8 py-24 md:px-16 lg:px-32">
        <div className="mx-auto max-w-5xl">
          <div className="border-l-2 border-brand-orange pl-8 md:pl-12">
            <div className="space-y-8">
              <p className="text-lg leading-relaxed md:text-xl">
                Our culture is building. From factory floors and ports to labs, classrooms, clinics,
                farms, and control rooms, the real economy shapes how we live. Series Seed
                celebrates a culture of craft, judgment, and service—and makes it the bedrock of our
                programs, mentorship, and shared standards.
              </p>
              <p className="text-lg leading-relaxed md:text-xl">
                Founded in New York City in <strong>2025</strong>, Series Seed reimagines private
                communities for the real economy: outcomes over optics, mentorship over gatekeeping,
                and service over status. We convene intentionally unlike-minded
                people—entrepreneurs, operators, and domain experts—across America’s backbone
                industries to tackle hard problems that matter. Our community is powered by dynamic
                engagement and exchange—operator-led roundtables, tailored mentorship, CEO forums,
                field visits, and philanthropy sprints—and committed to turning success into lasting
                impact for generations to come.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer with Background Image */}
      <Footer />
    </div>
  );
}
