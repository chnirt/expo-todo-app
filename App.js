import { StatusBar } from 'expo-status-bar'
import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  Switch,
  TextInput,
  Button,
  Platform,
  UIManager,
  LayoutAnimation,
} from 'react-native'
import Animated from 'react-native-reanimated'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Entypo } from '@expo/vector-icons';
import { APP_NAME } from '@env'
import TaskList from './src/components/TaskList'
import { useTheme } from './src/context/Theme'
import RippleButton from './src/components/RippleButton'

const AnimatedSvg = Animated.createAnimatedComponent(Entypo)

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true)
}

export default function App() {
  const insets = useSafeAreaInsets();
  const { isDark, toggleTheme, animatedBackgroundStyle, animatedTextStyle } =
    useTheme()

  const actionAnimation = () =>
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)

  const Header = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: 56,
          paddingHorizontal: 16,
        }}
      >
        <Animated.Text style={[styles.appName, animatedTextStyle]}>
          {APP_NAME}
        </Animated.Text>
        <Switch
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleTheme}
          value={isDark}
        />
      </View>
    )
  }

  const FloatingButton = () => {
    return (
      <View style={[styles.rippleButtonContainer, {
        bottom: insets.bottom,
      }]}>
        <RippleButton size={48}>
          <AnimatedSvg style={animatedTextStyle} name="plus" size={24} />
        </RippleButton>
      </View>
    )
  }

  return (
    <Animated.View style={[styles.safeAreaView, animatedBackgroundStyle]}>
      <SafeAreaView style={styles.container}>
        <Header />

        <FloatingButton />
      </SafeAreaView>
    </Animated.View>
  )

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.container, themeContainerStyle]}>
        <Text style={[styles.text, themeTextStyle]}>
          Open up App.js to start working on your app!
          {APP_NAME}
        </Text>
        <StatusBar style="auto" />

        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={isDark ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleTheme}
          value={isDark}
        />
        <View style={{ flexDirection: 'row' }}>
          <TextInput
            style={[styles.text, themeTextStyle]}
            value={taskInput}
            onChangeText={onChangeTextValue}
            placeholder="Typing..."
          />
          <Button
            title="add + layout"
            color="green"
            onPress={() => {
              actionAnimation()
              addTask(taskInput)
            }}
          />
          <Button
            title="add"
            color="green"
            onPress={() => {
              addTask(taskInput)
            }}
          />
        </View>
        <View
          style={{
            width: 300,
            height: 300,
            borderWidth: 1,
          }}
        >
          <TaskList
            tasks={tasks}
            onValueDelete={(id) => {
              actionAnimation()
              removeTask(id)
            }}
          />
        </View>
        <View
          style={{
            width: 300,
            height: 300,
            borderWidth: 1,
          }}
        >
          <TaskList
            type="reanimated"
            tasks={tasks}
            onValueDelete={removeTask}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  appName: {
    textTransform: 'uppercase',
  },
  rippleButtonContainer: {
    position: 'absolute',
    right: 16
  },
})
