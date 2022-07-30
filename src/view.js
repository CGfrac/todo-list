import Home from './home.js';

const view = (() => {
    const _projectsContainer = document.getElementById('projects-container');
    const _todosContainer = document.getElementById('todos-container');

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

    const _generateDetailsContent = (detailsModal, target) => {
        const title = _createDetailsPara('Title', target.getTitle);
        const dueDate = _createDetailsPara('Due date', target.getDueDate);
        const priority = _createDetailsPara('Priority', target.getPriority);
        const description = _createDetailsPara('Description', target.getDescription);

        const detailsElement = document.createElement('div');
        detailsElement.append(title, dueDate, priority, description);

        const editButton = document.getElementById('details-edit');
        detailsModal.firstElementChild.insertBefore(detailsElement, editButton);
    };

    const displayModal = id => {
        const modal = document.getElementById(id);
        modal.style.display = 'block';
    };

    const displayDetailsModal = target => {
        const modal = document.getElementById('modal-details');
        _clearDetailsModal(modal);
        _generateDetailsContent(modal, target);
        displayModal('modal-details');
    };

    const hideModal = modal => {
        modal.style.display = 'none';
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
        editButton.classList.add('todo-edit');
        deleteButton.classList.add('todo-delete');

        element.append(name, date, detailsButton, editButton, deleteButton);

        return element;
    };

    const deleteTodoElement = (todoElement) => {
        todoElement.remove();
    };

    const createDeleteProjectButton = () => {
        const deleteProjectButton = _createElementWithText('button', 'Delete Project');
        deleteProjectButton.id = 'delete-project-button';

        const main = document.querySelector('.main');

        main.appendChild(deleteProjectButton);
    };

    const removeDeleteProjectButton = () => {
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

    const _listProjects = () => {
        for (const project of Home.getProjects()) {
            const li = _createElementWithText('li', project.getTitle());
            li.setAttribute('data-project-id', project.getId());
            li.classList.add('project-title');

            _projectsContainer.appendChild(li);
        }
    };

    const refreshProjectsList = () => {
        _clearProjects();
        _listProjects();
    };

    return {
        Home,
        deleteTodoElement,
        displayModal,
        displayDetailsModal,
        hideModal,
        refreshProjectsList,
        refreshTodos,
        createDeleteProjectButton,
        removeDeleteProjectButton
    };
})();

export default view;
