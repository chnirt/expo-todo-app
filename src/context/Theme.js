import { createContext, useContext, useState, useEffect, useMemo } from 'react'
import { useColorScheme } from 'react-native'
import {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  processColor,
  withTiming,
} from 'react-native-reanimated'

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

  const progress = useDerivedValue(
    () => (isDark ? withTiming(1) : withTiming(0)),
    [isDark]
  )
  const animatedBackgroundStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      progress.value,
      [0, 1],
      [processColor('#1F1B2C'), processColor('#F7F9F9')]
    ),
  }))

  const animatedTextStyle = useAnimatedStyle(() => ({
    color: interpolateColor(
      progress.value,
      [0, 1],
      [processColor('#F7F9F9'), processColor('#181818')]
    ),
  }))

  const value = useMemo(
    () => ({
      isDark,
      toggleTheme,
      animatedBackgroundStyle,
      animatedTextStyle,
    }),
    [isDark, toggleTheme, animatedBackgroundStyle, animatedTextStyle]
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export const useTheme = () => useContext(ThemeContext)
