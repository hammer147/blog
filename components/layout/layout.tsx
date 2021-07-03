import MainNavigation from './main-navigation'
import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

function Layout({ children }: Props) {
  return (
    <>
      <MainNavigation />
      <main>{children}</main>
    </>
  )
}

export default Layout
