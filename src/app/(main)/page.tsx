import Logo from "@/components/molecules/logo";
import HeroVideo from "@/components/molecules/hero-video";
import NavigationMenu from "@/components/molecules/navigation-menu";

export default function Example() {
  return (
    <div className="relative">
      <div className="pointer-events-none fixed inset-0">
        <HeroVideo className="h-full w-full object-cover" src="/home/hero-video.mp4" />
      </div>

      <div className="relative isolate flex h-screen items-center justify-center px-6 lg:px-8">
        <div className="mx-auto max-w-[80%]">
          <div className="text-center text-brand-orange">
            <h1 className="text-center text-[7vw] font-extrabold uppercase leading-[0.9] tracking-[-0.06em]">
              <span className="block">Nurture leaders</span>
              <span className="block">of tomorrow</span>
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}
