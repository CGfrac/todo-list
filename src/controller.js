import Home from './home.js';
import Todo from './todo.js';
import View from './view.js';

const controller = (() => {
    let _currentProject = Home;
    let _isEdit = false;
    let _isEditFromDetails = false;
    let _isDeleteTargetTodo = false;
    let _deleteTodoTarget;
    let _editTarget;

    const _parseDataId = target => {
        return target.getAttribute('data-id').split('-');
    };

    const _deleteTodo = () => {
        const [projectId, todoId] = _parseDataId(_deleteTodoTarget);
        Home.getProject(projectId).deleteTodo(todoId);
        View.deleteTodoElement(_deleteTodoTarget);
    };

    const _deleteProject = () => {
        Home.deleteProject(_currentProject.getId());

        const main = document.querySelector('.main');
        const deleteProjectButton = main.lastElementChild;
        main.removeChild(deleteProjectButton);

        _currentProject = Home;
        View.refreshTodos(Home);
        View.refreshProjectsList();
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
                View.displayDetailsModal(_editTarget);
            }
        }

        View.refreshTodos(_currentProject);

        form.reset();

        const modal = document.getElementById('modal-edit-add');
        View.hideModal(modal);
    };

    const _submitProjectForm = e => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);

        const title = formData.get('project-name');
        Home.addProject(title);

        View.refreshProjectsList();

        form.reset();

        const modal = document.getElementById('modal-add-project');
        View.hideModal(modal);
    };

    const _homeHeader = document.getElementById('home');
    _homeHeader.addEventListener('click', () => {
        _currentProject = Home;
        View.refreshTodos(Home);
        if (document.getElementById('delete-project-button')) {
            View.removeDeleteProjectButton();
        }
    });

    const _cancelButtons = document.querySelectorAll('.cancel');
    _cancelButtons.forEach(button => button.addEventListener('click', () => {
        let parent = button.parentElement;
        while (parent.classList[0] !== ('modal')) {
            parent = parent.parentElement;
        }
        View.hideModal(parent);
    }));

    const _addTodoButton = document.querySelector('#add-todo');
    _addTodoButton.addEventListener('click', () => {
        _isEdit = false;
        View.displayModal('modal-edit-add');
    });

    const _addProjectButton = document.querySelector('#add-project');
    _addProjectButton.addEventListener('click', () => View.displayModal('modal-add-project'));

    const _detailsModalEditButton = document.getElementById('details-edit');
    _detailsModalEditButton.addEventListener('click', e => {
        _isEdit = true;
        _isEditFromDetails = true;
        View.updateTodoElement(_editTarget);
    });

    const _confirmDeleteButton = document.getElementById('confirm-delete');
    _confirmDeleteButton.addEventListener('click', () => {
        if (_isDeleteTargetTodo) {
            _deleteTodo();
        } else {
            _deleteProject();
        }
        const todoElement = _confirmDeleteButton.parentElement.parentElement;
        View.hideModal(todoElement);
    });

    const _projectForm = document.getElementById('project-form');
    _projectForm.addEventListener('submit', _submitProjectForm);

    const _todoForm = document.getElementById('todo-form');
    _todoForm.addEventListener('submit', _submitTodoForm);

    const _grabTodoFromElement = todoElement => {
        const [projectId, todoId] = _parseDataId(todoElement);
        return Home.getProject(projectId).getTodo(todoId);
    };

    const _setButtonsListeners = (buttonClass, listener) => {
        const buttons = document.querySelectorAll(`.${buttonClass}`);
        buttons.forEach(button => {
            const todoElement = button.parentElement;
            button.addEventListener('click', () => listener(todoElement));
        });
    };

    const _setTodosListeners = () => {
        const detailsButtonsListener = todoElement => {
            const todo = _grabTodoFromElement(todoElement);
            _editTarget = todo;
            View.displayDetailsModal(todo);
        }
        _setButtonsListeners('todo-details', detailsButtonsListener);

        const editButtonsListener = todoElement => {
            const todo = _grabTodoFromElement(todoElement);
            _isEdit = true;
            _isEditFromDetails = false;
            _editTarget = todo;
            View.updateTodoElement(_editTarget);
        }
        _setButtonsListeners('todo-edit', editButtonsListener);

        const deleteButtonsListener = todoElement => {
            _isDeleteTargetTodo = true;
            _deleteTodoTarget = todoElement;
            View.displayModal('modal-delete');
        }
        _setButtonsListeners('todo-delete', deleteButtonsListener);
    };

    const _setDeleteProjectButtonListener = () => {
        const deleteProjectButton = document.getElementById('delete-project-button');
        deleteProjectButton.addEventListener('click', () => {
            _isDeleteTargetTodo = false;
            View.displayModal('modal-delete');
        });
    };

    const _setProjectsListeners = () => {
        const listItems = document.querySelectorAll('.project-title');

        listItems.forEach(li => {
            li.addEventListener('click', e => {
                const projectId = e.target.getAttribute('data-project-id');
                const project = Home.getProject(projectId);
                _currentProject = project;

                View.refreshTodos(project);

                if (!document.getElementById('delete-project-button')) {
                    View.createDeleteProjectButton();
                    _setDeleteProjectButtonListener();
                }
            }
        )});
    };

    const _setContainerObserver = (containerId, fn) => {
        const container = document.getElementById(containerId);
        const observer = new MutationObserver(fn);
        observer.observe(container, {childList: true});
    };

    _setContainerObserver('todos-container', _setTodosListeners);
    _setContainerObserver('projects-container', _setProjectsListeners);
})();

export default controller;
