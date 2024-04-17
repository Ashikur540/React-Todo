import React, { useState, useEffect } from 'react';
import { Text } from '@shopify/polaris';
import { getFormatedDate } from '../utils/getFormatedDate';

export const AppHeader = () => {
    const [currentTime, setCurrentTime] = useState((new Date().toISOString()));

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime((new Date().toISOString()));
        }, 1000); 

        return () => clearInterval(interval);
    }, []);

    const today = new Date();
    const currentHour = today.getHours();
    let greeting = '';

    if (currentHour >= 5 && currentHour < 12) {
        greeting = 'Good Morning';
    } else if (currentHour >= 12 && currentHour < 18) {
        greeting = 'Good Afternoon';
    } else if (currentHour >= 18 && currentHour < 24) {
        greeting = 'Good Evening';
    } else {
        greeting = 'Good Night';
    }
    const currentDate = getFormatedDate(new Date());
    const currentFormatedTime = new Date(currentTime).toLocaleTimeString();
    return (
        <div className='max-w-[960px] mx-auto mt-10'>
            <Text variant="headingXl" as="h4" alignment='center'>
                {greeting}
            </Text>
            <Text variant="headingMd" as="p" alignment='center'>
                {currentFormatedTime}
            </Text>
            <Text variant="bodyLg" as="p" alignment='center'>
                {currentDate}
            </Text>
        </div>
    );
};
