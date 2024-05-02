import { EmptyState, LegacyCard } from '@shopify/polaris'


export const TodoEmptyState = ({ emptyTodoMessage }) => {
    return (
        <LegacyCard subdued>
            <EmptyState
                heading={`No todo item found!`}
                image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
            >
                <p>{emptyTodoMessage}</p>
            </EmptyState>
        </LegacyCard>
    )
}
