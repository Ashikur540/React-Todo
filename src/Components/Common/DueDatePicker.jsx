import { BlockStack, Box, Card, DatePicker, Icon, Popover, TextField } from "@shopify/polaris";
import { CalendarIcon } from "@shopify/polaris-icons";
import { memo, useEffect, useRef, useState } from "react";

let DueDatePicker = ({ selectedDate, setSelectedDate, todoDueDate }) => {
    console.log("✨ ~ DueDatePicker ~ todoDueDate:", todoDueDate)

    useEffect(() => {
        if (todoDueDate) {
            setSelectedDate(new Date(todoDueDate))
        }
        else {
            setSelectedDate(new Date())
        }

    }, [setSelectedDate, todoDueDate])



    const [visible, setVisible] = useState(false);
    const [{ month, year }, setDate] = useState({
        month: selectedDate.getMonth(),
        year: selectedDate.getFullYear(),
    });
    const formattedValue = selectedDate.toLocaleDateString();
    // console.log("✨ ~ DueDatePicker ~ formattedValue:", formattedValue)
    const datePickerRef = useRef(null);

    function handleInputValueChange() {
        console.log("handleInputValueChange");
    }
    function handleOnClose() {
        setVisible(false);
    }
    function handleMonthChange(month, year) {
        setDate({ month, year });
    }
    function handleDateSelection({ end: newSelectedDate }) {
        setSelectedDate(newSelectedDate);
        setVisible(false);
    }
    useEffect(() => {
        if (selectedDate) {
            setDate({
                month: selectedDate?.getMonth(),
                year: selectedDate?.getFullYear(),
            });
        }
    }, [selectedDate]);
    return (
        <BlockStack gap="400">
            <Box minWidth="250px">
                <Popover
                    active={visible}
                    autofocusTarget="none"
                    preferredAlignment="center"
                    fullWidth
                    preferInputActivator={false}
                    preferredPosition="below"
                    onClose={handleOnClose}
                    activator={
                        <TextField
                            role="combobox"
                            label={"Due date"}
                            prefix={<Icon source={CalendarIcon} />}
                            value={formattedValue}
                            onFocus={() => setVisible(true)}
                            onChange={handleInputValueChange}
                            autoComplete="off"
                        />
                    }
                >
                    <Card refs={datePickerRef}>
                        <DatePicker
                            month={month}
                            year={year}
                            selected={selectedDate}
                            onMonthChange={handleMonthChange}
                            onChange={handleDateSelection}
                        />
                    </Card>
                </Popover>
            </Box>
        </BlockStack>
    )
}

DueDatePicker = memo(DueDatePicker)
export default DueDatePicker