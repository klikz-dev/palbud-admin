import Layout from '@/components/common/Layout'
import getCollection from '@/functions/getCollection'
import { Switch, Typography } from '@material-tailwind/react'
import dateFormat from 'dateformat'
import { useEffect, useState } from 'react'

export default function Caregivers({ caregivers }) {
  const activeCaregivers = caregivers
  const pendingCaregivers = caregivers.filter((caregiver) => caregiver.approved)

  const [caregiversList, setCaregiversList] = useState(activeCaregivers)
  const [showActive, setShowActive] = useState(true)

  useEffect(() => {
    if (showActive) {
      setCaregiversList(activeCaregivers)
    } else {
      setCaregiversList(pendingCaregivers)
    }
  }, [showActive])

  return (
    <Layout title='Caregivers'>
      <div className='p-4 max-w-6xl mx-auto shadow border rounded mt-12'>
        <Typography variant='h4' className='mb-4 pb-2 border-b'>
          All Caregivers
        </Typography>

        <div className='flex flex-row gap-3 items-center'>
          <Typography variant='paragraph'>Pending</Typography>
          <Switch
            id='ripple-on'
            label='Active'
            ripple='true'
            checked={showActive}
            onChange={() => setShowActive(!showActive)}
          />
        </div>

        <div className='py-12 max-w-6xl mx-auto'>
          <div className='flex flex-row gap-0.5 mb-2'>
            <div className='w-1/4 p-2 rounded bg-blue-gray-100'>Name</div>
            <div className='w-1/4 p-2 rounded bg-blue-gray-100'>Address</div>
            <div className='w-1/4 p-2 rounded bg-blue-gray-100'>
              Email Address
            </div>
            <div className='w-1/4 p-2 rounded bg-blue-gray-100'>Phone</div>
            <div className='w-1/4 p-2 rounded bg-blue-gray-100'>
              Date Joined
            </div>
          </div>

          {caregiversList?.map((caregiver, index) => (
            <div key={index} className='flex flex-row gap-0.5 mb-1'>
              <div className='w-1/4 p-2 rounded bg-blue-gray-50'>
                {caregiver.firstName} {caregiver.lastName}
              </div>
              <div className='w-1/4 p-2 rounded bg-blue-gray-50'>
                {caregiver.address}
              </div>
              <div className='w-1/4 p-2 rounded bg-blue-gray-50'>
                {caregiver.email}
              </div>
              <div className='w-1/4 p-2 rounded bg-blue-gray-50'>
                {caregiver.phone}
              </div>
              <div className='w-1/4 p-2 rounded bg-blue-gray-50'>
                {dateFormat(new Date(), 'mm/dd/yy hh:mm TT Z')}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export async function getServerSideProps() {
  const caregivers = await getCollection('caregiver')

  return {
    props: {
      caregivers,
    },
  }
}
