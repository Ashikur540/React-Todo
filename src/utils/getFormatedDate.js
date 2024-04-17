export const getFormatedDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
    // return date.toIsoString().split('T')[0];
}