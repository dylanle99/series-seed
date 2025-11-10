"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useMemo } from "react";
import { Timeline } from "@/components/atomic/timeline";
import { EventSwitch } from "@/components/atomic/event-switch";
import { Card, CardFooter } from "@/components/atomic/card";
import { useEvents } from "@/hooks/use-events";
import { Event } from "@/types/schema";
import { EVENT_TYPE_LABELS } from "@/lib/constants";
import { getValidImageUrl } from "@/lib/helpers";

function EventCard({ event }: { event: Event }) {
  const [imageError, setImageError] = useState(false);

  return (
    <Link href={`/events/${event.id}`} className="block w-full">
      <Card className="w-full bg-black border-brand-orange transition-colors cursor-pointer py-0 gap-0 rounded-lg">
        <div className="relative w-full h-64 overflow-hidden flex items-center justify-center bg-black rounded-t-lg">
          {event.banner_image && !imageError ? (
            <Image
              src={getValidImageUrl(event.banner_image)}
              alt={event.title}
              fill
              className="object-cover"
              unoptimized
              onError={() => {
                console.error("Error loading event banner image for:", event.title);
                setImageError(true);
              }}
            />
          ) : (
            <Image
              src="/logo/series-seed.svg"
              alt={event.title}
              width={200}
              height={200}
              className="object-contain"
            />
          )}
        </div>
        <CardFooter className="flex flex-col items-start border-t border-brand-orange/30 py-6 space-y-4">
          <div className="space-y-4 text-left font-medium">
            <p className="text-sm text-brand-orange/80 uppercase">
              {EVENT_TYPE_LABELS[event.type as keyof typeof EVENT_TYPE_LABELS]}
            </p>
            <p className="text-lg text-brand-orange">{event.title}</p>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}

function TimelineDemo() {
  const [eventType, setEventType] = useState("upcoming");
  const { events, isLoading, isError } = useEvents();

  const { upcomingEvents, pastEvents } = useMemo(() => {
    if (!events) return { upcomingEvents: [], pastEvents: [] };

    const now = new Date();
    const upcoming: Event[] = [];
    const past: Event[] = [];

    events.forEach((event) => {
      const eventDate = event.occured_at ? new Date(event.occured_at) : null;
      if (eventDate && eventDate < now) {
        past.push(event);
      } else {
        upcoming.push(event);
      }
    });

    // Sort upcoming events by date (earliest first)
    upcoming.sort((a, b) => {
      const dateA = a.occured_at ? new Date(a.occured_at).getTime() : 0;
      const dateB = b.occured_at ? new Date(b.occured_at).getTime() : 0;
      return dateA - dateB;
    });

    // Sort past events by date (most recent first)
    past.sort((a, b) => {
      const dateA = a.occured_at ? new Date(a.occured_at).getTime() : 0;
      const dateB = b.occured_at ? new Date(b.occured_at).getTime() : 0;
      return dateB - dateA;
    });

    return { upcomingEvents: upcoming, pastEvents: past };
  }, [events]);

  const upcomingData = upcomingEvents.map((event) => {
    const eventDate = event.occured_at ? new Date(event.occured_at) : null;
    const monthYear = eventDate
      ? eventDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })
      : "TBA";

    return {
      title: monthYear,
      content: (
        <div className="space-y-6">
          <EventCard event={event} />
        </div>
      ),
    };
  });

  const pastData = pastEvents.map((event) => {
    const eventDate = event.occured_at ? new Date(event.occured_at) : null;
    const monthYear = eventDate
      ? eventDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })
      : "TBA";

    return {
      title: monthYear,
      content: (
        <div className="space-y-6">
          <EventCard event={event} />
        </div>
      ),
    };
  });

  const data = eventType === "upcoming" ? upcomingData : pastData;

  if (isLoading) {
    return (
      <div className="relative w-full overflow-visible">
        <div className="flex justify-center py-8">
          <EventSwitch value={eventType} onValueChange={setEventType} />
        </div>
        <div className="flex items-center justify-center min-h-[400px]">
          <p className="text-brand-orange text-lg">Loading events...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="relative w-full overflow-visible">
        <div className="flex justify-center py-8">
          <EventSwitch value={eventType} onValueChange={setEventType} />
        </div>
        <div className="flex items-center justify-center min-h-[400px]">
          <p className="text-red-500 text-lg">Error loading events. Please try again later.</p>
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="relative w-full overflow-visible">
        <div className="flex justify-center py-8">
          <EventSwitch value={eventType} onValueChange={setEventType} />
        </div>
        <div className="flex items-center justify-center min-h-[400px]">
          <p className="text-brand-orange/70 text-lg">No {eventType} events at this time.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full overflow-visible">
      <div className="flex justify-center py-8">
        <EventSwitch value={eventType} onValueChange={setEventType} />
      </div>
      <Timeline data={data} />
    </div>
  );
}

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-black text-brand-orange">
      {/* Hero Section - Full Screen */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/events/background.png"
            alt="Vision Background"
            fill
            className="object-cover object-center"
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
          <h1 className="text-[9vw] font-semibold uppercase leading-[0.8] tracking-[-0.03em] text-brand-orange">
            Events
          </h1>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="relative z-10 w-full">
        <TimelineDemo />
      </section>
    </div>
  );
}
