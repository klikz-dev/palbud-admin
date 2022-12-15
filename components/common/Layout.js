import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import Loading from '@/components/atoms/Loading'
import Sidenav from '@/components/organisms/Sidenav'
import Header from '@/components/organisms/Header'
import Footer from '@/components/organisms/Footer'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCogs,
  faHomeAlt,
  faUserCircle,
  faUserGroup,
} from '@fortawesome/free-solid-svg-icons'

export default function Layout({ title, children }) {
  const router = useRouter()
  const { data: session, status } = useSession()

  const routes = [
    {
      title: 'Overview',
      link: '/overview',
      icon: <FontAwesomeIcon icon={faHomeAlt} width={20} />,
    },
    {
      title: 'Caregivers',
      link: '/caregivers',
      icon: <FontAwesomeIcon icon={faUserCircle} width={20} />,
    },
    {
      title: 'Care Teams',
      link: '/careteams',
      icon: <FontAwesomeIcon icon={faUserGroup} width={20} />,
    },
    {
      title: 'Settings',
      link: '/settings',
      icon: <FontAwesomeIcon icon={faCogs} width={20} />,
    },
  ]

  const [openSidenav, setOpenSidenav] = useState(true)

  if (status === 'authenticated') {
    if (session?.accessTokenExpires < new Date().getTime()) {
      signOut()
    } else {
      return (
        <div className='min-h-screen bg-zinc-50/50'>
          <Sidenav
            routes={routes}
            openSidenav={openSidenav}
            setOpenSidenav={setOpenSidenav}
          />

          <div className='pl-5 pr-4 py-2 xl:ml-72'>
            <div className='text-blue-gray-900'>
              <Header title={title} setOpenSidenav={setOpenSidenav} />
            </div>

            <main id='page-content' className='min-h-screen'>
              {children}
            </main>

            <div className='text-blue-gray-600'>
              <Footer />
            </div>
          </div>
        </div>
      )
    }
  } else if (status === 'unauthenticated') {
    router.push('/')
  }

  return (
    <>
      <main id='page-content'>
        <div className='flex'>
          <Loading />
        </div>
      </main>
    </>
  )
}
