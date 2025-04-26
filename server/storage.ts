import { userPreferences, type UserPreferences, type InsertUserPreferences } from "@shared/schema";

export interface IStorage {
  getUserPreferences(id: number): Promise<UserPreferences | undefined>;
  createUserPreferences(preferences: InsertUserPreferences): Promise<UserPreferences>;
  updateUserPreferences(id: number, preferences: Partial<InsertUserPreferences>): Promise<UserPreferences | undefined>;
}

export class MemStorage implements IStorage {
  private userPrefs: Map<number, UserPreferences>;
  currentId: number;

  constructor() {
    this.userPrefs = new Map();
    this.currentId = 1;
  }

  async getUserPreferences(id: number): Promise<UserPreferences | undefined> {
    return this.userPrefs.get(id);
  }

  async createUserPreferences(preferences: InsertUserPreferences): Promise<UserPreferences> {
    const id = this.currentId++;
    const userPref: UserPreferences = { ...preferences, id };
    this.userPrefs.set(id, userPref);
    return userPref;
  }

  async updateUserPreferences(id: number, preferences: Partial<InsertUserPreferences>): Promise<UserPreferences | undefined> {
    const existing = this.userPrefs.get(id);
    if (!existing) return undefined;
    
    const updated: UserPreferences = {
      ...existing,
      ...preferences
    };
    
    this.userPrefs.set(id, updated);
    return updated;
  }
}

export const storage = new MemStorage();
