import Button from '@/components/atoms/Button'
import Link from '@/components/atoms/Link'
import Logo from '@/components/molecules/Logo'
import { faArrowRight, faX } from '@fortawesome/free-solid-svg-icons'
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
        <Link href='/' className='flex items-center gap-4 py-6 px-8'>
          <Logo />
          <h5 className={'text-white'}>palbud Admin</h5>
        </Link>

        <Button
          variant='text'
          color='white'
          size='sm'
          className='absolute right-0 top-0 grid rounded-br-none rounded-tl-none xl:hidden'
          onClick={() => setOpenSidenav(false)}
        >
          <FontAwesomeIcon icon={faX} />
        </Button>
      </div>

      <div className='m-4'>
        <ul className='mb-4 flex flex-col gap-1'>
          {routes.map(({ title, link, icon }, index) => (
            <li key={index}>
              {index + 1 === routes.length && (
                <div className={`border-b ${'border-white/10'}`}></div>
              )}
              <Link href={link}>
                <Button
                  variant={'text'}
                  color={'white'}
                  className='flex items-center gap-4 px-4 capitalize'
                  fullWidth
                >
                  {icon}
                  <span className='font-medium capitalize'>{title}</span>
                </Button>
              </Link>
            </li>
          ))}

          <li className={'absolute bottom-4 w-[calc(100%-32px)]'}>
            <Button
              variant={'text'}
              color={'white'}
              className='flex items-center gap-4 px-4 capitalize'
              fullWidth
              onClick={signOut}
            >
              <FontAwesomeIcon icon={faArrowRight} />
              <span className='font-medium capitalize'>Sign Out</span>
            </Button>
          </li>
        </ul>
      </div>
    </aside>
  )
}
