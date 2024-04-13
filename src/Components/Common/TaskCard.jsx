import { BlockStack, Card, InlineGrid, InlineStack, Text } from '@shopify/polaris';
import TaskCardOption from './TaskCardOption';

export const TaskCard = ({ todo }) => {
    const { todoName, selectedDueDate, todoPriority } = todo
    return (
        <>
            <Card roundedAbove="sm">
                <BlockStack>
                    <BlockStack gap="200">
                        <InlineGrid columns="1fr auto">
                            <Text as="h2" variant="headingSm">
                                {todoName}
                            </Text>
                            {/* <ButtonGroup>
                                <DeleteTaskModal todoName={todoName} />
                                <EditTaskModal todo={todo} />
                            </ButtonGroup> */}
                            <TaskCardOption />
                        </InlineGrid>
                        <InlineStack wrap={false} gap='800'>
                            <Text as="p" variant="bodyMd">
                                Due Date: {selectedDueDate}
                            </Text>
                            <Text as="p" variant="bodyMd">
                                Priority: {todoPriority}
                            </Text>
                        </InlineStack>
                    </BlockStack>
                </BlockStack>
            </Card>
        </>
    )
}
