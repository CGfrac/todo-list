const todo = (title, dueDate, priority, description) => {
    let _title = title;
    let _dueDate = dueDate;
    let _priority = priority;
    let _description = description;

    const getTitle = () => _title;

    const createTodoElement = () => {
        const element = document.createElement('div');
        element.classList.add('todo', _priority);
        element.setAttribute('data-todo', _title);

        const name = document.createElement('p');
        name.textContent = _title;
        element.appendChild(name);

        const date = document.createElement('p');
        date.textContent = _dueDate;
        element.appendChild(date);

        return element;
    };

    return {
        getTitle,
        createTodoElement
    };
};

export default todo;
