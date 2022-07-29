import DOM from './dom.js';
import Todo from './todo.js';

DOM.Home.addProject('Test');
DOM.Home.addProject('Proj2');

const todo1 = Todo('test', '2nd june', 'low', 'hi');
DOM.Home.addTodo(todo1);

DOM.listProjects();
DOM.refreshTodos(DOM.Home);
