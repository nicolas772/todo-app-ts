import { useState } from "react"
import { TodoId, type ListOfTodos, Todo as TodoType } from "../types"
import { Todo } from "./Todo"

interface Props {
  todos: ListOfTodos
  onRemoveTodo: ({id}: TodoId) => void
  onToggleCompleteTodo:  ({id, completed}: Pick<TodoType, 'id' | 'completed'>) => void
  onUpdateTitle: ({id, title}: {id: TodoType['id'], title: TodoType['title']}) => void
}

export const Todos: React.FC<Props> = ({todos, onRemoveTodo, onToggleCompleteTodo, onUpdateTitle}) => {
  const [isEditing, setIsEditing] = useState('')
  
  return (
    <ul className="todo-list">
      {todos.map(todo => (
        <li 
        key={todo.id}
        onDoubleClick={() => {setIsEditing(todo.id)}}
        className={`
          ${todo.completed ? 'completed' : ''}
          ${isEditing === todo.id ? 'editing' : ''}
        `}
        >
          <Todo 
            key={todo.id}
            id={todo.id}
            title={todo.title}
            completed={todo.completed}
            onRemoveTodo={onRemoveTodo}
            onToggleCompleteTodo={onToggleCompleteTodo}
            onUpdateTitle={onUpdateTitle}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
          />
        </li>
      ))}
    </ul>
  )
}