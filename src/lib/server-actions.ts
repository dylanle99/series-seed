"use server";

import { createClient } from "@supabase/supabase-js";
import { config } from "@/config/appConfig";
import { LoggingService } from "@/lib/services/logging-service";

export async function saveUserInfo(email: string) {
  const loggingService = new LoggingService();
  try {
    const supabase = createClient(
      config.supabase.url,
      config.supabase.serviceRoleKey
    );

    const { error } = await supabase
      .from("website_subscribers")
      .insert({
        email,
      });

    if (error) {
      // Check if it's a duplicate constraint error (could be email or primary key)
      if (error.code === "23505") {
        // Any duplicate constraint violation - silently return success
        // This handles both email duplicates and primary key duplicates
        return null;
      }

      // For other errors, log and return user-friendly error message
      loggingService.error("Error saving user info", { error });
      return { error: "Unable to save your information. Please try again." };
    }

    return null;
  } catch (error) {
    loggingService.error("Error saving user info", { error });
    return { error: "Error saving user info" };
  }
}