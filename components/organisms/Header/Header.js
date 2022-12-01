import { Bars3Icon } from '@heroicons/react/24/outline'
import { IconButton, Typography } from '@material-tailwind/react'
import { useSession } from 'next-auth/react'
import Avatar from 'react-avatar'

export default function Header({ title, setOpenSidenav }) {
  const { data: session } = useSession()

  return (
    <div className='px-4 py-2 shadow'>
      <div className='max-w-screen-2xl mx-auto flex flex-row justify-between items-center space-x-12'>
        <IconButton
          variant='text'
          color='white'
          size='sm'
          ripple={false}
          className='grid rounded-br-none rounded-tl-none xl:hidden'
          onClick={() => setOpenSidenav(true)}
        >
          <Bars3Icon strokeWidth={2.5} className='h-5 w-5 text-blue-gray-800' />
        </IconButton>

        <Typography variant='h4'>{title}</Typography>

        <div className='flex flex-row items-center font-bold'>
          <Typography variant='paragraph' className='mr-4 font-bold'>
            {session?.firstName} {session?.lastName}
          </Typography>

          <Avatar
            email={session?.email}
            name={`${session?.firstName} ${session?.lastName}`}
            size={40}
            round={true}
            className=''
          />
        </div>
      </div>
    </div>
  )
}
