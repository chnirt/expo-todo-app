import { createContext, useContext, useState, useEffect } from 'react'
import { useColorScheme } from 'react-native'

const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
  const colorScheme = useColorScheme()
  const [deviceColorScheme, setDeviceColorScheme] = useState(null)
  const toggleTheme = () =>
    setDeviceColorScheme((previousState) =>
      previousState === 'light' ? 'dark' : 'light'
    )

  useEffect(() => {
    setDeviceColorScheme(null)
  }, [colorScheme])

  const isDark = deviceColorScheme
    ? deviceColorScheme === 'dark'
    : colorScheme === 'dark'

  const value = {
    isDark,
    toggleTheme,
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export const useTheme = () => useContext(ThemeContext)
