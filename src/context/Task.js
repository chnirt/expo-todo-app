import {
  createContext,
  useContext,
  useState,
  useMemo,
  useEffect,
  useCallback,
} from 'react'
import {
  deleteToDoFromFirestore,
  // getToDosFromFirestore,
  onSnapshotToDos,
  saveTodoToFirestore,
  updateToDoToFirestore,
} from '../firebase'
import { useLoading } from './Loading'

const TaskContext = createContext()

export const TaskProvider = ({ children }) => {
  const { show, hide } = useLoading()
  const [newTask, setNewTask] = useState('' + Date.now().toString())
  const [tasks, setTasks] = useState(null)

  useEffect(() => {
    // const fetchTask = async () => {
    //   const toDosResponse = await getToDosFromFirestore()
    //   setTasks(toDosResponse)
    // }
    // const unsubscribed = fetchTask()

    const unsubscribed = onSnapshotToDos((querySnapshot) => {
      const data = querySnapshot.docs.map((docSnapshot) => {
        return {
          id: docSnapshot.id,
          ...docSnapshot.data(),
        }
      })
      setTasks(data)
    })

    return () => {
      unsubscribed()
    }
  }, [])

  const onChangeNewTaskValue = useCallback((text) => setNewTask(text), [])

  const addTask = useCallback(async (title) => {
    show()
    let newTask = {
      title,
      completed: false,
    }
    const newTodoResponse = await saveTodoToFirestore(newTask)
    // setTasks((prevState) => [newTodoResponse].concat(prevState ?? []))
    setNewTask('')
    hide()
  }, [])

  const updateTask = useCallback(async (task) => {
    show()
    const updatedToDo = {
      id: task.id,
      completed: !task.completed,
    }
    const updatedToDoResponse = await updateToDoToFirestore(updatedToDo)
    if (updatedToDoResponse) {
      setTasks((prevState) =>
        prevState.map((item) =>
          item.id === task.id ? { ...item, ...updatedToDo } : item
        )
      )
      setNewTask('')
    }
    hide()
  }, [])

  const removeTask = useCallback(async (id) => {
    show()
    const deletedToDoResponse = await deleteToDoFromFirestore(id)
    if (deletedToDoResponse) {
      setTasks((prevState) => prevState.filter((item) => item.id !== id))
      setNewTask('')
    }
    hide()
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
