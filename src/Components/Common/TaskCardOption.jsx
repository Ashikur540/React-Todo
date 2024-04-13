import { ActionList, Button, Popover } from '@shopify/polaris';
import {
    MenuHorizontalIcon
} from '@shopify/polaris-icons';
import { useCallback, useState } from 'react';
import { EditTaskModal } from './EditTaskModal';
const TaskCardOption = () => {
    const [popoverActive, setPopoverActive] = useState(false);

    const togglePopoverActive = useCallback(
        () => setPopoverActive((popoverActive) => !popoverActive),
        [],
    );

    const activator = (
        <Button onClick={togglePopoverActive} icon={MenuHorizontalIcon}>
        </Button>
    );

    return (
        <>
            <Popover

                active={popoverActive}
                activator={activator}
                autofocusTarget="first-node"
                onClose={togglePopoverActive}
            >
                <ActionList
                    items={[
                        {
                            content: 'Edit',
                            onAction: <EditTaskModal />,
                            // icon: EditIcon,
                            secondary: true

                        },
                        {
                            content: 'Delete',
                            onAction: () => {
                                console.log('Delete');
                            },
                            // icon: DeleteIcon,
                            destructive: true
                        },
                        {
                            content: 'Complete',
                            // icon: CheckIcon,
                            onAction: () => {
                                console.log('Complete');
                            },
                        },
                    ]}
                />
            </Popover>
        </>
    );
}

export default TaskCardOption