import { useState } from "react"
import { Todos } from "./components/todos"
import { FilterValue, TodoId, Todo as TodoType } from "./types"
import { TODO_FILTERS } from "./consts"
import { Footer } from "./components/Footer"

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
  const [filterSelected, setFilterSelected] = useState<FilterValue>(TODO_FILTERS.ALL)

  const handleRemove = ({id}: TodoId): void => {
    const newTodos = todos.filter(todo => todo.id !== id)
    setTodos(newTodos)
  }

  const handleCompleted = ({id, completed}: Pick<TodoType, 'id' | 'completed'>): void => {
    const newTodos = todos.map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          completed
        }
      }
      return todo
    })
    setTodos(newTodos)
  }

  const handleFilterChange = (filter: FilterValue): void => {
    setFilterSelected(filter)
  }

  const filteredTodos = todos.filter(todo => {
    if (filterSelected === TODO_FILTERS.ACTIVE) return !todo.completed
    if (filterSelected === TODO_FILTERS.COMPLETED) return todo.completed
    return todo
  })

  const activeCount = todos.filter(todo => !todo.completed).length
  const completedCount = todos.length - activeCount
  return (
    <div className="todoapp">
      <Todos 
        todos={filteredTodos} 
        onRemoveTodo={handleRemove} 
        onToggleCompleteTodo={handleCompleted}  
      />
      <Footer
        activeCount={activeCount}
        completedCount={completedCount}
        filterSelected={filterSelected}
        handleFilterChange={handleFilterChange}
        onClearCompleted={() => {}}
      ></Footer>
    </div>
  )
}

export default App
