import { registerRootComponent } from 'expo'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { NavigationContainer } from '@react-navigation/native'
import App from './App'
import { ThemeProvider } from './src/context/Theme'
import { TaskProvider } from './src/context/Task'

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(() => (
  <SafeAreaProvider>
    <ThemeProvider>
      <TaskProvider>
        <NavigationContainer>
          <App />
        </NavigationContainer>
      </TaskProvider>
    </ThemeProvider>
  </SafeAreaProvider>
))
