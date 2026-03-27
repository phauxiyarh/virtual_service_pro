import { initializeApp } from 'firebase/app'
import { getAnalytics }  from 'firebase/analytics'
import { getFirestore }  from 'firebase/firestore'

const firebaseConfig = {
  apiKey:            'AIzaSyC0RV-nOYYM9w6n0bww6-z8CnevXDHSkVM',
  authDomain:        'ziyyah-virtual-pro.firebaseapp.com',
  projectId:         'ziyyah-virtual-pro',
  storageBucket:     'ziyyah-virtual-pro.firebasestorage.app',
  messagingSenderId: '651975637421',
  appId:             '1:651975637421:web:8109755d3b8fe99364c924',
  measurementId:     'G-984GSR0ECK',
}

export const app       = initializeApp(firebaseConfig)
export const analytics = getAnalytics(app)
export const db        = getFirestore(app)
