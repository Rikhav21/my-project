import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core"

export const gifts = sqliteTable("gifts", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  recipient: text("recipient").notNull(),
  gift: text("gift").notNull(),
  received: integer("received").notNull().default(0),
  createdAt: integer("created_at").notNull(),
})