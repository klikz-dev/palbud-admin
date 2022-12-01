import Layout from '@/components/common/Layout'
import getCollection from '@/functions/getCollection'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import {
  Button,
  Chip,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from '@material-tailwind/react'

export default function Caregivers({ families }) {
  return (
    <Layout title='Care Teams'>
      <div className='p-4 max-w-6xl mx-auto shadow border rounded mt-12'>
        <Typography variant='h4' className='mb-4 pb-2 border-b'>
          All Care Teams
        </Typography>

        <div className='py-12 max-w-6xl mx-auto'>
          <div className='flex flex-row gap-0.5 mb-2 text-center'>
            <div className='w-1/4 p-2 rounded bg-blue-gray-100'>
              Parent Name
            </div>
            <div className='w-1/4 p-2 rounded bg-blue-gray-100'>Child Name</div>
            <div className='w-1/4 p-2 rounded bg-blue-gray-100'>Activity</div>
            <div className='w-1/4 p-2 rounded bg-blue-gray-100'>
              Subscription
            </div>
            <div className='w-1/4 p-2 rounded bg-blue-gray-100'>Access</div>
          </div>

          {families?.map((family, index) => (
            <div key={index} className='flex flex-row gap-0.5 mb-1 text-center'>
              <div className='w-1/4 p-2 rounded bg-blue-gray-50'>
                {family.firstName} {family.lastName}
              </div>
              <div className='w-1/4 p-2 rounded bg-blue-gray-50'>
                {family.childFirstName} {family.childLastName}
              </div>
              <div className='w-1/4 p-2 rounded bg-blue-gray-50'>
                <Chip variant='filled' value='Active' />
              </div>
              <div className='w-1/4 p-2 rounded bg-blue-gray-50'>
                <Chip variant='filled' value='Active' />
              </div>
              <div className='w-1/4 p-2 rounded bg-blue-gray-50'>
                <Menu>
                  <MenuHandler>
                    <Button variant='text'>
                      <div className='flex flex-row items-center'>
                        <span>Full Access</span>
                        <ChevronDownIcon width={16} />
                      </div>
                    </Button>
                  </MenuHandler>
                  <MenuList>
                    <MenuItem>Full Access</MenuItem>
                    <MenuItem>Suspend</MenuItem>
                    <MenuItem>Delete</MenuItem>
                  </MenuList>
                </Menu>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export async function getServerSideProps() {
  const families = await getCollection('family')

  return {
    props: {
      families,
    },
  }
}
