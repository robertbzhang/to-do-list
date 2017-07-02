(function() {
'use strict';

angular.module('ToDoListApp', [])
.controller('ToDoListAddController', ToDoListAddController)
.controller('ToDoListController', ToDoListController)
.controller('DoneListController', DoneListController)
.service('ToDoListService', ToDoListService);

ToDoListAddController.$inject = ['ToDoListService'];
function ToDoListAddController(ToDoListService) {
  var todoList = this;

  todoList.todoTask = "";

  todoList.addTodo = function () {
    ToDoListService.addTodo(todoList.todoTask);
    todoList.todoTask = "";
  }
}

ToDoListController.$inject = ['ToDoListService'];
function ToDoListController(ToDoListService) {
  var todoList = this;

  todoList.items = ToDoListService.getTodos();

  todoList.removeTodo = function (todoIndex) {
    ToDoListService.removeTodo(todoIndex);
  }
}

DoneListController.$inject = ['ToDoListService'];
function DoneListController(ToDoListService) {
  var doneList = this;

  doneList.items = ToDoListService.getDones();
}

function ToDoListService() {
  var service = this;

  var todos = [];
  var dones = [];


  service.addTodo = function (todo) {
    if (todos.indexOf(todo) === -1 && todo.length > 0) {
      todos.push(todo);
    }
  };

  service.removeTodo = function (todoIndex) {
    dones.push(todos[todoIndex]);
    todos.splice(todoIndex, 1);
  };

  service.getTodos = function () {
    return todos;
  }
  service.getDones = function () {
    return dones;
  }

}


})();
