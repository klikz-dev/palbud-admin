import Container from '@/components/atoms/Container'
import Layout from '@/components/common/Layout'
import { TabsBody, TabsHeader } from '@/components/molecules/Tabs'
import Chart from '@/components/organisms/Chart'
import { useCollection } from '@/functions/useCollection'
import moment from 'moment'
import { useEffect, useState } from 'react'
import getDaysInRange from '@/functions/getDaysInRange'
import getDocument from '@/functions/getDocument'

export default function Overview() {
  const { data: caregivers } = useCollection('caregiver')
  const { data: families } = useCollection('family')
  const { data: matches } = useCollection('match')

  function getChartDate(data, dateKey = 'createdAt') {
    if (data) {
      const report = data
        .sort((a, b) => (a[dateKey].seconds > b[dateKey].seconds ? 1 : -1))
        .reduce((sum, ele) => {
          const month = moment(ele[dateKey].seconds * 1000).format('YYYY-MM-DD')

          sum[month] = sum[month] ?? 0
          sum[month]++

          return sum
        }, [])

      const startDate = Object.keys(report)[0]
      const endDate = Object.keys(report)[Object.keys(report).length - 1]
      const days = getDaysInRange(new Date(startDate), new Date(endDate))

      const chartData = days.map((day) => {
        return {
          name: day,
          signup: report[day] ?? 0,
        }
      })

      return chartData
    }

    return []
  }

  const [activeTab, setActiveTab] = useState('caregivers')

  const FamilyTd = ({ familyId }) => {
    const [family, setFamily] = useState({})
    useEffect(() => {
      async function getData() {
        const family = await getDocument('family', familyId)
        setFamily(family)
      }
      getData()
    }, [])

    return (
      <p>
        {family?.firstName} {family?.lastName}
      </p>
    )
  }

  const ChildTD = ({ familyId }) => {
    const [family, setFamily] = useState({})
    useEffect(() => {
      async function getData() {
        const family = await getDocument('family', familyId)
        setFamily(family)
      }
      getData()
    }, [])

    return (
      <p>
        {family?.childFirstName} {family?.childLastName}
      </p>
    )
  }

  const CaregiverTD = ({ caregiverId }) => {
    const [caregiver, setCaregiver] = useState({})
    useEffect(() => {
      async function getData() {
        const caregiver = await getDocument('caregiver', caregiverId)
        setCaregiver(caregiver)
      }
      getData()
    }, [])

    return (
      <p>
        {caregiver?.firstName} {caregiver?.lastName}
      </p>
    )
  }

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
                  <Chart data={getChartDate(caregivers)} />
                </div>
              ),
            },
            {
              key: 'families',
              content: (
                <div style={{ height: '400px' }}>
                  <Chart data={getChartDate(families)} />
                </div>
              ),
            },
            {
              key: 'matches',
              content: (
                <div style={{ height: '400px' }}>
                  <Chart data={getChartDate(matches, 'created')} />
                </div>
              ),
            },
          ]}
        />
      </Container>

      <Container>
        <div className='shadow rounded p-6'>
          <h4 className='mb-4 pb-2 border-b'>Caregiving Sessions</h4>

          <table className='table-auto border-collapse border border-slate-400 w-full'>
            <thead>
              <tr>
                {['Parent', 'Child/Client', 'Caregiver', 'Date'].map(
                  (th, index) => (
                    <th
                      key={index}
                      className='p-2 border border-slate-300 bg-slate-200'
                    >
                      {th}
                    </th>
                  )
                )}
              </tr>
            </thead>

            <tbody>
              {matches?.map((match, i1) => (
                <tr key={i1} className={i1 % 2 === 1 ? 'bg-slate-100' : ''}>
                  {[
                    <>
                      <FamilyTd familyId={match.family} />
                    </>,
                    <>
                      <ChildTD familyId={match.family} />
                    </>,
                    <>
                      <CaregiverTD caregiverId={match.caregiver} />
                    </>,
                    <>
                      <p>{moment(match.updated?.seconds * 1000).calendar()}</p>
                    </>,
                  ].map((td, i2) => (
                    <td
                      key={i2}
                      className='p-2 border border-slate-300 text-center'
                    >
                      {td}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </Layout>
  )
}
