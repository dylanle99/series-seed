import useSWR from "swr";
import { Event } from "@/types/schema";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useEvents() {
  const { data, error, isLoading, mutate } = useSWR<Event[]>(
    "/api/events",
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return {
    events: data,
    isLoading,
    isError: error,
    mutate,
  };
}

