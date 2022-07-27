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

    const _clearTodos = () => {
        while (_todosContainer.lastChild) {
            _todosContainer.removeChild(_todosContainer.lastChild);
        }
    };

    const _listTodos = project => {
        for (const [id, todo] of project.getTodos()) {
            const todoElement = todo.createTodoElement(project.getId(), id);
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
