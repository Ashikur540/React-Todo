
import { BlockStack, Button, FormLayout, Modal, Select, TextField } from '@shopify/polaris';
import { PlusIcon } from '@shopify/polaris-icons';
import { memo, useCallback, useContext, useState } from 'react';
import { sortTodos } from '../../utils/sortTodos';
import { TODO_CONTEXT } from '../Context/TodoContext';
import DueDatePicker from './DueDatePicker';
let CreateTaskModal = () => {
    // const [selectedDate, setSelectedDate] = useState(new Date());
    const {
        todoList,
        setTodoList,
        toggleAddSuccessToast,
        todoName, setTodoName,
        todoPriority, setTodoPriority,
        additionalNotes, setAdditionalNotes,
        selectedDate, setSelectedDate,
        isTodoCompleted,
        // handleChangePriority,
        // handleChangeNotesText,
        // handleChangeTodoName,
    } = useContext(TODO_CONTEXT)
    const [showTaskModal, setShowTaskModal] = useState(false);
    const [errorTodoName, setErrorTodoName] = useState(false);

    const toggleTaskCreateModal = useCallback(
        () => setShowTaskModal(!showTaskModal), [showTaskModal]);

    const handleChangeTodoName = useCallback((value) => {
        // for validation while typing
        if (!value.trim()) {
            setErrorTodoName("Todo name is required");
        } else {
            setErrorTodoName("");
        }
        setTodoName(value)
    }, [setTodoName]);

    const handleChangeNotesText = useCallback(
        (value) => setAdditionalNotes(value), [setAdditionalNotes]);

    const handleChangePriority = useCallback(
        (value) => setTodoPriority(value),
        [setTodoPriority],
    );

    const activator =
        <Button
            icon={PlusIcon}
            variant="primary"
            onClick={toggleTaskCreateModal}
        >
            Add Todo
        </Button>


    const handleCreateTask = () => {
        if (todoName?.trim() === "") {
            setErrorTodoName("Todo name is required");
            return;
        } else {
            setErrorTodoName("");
        }

        // const selectedDueDate = selectedDate.toISOString().slice(0, 10);
        const today = new Date()
        const createdAt = today.getTime();
        // const createdDate = today.toLocaleDateString()
        const newTask = {
            createdAt, todoName, todoDueDate: selectedDate, todoPriority, additionalNotes, createdDate: today, completed: isTodoCompleted
        }
        // console.log("✨ ~ handleCreateTask ~ taskData:", taskData)
        const updatedTodoList = [...todoList, newTask];
        const finalTodoList = sortTodos(updatedTodoList)
        setTodoList(finalTodoList);
        localStorage.setItem("todoItems", JSON.stringify(updatedTodoList)); // Update local storage
        toggleTaskCreateModal();
        toggleAddSuccessToast();
        resetForm()

    }
    const priorityOptions = [
        { label: 'Low', value: 'low' },
        { label: 'Medium', value: 'medium' },
        { label: 'High', value: 'high' },
    ];

    const resetForm = () => {
        setSelectedDate(new Date());
        setAdditionalNotes("");
        setTodoName("");
        setTodoPriority("high")
    }


    return (
        <>
            <Modal
                activator={activator}
                open={showTaskModal}
                onClose={toggleTaskCreateModal}
                title="Enter Your Task Details Here"
                primaryAction={{
                    content: 'Add Task',
                    onAction: handleCreateTask,
                }}
                secondaryActions={[
                    {
                        content: 'Cancel',
                        onAction: toggleTaskCreateModal,
                    },
                ]}

            >
                <Modal.Section>
                    <BlockStack align='start' gap="200">
                        <TextField
                            label="Task Name"
                            value={todoName}
                            onChange={handleChangeTodoName}
                            placeholder="Example: Do Shopping"
                            autoComplete="off"
                            requiredIndicator
                            error={errorTodoName}
                            focused
                        />
                        <FormLayout>
                            <FormLayout.Group>
                                <DueDatePicker selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
                                <Select
                                    label="Priority Level"
                                    options={priorityOptions}
                                    onChange={handleChangePriority}
                                    value={todoPriority}
                                />
                            </FormLayout.Group>
                        </FormLayout>
                        <TextField
                            label="Additional note"
                            type="text"
                            multiline={4}
                            onChange={handleChangeNotesText}
                            value={additionalNotes}
                        />
                    </BlockStack>
                </Modal.Section>
            </Modal>

        </>
    );
}

CreateTaskModal = memo(CreateTaskModal)
export default CreateTaskModal;