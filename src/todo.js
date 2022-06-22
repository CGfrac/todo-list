const todo = (title, dueDate, priority, description) => {
    let _title = title;
    let _dueDate = dueDate;
    let _priority = priority;
    let _description = description || '';

    const getTitle = () => _title;
    const getDueDate = () => _dueDate;
    const getPriority = () => _priority;
    const getDescription = () => _description;

    const setTitle = title => {
        _title = title;
    };

    const setDueDate = dueDate => {
        _dueDate = dueDate;
    };

    const setPriority = priority => {
        _priority = priority;
    };

    const setDescription = description => {
        _description = description;
    };

    return {
        getTitle,
        getDueDate,
        getPriority,
        getDescription,
        setTitle,
        setDueDate,
        setPriority,
        setDescription
    };
};

export default todo;
