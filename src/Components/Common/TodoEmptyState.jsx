import { EmptyState, LegacyCard } from '@shopify/polaris'


export const TodoEmptyState = () => {
    return (
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
