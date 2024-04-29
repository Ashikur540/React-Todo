
const getTodoFromLocalStorage = () => {
    console.log("I have called")
    return localStorage.getItem('todoItems') ? JSON.parse(localStorage.getItem('todoItems')) : [];
}

export default getTodoFromLocalStorage;