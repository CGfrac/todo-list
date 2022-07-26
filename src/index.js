import Home from './home.js';
import Todo from './todo.js';

const projectsContainer = document.getElementById('projects-container');
const todosContainer = document.getElementById('todos-container');

function clearTodos() {
    while (todosContainer.lastChild) {
        todosContainer.removeChild(todosContainer.lastChild);
    }
}

function listTodos(project) {
    for (const todo of project.getTodos()) {
        const todoElement = todo.createTodoElement();
        todosContainer.appendChild(todoElement);
    }
}

function listAllTodos() {
    listTodos(Home);

    for (const project of Home.getProjects()) {
        listTodos(project);
    }
}

function createProjectListener(li) {
    li.addEventListener('click', e => {
        const projectTitle = e.target.textContent;
        const project = Home.getProject(projectTitle);

        clearTodos();
        listTodos(project);
    });
}

function listProjects() {
    for (const project of Home.getProjectsTitles()) {
        const li = document.createElement('li');
        li.setAttribute('data-project', project);
        li.textContent = project;

        createProjectListener(li);

        projectsContainer.appendChild(li);
    }
}

const homeHeader = document.getElementById('home');
homeHeader.addEventListener('click', () => {
    clearTodos();
    listAllTodos();
});

Home.addProject('Test');
Home.addProject('Proj2');

const todo1 = Todo('test', '2nd june', 'low', 'hi');
Home.addTodo(todo1.getTitle(), todo1);

listProjects();
listAllTodos();

function displayAddTodoModal() {
    const modal = document.querySelector('.modal-edit-add');
    modal.style.display = 'block';
}

const addTodoButton = document.querySelector('#add-todo');
addTodoButton.addEventListener('click', displayAddTodoModal);

function displayAddProjectModal() {
    const modal = document.querySelector('.modal-add-project');
    modal.style.display = 'block';
}

const addProjectButton = document.querySelector('#add-project');
addProjectButton.addEventListener('click', displayAddProjectModal);

function hideModal(e) {
    const button = e.target;
    let parent = button.parentElement;
    while (parent.classList[0] !== ('modal')) {
        parent = parent.parentElement;
    }
    parent.style.display = 'none';
}

const cancelButtons = document.querySelectorAll('.cancel');
cancelButtons.forEach(button => button.addEventListener('click', hideModal));
