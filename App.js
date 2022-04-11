import React, { useCallback } from 'react'
import {
  StyleSheet,
  View,
  Switch,
  Platform,
  UIManager,
  LayoutAnimation,
} from 'react-native'
import Animated from 'react-native-reanimated'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { Entypo } from '@expo/vector-icons'
import { APP_NAME } from '@env'
import TaskList from './src/components/TaskList'
import { useTheme } from './src/context/Theme'
import RippleButton from './src/components/RippleButton'
import { useTask } from './src/context/Task'

const AnimatedSvg = Animated.createAnimatedComponent(Entypo)

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true)
}

export default function App() {
  const insets = useSafeAreaInsets()
  const {
    isDark,
    toggleTheme,
    animatedBackgroundStyle,
    animatedTextStyle,
    animatedIconStyle,
  } = useTheme()
  const { tasks, addTask, updateTask, removeTask } = useTask()

  const actionAnimation = useCallback(
    () => LayoutAnimation.configureNext(LayoutAnimation.Presets.spring),
    []
  )

  const handleAddTask = useCallback(() => {
    actionAnimation()
    addTask('Lorem ipsum dolor sit amet, consectetur adipiscing elit')
  }, [actionAnimation, addTask])

  const handleRemoveTask = useCallback((id) => {
    actionAnimation()
    removeTask(id)
  }, [actionAnimation, removeTask])

  const Header = useCallback(() => {
    return (
      <View style={styles.headerContainer}>
        <Animated.Text style={[styles.appName, animatedTextStyle]}>
          {APP_NAME}
        </Animated.Text>
        <Switch onValueChange={toggleTheme} value={isDark} />
      </View>
    )
  }, [animatedTextStyle, APP_NAME, isDark, toggleTheme])

  const FloatingButton = useCallback(({ onPress }) => {
    return (
      <View
        style={[
          styles.rippleButtonContainer,
          {
            bottom: insets.bottom,
          },
        ]}
      >
        <RippleButton size={48} onPress={onPress}>
          <AnimatedSvg style={animatedIconStyle} name="plus" size={24} />
        </RippleButton>
      </View>
    )
  }, [insets, animatedIconStyle])

  return (
    <Animated.View style={[styles.safeAreaView, animatedBackgroundStyle]}>
      <SafeAreaView style={styles.container}>
        <Header />

        <View style={styles.bodyContainer}>
          <TaskList
            tasks={tasks}
            onValueUpdate={updateTask}
            onValueDelete={handleRemoveTask}
          />
          {/* <TaskList
            type="animated"
            tasks={tasks}
            onValueDelete={handleRemoveTask}
          /> */}
        </View>

        <FloatingButton onPress={handleAddTask} />
      </SafeAreaView>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 56,
    paddingHorizontal: 16,
  },
  appName: {
    textTransform: 'uppercase',
  },
  bodyContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  rippleButtonContainer: {
    position: 'absolute',
    right: 16,
  },
})
