import { firestore } from '@/lib/firebase'
import { collection, getDocs } from 'firebase/firestore/lite'
import useSWR from 'swr'

const fetcher = ({ collectionName }) =>
  getDocs(collection(firestore, collectionName)).then((querySnapshot) => {
    const elements = []

    querySnapshot.forEach((doc) => {
      const element = doc.data()
      elements.push(element)
    })

    return elements
  })

export function useCollection(collectionName) {
  const { data, error } = useSWR({ collectionName: collectionName }, fetcher)

  return {
    data: data,
    error: error,
    loading: !error && !data,
  }
}
