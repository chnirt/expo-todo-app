import {
  createContext,
  useContext,
  useMemo,
  useState,
  useCallback,
} from 'react'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  const signIn = useCallback(async (userInput) => {
    // console.log(userInput)
    setUser(userInput)
  }, [])
  const signUp = useCallback(() => { }, [])
  const signOut = useCallback(async () => {
    setUser(null)
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
