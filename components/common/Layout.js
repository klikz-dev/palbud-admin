import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import Divider from '@/components/atoms/Divider'
import Loading from '@/components/atoms/Loading'
import Footer from '@/components/organisms/Footer'
import Header from '@/components/organisms/Header'

export default function Layout({ title, children }) {
  const router = useRouter()
  const { data: session, status } = useSession()

  if (status === 'authenticated') {
    if (session?.accessTokenExpires < new Date().getTime()) {
      signOut()
    } else {
      return (
        <div style={{ minWidth: '1375px' }}>
          <Header title={title} />

          <main id='page-content'>{children}</main>

          <Divider width={12} />

          <Footer />
        </div>
      )
    }
  } else if (status === 'unauthenticated') {
    router.push('/')
  }

  return (
    <>
      <Header />
      <main id='page-content'>
        <div className='flex'>
          <Loading />
        </div>
      </main>
      <Footer />
    </>
  )
}
