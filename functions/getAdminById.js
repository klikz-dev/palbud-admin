import { firestore } from '@/lib/firebase'
import { doc, getDoc } from 'firebase/firestore/lite'

export default async function getAdminById(uid) {
  try {
    const docRef = doc(firestore, 'admin', uid)
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
