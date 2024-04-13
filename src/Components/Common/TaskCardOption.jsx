import { ActionList, Button, Popover } from '@shopify/polaris';
import { MenuHorizontalIcon } from '@shopify/polaris-icons';
import { useCallback, useContext, useState } from 'react';
import { DeleteTaskModal } from './DeleteTaskModal';
import { EditTaskModal } from './EditTaskModal';
import { TODO_CONTEXT } from '../Context/TodoContext';

const TaskCardOption = ({ todo }) => {
    const { toggleTodoStatusChangeToast, isTodoCompleted, setIsTodoCompleted } = useContext(TODO_CONTEXT);
    console.log("✨ ~ TaskCardOption ~ isTodoCompleted:", isTodoCompleted)
    const { todoName, createdAt } = todo;
    const [popoverActive, setPopoverActive] = useState(false);
    const [deleteModalActive, setDeleteModalActive] = useState(false);
    const [EditModalActive, setEditModalActive] = useState(false);

    const togglePopoverActive = useCallback(
        () => setPopoverActive((popoverActive) => !popoverActive),
        [],
    );

    const activator = (
        <Button onClick={togglePopoverActive} icon={MenuHorizontalIcon}></Button>
    );

    const handleEditModal = useCallback(() => {
        setEditModalActive(true);
    }, []);

    const handleDeleteModal = useCallback(() => {
        setDeleteModalActive(true);
    }, []);

    const handleCompleteTodo = useCallback(() => {
        setIsTodoCompleted(!isTodoCompleted);
        const existingTodos = JSON.parse(localStorage.getItem('todoItems')) || {};
        const newTodos = existingTodos.map((item) => {
            if (item.createdAt == createdAt) {
                item.completed = !item.completed;
            }
            return item;
        }) || [];
        localStorage.setItem('todoItems', JSON.stringify(newTodos));
        toggleTodoStatusChangeToast();
        togglePopoverActive();
    }, [isTodoCompleted, setIsTodoCompleted, createdAt, toggleTodoStatusChangeToast, togglePopoverActive]);

    return (
        <>
            <Popover
                active={popoverActive}
                activator={activator}
                autofocusTarget="first-node"
                onClose={togglePopoverActive}
            >
                <ActionList
                    items={[
                        {
                            content: 'Edit',
                            onAction: handleEditModal,
                            secondary: true
                        },
                        {
                            content: 'Delete',
                            onAction: handleDeleteModal,
                            destructive: true
                        },
                        {
                            content: 'Complete',
                            onAction: handleCompleteTodo,
                        },
                    ]}
                />
            </Popover>
            <DeleteTaskModal
                todoName={todoName}
                createdAt={createdAt}
                active={deleteModalActive}
                setActive={setDeleteModalActive}
            />
            <EditTaskModal
                todo={todo}
                EditModalActive={EditModalActive}
                setEditModalActive={setEditModalActive}
            />
        </>
    );
}

export default TaskCardOption;
