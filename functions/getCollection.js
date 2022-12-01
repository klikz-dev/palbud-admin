import { firestore } from '@/lib/firebase'
import { collection, getDocs } from 'firebase/firestore/lite'

export default async function getCollection(collectionName) {
  try {
    const elements = []

    const querySnapshot = await getDocs(collection(firestore, collectionName))
    querySnapshot.forEach((doc) => {
      const element = doc.data()
      elements.push(element)
    })

    return elements
  } catch (error) {
    return null
  }
}
