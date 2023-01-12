import Container from '@/components/atoms/Container'
import Image from '@/components/atoms/Image'
import Layout from '@/components/common/Layout'
import getCollection from '@/functions/getCollection'
import getDocument from '@/functions/getDocument'
import { useCollection } from '@/functions/useCollection'
import moment from 'moment'
import { useEffect, useState } from 'react'

export default function Caregiver({ caregiver }) {
  const { data: matches } = useCollection('match')

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
    <Layout title='Caregiver Profile'>
      <Container className='my-12'>
        <h3 className='mb-8 pb-4 border-b'>Caregiver Profile</h3>

        <div className='grid grid-cols-3 gap-8 px-4 py-8'>
          <div>
            <div className='grid grid-cols-2 gap-4 pb-4 border-b border-zinc-300'>
              <div className='flex flex-row justify-center items-center'>
                <div className='w-40 h-40 rounded-full relative overflow-hidden'>
                  <Image src={caregiver?.image} fill={true} cover={true} />
                </div>
              </div>

              <div>
                <span className='bg-blue-600 text-white px-3 py-0.5 rounded text-xs'>
                  Caregiver
                </span>

                <h4 className='my-2'>
                  {caregiver?.firstName} {caregiver?.lastName}
                </h4>

                <p>{caregiver?.address}</p>

                <p className='text-zinc-600 text-sm mt-4'>{caregiver?.bio}</p>
              </div>
            </div>

            <div className='py-3'>
              <p className='text-xs text-zinc-400 mb-0.5'>Email</p>
              <p className='font-semibold mb-3'>{caregiver?.email}</p>

              <p className='text-xs text-zinc-400 mb-0.5'>Phone</p>
              <p className='font-semibold mb-3'>{caregiver?.phone}</p>

              <p className='text-xs text-zinc-400 mb-0.5'>Birthday</p>
              <p className='font-semibold mb-3'>{caregiver?.birth}</p>
            </div>
          </div>

          <div className='rounded p-4 border border-zinc-200'>
            <h3 className='underline font-semibold mb-4'>Experience</h3>

            <p className='text-xs text-zinc-400 mb-0.5'>Experience Years</p>
            <p className='font-semibold mb-3'>{caregiver?.experienceYears}</p>

            <p className='text-xs text-zinc-400 mb-0.5'>Services</p>
            <p className='font-semibold mb-3'>
              {caregiver?.services?.join(', ')}
            </p>

            <p className='text-xs text-zinc-400 mb-0.5'>Expertise</p>
            <p className='font-semibold mb-3'>
              {caregiver?.expertises?.join(', ')}
            </p>

            <p className='text-xs text-zinc-400 mb-0.5'>Regulations</p>
            <p className='font-semibold mb-3'>
              {caregiver?.regulations?.join(', ')}
            </p>

            <p className='text-xs text-zinc-400 mb-0.5'>Client Age</p>
            <p className='font-semibold mb-3'>{caregiver?.clientAge}</p>
          </div>

          <div className='rounded p-4 border border-zinc-200'>
            <h3 className='underline font-semibold mb-4'>Information</h3>

            <p className='text-xs text-zinc-400 mb-0.5'>Status</p>
            <p className='font-semibold mb-3 capitalize'>{caregiver?.status}</p>

            <p className='text-xs text-zinc-400 mb-0.5'>Hourly Rate</p>
            <p className='font-semibold mb-3 capitalize'>{caregiver?.hourly}</p>

            <p className='text-xs text-zinc-400 mb-0.5'>
              {'Education Disciplines'}
            </p>
            <p className='font-semibold mb-3'>
              {caregiver?.educationDisciplines?.join(', ')}
            </p>

            <p className='text-xs text-zinc-400 mb-0.5'>{'Education Levels'}</p>
            <p className='font-semibold mb-3'>
              {caregiver?.educationLevels?.join(', ')}
            </p>

            <p className='text-xs text-zinc-400 mb-0.5'>{'Get By'}</p>
            <p className='font-semibold mb-3'>
              {caregiver?.getBys?.join(', ')}
            </p>
          </div>
        </div>

        <div className='shadow rounded p-6'>
          <h4 className='mb-4 pb-2 border-b'>Recent Caregiving Sessions</h4>

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
              {matches
                ?.filter((match) => match.caregiver === caregiver?.id)
                ?.map((match, i1) => (
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
                        <p>
                          {moment(match.updated?.seconds * 1000).calendar()}
                        </p>
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

export async function getStaticProps({ params }) {
  /**
   * Post Content
   */
  const caregiver = await getDocument('caregiver', params.id)

  if (!caregiver) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      caregiver: { ...JSON.parse(JSON.stringify(caregiver)), id: params.id },
    },
    revalidate: 30,
  }
}

export async function getStaticPaths() {
  const caregivers = await getCollection('caregiver')

  return {
    paths: caregivers.map((caregiver) => ({
      params: { id: caregiver.id },
    })),
    fallback: true,
  }
}
