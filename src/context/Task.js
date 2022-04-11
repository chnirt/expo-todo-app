import {
  createContext,
  useContext,
  useState,
  useMemo,
  useEffect,
  useCallback,
} from 'react'

const TaskContext = createContext()

export const TaskProvider = ({ children }) => {
  const [newTask, setNewTask] = useState('' + Date.now().toString())
  const [tasks, setTasks] = useState(null)

  useEffect(() => {
    const fetchTask = () => {
      // setTasks({
      //   id: new Date().toString(),
      //   title: 'Hello ',
      // })
      setTasks([])
    }
    const unsubscribed = setTimeout(() => {
      Array(1)
        .fill(0)
        .map(() => fetchTask())
    }, 1000)

    return () => {
      unsubscribed()
    }
  }, [])

  const onChangeNewTaskValue = useCallback((text) => setNewTask(text), [])

  const addTask = useCallback((title) => {
    const createdAt = +new Date()
    const newTask = {
      id: createdAt + title,
      title,
      createdAt,
      completed: false,
    }
    setTasks((prevState) => [newTask].concat(prevState ?? []))
    setNewTask('')
  }, [])

  const updateTask = useCallback((id) => {
    setTasks((prevState) =>
      prevState.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    )
    setNewTask('')
  }, [])

  const removeTask = useCallback((id) => {
    setTasks((prevState) => prevState.filter((item) => item.id !== id))
    setNewTask('')
  }, [])

  const value = useMemo(
    () => ({
      newTask,
      onChangeNewTaskValue,
      addTask,
      tasks,
      updateTask,
      removeTask,
    }),
    [newTask, onChangeNewTaskValue, addTask, tasks, updateTask, removeTask]
  )
  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>
}

export const useTask = () => useContext(TaskContext)
