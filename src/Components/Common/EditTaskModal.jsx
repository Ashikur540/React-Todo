
import { BlockStack, FormLayout, Modal, Select, TextField } from '@shopify/polaris';
import { useCallback, useContext, useState } from 'react';
import { TODO_CONTEXT } from '../Context/TodoContext';
import DueDatePicker from './DueDatePicker';

export const EditTaskModal = ({ todo, EditModalActive, setEditModalActive }) => {
    const { todoName, todoDueDate, todoPriority, additionalNotes } = todo

    const [selectedDate, setSelectedDate] = useState(new Date(todoDueDate));
    console.log("✨ ~ EditTaskModal ~ selectedDate:", selectedDate)
    const {
        setTodoName,
        setTodoPriority,
        setAddditionalNotes,
        handleChangePriority,
        handleChangeNotesText,
        handleChangeTodoName,
    } = useContext(TODO_CONTEXT)
    const toggleTodoEditModal = useCallback(() =>
        setEditModalActive(!EditModalActive),
        [EditModalActive, setEditModalActive]);

    const handleEditTask = useCallback(() => {
        console.log(`Edit Task: ${todoName}`);
        resetForm()
    }, [todoName]);

    const priorityOptions = [
        { label: 'Low', value: 'low' },
        { label: 'Medium', value: 'medium' },
        { label: 'High', value: 'high' },
    ];

    const resetForm = useCallback(() => {
        setSelectedDate(new Date());
        setAddditionalNotes("");
        setTodoName("");
        setTodoPriority("high")

    },
        [setAddditionalNotes, setSelectedDate, setTodoName, setTodoPriority],)


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

