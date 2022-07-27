const todo = (title, dueDate, priority, description) => {
    let _title = title;
    let _dueDate = dueDate;
    let _priority = priority;
    let _description = description;

    const getTitle = () => _title;

    const createTodoElement = (projectId, todoId) => {
        const dataId = `${projectId}-${todoId}`

        const element = document.createElement('div');
        element.classList.add('todo', _priority);
        element.setAttribute('data-id', dataId);

        const name = document.createElement('p');
        name.textContent = _title;

        const date = document.createElement('p');
        date.textContent = _dueDate;

        const detailsButton = document.createElement('button');
        detailsButton.textContent = 'Details';
        detailsButton.classList.add('todo-details');

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.classList.add('todo-edit');

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('todo-delete');

        element.append(name, date, detailsButton, editButton, deleteButton);

        return element;
    };

    return {
        getTitle,
        createTodoElement
    };
};

export default todo;
