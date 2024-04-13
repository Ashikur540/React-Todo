import { Text } from '@shopify/polaris';

export const AppHeader = () => {
    return (
        <div className='max-w-[960px] mx-auto mt-10'>
            <Text variant="headingXl" as="h4" alignment='center'>
                Good Morning
            </Text>
            <Text variant="bodyLg" as="p"  alignment='center'>
                12 April 2024
            </Text>
        </div>
    )
}
