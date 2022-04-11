import React, { useCallback } from 'react'
import {
  StyleSheet,
  View,
  ScrollView,
  FlatList,
} from 'react-native'
import Task from './Task'
import Loading from './Loading'
import { ITEM_HEIGHT } from '../constants'
import { useTheme } from '../context/Theme'

const TaskList = ({
  type = 'basic',
  refreshing,
  onRefresh,
  tasks,
  onValueUpdate,
  onValueDelete,
}) => {
  const isBasic = type === 'basic'
  const { } = useTheme()

  if (tasks === null) return <Loading />

  const ItemSeparatorComponent = useCallback(
    () => <View style={styles.separator} />,
    []
  )

  if (isBasic) {
    const keyExtractor = useCallback((item) => item.id, [])
    const renderItem = useCallback(
      ({ item }) => (
        <Task
          isBasic={isBasic}
          task={item}
          onValueUpdate={onValueUpdate}
          onValueDelete={onValueDelete}
        />
      ),
      []
    )
    const getItemLayout = useCallback(
      (_, index) => ({
        length: ITEM_HEIGHT,
        offset: ITEM_HEIGHT * index,
        index,
      }),
      []
    )
    return (
      <FlatList
        data={tasks}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ItemSeparatorComponent={ItemSeparatorComponent}
        getItemLayout={getItemLayout}
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
    )
  }

  return (
    <ScrollView>
      {tasks.length > 0 &&
        tasks.map((task, ti) => {
          const isLast = ti === tasks.length - 1
          return (
            <View key={`task-${ti}`}>
              <Task
                isBasic={isBasic}
                task={task}
                onValueDelete={onValueDelete}
              />
              {!isLast && <ItemSeparatorComponent />}
            </View>
          )
        })}
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  separator: {
    height: 15,
  },
})

export default TaskList
