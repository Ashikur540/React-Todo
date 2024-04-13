import { createContext, useState } from "react";


// eslint-disable-next-line react-refresh/only-export-components
export const TODO_CONTEXT = createContext();

const TodoProvider = ({ children }) => {
    // fetch form local stirage
    const initialTodos = JSON.parse(localStorage.getItem("todoItems")) || []
    // console.log("✨ ~ TodoProvider ~ todoFromLS:", initialTodos)
    const [todoList, setTodoList] = useState(initialTodos)
    const [isCreateSuccessToastActive, setIsCreateSuccessToastActive] = useState(false)
    return (
        <TODO_CONTEXT.Provider
            value={{
                todoList,
                setTodoList,
                isCreateSuccessToastActive,
                setIsCreateSuccessToastActive
            }}
        >
            {children}
        </TODO_CONTEXT.Provider>
    )
}


export default TodoProvider;