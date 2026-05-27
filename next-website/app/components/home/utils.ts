export const renderDate = (date : Date) => {
    // capitalize 1st letter lmao :P
    let dateStr = date.toLocaleDateString('en-US', { 
            year:"numeric",
            month:"short"
        }).toLowerCase();
    dateStr = dateStr.charAt(0).toUpperCase() + dateStr.slice(1);
    return dateStr;
};