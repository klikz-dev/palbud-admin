import Rating from '@/components/atoms/Rating'
import Layout from '@/components/common/Layout'
import { useCollection } from '@/functions/useCollection'
import {
  CheckBadgeIcon,
  ClipboardDocumentCheckIcon,
} from '@heroicons/react/24/solid'
import {
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
  Typography,
} from '@material-tailwind/react'
import dateFormat from 'dateformat'

export default function Caregivers() {
  const { data: caregivers } = useCollection('caregiver')

  return (
    <Layout title='Caregivers'>
      <div className='p-4 max-w-6xl mx-auto shadow border rounded mt-12'>
        <Typography variant='h4' className='mb-8 pb-4 border-b'>
          All Caregivers
        </Typography>

        <Tabs value='active'>
          <TabsHeader className='w-80 mb-12'>
            <Tab key='active' value='active' className='py-1'>
              <Typography variant='h6' className='flex items-center gap-1'>
                <CheckBadgeIcon width={20} />
                <span>Active</span>
              </Typography>
            </Tab>

            <Tab key='pending' value='pending' className='py-1'>
              <Typography variant='h6' className='flex items-center gap-1'>
                <ClipboardDocumentCheckIcon width={20} />
                <span>Pending</span>
              </Typography>
            </Tab>
          </TabsHeader>

          <TabsBody>
            <TabPanel key='active' value='active'>
              <div className='flex flex-row gap-0.5 mb-2 border-b-2 font-bold'>
                {[
                  'Full Name',
                  'Location',
                  'Contact',
                  'Rating',
                  'Last Seen',
                  'Access',
                ].map((th) => (
                  <div key={th} className='w-1/6 p-2'>
                    {th}
                  </div>
                ))}
              </div>

              {caregivers?.map((caregiver, index) => (
                <div key={index} className='flex flex-row gap-0.5 mb-1'>
                  {[
                    <>
                      <Typography variant='paragraph'>
                        <span>
                          {caregiver.firstName} {caregiver.lastName}
                        </span>
                      </Typography>
                      <Typography variant='small'>
                        <span>{caregiver.email}</span>
                      </Typography>
                    </>,
                    caregiver.address,
                    caregiver.phone,
                    <>
                      <Rating rating={3.4}></Rating>
                    </>,
                    `${dateFormat(new Date())}`,
                    <></>,
                  ].map((tb, index) => (
                    <div key={index} className='w-1/6 p-2'>
                      {tb}
                    </div>
                  ))}
                </div>
              ))}
            </TabPanel>

            <TabPanel key='pending' value='pending'>
              <div></div>
            </TabPanel>
          </TabsBody>
        </Tabs>
      </div>
    </Layout>
  )
}
