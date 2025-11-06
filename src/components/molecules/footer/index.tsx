import Link from "next/link";
import { Linkedin, Instagram } from "lucide-react";
import Logo from "../logo";

export default function Footer() {
  return (
    <footer className="relative mt-24 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-60ngoaZtV0I9CuMcxSRvV6LbsZ2Asw.png"
          alt="Urban architecture"
          className="h-full w-full object-cover opacity-30 grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-[#1a1a1a]/95 to-[#1a1a1a]/80" />
      </div>

      {/* Footer Content */}
      <div className="relative z-10 px-8 py-32 md:px-16 lg:px-32">
        <Logo className="size-10 lg:size-12" />

        {/* Footer Links Grid */}
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Info Column */}
          <div>
            <h3 className="mb-6 text-sm font-medium uppercase tracking-wider text-brand-orange/60">
              Info
            </h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/vision"
                  className="text-xl text-brand-orange transition-colors hover:text-brand-orange/80"
                >
                  Vision
                </Link>
              </li>
              <li>
                <Link
                  href="/membership"
                  className="text-xl text-brand-orange transition-colors hover:text-brand-orange/80"
                >
                  Membership
                </Link>
              </li>
              <li>
                <Link
                  href="/press"
                  className="text-xl text-brand-orange transition-colors hover:text-brand-orange/80"
                >
                  Press
                </Link>
              </li>
            </ul>
          </div>

          {/* Locations Column */}
          <div>
            <h3 className="mb-6 text-sm font-medium uppercase tracking-wider text-brand-orange/60">
              Locations
            </h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/milano"
                  className="text-xl text-brand-orange transition-colors hover:text-brand-orange/80"
                >
                  Milano
                </Link>
              </li>
              <li>
                <Link
                  href="/new-york"
                  className="text-xl text-brand-orange transition-colors hover:text-brand-orange/80"
                >
                  New York
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect Column */}
          <div>
            <h3 className="mb-6 text-sm font-medium uppercase tracking-wider text-brand-orange/60">
              Connect
            </h3>
            <div className="mb-8 flex gap-4">
              <Link
                href="https://linkedin.com"
                className="text-brand-orange transition-colors hover:text-brand-orange/80"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link
                href="https://instagram.com"
                className="text-brand-orange transition-colors hover:text-brand-orange/80"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </Link>
            </div>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/careers"
                  className="text-sm uppercase tracking-wider underline text-brand-orange transition-colors hover:text-brand-orange/80"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-sm uppercase tracking-wider underline text-brand-orange transition-colors hover:text-brand-orange/80"
                >
                  Terms and Conditions
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-sm uppercase tracking-wider underline text-brand-orange transition-colors hover:text-brand-orange/80"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h2 className="mb-4 text-3xl italic text-brand-orange">Contact us</h2>
            <p className="mb-6 text-sm uppercase tracking-wider text-brand-orange">
              Explore joining our community
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-brand-orange transition-transform hover:translate-x-2"
              aria-label="Contact us"
            >
              <span className="text-2xl">→</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
