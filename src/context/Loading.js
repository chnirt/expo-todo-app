import { createContext, useContext, useMemo, useState } from 'react'
import { StyleSheet, ActivityIndicator, View } from 'react-native'

const LoadingContext = createContext()

export const LoadingProvider = ({ children }) => {
  const [count, setCount] = useState(0)

  const value = useMemo(
    () => ({
      show: () => setCount((prevState) => prevState + 1),
      hide: () => setCount((prevState) => Math.max(prevState - 1, 0)),
    }),
    []
  )

  return (
    <LoadingContext.Provider value={value}>
      {children}
      {count > 0 && (
        <View style={styles.indicatorContainer}>
          <ActivityIndicator />
        </View>
      )}
    </LoadingContext.Provider>
  )
}

const styles = StyleSheet.create({
  indicatorContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#21212150',
  },
})

export const useLoading = () => useContext(LoadingContext)
