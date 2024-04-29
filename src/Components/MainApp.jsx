import { BlockStack, Button, Icon, Select, TextField } from '@shopify/polaris';
import { SearchIcon, XIcon } from '@shopify/polaris-icons';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';

import getTodoFromLocalStorage from '../utils/getTodoFromLocalStorge';
import { TodosPagination } from './TodosPagination';
import CreateTaskModal from './common/CreateTaskModal';
import { TaskCard } from './common/TaskCard';
import ToastComponent from './common/ToastComponent';
import { TodoEmptyState } from './common/TodoEmptyState';
import { todoPriorityOptions, todoStatusOptions } from './constants/todoOptions';
import { TODO_CONTEXT } from './context/TodoContext';

export const MainApp = () => {
    const [textFieldValue, setTextFieldValue] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('status');
    const [selectedPriority, setSelectedPriority] = useState('priority');
    const [activeClearButton, setActiveClearButton] = useState(false);
    const [TotalDataPerPage, setTotalDataPerPage] = useState(10);
    const [totalTodoDataCount, setTotalTodoDataCount] = useState(0);
    const [currentPageNo, setCurrentPageNo] = useState(1);
    const [totalPage, setTotalPage] = useState(1)
    // const totalPage = Math.ceil(totalTodoDataCount / TotalDataPerPage);
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

    const [paginatedTodos, setPaginatedTodos] = useState([]);

    const todoFromLocalStorage = useMemo(() => getTodoFromLocalStorage() || [], []);
    // const todoFromLocalStorage =  getTodoFromLocalStorage() 

    useEffect(() => {
        setTotalTodoDataCount(todoList?.length);
    }, [todoList]);

    useEffect(() => {
        console.log("✨ ~ MainApp ~ totalPage ->:", Math.ceil(totalTodoDataCount / TotalDataPerPage))
        setTotalPage(Math.ceil(totalTodoDataCount / TotalDataPerPage) === 0 ? 1 : Math.ceil(totalTodoDataCount / TotalDataPerPage))
        console.log("✨ ~ MainApp ~ totalPage:", totalPage)
    }, [totalTodoDataCount, TotalDataPerPage, totalPage])

    // handle serach 
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

    // this handles slicing the todos from the whole todList according to the pagination 
    const handlePaginateTodos = useCallback(() => {
        const startIndex = (currentPageNo - 1) * TotalDataPerPage;
        const endIndex = startIndex + TotalDataPerPage;
        const paginated = todoList.slice(startIndex, endIndex);
        setPaginatedTodos(paginated);
    }, [TotalDataPerPage, currentPageNo, todoList]);

    useEffect(() => {
        handlePaginateTodos();
    }, [handlePaginateTodos]);

    // this is todos of the current index -> sorted by default 
    let filteredTodos = useMemo(() => {
        return paginatedTodos?.length && paginatedTodos?.sort((todoCurrent, todoNext) => todoNext?.createdAt - todoCurrent?.createdAt) || [];
    }, [paginatedTodos]);

    const handlePaginateNext = useCallback(() => {
        setCurrentPageNo(currentPageNo + 1)
        if (currentPageNo >= totalPage) {
            setCurrentPageNo(1)
        }
        handlePaginateTodos()
    }, [currentPageNo, handlePaginateTodos, totalPage]);


    const handlePaginatePrevious = useCallback(() => {
        setCurrentPageNo(currentPageNo - 1);
        if (currentPageNo <= 1) {
            setCurrentPageNo(totalPage)
        }
        handlePaginateTodos()
    }, [currentPageNo, handlePaginateTodos, totalPage])


    const filterTodos = useCallback((todos, status, priority) => {
        // If both filters are set to their default values, return all todos. this todos will show initially
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
        filteredTodos = filterTodos(paginatedTodos, selectedStatus, selectedPriority);
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
                        (filteredTodos?.length > 0) ?
                            filteredTodos?.map((todo, i) => {
                                return (
                                    <TaskCard key={i} todo={todo} />
                                )
                            })
                            :
                            <TodoEmptyState />
                    }
                </BlockStack>

                <TodosPagination
                    handlePaginatePrevious={handlePaginatePrevious}
                    handlePaginateNext={handlePaginateNext}
                    currentPageNo={currentPageNo}
                    totalPage={totalPage}
                />
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
