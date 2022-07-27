import Home from './home.js';
import Todo from './todo.js';

const DOM = (() => {
    const _projectsContainer = document.getElementById('projects-container');
    const _todosContainer = document.getElementById('todos-container');

    let _currentProject = Home;

    const _homeHeader = document.getElementById('home');
    _homeHeader.addEventListener('click', () => {
        _currentProject = Home;
        _clearTodos();
        listAllTodos();
    });

    const _displayDetailsModal = e => {
        const [projectId, todoId] = e.target.parentElement.getAttribute('data-id').split('-');
        let todo;

        if (_currentProject === Home) {
            todo = Home.getTodo(todoId);
        } else {
            todo = Home.getProject(projectId).getTodo(todoId);
        }

        const detailsModalDiv = document.querySelector('.modal-details > div');
        const editButton = document.getElementById('details-edit');

        const title = document.createElement('p');
        title.textContent = `Title: ${todo.getTitle()}`;
        detailsModalDiv.insertBefore(title, editButton);

        const dueDate = document.createElement('p');
        dueDate.textContent = `Due date: ${todo.getDueDate()}`;
        detailsModalDiv.insertBefore(dueDate, editButton);

        const priority = document.createElement('p');
        priority.textContent = `Priority: ${todo.getPriority()}`;
        detailsModalDiv.insertBefore(priority, editButton);

        const description = document.createElement('p');
        description.textContent = `Description: ${todo.getDescription()}`;
        detailsModalDiv.insertBefore(description, editButton);

        detailsModalDiv.parentElement.style.display = 'block';
    };

    const _createTodoElement = (projectId, todoId) => {
        let todo;

        if (_currentProject === Home) {
            todo = Home.getTodo(todoId);
        } else {
            todo = Home.getProject(projectId).getTodo(todoId);
        }

        const element = document.createElement('div');
        element.classList.add('todo', todo.getPriority());

        const dataId = `${projectId}-${todoId}`;
        element.setAttribute('data-id', dataId);

        const name = document.createElement('p');
        name.textContent = todo.getTitle();

        const date = document.createElement('p');
        date.textContent = todo.getDueDate();

        const detailsButton = document.createElement('button');
        detailsButton.textContent = 'Details';
        detailsButton.classList.add('todo-details');
        detailsButton.addEventListener('click', _displayDetailsModal);

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.classList.add('todo-edit');

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('todo-delete');

        element.append(name, date, detailsButton, editButton, deleteButton);

        return element;
    };

    const _clearTodos = () => {
        while (_todosContainer.lastChild) {
            _todosContainer.removeChild(_todosContainer.lastChild);
        }
    };

    const _listTodos = project => {
        for (const [id, todo] of project.getTodos()) {
            const todoElement = _createTodoElement(project.getId(), id);
            _todosContainer.appendChild(todoElement);
        }
    };

    const listAllTodos = () => {
        _listTodos(Home);

        for (const project of Home.getProjects()) {
            _listTodos(project);
        }
    };

    const _createProjectListener = li => {
        li.addEventListener('click', e => {
            const projectId = e.target.getAttribute('data-project-id');
            const project = Home.getProject(projectId);
            _currentProject = project;

            _clearTodos();
            _listTodos(project);
        });
    };

    const _clearProjects = () => {
        while (_projectsContainer.lastChild) {
            _projectsContainer.removeChild(_projectsContainer.lastChild);
        }
    };

    const listProjects = () => {
        for (const project of Home.getProjects()) {
            const li = document.createElement('li');
            li.setAttribute('data-project-id', project.getId());
            li.textContent = project.getTitle();

            _createProjectListener(li);

            _projectsContainer.appendChild(li);
        }
    };

    const _displayAddTodoModal = () => {
        const modal = document.querySelector('.modal-edit-add');
        modal.style.display = 'block';
    };

    const addTodoButton = document.querySelector('#add-todo');
    addTodoButton.addEventListener('click', _displayAddTodoModal);

    const _displayAddProjectModal = () => {
        const modal = document.querySelector('.modal-add-project');
        modal.style.display = 'block';
    };

    const addProjectButton = document.querySelector('#add-project');
    addProjectButton.addEventListener('click', _displayAddProjectModal);

    const _hideModal = (modal) => {
        modal.style.display = 'none';
    };

    const cancelButtons = document.querySelectorAll('.cancel');
    cancelButtons.forEach(button => button.addEventListener('click', () => {
        let parent = button.parentElement;
        while (parent.classList[0] !== ('modal')) {
            parent = parent.parentElement;
        }
        _hideModal(parent);
    }));

    const submitTodoForm = (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);

        const todo = Todo(
            formData.get('title'),
            formData.get('due-date'),
            formData.get('priority'),
            formData.get('description')
        );

        _currentProject.addTodo(todo);
        _clearTodos();

        if (_currentProject === Home) {
            listAllTodos();
        } else {
            _listTodos(_currentProject);
        }

        form.reset();

        const modal = document.querySelector('.modal-edit-add');
        _hideModal(modal);
    };

    const todoForm = document.getElementById('todo-form');
    todoForm.addEventListener('submit', submitTodoForm);

    const submitProjectForm = (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);

        const title = formData.get('project-name');
        Home.addProject(title);

        _clearProjects();
        listProjects();

        form.reset();

        const modal = document.querySelector('.modal-add-project');
        _hideModal(modal);
    };

    const projectForm = document.getElementById('project-form');
    projectForm.addEventListener('submit', submitProjectForm);

    return {
        Home,
        listProjects,
        listAllTodos
    };
})();

export default DOM;
