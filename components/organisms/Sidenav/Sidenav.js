import { XMarkIcon } from '@heroicons/react/24/outline'
import { Button, IconButton, Typography } from '@material-tailwind/react'
import Link from '@/components/atoms/Link'
import Logo from '@/components/molecules/Logo'

export default function Sidenav({ routes, openSidenav, setOpenSidenav }) {
  return (
    <aside
      className={`bg-gradient-to-br from-zinc-700 to-zinc-900 ${
        openSidenav ? 'translate-x-0' : '-translate-x-80'
      } fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0`}
    >
      <div className={`relative border-b ${'border-white/20'}`}>
        <Link href='/' className='flex items-center gap-4 py-6 px-8'>
          <Logo />
          <Typography variant='h6' color={'white'}>
            palbud Admin
          </Typography>
        </Link>

        <IconButton
          variant='text'
          color='white'
          size='sm'
          ripple={false}
          className='absolute right-0 top-0 grid rounded-br-none rounded-tl-none xl:hidden'
          onClick={() => setOpenSidenav(false)}
        >
          <XMarkIcon strokeWidth={2.5} className='h-5 w-5 text-white' />
        </IconButton>
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
                  <Typography
                    color='inherit'
                    className='font-medium capitalize'
                  >
                    {title}
                  </Typography>
                </Button>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}
