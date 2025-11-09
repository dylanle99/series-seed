"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import useSWR from "swr";
import { Calendar, MapPin, ArrowLeft, Check } from "lucide-react";
import { Event, Mentor } from "@/types/schema";
import { getValidImageUrl } from "@/lib/helpers";
import { EVENT_TYPE_LABELS } from "@/lib/constants";
import { fetcher } from "@/lib/mutations";

const MILESTONES = [
  {
    date: "6:00 PM",
    name: "Opening",
    description: ["Welcome remarks", "Speaker introduction"],
  },
  {
    date: "6:15 PM",
    name: "Keynote Speaker: Ron Vachris",
    description: ["Career journey", "Industry insights", "Key topics discussion"],
  },
  {
    date: "7:00 PM",
    name: "Live Q&A & Closing",
    description: ["Audience questions", "Closing remarks"],
  },
];

function EventSchedule() {
  return (
    <div className="grid grid-cols-1 gap-8 overflow-hidden md:grid-cols-2 lg:grid-cols-3 pt-4 md:pt-8">
      {MILESTONES.map((item) => (
        <div key={item.name} className="space-y-4">
          <div className="flex items-center text-sm/6 font-semibold text-brand-orange">
            <svg viewBox="0 0 4 4" aria-hidden="true" className="mr-4 size-1 flex-none">
              <circle r={2} cx={2} cy={2} fill="currentColor" />
            </svg>
            {item.date}
            <div
              aria-hidden="true"
              className="absolute -ml-2 h-0.5 w-screen -translate-x-full bg-brand-orange/40 sm:-ml-4 lg:static lg:-mr-6 lg:ml-8 lg:w-auto lg:flex-auto lg:translate-x-0"
            />
          </div>
          <div>
            <p className="text-lg/8 font-semibold tracking-tight text-brand-orange">{item.name}</p>
            <ul className="mt-2 text-base/7 text-brand-orange/70 space-y-1">
              {item.description.map((point, index) => (
                <li key={index} className="flex items-center tracking-tight">
                  <Check className="h-4 w-4 mr-2 text-sm text-brand-orange/60" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function EventPage() {
  const params = useParams();
  const id = params.id as string;
  const [bannerImageError, setBannerImageError] = useState(false);

  // Fetch event data using SWR
  const {
    data: event,
    error: eventError,
    isLoading: isEventLoading,
  } = useSWR<Event>(id ? `/api/events/${id}` : null, fetcher);

  // Fetch mentors data using SWR
  const {
    data: mentors,
    error: mentorsError,
    isLoading: isMentorsLoading,
  } = useSWR<Mentor[]>(id ? `/api/events/${id}/mentors` : null, fetcher);

  if (isEventLoading) {
    return (
      <div className="min-h-screen bg-black text-brand-orange flex items-center justify-center">
        <p className="text-lg">Loading event...</p>
      </div>
    );
  }

  if (eventError || !event) {
    return (
      <div className="min-h-screen bg-black text-brand-orange flex flex-col items-center justify-center gap-4">
        <p className="text-lg text-red-500">Error loading event. Please try again later.</p>
        <Link href="/events" className="text-brand-orange hover:underline flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back to Events
        </Link>
      </div>
    );
  }

  const eventDate = event.occured_at ? new Date(event.occured_at) : null;
  const location = event.in_person_location || event.virtual_location || "Location TBA";

  const formattedDate = eventDate
    ? eventDate.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
      })
    : "Date TBA";

  // Debug: Log the banner image URL
  console.log("Event banner_image:", event.banner_image);
  console.log("Banner image after getValidImageUrl:", getValidImageUrl(event.banner_image));
  return (
    <div
      className="min-h-screen bg-black text-brand-orange space-y-8"
      style={{
        paddingTop: "calc(var(--header-height) + 1rem)",
        paddingBottom: "calc(var(--header-height) + 1rem)",
      }}
    >
      {/* Hero Section */}
      <section className="relative w-full">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="relative w-full h-96 overflow-hidden flex items-center justify-center bg-black rounded-lg">
            {event.banner_image && !bannerImageError ? (
              <Image
                src={getValidImageUrl(event.banner_image)}
                alt={event.title}
                fill
                className="object-cover rounded-lg"
                unoptimized
              />
            ) : (
              <div className="flex flex-col items-center justify-center gap-4">
                <Image
                  src="/logo/series-seed.svg"
                  alt={event.title}
                  width={300}
                  height={300}
                  className="object-contain"
                />
                {event.banner_image && bannerImageError && (
                  <p className="text-xs text-brand-orange/50">Banner image unavailable</p>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Event Content */}
      <section className="container mx-auto px-4 max-w-4xl flex flex-col space-y-20">
        <div className="space-y-6">
          {/* Event Title */}
          <h1 className="text-4xl font-normal text-brand-orange md:text-5xl">{event.title}</h1>
          {/* Event Details */}
          <div className="flex flex-wrap gap-6 text-sm">
            <div className="flex items-center gap-2 text-brand-orange/80">
              <Calendar className="w-4 h-4" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center gap-2 text-brand-orange/80">
              <MapPin className="w-4 h-4" />
              <span>{location}</span>
            </div>
          </div>
          {/* Event Type Badge */}
          {event.type && (
            <div>
              <span className="inline-flex items-center rounded-full bg-brand-orange/10 px-2 py-1 text-xs font-medium text-brand-orange inset-ring inset-ring-brand-orange/10">
                {EVENT_TYPE_LABELS[event.type as keyof typeof EVENT_TYPE_LABELS]}
              </span>
            </div>
          )}
          {/* Description */}
          {event.description && (
            <div className="space-y-4">
              <h2 className="text-2xl font-medium text-brand-orange md:text-3xl">About</h2>
              <div className="text-brand-orange/80 leading-relaxed whitespace-pre-wrap">
                {event.description}
              </div>
            </div>
          )}
        </div>

        {/* Mentors Section */}
        {isMentorsLoading ? (
          <div>
            <h2 className="text-2xl font-bold mb-6 text-brand-orange">Speakers</h2>
            <p className="text-brand-orange/70">Loading speakers...</p>
          </div>
        ) : mentors && mentors.length > 0 ? (
          <div>
            {mentors.map((mentor) => {
              const fullName = `${mentor.first_name || ""} ${mentor.last_name || ""}`.trim();
              const currentExperience =
                mentor.experiences?.find((exp) => exp.current) || mentor.experiences?.[0];
              const currentRole = currentExperience?.title || "";
              const currentCompany = currentExperience?.company || "";

              return (
                <div
                  key={mentor.id}
                  className="flex flex-col gap-12 lg:flex-row lg:justify-between lg:gap-16"
                >
                  {/* Left column - Text content */}
                  <div className="max-w-3xl space-y-4">
                    <span className="inline-flex items-center rounded-full bg-brand-orange/10 px-2 py-1 text-xs font-medium text-brand-orange inset-ring inset-ring-brand-orange/10">
                      Speaker
                    </span>

                    <img
                      src={getValidImageUrl(mentor.image_url)}
                      alt={fullName}
                      className="w-24 h-24 rounded-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "/logo/series-seed.svg";
                      }}
                    />

                    <h2 className="text-2xl font-medium text-brand-orange md:text-3xl">
                      {fullName}
                    </h2>

                    {currentRole && currentCompany && (
                      <p className="text-xl text-brand-orange/70 leading-relaxed">
                        {currentRole} <span className="italic">at</span>{" "}
                        <span className="font-semibold text-brand-orange">{currentCompany}</span>
                      </p>
                    )}

                    {/* Bio */}
                    {mentor.bio && (
                      <div
                        className="space-y-4 text-brand-orange/80 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: mentor.bio }}
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : null}

        <div>
          <h2 className="text-2xl font-medium text-brand-orange md:text-3xl">Event Details</h2>
          <EventSchedule />
        </div>
      </section>
    </div>
  );
}
