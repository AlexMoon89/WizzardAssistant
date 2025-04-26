import { pgTable, text, serial, integer, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// This is a simple schema for storing user preferences
export const userPreferences = pgTable("user_preferences", {
  id: serial("id").primaryKey(),
  languagePreference: text("language_preference").notNull().default("en"),
  favorites: jsonb("favorites").notNull().default({}),
  lastViewed: jsonb("last_viewed").notNull().default({}),
});

export const insertUserPreferencesSchema = createInsertSchema(userPreferences).pick({
  languagePreference: true,
  favorites: true,
  lastViewed: true,
});

export type InsertUserPreferences = z.infer<typeof insertUserPreferencesSchema>;
export type UserPreferences = typeof userPreferences.$inferSelect;
