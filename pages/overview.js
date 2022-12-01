import Layout from '@/components/common/Layout'
import Chart from '@/components/organisms/Chart'
import getCollection from '@/functions/getCollection'
import {
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
  Typography,
} from '@material-tailwind/react'
import dateFormat from 'dateformat'

export default function Overview({ caregivers, careteams, families, matches }) {
  console.log(caregivers)
  console.log(careteams)
  console.log(families)
  console.log(matches)

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

  return (
    <Layout title='Overview'>
      <div className='py-8'>
        <Tabs value='caregivers'>
          <TabsHeader>
            <Tab key='caregivers' value='caregivers' className='py-3'>
              <Typography variant='paragraph'>Caregivers</Typography>
              <Typography variant='h3'>{caregivers?.length}</Typography>
            </Tab>

            <Tab key='families' value='families' className='py-3'>
              <Typography variant='paragraph'>Families</Typography>
              <Typography variant='h3'>{families?.length}</Typography>
            </Tab>

            <Tab key='matches' value='matches' className='py-3'>
              <Typography variant='paragraph'>Matches</Typography>
              <Typography variant='h3'>{matches?.length}</Typography>
            </Tab>
          </TabsHeader>

          <TabsBody>
            <TabPanel
              key='caregivers'
              value='caregivers'
              style={{ minHeight: '500px' }}
            >
              <div style={{ height: '400px' }}>
                <Chart data={caregiverChartdata} />
              </div>
            </TabPanel>

            <TabPanel
              key='families'
              value='families'
              style={{ minHeight: '500px' }}
            >
              <div style={{ height: '400px' }}>
                <Chart data={familyChartdata} />
              </div>
            </TabPanel>

            <TabPanel
              key='matches'
              value='matches'
              style={{ minHeight: '500px' }}
            >
              <div style={{ height: '400px' }}>
                <Chart data={matchChartdata} />
              </div>
            </TabPanel>
          </TabsBody>
        </Tabs>
      </div>

      <div className='shadow rounded p-6'>
        <Typography variant='h4' className='mb-4 pb-2 border-b'>
          Caregiving Sessions
        </Typography>

        <div>
          <div className='flex flex-row gap-0.5 mb-2'>
            <div className='w-1/4 p-2 rounded bg-blue-gray-100'>Parent</div>
            <div className='w-1/4 p-2 rounded bg-blue-gray-100'>
              Child/Client
            </div>
            <div className='w-1/4 p-2 rounded bg-blue-gray-100'>Caregiver</div>
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
              <div className='w-1/4 p-2 rounded bg-blue-gray-50'>John Lee</div>
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
  const careteams = await getCollection('careteam')
  const families = await getCollection('family')
  const matches = await getCollection('match')

  return {
    props: {
      caregivers,
      careteams,
      families,
      matches,
    },
  }
}
