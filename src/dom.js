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

    const _createDetailsPara = (prefix, getter) => {
        const para = document.createElement('p');
        para.textContent = `${prefix}: ${getter()}`;
        return para;
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

        _clearTodos()

        if (_currentProject === Home) {
            Home.deleteTodo(todoId);
            listAllTodos();
        } else {
            Home.getProject(projectId).deleteTodo(todoId);
            _listTodos(projectId);
        }
    };

    const _clearTodos = () => {
        while (_todosContainer.lastChild) {
            _todosContainer.removeChild(_todosContainer.lastChild);
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

        const name = document.createElement('p');
        name.textContent = todo.getTitle();

        const date = document.createElement('p');
        date.textContent = todo.getDueDate();

        const detailsButton = document.createElement('button');
        detailsButton.textContent = 'Details';
        detailsButton.classList.add('todo-details');
        detailsButton.addEventListener('click', e => {
            _detailsTarget = todo;
            _displayModal('modal-details');
        });

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.classList.add('todo-edit');
        editButton.addEventListener('click', e => {
            _isEditFromDetails = false;
            _editTarget = todo;
            _editTodo();
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
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
        const deleteProjectButton = document.createElement('button');
        deleteProjectButton.textContent = 'Delete Project';

        const main = document.querySelector('.main');

        deleteProjectButton.addEventListener('click', () => {
            _isDeleteTargetTodo = false;
            _displayModal('modal-delete');
        });

        main.appendChild(deleteProjectButton);
    };

    const _listTodos = project => {
        for (const [id, todo] of project.getTodos()) {
            const todoElement = _createTodoElement(project.getId(), id, todo);
            _todosContainer.appendChild(todoElement);
        }
        if (_currentProject !== Home) {
            _createDeleteProjectButton();
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

    const listProjects = () => {
        for (const project of Home.getProjects()) {
            const li = document.createElement('li');
            li.setAttribute('data-project-id', project.getId());
            li.textContent = project.getTitle();

            _createProjectListener(li);

            _projectsContainer.appendChild(li);
        }
    };

    const _clearProjects = () => {
        while (_projectsContainer.lastChild) {
            _projectsContainer.removeChild(_projectsContainer.lastChild);
        }
    };

    const _deleteProject = () => {
        Home.deleteProject(_currentProject.getId());

        const main = document.querySelector('.main');
        const deleteProjectButton = main.lastElementChild;
        main.removeChild(deleteProjectButton);

        _currentProject = Home;
        _clearTodos();
        listAllTodos();
        _clearProjects();
        listProjects();
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

    const _submitProjectForm = e => {
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

    const _homeHeader = document.getElementById('home');
    _homeHeader.addEventListener('click', () => {
        _currentProject = Home;
        _clearTodos();
        listAllTodos();
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
        listProjects,
        listAllTodos
    };
})();

export default DOM;
