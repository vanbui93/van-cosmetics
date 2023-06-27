import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import { getStorage, ref, uploadBytes } from 'firebase/storage'
import { getDatabase } from 'firebase/database'

const firebaseConfig = {
    apiKey: 'AIzaSyBcMkdWQZuUQetzPZnxKcvLJAlegveOLvc',
    authDomain: 'tuantao-main.firebaseapp.com',
    databaseURL: 'https://tuantao-main-default-rtdb.asia-southeast1.firebasedatabase.app',
    projectId: 'tuantao-main',
    storageBucket: 'tuantao-main.appspot.com',
    messagingSenderId: '713269385145',
    appId: '1:713269385145:web:f128a498419ab7b6248868',
    measurementId: 'G-F8TR4L7S60',
}

export const firebaseAuth = firebase.initializeApp(firebaseConfig)

export const db = getDatabase(firebaseAuth)
export const storage = getStorage(firebaseAuth)

export const auth = firebaseAuth.auth()
