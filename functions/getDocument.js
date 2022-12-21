import { firestore } from '@/lib/firebase'
import { doc, getDoc } from 'firebase/firestore'

export default async function getDocument(collectionName, id) {
  try {
    const docRef = doc(firestore, collectionName, id)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      return docSnap.data()
    } else {
      return null
    }
  } catch (error) {
    return null
  }
}
