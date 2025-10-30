import Image from "next/image";

export default function Logo({ className }: { className?: string }) {
  return (
    <Image
      src="/logo/series-seed.svg"
      alt="Series Seed Logo"
      width={42}
      height={22}
      className={className}
    />
  );
}
