import React, { useState, useCallback } from 'react'
import {
  StyleSheet,
  View,
  Switch,
  Platform,
  UIManager,
  LayoutAnimation,
  Pressable,
} from 'react-native'
import Animated from 'react-native-reanimated'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { Entypo } from '@expo/vector-icons'
import { Feather } from '@expo/vector-icons'
import TaskList from '../components/TaskList'
import { useTheme } from '../context/Theme'
import RippleButton from '../components/RippleButton'
import { useTask } from '../context/Task'
import { useAuth } from '../context/Auth'
import { appName } from '../environments'
import DragView from '../components/DragView'

const AnimatedSvg = Animated.createAnimatedComponent(Entypo)
const AnimatedFeatherSvg = Animated.createAnimatedComponent(Feather)

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true)
}

const HomeScreen = () => {
  const insets = useSafeAreaInsets()
  const {
    isDark,
    toggleTheme,
    animatedBackgroundStyle,
    animatedTextStyle,
    animatedIconStyle,
    animatedPrimaryStyle,
  } = useTheme()
  const { signOut } = useAuth()
  const { tasks, addTask, updateTask, removeTask } = useTask()

  const [refreshing, setRefreshing] = useState(false)

  const actionAnimation = useCallback(
    () => LayoutAnimation.configureNext(LayoutAnimation.Presets.spring),
    []
  )

  const handleAddTask = useCallback(() => {
    actionAnimation()
    addTask('Lorem ipsum dolor sit amet, consectetur adipiscing elit')
  }, [actionAnimation, addTask])

  const handleUpdateTask = useCallback((task) => {
    actionAnimation()
    updateTask(task)
  }, [])

  const handleRemoveTask = useCallback(
    (id) => {
      actionAnimation()
      removeTask(id)
    },
    [actionAnimation, removeTask]
  )

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
    }, 2000)
  }, [])

  const Header = useCallback(() => {
    return (
      <View style={styles.headerContainer}>
        <Animated.Text style={[styles.appName, animatedTextStyle]}>
          {appName}
        </Animated.Text>
        <View style={styles.headerRight}>
          <Switch onValueChange={toggleTheme} value={isDark} />
          <View style={styles.logoutContainer}>
            <Pressable onPress={signOut}>
              <AnimatedFeatherSvg
                style={animatedTextStyle}
                name="log-out"
                size={24}
              />
            </Pressable>
          </View>
        </View>
      </View>
    )
  }, [animatedTextStyle, isDark, toggleTheme])

  const Body = useCallback(() => {
    return (
      <View style={styles.bodyContainer}>
        <TaskList
          tasks={tasks}
          refreshing={refreshing}
          onRefresh={onRefresh}
          onValueUpdate={handleUpdateTask}
          onValueDelete={handleRemoveTask}
        />
        {/* <TaskList
            type="animated"
            tasks={tasks}
            onValueDelete={handleRemoveTask}
          /> */}
      </View>
    )
  }, [tasks, refreshing, styles])

  const FloatingButton = useCallback(
    ({ onPress }) => {
      return (
        <View
          style={[
            styles.rippleButtonContainer,
            {
              bottom: insets.bottom > 0 ? insets.bottom : 16,
            },
          ]}
        >
          <RippleButton
            animated={true}
            style={[styles.rippleButton, animatedPrimaryStyle]}
            onPress={onPress}
          >
            <AnimatedSvg style={animatedIconStyle} name="plus" size={24} />
          </RippleButton>
        </View>
      )
    },
    [insets, animatedIconStyle]
  )

  return (
    <Animated.View style={[styles.safeAreaView, animatedBackgroundStyle]}>
      <SafeAreaView style={[styles.container]}>
        <Header />

        <Body />

        <DragView>
          <RippleButton
            animated={true}
            style={[styles.rippleButton, animatedPrimaryStyle]}
            onPress={handleAddTask}
          >
            <AnimatedSvg style={animatedIconStyle} name="plus" size={24} />
          </RippleButton>
        </DragView>

        {/* <FloatingButton handleAddTask={handleAddTask} /> */}
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
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoutContainer: { marginLeft: 16 },
  appName: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  bodyContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  rippleButtonContainer: {
    position: 'absolute',
    right: 16,
  },
  rippleButton: {
    width: 64,
    height: 64,
    borderRadius: 64 / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default HomeScreen
