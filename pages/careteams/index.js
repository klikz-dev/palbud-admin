import Button from '@/components/atoms/Button'
import Layout from '@/components/common/Layout'
import { useCollection } from '@/functions/useCollection'
import { firestore } from '@/lib/firebase'
import { doc, updateDoc } from 'firebase/firestore'
import moment from 'moment'

export default function Careteams() {
  const { data: families, mutate } = useCollection('family')

  function onUpdateStatus(id, status) {
    updateDoc(doc(firestore, 'family', id), {
      status: status,
    }).then(() => {
      mutate()
    })
  }

  return (
    <Layout title='Care Teams'>
      <div className='p-4 max-w-6xl mx-auto shadow border rounded mt-12'>
        <h4 className='mb-4 pb-2 border-b'>All Care Teams</h4>

        <table className='table-auto border-collapse border border-slate-400 w-full'>
          <thead className=''>
            <tr>
              {['Full Name', 'Activity', 'Status', 'Access'].map((th) => (
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
            {families?.map((family, i1) => (
              <tr key={i1} className={i1 % 2 === 1 ? 'bg-slate-100' : ''}>
                {[
                  <>
                    <p>
                      {family.firstName} {family.lastName}
                    </p>
                    <p className={'text-xs'}>{family.email}</p>
                  </>,
                  <>
                    <p className='text-sm'>
                      {family.lastActivity?.seconds
                        ? moment(family.lastActivity?.seconds * 1000)
                            .startOf('hour')
                            .fromNow()
                        : ''}
                    </p>
                  </>,
                  <>
                    <p className='text-sm capitalize'>{family.status}</p>
                  </>,
                  <>
                    <Button
                      color={'indigo'}
                      size={'sm'}
                      className={'block mb-1 w-full'}
                      onClick={() => onUpdateStatus(family.id, 'active')}
                    >
                      Approve
                    </Button>

                    <Button
                      color={'indigo'}
                      size={'sm'}
                      className={'block mb-1 w-full'}
                      onClick={() => onUpdateStatus(family.id, 'suspended')}
                    >
                      Reject
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
      </div>
    </Layout>
  )
}
