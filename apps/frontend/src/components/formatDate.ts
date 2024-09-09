// Format date to string
export const formatDate = (date: Date) => {
    // Get the year, month, and day
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    // Return the formatted date
    return `${year}-${month}-${day}`;
};