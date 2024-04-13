import { BlockStack, EmptyState, Icon, LegacyCard, Select, TextField } from '@shopify/polaris';
import { SearchIcon } from '@shopify/polaris-icons';
import { useCallback, useContext, useMemo, useState } from 'react';

import CreateTaskModal from './Common/CreateTaskModal';
import { TaskCard } from './Common/TaskCard';
import ToastComponent from './Common/ToastComponent';
import { TODO_CONTEXT } from './Context/TodoContext';
export const MainApp = () => {
    const [textFieldValue, setTextFieldValue] = useState('');
    const [selected, setSelected] = useState('today');
    // const [todoSearchResult, setTodoSearchResult] = useState([]);
    const {
        isCreateSuccessToastActive,
        setIsCreateSuccessToastActive,
        todoList,
        setTodoList
    } = useContext(TODO_CONTEXT);

    const todoFromLocalStorage = useMemo(() => {
        return localStorage.getItem('todoItems') ? JSON.parse(localStorage.getItem('todoItems')) : [];
    }, []);
    const handleSearchResult = useCallback((query) => {
        const searchResultuntTodos = todoFromLocalStorage.filter((todo) => {
            return todo.todoName
                .toLocaleLowerCase()
                .includes(query.toLocaleLowerCase().trim());
        }) || [];

        console.log("✨ ~ MainApp ~ todoList:", searchResultuntTodos)
        setTodoList(searchResultuntTodos);
    }, [setTodoList, todoFromLocalStorage]);

    const handleTextFieldChange = useCallback(
        (value) => {
            setTextFieldValue(value);
            handleSearchResult(value);
        },
        [handleSearchResult],
    );

    const handleClearButtonClick = useCallback(() => {
        setTextFieldValue('')
        setTodoList(todoFromLocalStorage);
    }, [setTodoList, todoFromLocalStorage]);

    const handleSelectChange = useCallback(
        (value) => setSelected(value),
        [],
    );
    const toggleAddSuccessToast = useCallback(
        () => setIsCreateSuccessToastActive(!isCreateSuccessToastActive),
        [isCreateSuccessToastActive, setIsCreateSuccessToastActive]
    );

    const options = [
        { label: 'To Do', value: 'todo' },
        { label: 'Complete', value: 'complete' },
    ];


    return (
        <div className='mt-[65px]'>
            <TextField
                prefix={<Icon source={SearchIcon} tone="base" />}
                value={textFieldValue}
                onChange={handleTextFieldChange}
                clearButton
                onClearButtonClick={handleClearButtonClick}
                autoComplete="off"
                placeholder='Search task by name'
            />

            <div className="flex justify-end gap-2 mt-4">
                <Select
                    tone='magic'
                    options={options}
                    onChange={handleSelectChange}
                    value={selected}
                />
                <Select
                    tone='magic'
                    options={options}
                    onChange={handleSelectChange}
                    value={selected}
                />
                {/* <Button
                    icon={PlusIcon}
                    variant="primary"
                >
                    Add Task
                </Button> */}
                <CreateTaskModal
                    toggleAddSuccessToast={toggleAddSuccessToast}
                />
            </div>

            <div className="mt-[50px]">
                <BlockStack gap="500">
                    {
                        todoList?.length > 0 ?
                            todoList?.sort((a, b) => b.createdAt - a.createdAt)
                                .map((todo, i) => {
                                    return (
                                        <TaskCard key={i} todo={todo} />
                                    )
                                })
                            :
                            (
                                <LegacyCard subdued>
                                    <EmptyState
                                        heading="Your currently don't have any todo item."
                                        image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
                                    >
                                        <p>Click on the add todo button to add new!</p>
                                    </EmptyState>
                                </LegacyCard>
                            )
                    }
                </BlockStack>
            </div>

            <ToastComponent
                content="Todo Added Successfully"
                toggle={toggleAddSuccessToast}
                isActive={isCreateSuccessToastActive}

            />
        </div>
    )
}
