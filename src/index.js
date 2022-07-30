import DOM from './dom.js';
import Todo from './todo.js';
import Controller from './controller.js'

DOM.Home.addProject('Test');
DOM.Home.addProject('Proj2');

const todo1 = Todo('test', '2nd june', 'low', 'hi');
DOM.Home.addTodo(todo1);

DOM.refreshProjectsList();
DOM.refreshTodos(DOM.Home);
