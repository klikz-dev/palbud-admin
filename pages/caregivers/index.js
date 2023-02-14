import Button from '@/components/atoms/Button'
import Container from '@/components/atoms/Container'
import Link from '@/components/atoms/Link'
import Layout from '@/components/common/Layout'
import { TabsBody, TabsHeader } from '@/components/molecules/Tabs'
import { useCollection } from '@/functions/useCollection'
import { firestore } from '@/lib/firebase'
import { faBookReader, faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import dateFormat from 'dateformat'
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore'
import { useState } from 'react'

export default function Caregivers() {
  const { data: caregivers, mutate } = useCollection('caregiver')

  const [activeTab, setActiveTab] = useState('active')

  function onUpdateStatus(id, status) {
    updateDoc(doc(firestore, 'caregiver', id), {
      status: status,
      step: 'Photo',
    }).then(() => {
      mutate()
    })
  }

  async function suspendCaregiver(id) {
    updateDoc(doc(firestore, 'caregiver', id), {
      status: 'suspended',
    }).then(() => {
      mutate()
    })

    const querySnapshot = await getDocs(
      query(collection(firestore, 'match'), where('caregiver', '==', id))
    )
    querySnapshot.forEach((snap) => {
      updateDoc(doc(firestore, 'match', snap.id), {
        status: 'suspended',
      }).then(() => {
        mutate()
      })
    })
  }

  return (
    <Layout title='Caregivers'>
      <Container className='my-12'>
        <h4 className='mb-8 pb-4 border-b'>All Caregivers</h4>

        <TabsHeader
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          headers={[
            {
              key: 'active',
              content: (
                <>
                  <h6 className='flex items-center gap-1'>
                    <FontAwesomeIcon icon={faCheckCircle} width={16} />
                    <span>Active</span>
                  </h6>
                </>
              ),
            },
            {
              key: 'pending',
              content: (
                <>
                  <h6 className='flex items-center gap-1'>
                    <FontAwesomeIcon icon={faBookReader} width={16} />
                    <span>Pending</span>
                  </h6>
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
              key: 'active',
              content: (
                <table className='table-auto border-collapse border border-slate-400 w-full'>
                  <thead className=''>
                    <tr>
                      {[
                        'Full Name',
                        'Location',
                        'Contact',
                        'Profile',
                        'Last Seen',
                        'Actions',
                      ].map((th) => (
                        <th
                          key={th}
                          className='p-2 border border-slate-300 bg-slate-200'
                        >
                          {th}
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody>
                    {caregivers
                      ?.filter((caregiver) => caregiver.status === 'active')
                      .map((caregiver, i1) => (
                        <tr
                          key={i1}
                          className={i1 % 2 === 1 ? 'bg-slate-100' : ''}
                        >
                          {[
                            <>
                              <p>
                                {caregiver.firstName} {caregiver.lastName}
                              </p>
                              <p className={'text-xs'}>{caregiver.email}</p>
                            </>,
                            <>
                              <p className='text-sm'>{caregiver.address}</p>
                            </>,
                            <>
                              <p className='text-sm'>{caregiver.phone}</p>
                            </>,
                            <>
                              <Link href={`/caregivers/${caregiver.id}`}>
                                <Button color={'indigo'} size={'sm'}>
                                  View Profile
                                </Button>
                              </Link>
                            </>,
                            <>
                              <p className='text-sm'>
                                {caregiver.lastActivity?.seconds
                                  ? dateFormat(
                                      new Date(
                                        caregiver.lastActivity?.seconds * 1000
                                      )
                                    )
                                  : ''}
                              </p>
                            </>,
                            <>
                              <Button
                                color={'red'}
                                size={'sm'}
                                className={'block mb-1 w-full'}
                                onClick={() => suspendCaregiver(caregiver.id)}
                              >
                                Suspend
                              </Button>
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
              ),
            },
            {
              key: 'pending',
              content: (
                <table className='table-auto border-collapse border border-slate-400 w-full'>
                  <thead className=''>
                    <tr>
                      {[
                        'Full Name',
                        'Location',
                        'Contact',
                        'Profile',
                        'Last Seen',
                        'Approve/Reject',
                      ].map((th) => (
                        <th
                          key={th}
                          className='p-2 border border-slate-300 bg-slate-200'
                        >
                          {th}
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody>
                    {caregivers
                      ?.filter((caregiver) => caregiver.status === 'pending')
                      .map((caregiver, index) => (
                        <tr
                          key={index}
                          className={index % 2 === 1 ? 'bg-slate-100' : ''}
                        >
                          {[
                            <>
                              <p>
                                {caregiver.firstName} {caregiver.lastName}
                              </p>
                              <p className={'text-xs'}>{caregiver.email}</p>
                            </>,
                            <>
                              <p className='text-sm'>{caregiver.address}</p>
                            </>,
                            <>
                              <p className='text-sm'>{caregiver.phone}</p>
                            </>,
                            <>
                              <Link href={`/caregivers/${caregiver.id}`}>
                                <Button color={'indigo'} size={'sm'}>
                                  View Profile
                                </Button>
                              </Link>
                            </>,
                            <>
                              <p className='text-sm'>
                                {caregiver.lastActivity?.seconds
                                  ? dateFormat(
                                      new Date(
                                        caregiver.lastActivity?.seconds * 1000
                                      )
                                    )
                                  : ''}
                              </p>
                            </>,
                            <>
                              <Button
                                color={'indigo'}
                                size={'sm'}
                                className={'block mb-1 w-full'}
                                onClick={() =>
                                  onUpdateStatus(caregiver.id, 'active')
                                }
                              >
                                Approve
                              </Button>
                              <Button
                                color={'red'}
                                size={'sm'}
                                className={'block mb-1 w-full'}
                                onClick={() =>
                                  onUpdateStatus(caregiver.id, 'rejected')
                                }
                              >
                                Reject
                              </Button>
                            </>,
                          ].map((td, index) => (
                            <td
                              key={index}
                              className='p-2 border border-slate-300 text-center'
                            >
                              {td}
                            </td>
                          ))}
                        </tr>
                      ))}
                  </tbody>
                </table>
              ),
            },
          ]}
        />
      </Container>
    </Layout>
  )
}
