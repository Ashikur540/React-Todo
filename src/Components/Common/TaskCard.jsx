import { BlockStack, Card, InlineGrid, InlineStack, Text } from '@shopify/polaris';
import TaskCardOption from './TaskCardOption';
import { useEffect } from 'react';

export const TaskCard = ({ todo }) => {
    const { todoName, todoDueDate, todoPriority,  } = todo || {}
    const dueDateObj = new Date(todoDueDate);
    useEffect(() => {

    }, [todo?.completed])
    return (
        <>
            <Card roundedAbove="sm">
                <BlockStack>
                    <BlockStack gap="200">
                        <InlineGrid columns="1fr auto">
                            <Text as="h2" variant="headingSm" textDecorationLine={todo?.completed && 'line-through'}>
                                {todoName}
                            </Text>
                            <TaskCardOption todo={todo} />
                        </InlineGrid>
                        <InlineStack wrap={false} gap='800'>
                            <Text as="p" variant="bodyMd">
                                Due Date: {dueDateObj?.toLocaleDateString()}
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
