import Button from '@/components/atoms/Button'
import { faBarsProgress } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSession } from 'next-auth/react'
import Avatar from 'react-avatar'

export default function Header({ title, setOpenSidenav }) {
  const { data: session } = useSession()

  return (
    <div className='px-4 py-2 shadow'>
      <div className='max-w-screen-2xl mx-auto flex flex-row justify-between items-center space-x-12'>
        <Button
          variant='text'
          color='white'
          size='sm'
          className='grid rounded-br-none rounded-tl-none xl:hidden'
          onClick={() => setOpenSidenav(true)}
        >
          <FontAwesomeIcon icon={faBarsProgress} />
        </Button>

        <h4>
          <span>{title}</span>
        </h4>

        <div className='flex flex-row items-center font-bold'>
          <p className='mr-4 font-bold'>
            <span>
              {session?.firstName} {session?.lastName}
            </span>
          </p>

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
