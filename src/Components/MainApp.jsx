import { BlockStack, Button, EmptyState, Icon, LegacyCard, Select, TextField } from '@shopify/polaris';
import { SearchIcon, XIcon } from '@shopify/polaris-icons';
import { useCallback, useContext, useMemo, useState } from 'react';
import getTodoFromLocalStorage from '../utils/getTodoFromLocalStorge';
import CreateTaskModal from './Common/CreateTaskModal';
import { TaskCard } from './Common/TaskCard';
import ToastComponent from './Common/ToastComponent';
import { TODO_CONTEXT } from './Context/TodoContext';
export const MainApp = () => {
    const [textFieldValue, setTextFieldValue] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('status');
    const [selectedPriority, setSelectedPriority] = useState('priority');
    const [activeClearButton, setActiveClearButton] = useState(false)
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
        (value) => {
            setSelectedStatus(value);
            if (value !== 'status') {
                setActiveClearButton(true)
            }
        },
        [],
    );
    const handleSelectPriorityFilterChange = useCallback(
        (value) => {
            setSelectedPriority(value)
            if (value !== 'priority') {
                setActiveClearButton(true)
            }
        },
        [],
    );


    const todoStatusOptions = [
        { label: 'Status', value: 'status', disabled: true },
        { label: 'To Do', value: 'todo' },
        { label: 'Complete', value: 'complete' },
    ];
    const todoPriorityOptions = [
        { label: 'Priority', value: 'priority', disabled: true },
        { label: 'High', value: 'high' },
        { label: 'Medium', value: 'medium' },
        { label: 'Low', value: 'low' },
    ];

    let sortedTodos = useMemo(() => {
        return todoList?.length && todoList?.sort((todoCurrent, todoNext) => todoNext?.createdAt - todoCurrent?.createdAt) || [];
    }, [todoList]);


    const filterTodos = useCallback((todos, status, priority) => {
        // If both filters are set to their default values, return all todos.
        if (status === 'status' && priority === 'priority') {
            return todos;
        }
        // If user select any filter option, filter todos based on that filter
        if (status !== 'status' && priority === 'priority') {
            return todos.filter(todo => status === 'todo' ? !todo.completed : todo.completed);
        }
        if (status === 'status' && priority !== 'priority') {
            return todos.filter(todo => todo.todoPriority === priority);
        }

        // If user selects both filters, filter todos based on both criteria.
        return todos.filter(todo => {
            const isStatusMatch = status === 'todo' ? !todo.completed : todo.completed;
            const isPriorityMatch = todo.todoPriority === priority;
            return isStatusMatch && isPriorityMatch;
        });
    }, []);

    //  if user selects any filter
    if (selectedPriority !== 'priority' || selectedStatus !== 'status') {
        sortedTodos = filterTodos(sortedTodos, selectedStatus, selectedPriority);
    }


    const handleClearFilters = useCallback(() => {
        setSelectedStatus('status');
        setSelectedPriority('priority');
        setTodoList(todoFromLocalStorage);
        setActiveClearButton(false)
    }, [setTodoList, todoFromLocalStorage])


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
                spellCheck
            />

            <div className="flex justify-end gap-2 mt-4">
                <Select
                    label="Sort by"
                    labelInline
                    // helpText="Filter by status"
                    options={todoStatusOptions}
                    onChange={handleSelectStatusFilterChange}
                    value={selectedStatus}
                />
                <Select
                    label="Sort by"
                    labelInline
                    options={todoPriorityOptions}
                    onChange={handleSelectPriorityFilterChange}
                    value={selectedPriority}
                />

                <CreateTaskModal />
            </div>

            <div className="mt-[50px]">
                {
                    activeClearButton && (
                        <div className="flex justify-end gap-2 mb-4">
                            <Button
                                icon={XIcon}
                                size='large'
                                variant='tertiary'
                                onClick={handleClearFilters}
                            >
                                Clear Filters
                            </Button>
                        </div>
                    )
                }
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
