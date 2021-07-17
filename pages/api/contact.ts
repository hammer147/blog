import { MongoClient, ObjectId } from 'mongodb'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  message: string | Message
}

type Message = {
  email?: string
  name?: string
  message?: string
  id?: ObjectId
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === 'POST') {
    const { email, name, message } = req.body as Message
    if (
      !email || !email.includes('@') ||
      !name || name.trim() === '' ||
      !message || message.trim() === ''
    ) {
      return res.status(422).json({ message: 'Invalid Input.' })
    }

    // store it in a db
    const newMessage: Message = { email, name, message }

    let client: MongoClient

    const { MONGODB_USERNAME, MONGODB_PASSWORD, MONGODB_CLUSTER, MONGODB_DATABASE } = process.env

    try {
      client = await MongoClient.connect(
        `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@${MONGODB_CLUSTER}.ul1xj.mongodb.net/${MONGODB_DATABASE}?retryWrites=true&w=majority`
      )
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: 'Could not connect to database.' })
    }

    const db = client.db()

    try {
      const result = await db.collection('messages').insertOne(newMessage)
      newMessage.id = result.insertedId
    } catch (error) {
      client.close()
      return res.status(500).json({ message: 'Storing message failed.' })
    }

    client.close()

    res.status(201).json({ message: newMessage })
  }

}
