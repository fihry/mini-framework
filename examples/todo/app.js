import {
  createElement,
  render,
  update,
  createStore,
  events,
// } from 'https://cdn.jsdelivr.net/npm/mini-framework-z01@1.0.6/dist/mini-framework-z01.min.js';
}from '../../src/mini-framework-z01.js';

const container = document.getElementById('app');
const saved = JSON.parse(localStorage.getItem('todo-app')) || {
  persist: { hydrated: true },
  todos: [],
};

const todos = createStore(saved.todos);
let filter = 'all'; // all, active, completed

const saveTodos = () => {
  const state = {
    persist: { hydrated: true },
    todos: todos.getState(),
  };
  localStorage.setItem('todo-app', JSON.stringify(state));
};

const App = () =>
  createElement('div', { class: 'app-container' }, [
    createElement('h1', { class: 'app-title' }, ['todos']),
    createElement('form', { class: 'todo-form' }, [
      createElement('input', {
        type: 'text',
        class: 'todo-input',
        placeholder: 'What needs to be done?',
        autocomplete: 'off',
      }),
    ]),
    createElement('ul', { class: 'todo-list' }),
    createElement('div', { class: 'footer' }, [
      createElement('span', { class: 'count' }, ['']),
      createElement('div', { class: 'filters' }, [
        createElement('button', { class: 'filter-button active', 'data-filter': 'all' }, ['All']),
        createElement('button', { class: 'filter-button', 'data-filter': 'active' }, ['Active']),
        createElement('button', { class: 'filter-button', 'data-filter': 'completed' }, ['Completed']),
      ]),
      createElement('button', { class: 'clear-completed', style: { display: 'none' } }, ['Clear completed']),
    ]),
  ]);
render(App(), container);

const input = container.querySelector('.todo-input');
const list = container.querySelector('.todo-list');
const countSpan = container.querySelector('.count');

let filteredTodos = [];

// Render todos based on current filter
const renderTodos = () => {
  list.innerHTML = '';
  const allTodos = todos.getState();

  // Filter todos
  filteredTodos = allTodos
    .map((todo, idx) => ({ todo, idx })) // attach original index
    .filter(({ todo }) => {
      if (filter === 'active') return !todo.isCompleted;
      if (filter === 'completed') return todo.isCompleted;
      return true;
    });

  filteredTodos.forEach(({ todo }, i) => {
    const li = createElement('li', { class: 'todo-item' }, [
      createElement('input', {
        type: 'checkbox',
        class: 'todo-checkbox',
        'data-index': i,
        ...(todo.isCompleted ? { checked: true } : {}),
      }),
      createElement('span', {
        class: `todo-text ${todo.isCompleted ? 'completed' : ''}`,
        'data-index': i,
      }, [todo.text]),
      createElement('button', { class: 'delete-todo', 'data-index': i }, ['x']),
    ]);
    render(li, list);
  });

  // Count remaining active todos
  const remaining = allTodos.filter(t => !t.isCompleted).length;
  countSpan.textContent = `${remaining} item${remaining !== 1 ? 's' : ''} left`;

  // Show or hide Clear Completed button depending on if there are completed todos
  const clearBtn = container.querySelector('.clear-completed');
  const completedCount = allTodos.filter(t => t.isCompleted).length;
  if (completedCount > 0) {
    clearBtn.style.display = 'inline-block';
  } else {
    clearBtn.style.display = 'none';
  }
};

// Add new todo on form submit
events.on('submit', '.todo-form', e => {
  e.preventDefault();
  const text = input.value.trim();
  if (text) {
    const newTodo = {
      id: Date.now(),
      text,
      isCompleted: false,
    };
    todos.setState([...todos.getState(), newTodo]);
    input.value = '';
    saveTodos();
    renderTodos();
  }
});

// Checkbox change
events.on('change', '.todo-checkbox', e => {
  const filteredIndex = Number(e.target.getAttribute('data-index'));
  if (isNaN(filteredIndex)) return;

  // Get original index from filteredTodos
  const { idx: originalIndex } = filteredTodos[filteredIndex];
  const allTodos = todos.getState();

  // Toggle isCompleted
  const updated = allTodos.map((todo, i) =>
    i === originalIndex ? { ...todo, isCompleted: !todo.isCompleted } : todo
  );

  todos.setState(updated);
  saveTodos();
  renderTodos();
});

// Filter buttons
events.on('click', '.filter-button', e => {
  filter = e.target.getAttribute('data-filter');
  document.querySelectorAll('.filter-button').forEach(btn =>
    btn.classList.toggle('active', btn.getAttribute('data-filter') === filter)
  );
  renderTodos();
});
// delete one todo
events.on('click', '.delete-todo', e => {
  console.log("hello");
  filter = e.target.getAttribute('data-index');
  const allTodos = todos.getState();
  const updated = allTodos.filter((_, i) => i !== Number(filter));
  todos.setState(updated);
  saveTodos();
  renderTodos();
})

events.on('dblclick', '.todo-text', e => {
  const filteredIndex = Number(e.target.getAttribute('data-index'));
  if (isNaN(filteredIndex)) return;

  const { todo, idx: originalIndex } = filteredTodos[filteredIndex];
  const updatedText = prompt('Edit todo:', todo.text);
  if (updatedText === null) return;

  const trimmedText = updatedText.trim();
  const allTodos = todos.getState();

  let updated;
  if (trimmedText === '') {
    // Remove todo
    updated = allTodos.filter((_, i) => i !== originalIndex);
  } else {
    // Update text
    updated = allTodos.map((t, i) =>
      i === originalIndex ? { ...t, text: trimmedText } : t
    );
  }

  todos.setState(updated);
  saveTodos();
  const renderVirtualTreeFromTodos = (todo)=>{
    createElement('li', { class: 'todo-item' }, [
      createElement('input', {
        type: 'checkbox',
        class: 'todo-checkbox',
        'data-index': i,
        ...(todo.isCompleted ? { checked: true } : {}),
      }),
      createElement('span', {
        class: `todo-text ${todo.isCompleted ? 'completed' : ''}`,
        'data-index': i,
      }, [todo.text]),
      createElement('button', { class: 'delete-todo', 'data-index': i }, ['x']),
    ]);
  }

  const newTree = renderVirtualTreeFromTodos(updated);
  update(newTree, container); 
});

// Clear completed todos
events.on('click', '.clear-completed', () => {
  const updated = todos.getState().filter(todo => !todo.isCompleted);
  todos.setState(updated);
  saveTodos();
  renderTodos();
});

renderTodos();
