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

function listProjects(project) {
    const li = document.createElement('li');
    li.setAttribute('data-project', project);
    li.textContent = project;

    createProjectListener(li);

    projectsContainer.appendChild(li);
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

for (const project of Home.getProjectsTitles()) {
    listProjects(project);
}

listAllTodos();
