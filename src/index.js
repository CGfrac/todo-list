import Home from './home.js';
import DisplayController from './displayController.js';

Home.addProject('Test');
Home.addProject('Proj2');

const projectsContainer = document.getElementById('projects-container');
const todosContainer = document.getElementsByClassName('main');
const displayController = DisplayController(projectsContainer, todosContainer);

displayController.displayProjectsTitles(Home.getProjectsTitles());
