
import { BlockStack, FormLayout, Modal, Select, TextField } from '@shopify/polaris';
import { useCallback, useContext, useEffect, useState } from 'react';
import { getFormatedDate } from '../../utils/getFormatedDate';
import { TODO_CONTEXT } from '../Context/TodoContext';
import DueDatePicker from './DueDatePicker';

export const EditTaskModal = ({ todo, EditModalActive, setEditModalActive }) => {
    const { todoName: title, todoDueDate: dueDate, todoPriority: priority, additionalNotes: notes, createdAt, createdDate } = todo
    const [errorTodoName, setErrorTodoName] = useState(false);


    const {
        todoList, setTodoList,
        todoName, todoDueDate, todoPriority, additionalNotes,
        selectedDate, setSelectedDate,
        setTodoName,
        setTodoPriority,
        setAdditionalNotes,
        toggleEditSuccessToast,
    } = useContext(TODO_CONTEXT);

    const priorityOptions = [
        { label: 'Low', value: 'low' },
        { label: 'Medium', value: 'medium' },
        { label: 'High', value: 'high' },
    ];

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

    
    const handleChangeTodoName = useCallback((value) => {
        // for validation while typing
        if (!value.trim()) {
            setErrorTodoName("Todo name is required");
        } else {
            setErrorTodoName("");
        }
        setTodoName(value)
    }, [setTodoName]);

    const toggleTodoEditModal = useCallback(() => {
        setEditModalActive(!EditModalActive);
        resetForm();
    }, [EditModalActive, resetForm, setEditModalActive]);

    const handleEditTask = useCallback(() => {
        if (todoName?.trim() === "") {
            setErrorTodoName("Todo name is required");
            return;
        } else {
            setErrorTodoName("");
        }
        const editedTodo = {
            todoName,
            selectedDate,
            todoPriority,
            additionalNotes,
        }
        console.log("✨ ~ handleEditTask ~ editedTodo:", editedTodo)
        const newTodos = todoList.map((todoItem) => {
            if (todoItem?.createdAt === createdAt) {
                todoItem["todoName"] = editedTodo["todoName"]
                todoItem["todoDueDate"] = editedTodo["selectedDate"]
                todoItem["todoPriority"] = editedTodo["todoPriority"]
                todoItem["additionalNotes"] = editedTodo["additionalNotes"]
            }
            return todoItem

        })
        setTodoList(newTodos);
        localStorage.setItem("todoItems", JSON.stringify(newTodos));
        toggleTodoEditModal();
        resetForm()
        toggleEditSuccessToast();
    }, [additionalNotes, createdAt, resetForm, selectedDate, setTodoList, todoList, todoName, todoPriority, toggleEditSuccessToast, toggleTodoEditModal]);

    useEffect(() => {
        setTodoName(title)
        setTodoPriority(priority)
        setAdditionalNotes(notes)
        setSelectedDate(new Date(dueDate))
    }, [title, priority, notes, dueDate, setTodoName, setTodoPriority, setAdditionalNotes, setSelectedDate])
    return (
        <Modal
            open={EditModalActive}
            onClose={toggleTodoEditModal}
            title={`You are editing ${todoName} `}
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
            footer={
                <Modal.Section>
                   {title} was created on {getFormatedDate(new Date(createdDate))}
                </Modal.Section>
            }
        >
            <Modal.Section>
                <BlockStack align='start' gap="200">
                    <TextField
                        label="Task Name"
                        value={todoName}
                        onChange={handleChangeTodoName}
                        placeholder="Example: Do Shopping"
                        autoComplete="off"
                        error={errorTodoName}
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
    );
}

