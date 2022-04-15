// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  where,
} from 'firebase/firestore'
import {
  API_KEY,
  AUTH_DOMAIN,
  DATABASE_URL,
  PROJECT_ID,
  STORAGE_BUCKET,
  MESSAGING_SENDER_ID,
  APP_ID,
  MEASUREMENT_ID,
} from '@env'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  databaseURL: DATABASE_URL,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
  measurementId: MEASUREMENT_ID,
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)

export const auth = getAuth()

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore()

const handleErrorFromFirestore = (error) => {
  console.log(error.errorCode)
  console.log(error.errorMessage)
}

export const saveTodoToFirestore = async (todoInput) => {
  try {
    const { title, completed } = todoInput
    const todoData = {
      title,
      completed,
      userId: auth.currentUser.uid,
    }
    const docRef = await addDoc(collection(db, 'todos'), todoData)
    // console.log('Document written with ID: ', docRef.id)
    return docRef
  } catch (e) {
    console.error('Error adding document: ', e)
    handleErrorFromFirestore(e)
  } finally {
  }
}

export const getToDosFromFirestore = async () => {
  const q = query(
    collection(db, 'todos'),
    where('userId', '==', auth.currentUser.uid)
  )

  const querySnapshot = await getDocs(q)
  let toDos = []
  querySnapshot.forEach((doc) => {
    let toDo = doc.data()
    toDo.id = doc.id
    toDos.push(toDo)
  })
  return toDos
}

export const updateToDoToFirestore = async (toDo) => {
  try {
    const { id, ...updatedToDo } = toDo
    const toDoRef = doc(db, 'todos', id)
    await setDoc(toDoRef, updatedToDo, { merge: true })
    return true
  } catch (error) {
    handleErrorFromFirestore(e)
  } finally {
  }
}

export const deleteToDoFromFirestore = async (toDoId) => {
  try {
    await deleteDoc(doc(db, 'todos', toDoId))
    return true
  } catch (error) {
    handleErrorFromFirestore(e)
  } finally {
  }
}
