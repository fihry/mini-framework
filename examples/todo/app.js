import MiniFramework from 'mini-framework-z01';
const { createElement, render } = MiniFramework;
const App = () => {
  return createElement('div', { class: 'app' }, [
    createElement('h1', { class: 'title' }, ['Todo List']),
    createElement('input', { type: 'text', placeholder: 'Add a new todo' }),
    createElement('button', { class: 'add-button' }, ['Add']),
    createElement('ul', { class: 'todo-list' }),
  ]);
};

const container = document.getElementById('app');
render(App(), container);
const todos = [];
const addButton = document.querySelector('.add-button');
const inputField = document.querySelector('input[type="text"]');
const todoList = document.querySelector('.todo-list');
addButton.addEventListener('click', () => {
  const todoText = inputField.value;
  if (todoText) {
    todos.push(todoText);
    inputField.value = '';
    renderTodos();
  }
});

const renderTodos = () => {
  todoList.innerHTML = '';
  todos.forEach(todo => {
    const li = createElement('li', {}, [todo]);
    render(li, todoList);
  }
  );
};