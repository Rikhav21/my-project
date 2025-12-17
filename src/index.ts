import { Hono } from 'hono'
import { getAllGifts, addGift, updateReceived, getGiftsByRecipient, getGiftById, deleteGift } from './db/queries'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Christmas Gift Tracker API')
})

app.get('/gifts', async (c) => {
  const gifts = await getAllGifts()
  return c.json(gifts)
})

app.get('/gifts/:id', async (c) => {
  const id = parseInt(c.req.param('id'))
  const gift = await getGiftById(id)
  if (gift.length === 0) {
    return c.json({ error: 'Gift not found' }, 404)
  }
  return c.json(gift[0])
})

app.get('/gifts/recipient/:recipient', async (c) => {
  const recipient = c.req.param('recipient')
  const gifts = await getGiftsByRecipient(recipient)
  return c.json(gifts)
})

app.post('/gifts', async (c) => {
  const body = await c.req.json<{ recipient: string; gift: string }>()
  const newGift = await addGift(body.recipient, body.gift)
  return c.json(newGift[0])
})

app.put('/gifts/:id', async (c) => {
  const id = parseInt(c.req.param('id'))
  const body = await c.req.json<{ received: number }>()
  await updateReceived(id, body.received)
  return c.text('Updated')
})

app.delete('/gifts/:id', async (c) => {
  const id = parseInt(c.req.param('id'))
  await deleteGift(id)
  return c.text('Deleted')
})

export default app
