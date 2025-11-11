import Image from "next/image";
import Link from "next/link";

export default function Logo({
  redirectUrl,
  className,
}: {
  redirectUrl?: string;
  className?: string;
}) {
  return (
    <Link href={redirectUrl ?? "/"} className="cursor-pointer">
      <Image
        src="/logo/series-seed.svg"
        alt="Series Seed Logo"
        width={42}
        height={22}
        className={className}
      />
    </Link>
  );
}
