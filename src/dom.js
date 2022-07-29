import Home from './home.js';
import Todo from './todo.js';

const DOM = (() => {
    const _projectsContainer = document.getElementById('projects-container');
    const _todosContainer = document.getElementById('todos-container');

    let _currentProject = Home;
    let _isEdit = false;
    let _isEditFromDetails = false;
    let _isDeleteTargetTodo = false;
    let _editTarget;
    let _detailsTarget;
    let _deleteTodoTarget;

    const _clearDetailsModal = detailsModal => {
        const detailsModalDiv = detailsModal.firstElementChild;
        const editButton = document.getElementById('details-edit');

        while (detailsModalDiv.firstElementChild !== editButton) {
            detailsModalDiv.removeChild(detailsModalDiv.firstElementChild);
        }
    };

    const _createElementWithText = (elementType, textContent) => {
        const element = document.createElement(elementType);
        element.textContent = textContent;
        return element;
    };

    const _createDetailsPara = (prefix, getter) => {
        return _createElementWithText('p', `${prefix}: ${getter()}`);
    };

    const _generateDetailsContent = detailsModal => {
        const title = _createDetailsPara('Title', _detailsTarget.getTitle);
        const dueDate = _createDetailsPara('Due date', _detailsTarget.getDueDate);
        const priority = _createDetailsPara('Priority', _detailsTarget.getPriority);
        const description = _createDetailsPara('Description', _detailsTarget.getDescription);

        const detailsElement = document.createElement('div');
        detailsElement.append(title, dueDate, priority, description);

        const editButton = document.getElementById('details-edit');
        detailsModal.firstElementChild.insertBefore(detailsElement, editButton);
    };

    const _displayModal = id => {
        const modal = document.getElementById(id);

        if (id === 'modal-details') {
            _clearDetailsModal(modal);
            _generateDetailsContent(modal);
            _editTarget = _detailsTarget;
        }

        modal.style.display = 'block';
    };

    const _hideModal = modal => {
        modal.style.display = 'none';
    };

    const _parseDataId = target => {
        return target.getAttribute('data-id').split('-');
    };

    const _deleteTodo = () => {
        const [projectId, todoId] = _parseDataId(_deleteTodoTarget);

        // if projectId is Home
        if (projectId === '0') {
            Home.deleteTodo(todoId);
        } else {
            Home.getProject(projectId).deleteTodo(todoId);
        }

        if (_currentProject === Home) {
            refreshTodos(Home);
        } else {
            refreshTodos(_currentProject);
        }
    };

    const _editTodo = () => {
        document.getElementById('title').value = _editTarget.getTitle();
        document.getElementById('due-date').value = _editTarget.getDueDate();

        const priority = _editTarget.getPriority();

        switch (priority) {
            case 'high':
                document.getElementById('priority-high').checked = true;
                break;
            case 'medium':
                document.getElementById('priority-medium').checked = true;
                break;
            default:
                document.getElementById('priority-low').checked = true;
        }

        document.getElementById('description').value = _editTarget.getDescription();

        _isEdit = true;
        _displayModal('modal-edit-add');
    };

    const _createTodoElement = (projectId, todoId, todo) => {
        const element = document.createElement('div');
        element.classList.add('todo', todo.getPriority());

        const dataId = `${projectId}-${todoId}`;
        element.setAttribute('data-id', dataId);

        const name = _createElementWithText('p', todo.getTitle());
        const date = _createElementWithText('p', todo.getDueDate());
        const detailsButton = _createElementWithText('button', 'Details');
        const editButton = _createElementWithText('button', 'Edit');
        const deleteButton = _createElementWithText('button', 'Delete');

        detailsButton.classList.add('todo-details');
        detailsButton.addEventListener('click', e => {
            _detailsTarget = todo;
            _displayModal('modal-details');
        });

        editButton.classList.add('todo-edit');
        editButton.addEventListener('click', e => {
            _isEditFromDetails = false;
            _editTarget = todo;
            _editTodo();
        });

        deleteButton.classList.add('todo-delete');
        deleteButton.addEventListener('click', () => {
            _isDeleteTargetTodo = true;
            _deleteTodoTarget = element;
            _displayModal('modal-delete');
        });

        element.append(name, date, detailsButton, editButton, deleteButton);

        return element;
    };

    const _createDeleteProjectButton = () => {
        const deleteProjectButton = _createElementWithText('button', 'Delete Project');
        deleteProjectButton.id = 'delete-project-button';

        const main = document.querySelector('.main');

        deleteProjectButton.addEventListener('click', () => {
            _isDeleteTargetTodo = false;
            _displayModal('modal-delete');
        });

        main.appendChild(deleteProjectButton);
    };

    const _removeDeleteProjectButton = () => {
        const button = document.getElementById('delete-project-button');
        button.remove();
    };

    const _clearTodos = () => {
        while (_todosContainer.lastChild) {
            _todosContainer.removeChild(_todosContainer.lastChild);
        }
    };

    const _listTodos = project => {
        for (const [id, todo] of project.getTodos()) {
            const todoElement = _createTodoElement(project.getId(), id, todo);
            _todosContainer.appendChild(todoElement);
        }

        if (!document.getElementById('delete-project-button')) {
            if (_currentProject !== Home) {
                _createDeleteProjectButton();
            }
        } else {
            if (_currentProject === Home) {
                _removeDeleteProjectButton();
            }
        }
    };

    const _listAllTodos = () => {
        _listTodos(Home);

        for (const project of Home.getProjects()) {
            _listTodos(project);
        }
    };

    const refreshTodos = project => {
        _clearTodos()

        if (project === Home) {
            _listAllTodos();
        } else {
            _listTodos(project);
        }
    };

    const _clearProjects = () => {
        while (_projectsContainer.lastChild) {
            _projectsContainer.removeChild(_projectsContainer.lastChild);
        }
    };

    const _createProjectListener = li => {
        li.addEventListener('click', e => {
            const projectId = e.target.getAttribute('data-project-id');
            const project = Home.getProject(projectId);
            _currentProject = project;

            refreshTodos(project);
        });
    };

    const _listProjects = () => {
        for (const project of Home.getProjects()) {
            const li = _createElementWithText('li', project.getTitle());
            li.setAttribute('data-project-id', project.getId());

            _createProjectListener(li);

            _projectsContainer.appendChild(li);
        }
    };

    const refreshProjectsList = () => {
        _clearProjects();
        _listProjects();
    };

    const _deleteProject = () => {
        Home.deleteProject(_currentProject.getId());

        const main = document.querySelector('.main');
        const deleteProjectButton = main.lastElementChild;
        main.removeChild(deleteProjectButton);

        _currentProject = Home;
        refreshTodos(Home);
        refreshProjectsList();
    };

    const _submitTodoForm = e => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);

        if (!_isEdit){
            const todo = Todo(
                formData.get('title'),
                formData.get('due-date'),
                formData.get('priority'),
                formData.get('description')
            );

            _currentProject.addTodo(todo);
        } else {
            _editTarget.setTitle(formData.get('title'));
            _editTarget.setDueDate(formData.get('due-date'));
            _editTarget.setPriority(formData.get('priority'));
            _editTarget.setDescription(formData.get('description'));

            if (_isEditFromDetails) {
                _displayModal('modal-details');
            }
        }

        refreshTodos(Home);

        form.reset();

        const modal = document.getElementById('modal-edit-add');
        _hideModal(modal);
    };

    const _submitProjectForm = e => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);

        const title = formData.get('project-name');
        Home.addProject(title);

        refreshProjectsList();

        form.reset();

        const modal = document.getElementById('modal-add-project');
        _hideModal(modal);
    };

    const _homeHeader = document.getElementById('home');
    _homeHeader.addEventListener('click', () => {
        _currentProject = Home;
        refreshTodos(Home);
    });

    const _cancelButtons = document.querySelectorAll('.cancel');
    _cancelButtons.forEach(button => button.addEventListener('click', () => {
        let parent = button.parentElement;
        while (parent.classList[0] !== ('modal')) {
            parent = parent.parentElement;
        }
        _hideModal(parent);
    }));

    const _addTodoButton = document.querySelector('#add-todo');
    _addTodoButton.addEventListener('click', () => {
        _isEdit = false;
        _displayModal('modal-edit-add');
    });

    const _addProjectButton = document.querySelector('#add-project');
    _addProjectButton.addEventListener('click', () => _displayModal('modal-add-project'));

    const _detailsModalEditButton = document.getElementById('details-edit');
    _detailsModalEditButton.addEventListener('click', e => {
        _isEditFromDetails = true;
        _editTodo();
    });

    const _confirmDeleteButton = document.getElementById('confirm-delete');
    _confirmDeleteButton.addEventListener('click', e => {
        if (_isDeleteTargetTodo) {
            _deleteTodo();
        } else {
            _deleteProject();
        }
        _hideModal(_confirmDeleteButton.parentElement.parentElement);
    });

    const _projectForm = document.getElementById('project-form');
    _projectForm.addEventListener('submit', _submitProjectForm);

    const _todoForm = document.getElementById('todo-form');
    _todoForm.addEventListener('submit', _submitTodoForm);

    return {
        Home,
        refreshProjectsList,
        refreshTodos
    };
})();

export default DOM;
