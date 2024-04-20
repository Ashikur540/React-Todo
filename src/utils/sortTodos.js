
export const sortTodos = (todos) => {
    return todos?.length && todos?.sort((todoCurrent, todoNext) => todoNext?.createdAt - todoCurrent?.createdAt) || todos;
}