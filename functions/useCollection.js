import { firestore } from '@/lib/firebase'
import { collection, getDocs } from 'firebase/firestore'
import useSWR from 'swr'

const fetcher = ({ collectionName }) =>
  getDocs(collection(firestore, collectionName)).then((querySnapshot) => {
    const docs = []

    querySnapshot.forEach((doc) => {
      docs.push({ id: doc.id, ...doc.data() })
    })

    return docs
  })

export function useCollection(collectionName) {
  const { data, mutate, error } = useSWR(
    { collectionName: collectionName },
    fetcher
  )

  return {
    data: data,
    mutate: mutate,
    error: error,
    loading: !error && !data,
  }
}
