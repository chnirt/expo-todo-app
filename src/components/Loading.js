import React from 'react'
import { StyleSheet, View, ActivityIndicator } from 'react-native'

const Loading = () => {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator />
    </View>
  )
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default Loading
