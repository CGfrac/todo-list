import View from './view.js';
import Todo from './todo.js';
import Controller from './controller.js'

View.Home.addProject('Test');
View.Home.addProject('Proj2');

const todo1 = Todo('test', '2nd june', 'low', 'hi');
View.Home.addTodo(todo1);

View.refreshProjectsList();
View.refreshTodos(View.Home);
