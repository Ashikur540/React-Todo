
import { Button, Modal, TextContainer } from '@shopify/polaris';
import { DeleteIcon } from '@shopify/polaris-icons';
import { useCallback, useState } from 'react';

export const DeleteTaskModal = ({ todoName }) => {
    const [active, setActive] = useState(false);

    const handleChange = useCallback(() => setActive(!active), [active]);

    const activator = <Button
        icon={DeleteIcon}
        variant="secondary"
        tone='critical'
        onClick={handleChange}
        accessibilityLabel="Edit"
    />;

    return (
        <Modal
            activator={activator}
            open={active}
            onClose={handleChange}
            title={`${todoName} !`}
            sectioned
            primaryAction={{
                content: 'Delete',
                onAction: handleChange,
                destructive: true,
            }}
            secondaryActions={[
                {
                    content: 'Cancel',
                    onAction: handleChange,
                },
            ]}
        >
            <Modal.Section>
                <TextContainer>
                    <p>
                        Are you sure to delete this. Once it&apos;s  deleted will never restored!
                    </p>
                </TextContainer>
            </Modal.Section>
        </Modal>
    );
}

