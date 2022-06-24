/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/home.js":
/*!*********************!*\
  !*** ./src/home.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _project_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./project.js */ "./src/project.js");


const home = (() => {
    const _projects = {};
    const _proto = (0,_project_js__WEBPACK_IMPORTED_MODULE_0__["default"])('home');

    const getProject = title => _projects[title];
    const getProjectsTitles = () => Object.keys(_projects);

    const addProject = (title) => {
        const project = (0,_project_js__WEBPACK_IMPORTED_MODULE_0__["default"])(title);
        _projects[title] = project;
    };

    const deleteProject = title => {
        delete _projects[title];
    };

    return Object.assign({}, _proto, {
        getProject,
        getProjectsTitles,
        addProject,
        deleteProject
    });
})();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (home);


/***/ }),

/***/ "./src/project.js":
/*!************************!*\
  !*** ./src/project.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const project = title => {
    const _title = title;
    const _todos = {};

    const getTitle = () => _title;
    const getTodo = title => _todos[title];
    const getTodos = () => Object.values(_todos);
    const getTodosTitles = () => Object.keys(_todos);

    const addTodo = (title, todo) => {
        _todos[title] = todo;
    }

    const deleteTodo = title => {
        delete _todos[title];
    }

    return {
        getTitle,
        getTodo,
        getTodos,
        getTodosTitles,
        addTodo,
        deleteTodo
    }
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (project);


/***/ }),

/***/ "./src/todo.js":
/*!*********************!*\
  !*** ./src/todo.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const todo = (title, dueDate, priority, description) => {
    let _title = title;
    let _dueDate = dueDate;
    let _priority = priority;
    let _description = description || '';

    const createTodoElement = () => {
        const element = document.createElement('div');
        element.classList.add('todo', _priority);
        element.setAttribute('data-todo', _title);

        const name = document.createElement('p');
        name.textContent = _title;
        element.appendChild(name);

        const date = document.createElement('p');
        date.textContent = _dueDate;
        element.appendChild(date);

        return element;
    };

    return {
        createTodoElement
    };
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (todo);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _home_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./home.js */ "./src/home.js");
/* harmony import */ var _todo_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./todo.js */ "./src/todo.js");



const projectsContainer = document.getElementById('projects-container');
const todosContainer = document.getElementById('todos-container');

function displayProjectsTitles (projects) {
    for (const project of projects) {
        const li = document.createElement('li');
        li.setAttribute('data-project', project);
        li.textContent = project;
        projectsContainer.appendChild(li);
    }
}

_home_js__WEBPACK_IMPORTED_MODULE_0__["default"].addProject('Test');
_home_js__WEBPACK_IMPORTED_MODULE_0__["default"].addProject('Proj2');

const todo1 = (0,_todo_js__WEBPACK_IMPORTED_MODULE_1__["default"])('test', '2nd june', 'low', 'hi');
_home_js__WEBPACK_IMPORTED_MODULE_0__["default"].addTodo(todo1.title, todo1);

displayProjectsTitles(_home_js__WEBPACK_IMPORTED_MODULE_0__["default"].getProjectsTitles());

for (const todo of _home_js__WEBPACK_IMPORTED_MODULE_0__["default"].getTodos()) {
    todosContainer.appendChild(todo.createTodoElement());
}

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBbUM7O0FBRW5DO0FBQ0E7QUFDQSxtQkFBbUIsdURBQU87O0FBRTFCO0FBQ0E7O0FBRUE7QUFDQSx3QkFBd0IsdURBQU87QUFDL0I7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLENBQUM7O0FBRUQsaUVBQWUsSUFBSSxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7QUMxQnBCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpRUFBZSxPQUFPLEVBQUM7Ozs7Ozs7Ozs7Ozs7OztBQzNCdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUVBQWUsSUFBSSxFQUFDOzs7Ozs7O1VDM0JwQjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7OztBQ042QjtBQUNBOztBQUU3QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsMkRBQWU7QUFDZiwyREFBZTs7QUFFZixjQUFjLG9EQUFJO0FBQ2xCLHdEQUFZOztBQUVaLHNCQUFzQixrRUFBc0I7O0FBRTVDLG1CQUFtQix5REFBYTtBQUNoQztBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2hvbWUuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3Byb2plY3QuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3RvZG8uanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQcm9qZWN0IGZyb20gJy4vcHJvamVjdC5qcyc7XG5cbmNvbnN0IGhvbWUgPSAoKCkgPT4ge1xuICAgIGNvbnN0IF9wcm9qZWN0cyA9IHt9O1xuICAgIGNvbnN0IF9wcm90byA9IFByb2plY3QoJ2hvbWUnKTtcblxuICAgIGNvbnN0IGdldFByb2plY3QgPSB0aXRsZSA9PiBfcHJvamVjdHNbdGl0bGVdO1xuICAgIGNvbnN0IGdldFByb2plY3RzVGl0bGVzID0gKCkgPT4gT2JqZWN0LmtleXMoX3Byb2plY3RzKTtcblxuICAgIGNvbnN0IGFkZFByb2plY3QgPSAodGl0bGUpID0+IHtcbiAgICAgICAgY29uc3QgcHJvamVjdCA9IFByb2plY3QodGl0bGUpO1xuICAgICAgICBfcHJvamVjdHNbdGl0bGVdID0gcHJvamVjdDtcbiAgICB9O1xuXG4gICAgY29uc3QgZGVsZXRlUHJvamVjdCA9IHRpdGxlID0+IHtcbiAgICAgICAgZGVsZXRlIF9wcm9qZWN0c1t0aXRsZV07XG4gICAgfTtcblxuICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBfcHJvdG8sIHtcbiAgICAgICAgZ2V0UHJvamVjdCxcbiAgICAgICAgZ2V0UHJvamVjdHNUaXRsZXMsXG4gICAgICAgIGFkZFByb2plY3QsXG4gICAgICAgIGRlbGV0ZVByb2plY3RcbiAgICB9KTtcbn0pKCk7XG5cbmV4cG9ydCBkZWZhdWx0IGhvbWU7XG4iLCJjb25zdCBwcm9qZWN0ID0gdGl0bGUgPT4ge1xuICAgIGNvbnN0IF90aXRsZSA9IHRpdGxlO1xuICAgIGNvbnN0IF90b2RvcyA9IHt9O1xuXG4gICAgY29uc3QgZ2V0VGl0bGUgPSAoKSA9PiBfdGl0bGU7XG4gICAgY29uc3QgZ2V0VG9kbyA9IHRpdGxlID0+IF90b2Rvc1t0aXRsZV07XG4gICAgY29uc3QgZ2V0VG9kb3MgPSAoKSA9PiBPYmplY3QudmFsdWVzKF90b2Rvcyk7XG4gICAgY29uc3QgZ2V0VG9kb3NUaXRsZXMgPSAoKSA9PiBPYmplY3Qua2V5cyhfdG9kb3MpO1xuXG4gICAgY29uc3QgYWRkVG9kbyA9ICh0aXRsZSwgdG9kbykgPT4ge1xuICAgICAgICBfdG9kb3NbdGl0bGVdID0gdG9kbztcbiAgICB9XG5cbiAgICBjb25zdCBkZWxldGVUb2RvID0gdGl0bGUgPT4ge1xuICAgICAgICBkZWxldGUgX3RvZG9zW3RpdGxlXTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBnZXRUaXRsZSxcbiAgICAgICAgZ2V0VG9kbyxcbiAgICAgICAgZ2V0VG9kb3MsXG4gICAgICAgIGdldFRvZG9zVGl0bGVzLFxuICAgICAgICBhZGRUb2RvLFxuICAgICAgICBkZWxldGVUb2RvXG4gICAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgcHJvamVjdDtcbiIsImNvbnN0IHRvZG8gPSAodGl0bGUsIGR1ZURhdGUsIHByaW9yaXR5LCBkZXNjcmlwdGlvbikgPT4ge1xuICAgIGxldCBfdGl0bGUgPSB0aXRsZTtcbiAgICBsZXQgX2R1ZURhdGUgPSBkdWVEYXRlO1xuICAgIGxldCBfcHJpb3JpdHkgPSBwcmlvcml0eTtcbiAgICBsZXQgX2Rlc2NyaXB0aW9uID0gZGVzY3JpcHRpb24gfHwgJyc7XG5cbiAgICBjb25zdCBjcmVhdGVUb2RvRWxlbWVudCA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3RvZG8nLCBfcHJpb3JpdHkpO1xuICAgICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZSgnZGF0YS10b2RvJywgX3RpdGxlKTtcblxuICAgICAgICBjb25zdCBuYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgICAgICBuYW1lLnRleHRDb250ZW50ID0gX3RpdGxlO1xuICAgICAgICBlbGVtZW50LmFwcGVuZENoaWxkKG5hbWUpO1xuXG4gICAgICAgIGNvbnN0IGRhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgICAgIGRhdGUudGV4dENvbnRlbnQgPSBfZHVlRGF0ZTtcbiAgICAgICAgZWxlbWVudC5hcHBlbmRDaGlsZChkYXRlKTtcblxuICAgICAgICByZXR1cm4gZWxlbWVudDtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgY3JlYXRlVG9kb0VsZW1lbnRcbiAgICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgdG9kbztcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IEhvbWUgZnJvbSAnLi9ob21lLmpzJztcbmltcG9ydCBUb2RvIGZyb20gJy4vdG9kby5qcyc7XG5cbmNvbnN0IHByb2plY3RzQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3RzLWNvbnRhaW5lcicpO1xuY29uc3QgdG9kb3NDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndG9kb3MtY29udGFpbmVyJyk7XG5cbmZ1bmN0aW9uIGRpc3BsYXlQcm9qZWN0c1RpdGxlcyAocHJvamVjdHMpIHtcbiAgICBmb3IgKGNvbnN0IHByb2plY3Qgb2YgcHJvamVjdHMpIHtcbiAgICAgICAgY29uc3QgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgICAgICBsaS5zZXRBdHRyaWJ1dGUoJ2RhdGEtcHJvamVjdCcsIHByb2plY3QpO1xuICAgICAgICBsaS50ZXh0Q29udGVudCA9IHByb2plY3Q7XG4gICAgICAgIHByb2plY3RzQ29udGFpbmVyLmFwcGVuZENoaWxkKGxpKTtcbiAgICB9XG59XG5cbkhvbWUuYWRkUHJvamVjdCgnVGVzdCcpO1xuSG9tZS5hZGRQcm9qZWN0KCdQcm9qMicpO1xuXG5jb25zdCB0b2RvMSA9IFRvZG8oJ3Rlc3QnLCAnMm5kIGp1bmUnLCAnbG93JywgJ2hpJyk7XG5Ib21lLmFkZFRvZG8odG9kbzEudGl0bGUsIHRvZG8xKTtcblxuZGlzcGxheVByb2plY3RzVGl0bGVzKEhvbWUuZ2V0UHJvamVjdHNUaXRsZXMoKSk7XG5cbmZvciAoY29uc3QgdG9kbyBvZiBIb21lLmdldFRvZG9zKCkpIHtcbiAgICB0b2Rvc0NvbnRhaW5lci5hcHBlbmRDaGlsZCh0b2RvLmNyZWF0ZVRvZG9FbGVtZW50KCkpO1xufVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9