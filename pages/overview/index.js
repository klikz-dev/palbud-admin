import Container from '@/components/atoms/Container'
import Layout from '@/components/common/Layout'
import { TabsBody, TabsHeader } from '@/components/molecules/Tabs'
import Chart from '@/components/organisms/Chart'
import { useCollection } from '@/functions/useCollection'
import dateFormat from 'dateformat'
import { useState } from 'react'

export default function Overview() {
  const { data: caregivers } = useCollection('caregiver')
  const { data: families } = useCollection('family')
  const { data: matches } = useCollection('match')

  console.log(caregivers)

  const caregiverChartdata = [
    {
      name: 'Jun',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'July',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'August',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'September',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Octorber',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'November',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'December',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ]

  const familyChartdata = [
    {
      name: 'Jun',
      uv: 400,
      pv: 240,
      amt: 240,
    },
    {
      name: 'July',
      uv: 300,
      pv: 139,
      amt: 221,
    },
    {
      name: 'August',
      uv: 20,
      pv: 90,
      amt: 229,
    },
    {
      name: 'September',
      uv: 278,
      pv: 39,
      amt: 200,
    },
    {
      name: 'Octorber',
      uv: 189,
      pv: 480,
      amt: 211,
    },
    {
      name: 'November',
      uv: 239,
      pv: 380,
      amt: 250,
    },
    {
      name: 'December',
      uv: 349,
      pv: 430,
      amt: 210,
    },
  ]

  const matchChartdata = [
    {
      name: 'Jun',
      uv: 40,
      pv: 24,
      amt: 24,
    },
    {
      name: 'July',
      uv: 30,
      pv: 13,
      amt: 22,
    },
    {
      name: 'August',
      uv: 20,
      pv: 90,
      amt: 20,
    },
    {
      name: 'September',
      uv: 20,
      pv: 38,
      amt: 10,
    },
    {
      name: 'Octorber',
      uv: 18,
      pv: 48,
      amt: 21,
    },
    {
      name: 'November',
      uv: 23,
      pv: 38,
      amt: 20,
    },
    {
      name: 'December',
      uv: 34,
      pv: 43,
      amt: 20,
    },
  ]

  const [activeTab, setActiveTab] = useState('caregivers')

  return (
    <Layout title='Overview'>
      <Container className={'my-12'}>
        <TabsHeader
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          headers={[
            {
              key: 'caregivers',
              content: (
                <>
                  <p>Caregivers</p>
                  <h3>
                    <span>{caregivers?.length}</span>
                  </h3>
                </>
              ),
            },
            {
              key: 'families',
              content: (
                <>
                  <p>Families</p>
                  <h3>
                    <span>{families?.length}</span>
                  </h3>
                </>
              ),
            },
            {
              key: 'matches',
              content: (
                <>
                  <p>Matches</p>
                  <h3>
                    <span>{matches?.length}</span>
                  </h3>
                </>
              ),
            },
          ]}
        />

        <TabsBody
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          bodies={[
            {
              key: 'caregivers',
              content: (
                <div style={{ height: '400px' }}>
                  <Chart data={caregiverChartdata} />
                </div>
              ),
            },
            {
              key: 'families',
              content: (
                <div style={{ height: '400px' }}>
                  <Chart data={familyChartdata} />
                </div>
              ),
            },
            {
              key: 'matches',
              content: (
                <div style={{ height: '400px' }}>
                  <Chart data={matchChartdata} />
                </div>
              ),
            },
          ]}
        />
      </Container>

      <Container>
        <div className='shadow rounded p-6'>
          <h4 className='mb-4 pb-2 border-b'>Caregiving Sessions</h4>

          <div>
            <div className='flex flex-row gap-0.5 mb-2'>
              <div className='w-1/4 p-2 rounded bg-blue-gray-100'>Parent</div>
              <div className='w-1/4 p-2 rounded bg-blue-gray-100'>
                Child/Client
              </div>
              <div className='w-1/4 p-2 rounded bg-blue-gray-100'>
                Caregiver
              </div>
              <div className='w-1/4 p-2 rounded bg-blue-gray-100'>Date</div>
            </div>

            {families?.map((family, index) => (
              <div key={index} className='flex flex-row gap-0.5 mb-1'>
                <div className='w-1/4 p-2 rounded bg-blue-gray-50'>
                  {family.firstName} {family.lastName}
                </div>
                <div className='w-1/4 p-2 rounded bg-blue-gray-50'>
                  {family.childFirstName} {family.childLastName}
                </div>
                <div className='w-1/4 p-2 rounded bg-blue-gray-50'>
                  John Lee
                </div>
                <div className='w-1/4 p-2 rounded bg-blue-gray-50'>
                  {dateFormat(new Date(), 'mm/dd/yy hh:mm TT Z')}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Layout>
  )
}
