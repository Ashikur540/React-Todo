import { createContext, useCallback, useState } from "react";
import getTodoFromLocalStorage from "../../utils/getTodoFromLocalStorge";


// eslint-disable-next-line react-refresh/only-export-components
export const TODO_CONTEXT = createContext();

const TodoProvider = ({ children }) => {


    const [isTodoCompleted, setIsTodoCompleted] = useState(false);

    const [todoName, setTodoName] = useState("");
    const [todoPriority, setTodoPriority] = useState('high');
    const [additionalNotes, setAdditionalNotes] = useState("");
    const [selectedDate, setSelectedDate] = useState(new Date());
    const initialTodos = getTodoFromLocalStorage()
    const [todoList, setTodoList] = useState(initialTodos)
    const [isCreateSuccessToastActive, setIsCreateSuccessToastActive] = useState(false);
    const [isDeleteSuccessToastActive, setIsDeleteSuccessToastActive] = useState(false);
    const [isTodoStatusToastActive, setIsTodoStatusToastActive] = useState(false);
    const [isTodoEditSuccessToastActive, setIsTodoEditSuccessToastActive] = useState(false);



    // fucntions
    const toggleAddSuccessToast = useCallback(
        () => setIsCreateSuccessToastActive(!isCreateSuccessToastActive),
        [isCreateSuccessToastActive, setIsCreateSuccessToastActive]
    );
    const toggleDeleteSuccessToast = useCallback(
        () => setIsDeleteSuccessToastActive(!isDeleteSuccessToastActive),
        [isDeleteSuccessToastActive]
    );
    const toggleTodoStatusChangeToast = useCallback(
        () => setIsTodoStatusToastActive(!isTodoStatusToastActive),
        [isTodoStatusToastActive]
    );
    const toggleEditSuccessToast = useCallback(
        () => setIsTodoEditSuccessToastActive(!isTodoEditSuccessToastActive),
        [isTodoEditSuccessToastActive]
    );

    return (
        <TODO_CONTEXT.Provider
            value={{
                todoList,
                setTodoList,
                todoName, setTodoName,
                selectedDate, setSelectedDate,
                todoPriority, setTodoPriority,
                additionalNotes, setAdditionalNotes,
                isTodoCompleted, setIsTodoCompleted,
                // handleChangePriority,
                // handleChangeNotesText,
                // handleChangeTodoName,
                isCreateSuccessToastActive,
                setIsCreateSuccessToastActive,
                isDeleteSuccessToastActive,
                setIsDeleteSuccessToastActive,
                isTodoStatusToastActive,
                setIsTodoStatusToastActive,
                isTodoEditSuccessToastActive,
                setIsTodoEditSuccessToastActive,
                toggleDeleteSuccessToast,
                toggleAddSuccessToast,
                toggleTodoStatusChangeToast,
                toggleEditSuccessToast

            }}
        >
            {children}
        </TODO_CONTEXT.Provider>
    )
}


export default TodoProvider;