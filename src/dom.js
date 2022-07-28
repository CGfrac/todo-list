import Home from './home.js';
import Todo from './todo.js';

const DOM = (() => {
    const _projectsContainer = document.getElementById('projects-container');
    const _todosContainer = document.getElementById('todos-container');

    let _currentProject = Home;
    let _isEdit = false;
    let _isEditFromDetails = false;
    let _editTarget;
    let _detailsTarget;

    const _getTodo = (projectId, todoId) => {
        if (_currentProject === Home) {
            return Home.getTodo(todoId);
        } else {
            return Home.getProject(projectId).getTodo(todoId);
        }
    }

    const _clearDetailsModal = () => {
        const detailsModalDiv = document.querySelector('.modal-details').firstElementChild;
        const editButton = document.getElementById('details-edit');

        while (detailsModalDiv.firstElementChild !== editButton) {
            detailsModalDiv.removeChild(detailsModalDiv.firstElementChild);
        }
    };

    const _parseDataId = target => {
        return target.parentElement.getAttribute('data-id').split('-');
    };

    const _createDetailsPara = (prefix, getter) => {
        const para = document.createElement('p');
        para.textContent = `${prefix}: ${getter()}`;
        return para;
    };

    const _generateDetailsContent = () => {
        const title = _createDetailsPara('Title', _detailsTarget.getTitle);
        const dueDate = _createDetailsPara('Due date', _detailsTarget.getDueDate);
        const priority = _createDetailsPara('Priority', _detailsTarget.getPriority);
        const description = _createDetailsPara('Description', _detailsTarget.getDescription);

        const detailsElement = document.createElement('div');
        detailsElement.append(title, dueDate, priority, description);

        const detailsModal = document.querySelector('.modal-details');
        const editButton = document.getElementById('details-edit');
        detailsModal.firstElementChild.insertBefore(detailsElement, editButton);

        return detailsModal;
    };

    const _displayDetailsModal = () => {
        _clearDetailsModal();
        const detailsModal = _generateDetailsContent();
        detailsModal.style.display = 'block';
        _editTarget = _detailsTarget;
    };

    const _createTodoElement = (projectId, todoId) => {
        const todo = _getTodo(projectId, todoId);

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
            const [detailsProjectId, detailsTodoId] = _parseDataId(e.target);
            _detailsTarget = todo;
            _displayDetailsModal()
        });

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.classList.add('todo-edit');
        editButton.addEventListener('click', e => {
            const [editProjectId, editTodoId] = _parseDataId(e.target);
            _isEditFromDetails = false;
            _editTarget = todo;
            _editTodo();
        });

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

    const _displayAddEditTodoModal = () => {
        const modal = document.querySelector('.modal-edit-add');
        modal.style.display = 'block';
    };

    const _displayAddProjectModal = () => {
        const modal = document.querySelector('.modal-add-project');
        modal.style.display = 'block';
    };

    const _hideModal = modal => {
        modal.style.display = 'none';
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
                _displayDetailsModal();
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
        _displayAddEditTodoModal();
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
        _displayAddEditTodoModal();
    });

    const _addProjectButton = document.querySelector('#add-project');
    _addProjectButton.addEventListener('click', _displayAddProjectModal);

    const _detailsModalEditButton = document.getElementById('details-edit');
    _detailsModalEditButton.addEventListener('click', e => {
        _isEditFromDetails = true;
        _editTodo();
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
