
import { Button, Modal } from '@shopify/polaris';
import { EditIcon } from '@shopify/polaris-icons';
import { useCallback, useState } from 'react';

export const EditTaskModal = ({ todo }) => {
    const { todoName, selectedDueDate, todoPriority } = todo
    const [active, setActive] = useState(false);

    const handleChange = useCallback(() => setActive(!active), [active]);
    const [showTaskModal, setShowTaskModal] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [AdditionalNotes, setAddditionalNotes] = useState("");
    // const [showAddSuccessToast, setShowAddSuccessToast] = useState(false)

    const toggleTaskCreateModal = useCallback(() => setShowTaskModal(!showTaskModal), [showTaskModal]);
    const handleChangeTodoName = useCallback((value) => setTodoName(value), []);
    const handleChangeNotesText = useCallback((value) => setAddditionalNotes(value), []);
    const activator = <Button
        icon={EditIcon}
        variant="secondary"
        tone='success'
        onClick={handleChange}
        accessibilityLabel="Edit"
    />;

    return (
        <>
            <Modal
                activator={activator}
                open={showTaskModal}
                onClose={toggleTaskCreateModal}
                title="Enter Your Task Details Here"
                // primaryAction={{
                //     content: 'Edit',
                //     onAction: handleCreateTask,
                // }}
                // secondaryActions={[
                //     {
                //         content: 'Cancel',
                //         onAction: toggleTaskCreateModal,
                //     },
                // ]}
            >
                <Modal.Section>
                    This is a  model
                </Modal.Section>
            </Modal>

        </>
    );
}

