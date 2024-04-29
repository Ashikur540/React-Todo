import { Pagination } from '@shopify/polaris';
import { useContext } from 'react';
import { TODO_CONTEXT } from './context/TodoContext';


export const TodosPagination = ({
    handlePaginatePrevious,
    handlePaginateNext,
    currentPageNo,
    totalPage
}) => {
    const {
        todoList,
    } = useContext(TODO_CONTEXT);

    return (
        <div className="mt-8 mb-4 rounded-md">
            <Pagination
                onPrevious={handlePaginatePrevious}
                onNext={handlePaginateNext}
                type="page"
                hasNext={totalPage > 1}
                hasPrevious={totalPage > 1}
                label={`${currentPageNo}-${totalPage} of ${todoList?.length} todo items`}
            />
        </div>
    )
}
