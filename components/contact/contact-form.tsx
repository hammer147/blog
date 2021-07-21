import { FormEvent, useEffect, useState } from 'react'
import { Status } from '../../typings'
import classes from './contact-form.module.css'
import { TNotification } from '../../typings'
import Notification from '../../components/ui/notification'

type ContactDetails = {
  email: string
  name: string
  message: string
}

let notification: TNotification

function ContactForm() {

  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [requestStatus, setRequestStatus] = useState<Status | null>(null)
  const [requestError, setRequestError] = useState('')

  useEffect(() => {
    if (requestStatus === 'success' || requestStatus === 'error') {
      const timer = setTimeout(() => {
        setRequestStatus(null)
        setRequestError('')
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [requestStatus])

  async function sendContactData(contactDetails: ContactDetails) {
    const response = await fetch('/api/contact', {
      method: 'POST',
      body: JSON.stringify(contactDetails),
      headers: { 'Content-Type': 'application/json' }
    })
    const data = await response.json()
    if (!response.ok) {
      throw new Error(data.message ?? 'Something went wrong.')
    }
  }

  async function sendMessageHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    // optional: add client-side validation
    setRequestStatus('pending')
    try {
      await sendContactData({ email, name, message })
      setRequestStatus('success')
      setEmail('')
      setName('')
      setMessage('')
    } catch (error) {
      setRequestError(error.message)
      setRequestStatus('error')
    }
  }

  switch (requestStatus) {
    case 'pending':
      notification = {
        title: 'Sending message...',
        message: 'Your message is on its way.',
        status: 'pending'
      }
      break
    case 'success':
      notification = {
        title: 'Success',
        message: 'Message sent successfully.',
        status: 'success'
      }
      break
    case 'error':
      notification = {
        title: 'Error',
        message: requestError,
        status: 'error'
      }
  }

  return (
    <section className={classes.contact}>
      <h1>How can I help you?</h1>
      <form className={classes.form} onSubmit={sendMessageHandler}>
        <div className={classes.controls}>
          <div className={classes.control}>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" required value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div className={classes.control}>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" required value={name} onChange={e => setName(e.target.value)} />
          </div>
        </div>
        <div className={classes.control}>
          <label htmlFor="message">Message</label>
          <textarea id="message" rows={5} required value={message} onChange={e => setMessage(e.target.value)}></textarea>
        </div>
        <div className={classes.actions}>
          <button>Send Message</button>
        </div>
      </form>
      {notification && <Notification title={notification.title} message={notification.message} status={notification.status} />}
    </section>
  )
}

export default ContactForm
