import Rating from '@/components/atoms/Rating'
import Layout from '@/components/common/Layout'
import Tabs, {
  Tab,
  TabPanel,
  TabsBody,
  TabsHeader,
} from '@/components/molecules/Tabs'
import { useCollection } from '@/functions/useCollection'
import { faBookReader, faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import dateFormat from 'dateformat'

export default function Caregivers() {
  const { data: caregivers } = useCollection('caregiver')

  return (
    <Layout title='Caregivers'>
      <div className='p-4 max-w-6xl mx-auto shadow border rounded mt-12'>
        <h4 className='mb-8 pb-4 border-b'>All Caregivers</h4>

        <Tabs value='active'>
          <TabsHeader className='w-80 mb-12'>
            <Tab key='active' value='active' className='py-1'>
              <h5 className='flex items-center gap-1'>
                <FontAwesomeIcon icon={faCheckCircle} />
                <span>Active</span>
              </h5>
            </Tab>

            <Tab key='pending' value='pending' className='py-1'>
              <h6 className='flex items-center gap-1'>
                <FontAwesomeIcon icon={faBookReader} />
                <span>Pending</span>
              </h6>
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
                      <p>
                        {caregiver.firstName} {caregiver.lastName}
                      </p>
                      <p className={'text-sm'}>{caregiver.email}</p>
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
