import { createContext, useContext } from 'react'

const TaskContext = createContext()

export const TaskProvider = ({ children }) => {
  const [taskInput, setTaskInput] = useState('' + Date.now().toString())
  const [tasks, setTasks] = useState(null)

  const onChangeTextValue = (text) => setTaskInput(text)

  const addTask = (title) => {
    const newTask = {
      id: Date.now().toString() + title,
      title,
    }
    setTasks((prevState) => [newTask].concat(prevState ?? []))
    setTaskInput('' + Date.now().toString())
  }

  const removeTask = (id) => {
    setTasks((prevState) => prevState.filter((item) => item.id !== id))
    setTaskInput('' + Date.now().toString())
  }

  const value = useMemo(() => ({}), [])
  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>
}

export const useTask = () => useContext(TaskContext)
