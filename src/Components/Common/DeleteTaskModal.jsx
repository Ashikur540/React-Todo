import { Modal, TextContainer } from '@shopify/polaris';
import { useCallback, useContext } from 'react';
import getTodoFromLocalStorage from '../../utils/getTodoFromLocalStorge';
import { TODO_CONTEXT } from '../Context/TodoContext';

export const DeleteTaskModal = ({ todoName, active, setActive, createdAt }) => {
    const { setTodoList, toggleDeleteSuccessToast } = useContext(TODO_CONTEXT)
    const handleChange = useCallback(() => setActive(!active), [active, setActive]);

    const handleDeleteTodo = () => {
        // console.log("✨ ~ DeleteTaskModal ~ createdAt:", createdAt)
        let todos = getTodoFromLocalStorage();
        todos.filter((todo) => {
            if (todo.createdAt === createdAt) {
                todos.splice(todos.indexOf(todo), 1);
            }
        });
        localStorage.setItem("todoItems", JSON.stringify(todos));
        console.log("✨ ~ handleDeleteTodo ~ todolist:", todos);
        setTodoList(todos);
        toggleDeleteSuccessToast();
        handleChange();
    }


    return (
        <Modal
            open={active}
            onClose={handleChange}
            title={`${todoName} !`}
            sectioned
            primaryAction={{
                content: 'Delete',
                onAction: handleDeleteTodo,
                destructive: true,
            }}
            secondaryActions={[
                {
                    content: 'Cancel',
                    onAction: handleChange,
                },
            ]}
        >
            <Modal.Section>
                <TextContainer>
                    <p>
                        Are you sure to delete this. Once it&apos;s deleted, it will never be restored!
                    </p>
                </TextContainer>
            </Modal.Section>
        </Modal>
    );
}
