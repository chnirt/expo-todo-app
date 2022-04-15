import {
  onAuthStateChanged,
  createUserWithEmailAndPassword as fbCreateUserWithEmailAndPassword,
  signInWithEmailAndPassword as fbSignInWithEmailAndPassword,
  signOut as fbSignOut,
} from 'firebase/auth'
import {
  createContext,
  useContext,
  useMemo,
  useState,
  useCallback,
  useEffect,
} from 'react'
import { auth, saveUserToFirestore } from '../firebase'
import { useLoading } from './Loading'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const { show, hide } = useLoading()
  const [user, setUser] = useState(null)

  useEffect(() => {
    show()
    onAuthStateChanged(
      auth,
      (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          const uid = user.uid
          setUser(user)
          // ...
        } else {
          // User is signed out
          // ...
        }
        hide()
      },
      (error) => {
        hide()
      },
      () => {
        hide()
      }
    )
  }, [user])

  const signIn = useCallback(async (userInput) => {
    show()
    // console.log(userInput)
    const { email, password } = userInput
    fbSignInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user
        setUser(user)
        // ...
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
      })
      .finally(() => {
        hide()
      })
  }, [])
  const signUp = useCallback((userInput) => {
    show()
    const { email, password } = userInput
    fbCreateUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user

        // setUser(user)
        // ...
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        // ..
      })
      .finally(() => {
        hide()
      })
  }, [])
  const signOut = useCallback(async () => {
    show()
    fbSignOut(auth)
      .then(() => {
        // Sign-out successful.
        setUser(null)
      })
      .catch((error) => {
        // An error happened.
      })
      .finally(() => {
        hide()
      })
  }, [])

  const value = useMemo(
    () => ({
      user,
      signIn,
      signUp,
      signOut,
    }),
    [user, signIn, signUp, signOut]
  )
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
