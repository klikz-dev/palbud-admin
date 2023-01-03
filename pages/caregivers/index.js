import Button from '@/components/atoms/Button'
import Container from '@/components/atoms/Container'
import Link from '@/components/atoms/Link'
import Rating from '@/components/atoms/Rating'
import Layout from '@/components/common/Layout'
import { TabsBody, TabsHeader } from '@/components/molecules/Tabs'
import { useCollection } from '@/functions/useCollection'
import { firestore } from '@/lib/firebase'
import { faBookReader, faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import dateFormat from 'dateformat'
import { doc, updateDoc } from 'firebase/firestore'
import { useState } from 'react'

export default function Caregivers() {
  const { data: caregivers } = useCollection('caregiver')

  console.log(caregivers)

  const [activeTab, setActiveTab] = useState('active')

  function onUpdateStatus(id, status) {
    updateDoc(doc(firestore, 'caregiver', id), {
      status: status,
      step: 'Photo',
    }).then(() => {
      setActiveTab('active')
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
                <>
                  <div className='flex flex-row gap-0.5 mb-2 border-b-2 font-bold'>
                    {[
                      'Full Name',
                      'Location',
                      'Contact',
                      'Rating',
                      'Profile',
                      'Last Seen',
                    ].map((th) => (
                      <div key={th} className='w-1/6 p-2'>
                        {th}
                      </div>
                    ))}
                  </div>

                  {caregivers
                    ?.filter((caregiver) => caregiver.status === 'active')
                    .map((caregiver, index) => (
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
                          <>
                            <Link href={`/caregivers/${caregiver.id}`}>
                              <Button color={'indigo'} size={'sm'}>
                                View Profile
                              </Button>
                            </Link>
                          </>,
                          `${dateFormat(
                            new Date(caregiver.lastActivity.seconds * 1000)
                          )}`,
                        ].map((tb, index) => (
                          <div key={index} className='w-1/6 p-2'>
                            {tb}
                          </div>
                        ))}
                      </div>
                    ))}
                </>
              ),
            },
            {
              key: 'pending',
              content: (
                <>
                  <div className='flex flex-row gap-0.5 mb-2 border-b-2 font-bold'>
                    {[
                      'Full Name',
                      'Location',
                      'Contact',
                      'Profile',
                      'Last Seen',
                      'Approve/Reject',
                    ].map((th) => (
                      <div key={th} className='w-1/6 p-2'>
                        {th}
                      </div>
                    ))}
                  </div>

                  {caregivers
                    ?.filter((caregiver) => caregiver.status === 'pending')
                    .map((caregiver, index) => (
                      <div
                        key={index}
                        className='flex flex-row gap-0.5 border-b border-zinc-200 mb-2'
                      >
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
                            <Link href={`/caregivers/${caregiver.id}`}>
                              <Button color={'indigo'} size={'sm'}>
                                View Profile
                              </Button>
                            </Link>
                          </>,
                          `${dateFormat(
                            new Date(caregiver.lastActivity.seconds * 1000)
                          )}`,
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
                              color={'indigo'}
                              size={'sm'}
                              className={'block mb-1 w-full'}
                              onClick={() =>
                                onUpdateStatus(caregiver.id, 'rejected')
                              }
                            >
                              Reject
                            </Button>
                          </>,
                        ].map((tb, index) => (
                          <div key={index} className='w-1/6 p-2'>
                            {tb}
                          </div>
                        ))}
                      </div>
                    ))}
                </>
              ),
            },
          ]}
        />
      </Container>
    </Layout>
  )
}
