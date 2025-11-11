"use client";

import { motion, useInView } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";
import SplitText from "@/components/molecules/split-text";

type TermItem = {
  id: string;
  title: string;
  content: React.ReactNode;
};

const TermSection = ({
  term,
  index,
  children,
  setActiveTerm,
}: {
  term: TermItem;
  index: number;
  children: React.ReactNode;
  setActiveTerm: (index: number) => void;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    amount: 0.3,
    margin: "-100px 0px -50% 0px",
  });

  useEffect(() => {
    if (isInView) {
      setActiveTerm(index);
    }
  }, [isInView, index, setActiveTerm]);

  return (
    <div ref={ref} id={term.id} className="space-y-4 md:space-y-6">
      {children}
    </div>
  );
};

const defaultTerms: TermItem[] = [
  {
    id: "acceptance-of-terms",
    title: "Acceptance of Terms",
    content: (
      <>
        <p className="lg:text-lg">
          Welcome to Series Seed! By accessing or using our website, services, programs, events, or
          any other offerings (collectively, the &quot;Services&quot;), you agree to be bound by
          these Terms of Service. If you do not agree with these terms, please do not use our
          Services.
        </p>
        <p className="lg:text-lg">
          These terms constitute a binding agreement between you and Series Seed, a not-for-profit
          501(c)(3) organization. We may revise and update these Terms of Service from time to time.
          Your continued use of our Services indicates your acceptance of any updates or
          modifications to these terms.
        </p>
      </>
    ),
  },
  {
    id: "about-series-seed",
    title: "About Series Seed",
    content: (
      <>
        <p className="lg:text-lg">
          Series Seed is a not-for-profit 501(c)(3) organization dedicated to providing business,
          educational, and mentoring opportunities for the new generations of builders in America's
          backbone industries.
        </p>
        <p className="lg:text-lg">
          Our mission is to transform the lives of our members by opening doors to a world-class
          community of business leaders, innovators, and forward thinkers, who mentor and teach
          through unparalleled educational experiences, upscale conferences, and forums.
        </p>
      </>
    ),
  },
  {
    id: "eligibility",
    title: "Eligibility and Membership",
    content: (
      <>
        <p className="lg:text-lg">
          By using our Services, you represent and warrant that you are at least 18 years of age and
          have the legal capacity to enter into this agreement. If you are using our Services on
          behalf of an organization, you represent that you have the authority to bind that
          organization to these terms.
        </p>
        <p className="lg:text-lg">
          Membership in Series Seed programs and participation in our events may be subject to
          additional eligibility requirements, application processes, and terms that will be
          communicated to you separately.
        </p>
      </>
    ),
  },
  {
    id: "user-conduct",
    title: "User Conduct and Responsibilities",
    content: (
      <>
        <p className="lg:text-lg">
          You agree to use our Services in a manner consistent with all applicable laws and
          regulations and in accordance with these Terms of Service. You agree not to:
        </p>
        <ul className="list-disc space-y-2 pl-4 lg:text-lg">
          <li>
            Misrepresent your identity, affiliation, or qualifications when participating in our
            programs
          </li>
          <li>Harass, threaten, or intimidate other members, mentors, or staff of Series Seed</li>
          <li>Use our Services for any illegal, harmful, or fraudulent purpose</li>
          <li>Disrupt or interfere with the operation of our Services, events, or programs</li>
          <li>
            Share confidential or proprietary information disclosed during mentoring sessions or
            private events without proper authorization
          </li>
          <li>Attempt to gain unauthorized access to our systems, networks, or user accounts</li>
        </ul>
        <p className="lg:text-lg">
          We reserve the right to suspend or terminate your access to our Services if you violate
          these terms or engage in conduct that we deem inappropriate or harmful to our community.
        </p>
      </>
    ),
  },
  {
    id: "intellectual-property",
    title: "Intellectual Property",
    content: (
      <>
        <p className="lg:text-lg">
          All content, materials, trademarks, logos, and other intellectual property related to
          Series Seed and made available through our Services are owned by Series Seed or our
          licensors and are protected by copyright, trademark, and other intellectual property laws.
        </p>
        <p className="lg:text-lg">
          You may not reproduce, distribute, modify, create derivative works of, publicly display,
          or otherwise use our content without our prior written permission, except as necessary for
          your personal, non-commercial use of our Services.
        </p>
        <p className="lg:text-lg">
          Educational materials, presentations, and resources provided through our programs are for
          your personal use and may not be redistributed or used for commercial purposes without
          explicit authorization.
        </p>
      </>
    ),
  },
  {
    id: "privacy-and-data",
    title: "Privacy and Data Protection",
    content: (
      <>
        <p className="lg:text-lg">
          Your privacy is important to us. Our collection, use, and protection of your personal
          information is governed by our Privacy Policy, which is incorporated into these Terms of
          Service by reference.
        </p>
        <p className="lg:text-lg">
          By using our Services, you consent to the collection and use of your information as
          described in our Privacy Policy. We will use your information to provide our Services,
          communicate with you about programs and events, and improve our offerings.
        </p>
        <p className="lg:text-lg">
          We take reasonable measures to protect your personal information, but we cannot guarantee
          absolute security. You are responsible for maintaining the confidentiality of your account
          credentials.
        </p>
      </>
    ),
  },
  {
    id: "events-and-programs",
    title: "Events and Programs",
    content: (
      <>
        <p className="lg:text-lg">
          Series Seed organizes various educational experiences, conferences, forums, and mentoring
          programs. Registration for and participation in these events and programs may be subject
          to additional terms, conditions, and fees.
        </p>
        <p className="lg:text-lg">
          We reserve the right to modify, cancel, or reschedule events and programs at any time. In
          the event of cancellation, we will make reasonable efforts to notify registered
          participants and provide alternatives or refunds where appropriate.
        </p>
        <p className="lg:text-lg">
          Participants in our programs are expected to engage respectfully and professionally with
          mentors, speakers, and fellow members. Disruptive behavior may result in removal from
          events without refund.
        </p>
      </>
    ),
  },
  {
    id: "disclaimer-of-warranties",
    title: "Disclaimer of Warranties",
    content: (
      <>
        <p className="lg:text-lg">
          Our Services are provided &quot;as is&quot; and &quot;as available&quot; without
          warranties of any kind, either express or implied. To the fullest extent permitted by law,
          Series Seed disclaims all warranties, including but not limited to implied warranties of
          merchantability, fitness for a particular purpose, and non-infringement.
        </p>
        <p className="lg:text-lg">
          We do not warrant that our Services will be uninterrupted, error-free, or free from
          viruses or other harmful components. We do not guarantee any specific outcomes from
          participation in our programs or mentoring relationships.
        </p>
        <p className="lg:text-lg">
          Advice and information provided by mentors and speakers through our Services are for
          educational purposes only and should not be considered professional, legal, financial, or
          business advice. You should consult with appropriate professionals before making important
          decisions.
        </p>
      </>
    ),
  },
  {
    id: "limitation-of-liability",
    title: "Limitation of Liability",
    content: (
      <>
        <p className="lg:text-lg">
          To the maximum extent permitted by law, Series Seed, its directors, officers, employees,
          volunteers, and agents shall not be liable for any indirect, incidental, special,
          consequential, or punitive damages arising out of or relating to your use of our Services,
          including but not limited to loss of profits, data, or business opportunities.
        </p>
        <p className="lg:text-lg">
          Our total liability to you for any claims arising from your use of our Services shall not
          exceed the amount you paid, if any, for the specific Service or event giving rise to the
          claim.
        </p>
        <p className="lg:text-lg">
          Some jurisdictions do not allow the exclusion or limitation of certain warranties or
          liabilities, so some of the above limitations may not apply to you.
        </p>
      </>
    ),
  },
  {
    id: "indemnification",
    title: "Indemnification",
    content: (
      <>
        <p className="lg:text-lg">
          You agree to indemnify, defend, and hold harmless Series Seed, its directors, officers,
          employees, volunteers, and agents from and against any and all claims, damages,
          liabilities, costs, and expenses (including reasonable attorneys&apos; fees) arising from
          or relating to:
        </p>
        <ul className="list-disc space-y-2 pl-4 lg:text-lg">
          <li>Your use of our Services</li>
          <li>Your violation of these Terms of Service</li>
          <li>Your violation of any rights of another person or entity</li>
          <li>
            Your conduct in connection with our programs, events, or interactions with other members
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "governing-law",
    title: "Governing Law and Dispute Resolution",
    content: (
      <>
        <p className="lg:text-lg">
          These Terms of Service shall be governed by and construed in accordance with the laws of
          the United States and the state in which Series Seed is organized, without regard to
          conflict of law principles.
        </p>
        <p className="lg:text-lg">
          Any disputes arising from these terms or your use of our Services shall first be addressed
          through good faith negotiations. If a resolution cannot be reached, disputes shall be
          resolved through binding arbitration or in the appropriate courts, as determined by
          applicable law.
        </p>
      </>
    ),
  },
  {
    id: "changes-to-terms",
    title: "Changes to Terms",
    content: (
      <>
        <p className="lg:text-lg">
          We reserve the right to modify these Terms of Service at any time. We will notify you of
          material changes by posting the updated terms on our website and updating the &quot;Last
          Updated&quot; date. Your continued use of our Services after such changes constitutes your
          acceptance of the updated terms.
        </p>
        <p className="lg:text-lg">
          We encourage you to review these Terms of Service periodically to stay informed about your
          rights and responsibilities.
        </p>
      </>
    ),
  },
  {
    id: "contact-information",
    title: "Contact Information",
    content: (
      <>
        <p className="lg:text-lg">
          If you have any questions about these Terms of Service or need to contact us regarding our
          Services, please reach out to us:
        </p>
        <div className="mt-4 lg:text-lg">
          <p>Website: www.seriesseed.org/contact</p>
        </div>
        <p className="mt-4 lg:text-lg">
          Series Seed is a registered 501(c)(3) not-for-profit organization dedicated to supporting
          the next generation of builders in America&apos;s backbone industries.
        </p>
      </>
    ),
  },
];

export default function TermsOfServicePage() {
  const [activeTerm, setActiveTerm] = useState(0);
  const title = "Terms of Service";
  const terms = defaultTerms;

  return (
    <div
      className="min-h-screen bg-black p-4 lg:p-12"
      style={{
        paddingTop: "calc(var(--header-height) + 1rem)",
        paddingBottom: "calc(var(--header-height) + 1rem)",
      }}
    >
      <SplitText
        text={title}
        tag="h1"
        className="text-[9vw] font-semibold uppercase leading-[0.8] tracking-[-0.03em] text-brand-orange tracking-responsive"
        splitType="chars"
        delay={50}
        duration={0.8}
        textAlign="center"
      />
      <div className="relative mb-[50vh] flex gap-12 py-[40px] md:py-[80px]">
        <ul className="sticky top-24 hidden h-fit w-full max-w-[300px] space-y-4 border-l border-brand-orange/20 md:block">
          {terms.map((term, index) => (
            <li className="relative cursor-pointer pl-3" key={term.id}>
              <a href={`#${term.id}`}>
                {activeTerm === index && (
                  <motion.span
                    layoutId="active-term"
                    className="absolute -left-[1.5px] top-1/2 inline-block h-5 w-[2px] -translate-y-1/2 rounded-2xl bg-brand-orange"
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 30,
                    }}
                  />
                )}

                <p
                  className={cn(
                    "text-brand-orange/50 transition-opacity duration-200",
                    activeTerm === index && "text-brand-orange opacity-100"
                  )}
                >
                  {term.title}
                </p>
              </a>
            </li>
          ))}
        </ul>
        <div className="flex flex-1 flex-col gap-[40px] md:gap-[60px]">
          {terms.map((term, index) => (
            <TermSection key={term.id} term={term} index={index} setActiveTerm={setActiveTerm}>
              <h3 className="font-cal-sans text-xl text-brand-orange lg:text-3xl">{term.title}</h3>
              <div className="text-brand-orange/60">{term.content}</div>
            </TermSection>
          ))}
        </div>
      </div>
    </div>
  );
}
