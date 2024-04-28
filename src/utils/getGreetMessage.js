export const getGreetMessage = () => {

    const date = new Date();
    const currentHour = date.getHours();
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
    return greeting
}