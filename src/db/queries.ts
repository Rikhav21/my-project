import { db } from './db'
import { gifts } from './schema'
import { eq } from 'drizzle-orm'

export async function getAllGifts() {
  return await db.select().from(gifts)
}

export async function getGiftById(id: number) {
  return await db.select().from(gifts).where(eq(gifts.id, id))
}

export async function addGift(recipient: string, gift: string) {
  return await db.insert(gifts).values({
    recipient,
    gift,
    createdAt: Date.now(),
    received: 0
  }).returning()
}

export async function updateReceived(id: number, received: number) {
  return await db.update(gifts).set({ received }).where(eq(gifts.id, id))
}

export async function deleteGift(id: number) {
  return await db.delete(gifts).where(eq(gifts.id, id))
}

export async function getGiftsByRecipient(recipient: string) {
  return await db.select().from(gifts).where(eq(gifts.recipient, recipient))
}
