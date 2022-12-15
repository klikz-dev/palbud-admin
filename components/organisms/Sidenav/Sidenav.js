import Button from '@/components/atoms/Button'
import Link from '@/components/atoms/Link'
import Logo from '@/components/molecules/Logo'
import { faArrowRightFromBracket, faX } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { signOut } from 'next-auth/react'

export default function Sidenav({ routes, openSidenav, setOpenSidenav }) {
  return (
    <aside
      className={`bg-gradient-to-br from-zinc-700 to-zinc-900 ${
        openSidenav ? 'translate-x-0' : '-translate-x-80'
      } fixed inset-0 z-50 my-1 ml-1 h-[calc(100vh-8px)] w-72 rounded transition-transform duration-300 xl:translate-x-0`}
    >
      <div className={`relative border-b ${'border-white/20'}`}>
        <Link href='/'>
          <div className='flex items-center gap-4 py-6 px-8'>
            <Logo />
            <h5 className={'text-white'}>palbud Admin</h5>
          </div>
        </Link>

        <div className='absolute right-0 top-0 grid xl:hidden'>
          <Button color='black' size='sm' onClick={() => setOpenSidenav(false)}>
            <FontAwesomeIcon icon={faX} width={20} />
          </Button>
        </div>
      </div>

      <div className='m-4'>
        <ul className='mb-4 flex flex-col gap-1'>
          {routes.map(({ title, link, icon }, index) => (
            <li key={index}>
              {index + 1 === routes.length && (
                <div className={`border-b ${'border-white/10'} mb-2`}></div>
              )}
              <Link href={link}>
                <Button color={'transparent'} className='w-full'>
                  <div className='w-full text-left flex items-center gap-4 capitalize py-2'>
                    {icon}
                    <span className='font-medium capitalize'>{title}</span>
                  </div>
                </Button>
              </Link>
            </li>
          ))}

          <li className={'absolute bottom-4 w-[calc(100%-32px)]'}>
            <Button color={'transparent'} className='w-full' onClick={signOut}>
              <div className='w-full text-left flex items-center gap-4 capitalize py-2'>
                <FontAwesomeIcon icon={faArrowRightFromBracket} width={20} />
                <span className='font-medium capitalize'>Sign Out</span>
              </div>
            </Button>
          </li>
        </ul>
      </div>
    </aside>
  )
}
