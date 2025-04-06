import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User Model
export const leaderboard = sqliteTable("leaderboard", {
    id: text("id").primaryKey(),
    username: text("name").notNull().default("undefined"),
    level: integer("level").notNull().default(1),
    xp: integer("xp").notNull().default(0),
    xpNeeded: integer("xp_needed").notNull().default(0),
    rank: integer("rank").notNull().default(0),
    colorClass: text("color_class").notNull().default("undefined"),
});

export const boostersUsers = sqliteTable("boosters_users", {
    id: text("id").primaryKey(),
    username: text("name").notNull().default("undefined"),
    since: integer("since"),
});

export const afkUsers = sqliteTable("afk_users", {
    id: text("id").primaryKey(),
    username: text("name").notNull().default("undefined"),
    since: integer("since"),
    reason: text("reason"),
});

export const botCommands = sqliteTable("bot_commands", {
    id: text("id").primaryKey(),
    name: text("name").notNull().default("undefined"),
    description: text("description").notNull().default("undefined"),
    category: text("category").notNull().default("undefined"),
});

export const settings = sqliteTable("settings", {
    id: text("id").primaryKey(),
    joinRoleEnabled: text("joinrole_enabled").notNull().default("false"),
    invitesEnabled: text("invites_enabled").notNull().default("true"),
    reactionRoleEnabled: text("reactionrole_enabled").notNull().default("false"),
    ticketEnabled: text("ticket_enabled").notNull().default("false"),
    automodEnabled: text("automod_enabled").notNull().default("false"),
    // Channels
    joinChannel: text("join_channel").notNull().default("undefined"),
    leaveChannel: text("leave_channel").notNull().default("undefined"),
    autoReactionSystemChannel: text("auto_reaction_system_channel").notNull().default("undefined"),
    reportLogChannel: text("report_log_channel").notNull().default("undefined"),
    reviewSendChannel: text("review_log_channel").notNull().default("undefined"),
    suggestionSendChannel: text("suggestion_log_channel").notNull().default("undefined"),
    ticketForumChannel: text("ticket_channel").notNull().default("undefined"),
    giveawayChannel: text("giveaway_channel").notNull().default("undefined"),
    pollChannel: text("poll_channel").notNull().default("undefined"),
    // For transcripts as well
    ticketLogChannel: text("ticket_log_channel").notNull().default("undefined"),
    automodLogChannel: text("automod_channel").notNull().default("undefined"),
    punishmentLogChannel: text("punishment_log_channel").notNull().default("undefined"),
    // 
    reactionRoleMessageId: text("reactionrole_message_id").notNull().default("undefined"),
    starboardMessageId: text("starboard_message_id").notNull().default("undefined"),
});

export const activity = sqliteTable("activity", {
    id: text("id").primaryKey(),
    type: text("type").notNull().default("undefined"),
    username: text("action").notNull().default("undefined"),
    note: text("target").notNull().default("undefined"),
    timestamp: text("timestamp").notNull().default("undefined"),
});

export const serverStats = sqliteTable("server_stats", {
    id: text("id").primaryKey(),
    name: text("name").notNull().default("undefined"),
    memberCount: integer("member_count").notNull().default(0),
    features: text("features").notNull().default("[]"),
});

// Zod Schemas
export const insertLeaderboardSchema = createInsertSchema(leaderboard).pick({
    id: true,
    username: true,
    level: true,
    xp: true,
    xpNeeded: true,
    rank: true,
    colorClass: true
});

export const insertBoostersUsersSchema = createInsertSchema(boostersUsers).pick({
    id: true,
    username: true,
    since: true,
});

export const insertAfkUsersSchema = createInsertSchema(afkUsers).pick({
    id: true,
    username: true,
    since: true,
    reason: true,
});

export const insertBotCommandsSchema = createInsertSchema(botCommands).pick({
    id: true,
    name: true,
    description: true,
    category: true,
});

export const insertSettingsSchema = createInsertSchema(settings).pick({
    id: true,
    joinRoleEnabled: true,
    invitesEnabled: true,
    reactionRoleEnabled: true,
    ticketEnabled: true,
    automodEnabled: true,
    // Channels
    joinChannel: true,
    leaveChannel: true,
    autoReactionSystemChannel: true,
    reportLogChannel: true,
    reviewSendChannel: true,
    suggestionSendChannel: true,
    ticketForumChannel: true,
    giveawayChannel: true,
    pollChannel: true,
    // For transcripts as well
    ticketLogChannel: true,
    automodLogChannel: true,
    punishmentLogChannel: true,
    // 
    reactionRoleMessageId: true,
    starboardMessageId: true
});

export const insertActivitySchema = createInsertSchema(activity).pick({
    id: true,
    type: true,
    username: true,
    note: true,
    timestamp: true,
});

export const insertServerStatsSchema = createInsertSchema(serverStats).pick({
    id: true,
    name: true,
    memberCount: true,
    features: true,
});

// Types
export type Leaderboard = z.infer<typeof insertLeaderboardSchema>;
export type InsertLeaderboard = typeof leaderboard.$inferSelect;

export type BoostersUsers = z.infer<typeof insertBoostersUsersSchema>;
export type InsertBoostersUsers = typeof boostersUsers.$inferSelect;

export type AfkUsers = z.infer<typeof insertAfkUsersSchema>;
export type InsertAfkUsers = typeof afkUsers.$inferSelect;

export type BotCommands = z.infer<typeof insertBotCommandsSchema>;
export type InsertBotCommands = typeof botCommands.$inferSelect;

export type Settings = z.infer<typeof insertSettingsSchema>;
export type InsertSettings = typeof settings.$inferSelect;

export type Activity = z.infer<typeof insertActivitySchema>;
export type InsertActivity = typeof activity.$inferSelect;

export type ServerStats = z.infer<typeof insertServerStatsSchema>;
export type InsertServerStats = typeof serverStats.$inferSelect;