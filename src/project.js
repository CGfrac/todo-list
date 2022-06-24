const project = title => {
    const _title = title;
    const _todos = {};

    const getTitle = () => _title;
    const getTodo = title => _todos[title];
    const getTodos = () => Object.values(_todos);


    const addTodo = (title, todo) => {
        _todos[title] = todo;
    }

    const deleteTodo = title => {
        delete _todos[title];
    }

    return {
        getTitle,
        getTodo,
        getTodos,
        addTodo,
        deleteTodo
    }
};

export default project;
