import Home from './home.js';
import Todo from './todo.js';
import DOM from './dom.js';

const controller = (() => {
    let _currentProject = Home;
    let _isEdit = false;
    let _isEditFromDetails = false;
    let _isDeleteTargetTodo = false;
    let _deleteTodoTarget;
    let _detailsTarget;
    let _editTarget;

    const _parseDataId = target => {
        return target.getAttribute('data-id').split('-');
    };

    const _deleteTodo = () => {
        const [projectId, todoId] = _parseDataId(_deleteTodoTarget);
        Home.getProject(projectId).deleteTodo(todoId);
        DOM.deleteTodoElement(_deleteTodoTarget);
    };

    const _deleteProject = () => {
        Home.deleteProject(_currentProject.getId());

        const main = document.querySelector('.main');
        const deleteProjectButton = main.lastElementChild;
        main.removeChild(deleteProjectButton);

        _currentProject = Home;
        DOM.refreshTodos(Home);
        DOM.refreshProjectsList();
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
                DOM.displayDetailsModal(_editTarget);
            }
        }

        DOM.refreshTodos(Home);

        form.reset();

        const modal = document.getElementById('modal-edit-add');
        DOM.hideModal(modal);
    };

    const _submitProjectForm = e => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);

        const title = formData.get('project-name');
        Home.addProject(title);

        DOM.refreshProjectsList();

        form.reset();

        const modal = document.getElementById('modal-add-project');
        DOM.hideModal(modal);
    };

    const _homeHeader = document.getElementById('home');
    _homeHeader.addEventListener('click', () => {
        _currentProject = Home;
        DOM.refreshTodos(Home);
        if (document.getElementById('delete-project-button')) {
            DOM.removeDeleteProjectButton();
        }
    });

    const _cancelButtons = document.querySelectorAll('.cancel');
    _cancelButtons.forEach(button => button.addEventListener('click', () => {
        let parent = button.parentElement;
        while (parent.classList[0] !== ('modal')) {
            parent = parent.parentElement;
        }
        DOM.hideModal(parent);
    }));

    const _addTodoButton = document.querySelector('#add-todo');
    _addTodoButton.addEventListener('click', () => {
        _isEdit = false;
        DOM.displayModal('modal-edit-add');
    });

    const _addProjectButton = document.querySelector('#add-project');
    _addProjectButton.addEventListener('click', () => DOM.displayModal('modal-add-project'));

    const _detailsModalEditButton = document.getElementById('details-edit');
    _detailsModalEditButton.addEventListener('click', e => {
        _isEditFromDetails = true;
        _editTodo();
    });

    const _confirmDeleteButton = document.getElementById('confirm-delete');
    _confirmDeleteButton.addEventListener('click', () => {
        if (_isDeleteTargetTodo) {
            _deleteTodo();
        } else {
            _deleteProject();
        }
        const todoElement = _confirmDeleteButton.parentElement.parentElement;
        DOM.hideModal(todoElement);
    });

    const _projectForm = document.getElementById('project-form');
    _projectForm.addEventListener('submit', _submitProjectForm);

    const _todoForm = document.getElementById('todo-form');
    _todoForm.addEventListener('submit', _submitTodoForm);

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
        DOM.displayModal('modal-edit-add');
    };

    const _setTodosListeners = () => {
        const detailsButtons = document.querySelectorAll('.todo-details');
        detailsButtons.forEach(button => {
            const [projectId, todoId] = _parseDataId(button.parentElement);
            const todo = Home.getProject(projectId).getTodo(todoId);
            button.addEventListener('click', () => {
                _detailsTarget = todo;
                _editTarget = todo;
                DOM.displayDetailsModal(todo);
            })
        });

        const editButtons = document.querySelectorAll('.todo-edit');
        editButtons.forEach(button => {
            const [projectId, todoId] = _parseDataId(button.parentElement);
            const todo = Home.getProject(projectId).getTodo(todoId);
            button.addEventListener('click', () => {
                _isEditFromDetails = false;
                _editTarget = todo;
                _editTodo();
            })
        });

        const deleteButtons = document.querySelectorAll('.todo-delete');
        deleteButtons.forEach(button => {
            const parent = button.parentElement;
            button.addEventListener('click', () => {
                _isDeleteTargetTodo = true;
                _deleteTodoTarget = parent;
                DOM.displayModal('modal-delete');
            })
        });
    };

    const _setDeleteProjectButtonListener = () => {
        const deleteProjectButton = document.getElementById('delete-project-button');
        deleteProjectButton.addEventListener('click', () => {
            _isDeleteTargetTodo = false;
            DOM.displayModal('modal-delete');
        });
    };

    const _setProjectsListeners = () => {
        const listItems = document.querySelectorAll('.project-title');

        listItems.forEach(li => {
            li.addEventListener('click', e => {
                const projectId = e.target.getAttribute('data-project-id');
                const project = Home.getProject(projectId);
                _currentProject = project;

                DOM.refreshTodos(project);

                if (!document.getElementById('delete-project-button')) {
                    DOM.createDeleteProjectButton();
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
