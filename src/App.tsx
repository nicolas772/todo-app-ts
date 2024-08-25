import { useState } from "react"
import { Todos } from "./components/todos"
import { TodoId } from "./types"

const mockTodos = [
  {
    id: '1',
    title: 'Ver el Twitch de Midudev',
    completed: true
  },
  {
    id: '2',
    title: 'Aprender React con Typescript',
    completed: false
  },
  {
    id: '3',
    title: 'Comprar entrada al concierto ',
    completed: false
  },
]

const App = (): JSX.Element => {
  const [todos, setTodos] = useState(mockTodos)

  const handleRemove = ({id}: TodoId): void => {
    const newTodos = todos.filter(todo => todo.id !== id)
    setTodos(newTodos)
  }
  return (
    <div className="todoapp">
      <Todos todos={todos} onRemoveTodo={handleRemove} />
    </div>
  )
}

export default App
