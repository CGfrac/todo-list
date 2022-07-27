const project = (title, id) => {
    const _title = title;
    const _id = id;
    const _todos = {};
    let _nextTodoId = 0;

    const getTitle = () => _title;
    const getId = () => _id;
    const getTodo = id => _todos[id];
    const getTodos = () => Object.values(_todos);


    const addTodo = todo => {
        _todos[_nextTodoId] = todo;
        _nextTodoId++;
    }

    const deleteTodo = id => {
        delete _todos[id];
    }

    return {
        getTitle,
        getId,
        getTodo,
        getTodos,
        addTodo,
        deleteTodo
    }
};

export default project;
