
const getTodoFromLocalStorage = () => {
    return localStorage.getItem('todoItems') ? JSON.parse(localStorage.getItem('todoItems')) : [];
}

export default getTodoFromLocalStorage;