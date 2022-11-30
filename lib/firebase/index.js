import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore/lite'
import { getStorage } from 'firebase/storage'

const app = initializeApp({
  projectId: process.env.FIREBASE_PROJECT_ID,
  appId: process.env.FIREBASE_APP_ID,
  apiKey: process.env.FIREBASE_API_KEY,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
})

const auth = getAuth(app)
const firestore = getFirestore(app)
const storage = getStorage(app)

export { auth, firestore, storage }
