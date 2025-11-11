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
    id: "introduction",
    title: "Introduction",
    content: (
      <>
        <p className="lg:text-lg">
          Welcome to Series Seed! This Privacy Policy describes how Series Seed, a not-for-profit
          501(c)(3) organization (&quot;Series Seed&quot;, &quot;we&quot;, &quot;us&quot;, or
          &quot;our&quot;), collects, uses, and protects your personal information when you use our
          website, programs, events, and services.
        </p>
        <p className="lg:text-lg">
          We are committed to protecting your privacy and handling your personal information with
          care and respect. This policy explains what information we collect, how we use it, and
          your rights regarding your personal information.
        </p>
        <p className="lg:text-lg">
          By using our website or participating in our programs and events, you agree to the
          collection and use of information in accordance with this Privacy Policy.
        </p>
      </>
    ),
  },
  {
    id: "information-we-collect",
    title: "Information We Collect",
    content: (
      <>
        <p className="lg:text-lg">
          We collect several types of information from and about users of our services:
        </p>
        <ul className="list-disc space-y-2 pl-4 lg:text-lg">
          <li>
            <strong>Personal Information:</strong> Name, email address, phone number, mailing
            address, professional background, company affiliation, and other information you provide
            when registering for membership, events, or programs.
          </li>
          <li>
            <strong>Profile Information:</strong> Industry sector, career interests, areas of
            expertise, educational background, and professional goals you share to help us match you
            with relevant mentors and opportunities.
          </li>
          <li>
            <strong>Payment Information:</strong> Billing information and payment card details when
            you register for paid events or programs (processed securely through third-party payment
            processors).
          </li>
          <li>
            <strong>Communications:</strong> Messages, inquiries, and other communications you send
            to us or share through our platforms.
          </li>
          <li>
            <strong>Usage Information:</strong> Information about how you use our website, including
            pages visited, time spent, and interaction patterns, collected through cookies and
            similar technologies.
          </li>
          <li>
            <strong>Event Participation:</strong> Information about your attendance at events,
            participation in programs, and interactions with mentors and other members.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "how-we-use-information",
    title: "How We Use Your Information",
    content: (
      <>
        <p className="lg:text-lg">We use the information we collect for the following purposes:</p>
        <ul className="list-disc space-y-2 pl-4 lg:text-lg">
          <li>
            <strong>Program Administration:</strong> To manage your membership, register you for
            events and programs, and facilitate mentoring relationships.
          </li>
          <li>
            <strong>Personalization:</strong> To match you with relevant mentors, recommend programs
            and events aligned with your interests, and provide personalized educational content.
          </li>
          <li>
            <strong>Communication:</strong> To send you information about upcoming events, programs,
            opportunities, and organizational updates.
          </li>
          <li>
            <strong>Community Building:</strong> To connect you with other members, mentors, and
            business leaders in your industry or areas of interest.
          </li>
          <li>
            <strong>Improvement:</strong> To analyze and improve our programs, events, and services
            based on member feedback and usage patterns.
          </li>
          <li>
            <strong>Legal Compliance:</strong> To comply with applicable laws, regulations, and
            legal obligations.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "how-we-share-information",
    title: "How We Share Your Information",
    content: (
      <>
        <p className="lg:text-lg">
          We respect your privacy and only share your information in limited circumstances:
        </p>
        <ul className="list-disc space-y-2 pl-4 lg:text-lg">
          <li>
            <strong>With Your Consent:</strong> We may share your information with mentors, other
            members, or event participants when you explicitly consent or as necessary for program
            participation.
          </li>
          <li>
            <strong>Service Providers:</strong> We work with trusted third-party service providers
            who assist us in operating our website, conducting programs, and providing services
            (such as payment processors, email service providers, and event management platforms).
          </li>
          <li>
            <strong>Business Partners:</strong> We may share limited information with sponsors,
            speakers, and partners for specific events or programs, only as necessary to facilitate
            your participation.
          </li>
          <li>
            <strong>Legal Requirements:</strong> We may disclose information when required by law,
            court order, or government request, or to protect our rights, property, or safety, or
            that of others.
          </li>
          <li>
            <strong>Aggregated Data:</strong> We may share anonymized, aggregated data that does not
            identify individuals for research, reporting, or promotional purposes.
          </li>
        </ul>
        <p className="lg:text-lg">
          We do not sell your personal information to third parties for marketing purposes.
        </p>
      </>
    ),
  },
  {
    id: "data-security",
    title: "Data Security",
    content: (
      <>
        <p className="lg:text-lg">
          We implement appropriate technical and organizational measures to protect your personal
          information against unauthorized access, alteration, disclosure, or destruction. These
          measures include:
        </p>
        <ul className="list-disc space-y-2 pl-4 lg:text-lg">
          <li>Secure servers and encrypted data transmission</li>
          <li>Access controls and authentication procedures</li>
          <li>Regular security assessments and updates</li>
          <li>Employee training on data protection and privacy</li>
        </ul>
        <p className="lg:text-lg">
          However, no method of transmission over the internet or electronic storage is 100% secure.
          While we strive to protect your personal information, we cannot guarantee absolute
          security. If you believe your information has been compromised, please contact us
          immediately.
        </p>
      </>
    ),
  },
  {
    id: "data-retention",
    title: "Data Retention",
    content: (
      <>
        <p className="lg:text-lg">
          We retain your personal information for as long as necessary to fulfill the purposes
          outlined in this Privacy Policy, unless a longer retention period is required or permitted
          by law.
        </p>
        <p className="lg:text-lg">
          When you are an active member or program participant, we maintain your information to
          provide services and maintain your relationship with Series Seed. If you request deletion
          of your account, we will delete or anonymize your personal information within a reasonable
          timeframe, except for information we are required to retain for legal, regulatory, or
          legitimate business purposes.
        </p>
      </>
    ),
  },
  {
    id: "your-rights",
    title: "Your Rights and Choices",
    content: (
      <>
        <p className="lg:text-lg">
          You have the following rights regarding your personal information:
        </p>
        <ul className="list-disc space-y-2 pl-4 lg:text-lg">
          <li>
            <strong>Access:</strong> You can request access to the personal information we hold
            about you.
          </li>
          <li>
            <strong>Correction:</strong> You can request that we correct inaccurate or incomplete
            information.
          </li>
          <li>
            <strong>Deletion:</strong> You can request deletion of your personal information,
            subject to certain exceptions.
          </li>
          <li>
            <strong>Opt-Out:</strong> You can opt out of receiving promotional emails by following
            the unsubscribe instructions in those emails.
          </li>
          <li>
            <strong>Data Portability:</strong> You can request a copy of your personal information
            in a structured, commonly used format.
          </li>
          <li>
            <strong>Withdraw Consent:</strong> Where we rely on your consent, you can withdraw it at
            any time.
          </li>
        </ul>
        <p className="lg:text-lg">
          To exercise these rights, please contact us using the information provided in the Contact
          section below.
        </p>
      </>
    ),
  },
  {
    id: "cookies",
    title: "Cookies and Tracking",
    content: (
      <>
        <p className="lg:text-lg">
          We use cookies and similar tracking technologies to enhance your experience on our
          website. Cookies are small text files stored on your device that help us understand how
          you use our site and remember your preferences.
        </p>
        <p className="lg:text-lg">Types of cookies we use:</p>
        <ul className="list-disc space-y-2 pl-4 lg:text-lg">
          <li>
            <strong>Essential Cookies:</strong> Necessary for the website to function properly.
          </li>
          <li>
            <strong>Analytics Cookies:</strong> Help us understand how visitors use our website.
          </li>
          <li>
            <strong>Preference Cookies:</strong> Remember your settings and preferences.
          </li>
        </ul>
        <p className="lg:text-lg">
          You can control cookie settings through your browser preferences. Please note that
          disabling certain cookies may affect the functionality of our website.
        </p>
      </>
    ),
  },
  {
    id: "childrens-privacy",
    title: "Children's Privacy",
    content: (
      <>
        <p className="lg:text-lg">
          Our services are not directed to individuals under the age of 18. We do not knowingly
          collect personal information from children. If you believe we have inadvertently collected
          information from a child, please contact us immediately, and we will take steps to delete
          such information.
        </p>
      </>
    ),
  },
  {
    id: "third-party-links",
    title: "Third-Party Links and Services",
    content: (
      <>
        <p className="lg:text-lg">
          Our website may contain links to third-party websites, services, or resources. This
          Privacy Policy does not apply to those external sites. We are not responsible for the
          privacy practices of third parties, and we encourage you to review their privacy policies
          before providing any personal information.
        </p>
      </>
    ),
  },
  {
    id: "changes-to-privacy-policy",
    title: "Changes to This Privacy Policy",
    content: (
      <>
        <p className="lg:text-lg">
          We may update this Privacy Policy from time to time to reflect changes in our practices,
          technologies, or legal requirements. We will notify you of any material changes by posting
          the updated policy on our website and updating the &quot;Last Updated&quot; date.
        </p>
        <p className="lg:text-lg">
          We encourage you to review this Privacy Policy periodically to stay informed about how we
          protect your information. Your continued use of our services after changes are posted
          constitutes your acceptance of the updated Privacy Policy.
        </p>
      </>
    ),
  },
  {
    id: "contact-information",
    title: "Contact Us",
    content: (
      <>
        <p className="lg:text-lg">
          If you have any questions, concerns, or requests regarding this Privacy Policy or our data
          practices, please contact us:
        </p>
        <div className="mt-4 space-y-2 lg:text-lg">
          <p>
            <strong>Series Seed</strong>
          </p>
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

export default function PrivacyPolicyPage() {
  const [activeTerm, setActiveTerm] = useState(0);
  const title = "Privacy Policy";
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
