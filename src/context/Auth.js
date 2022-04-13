import {
  onAuthStateChanged,
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
import { auth } from '../firebase'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
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
    })
  })

  const signIn = useCallback(async (userInput) => {
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
  }, [])
  const signUp = useCallback(() => { }, [])
  const signOut = useCallback(async () => {
    fbSignOut(auth)
      .then(() => {
        // Sign-out successful.
        setUser(null)
      })
      .catch((error) => {
        // An error happened.
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
