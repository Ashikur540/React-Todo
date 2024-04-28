import { Text } from '@shopify/polaris';
import { useEffect, useState } from 'react';
import { getFormatedDate } from '../utils/getFormatedDate';
import { getGreetMessage } from '../utils/getGreetMessage';

export const AppHeader = () => {
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date().toLocaleTimeString());
        }, 1000);

        return () => clearInterval(interval)
    }, []);

    return (
        <div className='max-w-[960px] mx-auto mt-10'>
            <Text variant="headingXl" as="h4" alignment='center'>
                {getGreetMessage()}
            </Text>
            <Text variant="headingMd" as="p" alignment='center'>
                {currentTime}
            </Text>
            <Text variant="bodyLg" as="p" alignment='center'>
                {getFormatedDate(new Date())}
            </Text>
        </div>
    );
};
