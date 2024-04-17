import { BlockStack, EmptyState, Icon, LegacyCard, Select, TextField } from '@shopify/polaris';
import { SearchIcon } from '@shopify/polaris-icons';
import { useCallback, useContext, useState } from 'react';

import { useEffect } from 'react';
import getTodoFromLocalStorage from '../utils/getTodoFromLocalStorge';
import CreateTaskModal from './Common/CreateTaskModal';
import { TaskCard } from './Common/TaskCard';
import ToastComponent from './Common/ToastComponent';
import { TODO_CONTEXT } from './Context/TodoContext';
export const MainApp = () => {
    const [textFieldValue, setTextFieldValue] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('todo');
    const [selectedPriority, setSelectedPriority] = useState('high');

    const {
        isCreateSuccessToastActive,
        isDeleteSuccessToastActive,
        toggleDeleteSuccessToast,
        toggleAddSuccessToast,
        toggleTodoStatusChangeToast,
        isTodoStatusToastActive,
        toggleEditSuccessToast,
        isTodoEditSuccessToastActive,
        todoList,
        setTodoList
    } = useContext(TODO_CONTEXT);

    const todoFromLocalStorage = getTodoFromLocalStorage()
    const handleSearchResult = useCallback((query) => {
        const searchResultuntTodos = todoFromLocalStorage.filter((todo) => {
            return todo.todoName
                .toLocaleLowerCase()
                .includes(query.toLocaleLowerCase().trim());
        }) || [];
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

    const handleSelectStatusFilterChange = useCallback(
        (value) => setSelectedStatus(value),
        [],
    );
    const handleSelectPriorityFilterChange = useCallback(
        (value) => setSelectedPriority(value),
        [],
    );


    const todoStatusOptions = [
        { label: 'To Do', value: 'todo' },
        { label: 'Complete', value: 'complete' },
    ];
    const todoPriorityOptions = [
        { label: 'High', value: 'high' },
        { label: 'Medium', value: 'medium' },
        { label: 'Low', value: 'low' },
    ];

    let sortedTodos = todoList.length && todoList?.sort((a, b) => b?.createdAt - a?.createdAt) || [];

    if (selectedStatus === 'todo' && selectedPriority === 'high') {
        sortedTodos = todoList.filter((todo) => !todo.completed && todo.todoPriority === 'high');
    }
    else if (selectedStatus === 'todo' && selectedPriority === 'medium') {
        sortedTodos = todoList.filter((todo) => !todo.completed && todo.todoPriority === 'medium');
    }
    else if (selectedStatus === 'todo' && selectedPriority === 'low') {
        sortedTodos = todoList.filter((todo) => !todo.completed && todo.todoPriority === 'low');
    }
    else if (selectedStatus === 'complete' && selectedPriority === 'high') {
        sortedTodos = todoList.filter((todo) => todo.completed && todo.todoPriority === 'high');
    }
    else if (selectedStatus === 'complete' && selectedPriority === 'medium') {
        sortedTodos = todoList.filter((todo) => todo.completed && todo.todoPriority === 'medium');
    }
    else {
        sortedTodos = todoList.filter((todo) => todo.completed && todo.todoPriority === 'low');
    }




    useEffect(() => {
        console.log("✨ ~ MainApp ~ sortedTodos:", sortedTodos)
    }, [sortedTodos])

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
                    options={todoStatusOptions}
                    onChange={handleSelectStatusFilterChange}
                    value={selectedStatus}
                />
                <Select
                    options={todoPriorityOptions}
                    onChange={handleSelectPriorityFilterChange}
                    value={selectedPriority}
                />

                <CreateTaskModal />
            </div>

            <div className="mt-[50px]">
                <BlockStack gap="500">
                    {
                        (sortedTodos.length > 0) ?
                            sortedTodos.map((todo, i) => {
                                return (
                                    <TaskCard key={i} todo={todo} />
                                )
                            })
                            :
                            (
                                <LegacyCard subdued>
                                    <EmptyState
                                        heading={`No todo item found!`}
                                        image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
                                    >
                                        <p>Click on the add todo button to add new</p>
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
            <ToastComponent
                content="Todo Deleted Successfully"
                toggle={toggleDeleteSuccessToast}
                isActive={isDeleteSuccessToastActive}

            />
            <ToastComponent
                content="Todo Status Changed Successfully"
                toggle={toggleTodoStatusChangeToast}
                isActive={isTodoStatusToastActive}

            />
            <ToastComponent
                content="Todo Modified Successfully"
                toggle={toggleEditSuccessToast}
                isActive={isTodoEditSuccessToastActive}

            />
        </div>
    )
}
