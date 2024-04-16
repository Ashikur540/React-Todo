
import { BlockStack, Button, FormLayout, Modal, Select, TextField } from '@shopify/polaris';
import { PlusIcon } from '@shopify/polaris-icons';
import { memo, useCallback, useContext, useState } from 'react';
import { TODO_CONTEXT } from '../Context/TodoContext';
import DueDatePicker from './DueDatePicker';
let CreateTaskModal = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const {
        todoList,
        toggleAddSuccessToast,
        todoName, setTodoName,
        todoPriority, setTodoPriority,
        additionalNotes, setAddditionalNotes,
        isTodoCompleted,
        handleChangePriority,
        handleChangeNotesText,
        handleChangeTodoName,
    } = useContext(TODO_CONTEXT)
    const [showTaskModal, setShowTaskModal] = useState(false);


    const toggleTaskCreateModal = useCallback(() => setShowTaskModal(!showTaskModal), [showTaskModal]);


    const activator =
        <Button
            icon={PlusIcon}
            variant="primary"
            onClick={toggleTaskCreateModal}
        >
            Add Todo
        </Button>


    const handleCreateTask = () => {
        // const selectedDueDate = selectedDate.toISOString().slice(0, 10);
        const today = new Date()
        const createdAt = today.getTime();
        // const createdDate = today.toLocaleDateString()
        const taskData = {
            createdAt, todoName, todoDueDate:selectedDate, todoPriority, additionalNotes, createdDate:today, completed:isTodoCompleted
        }
        // console.log("✨ ~ handleCreateTask ~ taskData:", taskData)
        todoList.push(taskData);
        console.log(todoList);
        // save into the local storage.
        localStorage.setItem("todoItems", JSON.stringify(todoList))
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
        setAddditionalNotes("");
        setTodoName("");
        setTodoPriority("high")
        console.log("✨ ~ CreateTaskModal ~ selectedDate:", selectedDate)
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