
import { BlockStack, FormLayout, Modal, Select, TextField } from '@shopify/polaris';
import { useCallback, useContext, useEffect } from 'react';
import { TODO_CONTEXT } from '../Context/TodoContext';
import DueDatePicker from './DueDatePicker';

export const EditTaskModal = ({ todo, EditModalActive, setEditModalActive }) => {
    const { todoName: title, todoDueDate: dueDate, todoPriority: priority, additionalNotes: notes } = todo
    console.log("✨ ~ EditTaskModal ~ todo:", todo)


    const {
        todoName, todoDueDate, todoPriority, additionalNotes,
        selectedDate, setSelectedDate,
        setTodoName,
        setTodoPriority,
        setAdditionalNotes,
    } = useContext(TODO_CONTEXT);

    const priorityOptions = [
        { label: 'Low', value: 'low' },
        { label: 'Medium', value: 'medium' },
        { label: 'High', value: 'high' },
    ];

    const handleChangeTodoName = useCallback((value) => setTodoName(value), [setTodoName]);

    const handleChangeNotesText = useCallback(
        (value) => setAdditionalNotes(value), [setAdditionalNotes]);

    const handleChangePriority = useCallback(
        (value) => setTodoPriority(value),
        [setTodoPriority],
    );
    const resetForm = useCallback(() => {
        setSelectedDate(new Date());
        setAdditionalNotes("");
        setTodoName("");
        setTodoPriority("high")

    }, [setAdditionalNotes, setSelectedDate, setTodoName, setTodoPriority],)


    const toggleTodoEditModal = useCallback(() => {
        setEditModalActive(!EditModalActive);
        resetForm();
    }, [EditModalActive, resetForm, setEditModalActive]);

    const handleEditTask = useCallback(() => {
        console.log(`Edit Task: ${todoName}`);
        resetForm()
    }, [todoName]);

    // setting the states according to the todo
    useEffect(() => {
        setTodoName(title)
        setTodoPriority(priority)
        setAdditionalNotes(notes)
        setSelectedDate(new Date(dueDate))
    }, [title, priority, notes, dueDate, setTodoName, setTodoPriority, setAdditionalNotes, setSelectedDate])
    return (
        <>
            <Modal
                open={EditModalActive}
                onClose={toggleTodoEditModal}
                title={`Edit ${todoName}`}
                primaryAction={{
                    content: 'Save',
                    onAction: handleEditTask,
                }}
                secondaryActions={[
                    {
                        content: 'Cancel',
                        onAction: toggleTodoEditModal,
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
                                <DueDatePicker
                                    selectedDate={selectedDate}
                                    setSelectedDate={setSelectedDate}
                                    todoDueDate={todoDueDate}
                                />
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

