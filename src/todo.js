const todo = (title, dueDate, priority, description) => {
    let _title = title;
    let _dueDate = dueDate;
    let _priority = priority;
    let _description = description;

    const getTitle = () => _title;
    const getDueDate = () => _dueDate;
    const getPriority = () => _priority;
    const getDescription = () => _description;

    return {
        getTitle,
        getDueDate,
        getPriority,
        getDescription
    };
};

export default todo;
