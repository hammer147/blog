// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Body = {
  email?: string
  name?: string
  message?: string
}

type Data = {
  message: string | {
    email: string
    name: string
    message: string
  }
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === 'POST') {
    const { email, name, message } = req.body as Body
    if (
      !email || !email.includes('@') ||
      !name || name.trim() === '' ||
      !message || message.trim() === ''
    ) {
      return res.status(422).json({ message: 'Invalid Input' })
    }

    // store it in a db
    const newMessage = { email, name, message }
    console.log(newMessage)

    res.status(201).json({ message: newMessage })
  }

}
