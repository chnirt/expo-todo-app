import { createContext, useContext, useState, useEffect, useMemo } from 'react'
import { useColorScheme } from 'react-native'

const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
  const colorScheme = useColorScheme()
  const [deviceColorScheme, setDeviceColorScheme] = useState(colorScheme)
  const toggleTheme = () =>
    setDeviceColorScheme((previousState) =>
      previousState === 'light' ? 'dark' : 'light'
    )

  useEffect(() => {
    setDeviceColorScheme(colorScheme)
  }, [colorScheme])

  const isDark = deviceColorScheme === 'dark'

  const value = useMemo(
    () => ({
      isDark,
      toggleTheme,
    }),
    [isDark, toggleTheme]
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export const useTheme = () => useContext(ThemeContext)
