export type Post = {
  slug: string
  title: string
  image: string
  excerpt: string
  date: string
  isFeatured: boolean
  content: string
}

export type Status = 'pending' | 'success' | 'error'

export type TNotification = {
  title: string
  message: string
  status: Status
}
