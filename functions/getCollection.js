import { firestore } from '@/lib/firebase'
import { collection, getDocs } from 'firebase/firestore'

export default async function getCollection(collectionName) {
  try {
    const docRef = collection(firestore, collectionName)
    const docSnap = await getDocs(docRef)

    const docs = []
    docSnap.forEach((doc) => {
      docs.push({ id: doc.id, ...doc.data() })
    })

    return docs
  } catch (error) {
    return []
  }
}
