import {
  createElement,
  render,
  createStore,
  createRouter,
} from '../../src/mini-framework-z01.js';

const container = document.getElementById('app');
const saved = JSON.parse(localStorage.getItem('todo-app')) || {
  persist: { hydrated: false },
  todos: [],
};

const todos = createStore(saved.todos);
let filter = 'all'; // all, active, completed
const router = createRouter();
router.init();
router.addRoute('/', () => {
  filter = 'all';
  rerender();
});
router.addRoute('/active', () => {
  filter = 'active';
  rerender();
});
router.addRoute('/completed', () => {
  filter = 'completed';
  rerender();
})


const saveTodos = () => {
  const state = {
    persist: { hydrated: true },
    todos: todos.getState(),
  };
  localStorage.setItem('todo-app', JSON.stringify(state));
};

const renderTodoItem = (todo, i) =>
  createElement(
    'li',
    { class: 'todo-item', key: todo.id },
    [
      createElement('input', {
        type: 'checkbox',
        class: 'todo-checkbox',
        'data-index': i,
        onchange: completed,
        ...(todo.isCompleted ? { checked: true } : {}),
      }),
      createElement(
        'span',
        {
          class: `todo-text ${todo.isCompleted ? 'completed' : ''}`,
          'data-index': i,
          ondblclick: editTodo,
        },
        [todo.text]
      ),
      createElement('button', { class: 'delete-todo', 'data-index': i, onclick: deleteTodo }, ['×']),
    ]
  );

const App = () => {
  const allTodos = todos.getState();

  const filteredTodos = allTodos
    .map((todo, idx) => ({ todo, idx }))
    .filter(({ todo }) => {
      if (filter === 'all') return true;
      if (filter === 'active') return !todo.isCompleted;
      if (filter === 'completed') return todo.isCompleted;
    });

  const listItems = filteredTodos.map(({ todo, idx }) => renderTodoItem(todo, idx));

  const remaining = allTodos.filter(t => !t.isCompleted).length;
  const completedCount = allTodos.filter(t => t.isCompleted).length;


  return createElement('div', { class: 'app-container' }, [
    createElement('h1', { class: 'app-title' }, ['todos']),
    createElement(
      'form',
      { class: 'todo-form', key: 'todo-form', onsubmit: submitTodo },
      [
        createElement('input', {
          type: 'text',
          class: 'todo-input',
          placeholder: 'What needs to be done?',
          autocomplete: 'off',
          name: 'todo-input',
        }),
      ]
    ),
    createElement('ul', { class: 'todo-list' }, listItems),
    createElement('div', { class: 'footer' }, [
      createElement('span', { class: 'count' }, [
        `${remaining} item${remaining !== 1 ? 's' : ''} left`,
      ]),
      createElement('div', { class: 'filters' }, [
        createElement(
          'button',
          {
            class: `filter-button ${filter === 'all' ? 'active' : ''}`,
            'data-filter': 'all',
            type: 'button',
            onclick: filterTodos,
          },
          ['All']
        ),
        createElement(
          'button',
          {
            class: `filter-button ${filter === 'active' ? 'active' : ''}`,
            'data-filter': 'active',
            type: 'button',
            onclick: filterTodos,
          },
          ['Active']
        ),
        createElement(
          'button',
          {
            class: `filter-button ${filter === 'completed' ? 'active' : ''}`,
            'data-filter': 'completed',
            type: 'button',
            onclick: filterTodos,
          },
          ['Completed'],
        ),
      ]),
      createElement(
        'button',
        {
          class: 'clear-completed',
          style: { display: completedCount > 0 ? 'inline-block' : 'none' },
          type: 'button',
          onclick: clearCompleted,
        },
        ['Clear completed']
      ),
    ]),
  ]);
};

const rerender = () => {
  render(App(), container);
};

todos.subscribe((() => {
  saveTodos();
  rerender();
}));

// Event Handlers
function submitTodo(e) {
  e.preventDefault();
  const input = container.querySelector('.todo-input');
  const text = input.value.trim();
  if (text) {
    todos.setState([...todos.getState(), { id: Date.now(), text, isCompleted: false }]);
    input.value = '';
    saveTodos();
    rerender();
  }
}

function completed(e) {
  const index = Number(e.target.getAttribute('data-index'));
  const updated = todos.getState().map((todo, i) =>
    i === index ? { ...todo, isCompleted: !todo.isCompleted } : todo
  );
  todos.setState(updated);
};

function filterTodos(e) {
  filter = e.target.getAttribute('data-filter');
  filter === 'all' ? router.navigate('/') :
    router.navigate(`/${filter}`);
};

function deleteTodo(e) {
  const index = Number(e.target.getAttribute('data-index'));
  const updated = todos.getState().filter((_, i) => i !== index);
  todos.setState(updated);
}

function editTodo(e) {
  const index = Number(e.target.getAttribute('data-index'));
  const current = todos.getState()[index];
  const updatedText = prompt('Edit todo:', current.text)?.trim();
  if (updatedText === '') {
    todos.setState(todos.getState().filter((_, i) => i !== index));
  } else if (updatedText !== null) {
    todos.setState(
      todos.getState().map((t, i) => (i === index ? { ...t, text: updatedText } : t))
    );
  }
};

function clearCompleted(e) {
  todos.setState(todos.getState().filter(todo => !todo.isCompleted));
};

// Initial Render
rerender();