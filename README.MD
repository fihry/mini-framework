# Mini Framework

![Mini Framework](https://img.shields.io/badge/Mini-Framework-blue)
![Version](https://img.shields.io/badge/version-1.2.0-green)
![License](https://img.shields.io/badge/license-MIT-orange)

A lightweight, powerful JavaScript framework for building modern web applications with minimal overhead.

## Features

- 🚀 **Virtual DOM** - Efficient DOM manipulation with diffing algorithm
- 🔄 **State Management** - Simple and reactive state handling
- 🗺️ **Client-side Routing** - Seamless navigation without page reloads
- 📡 **Event System** - Flexible publish/subscribe event architecture
- ⚡ **Performance Focused** - Optimized rendering with minimal DOM operations
- 🧩 **Component-Based** - Build reusable, composable UI components

## Installation

### NPM

```bash
npm install mini-framework-z01
```

### CDN

```html
<script src="https://cdn.jsdelivr.net/npm/mini-framework-z01@1.0.4/dist/mini-framework-z01.min.js"></script>
```

## Quick Start

```javascript
import framework from 'mini-framework-z01';
// or 
import framework from 'https://cdn.jsdelivr.net/npm/mini-framework-z01/dist/mini-framework-z01.min.js';

// Create a virtual DOM element
const app = framework.createElement('div', { id: 'app' }, [
  framework.createElement('h1', {}, 'Hello, Mini Framework!')
]);

// Render to the DOM
framework.render(app, document.body);
```

## Core Concepts

### Virtual DOM

The framework uses a virtual DOM to minimize actual DOM manipulations:

```javascript
// Create elements
const element = framework.createElement('div', { class: 'container' }, [
  framework.createElement('p', {}, 'Hello World')
]);

// Render to DOM
framework.render(element, document.getElementById('app'));

// Update efficiently
const newElement = framework.createElement('div', { class: 'container' }, [
  framework.createElement('p', {}, 'Updated content')
]);
framework.update(newElement, document.getElementById('app'));
```

### DOM Manipulation

The framework provides direct DOM manipulation methods:

```javascript
// Remove an element from the DOM
const elementToRemove = document.getElementById('old-element');
framework.removeElement(elementToRemove);

// Replace an element with a new one
const oldElement = document.getElementById('old-element');
const newElement = document.createElement('div');
newElement.textContent = 'I am the replacement';
framework.replaceElement(newElement, oldElement);
```

These methods provide fine-grained control when you need to directly manipulate the DOM outside of the virtual DOM diffing process.

### State Management

Manage application state with reactive updates:

```javascript
import { StateManager } from 'mini-framework-z01';

// Create state
const state = new StateManager({
  count: 0,
  user: { name: 'Guest' }
});

// Subscribe to changes
state.subscribe(newState => {
  console.log('State updated:', newState);
  renderApp();
});

// Update state
state.setState({ count: state.getState().count + 1 });
```

### Routing

Handle client-side navigation:

```javascript
import { router } from 'mini-framework-z01';

// Define routes
router.addRoute('/', HomeComponent);
router.addRoute('/about', AboutComponent);
router.addRoute('/contact', ContactComponent);

// Navigate programmatically
document.getElementById('about-link').addEventListener('click', () => {
  router.navigate('/about');
});
```

### Event System

Create a decoupled architecture with events:

```javascript
import { events } from 'mini-framework-z01';

// Subscribe to events
events.on('user:login', user => {
  console.log('User logged in:', user);
});

// Emit events
events.emit('user:login', { id: 1, name: 'John' });

// Unsubscribe
const handler = data => console.log(data);
events.on('notification', handler);
events.off('notification', handler);
```

## Project Structure

```
mini-framework-z01/
│
├── src/
│   ├── core/
│   │   ├── dom.js        # Virtual DOM implementation
│   │   ├── router.js     # Client-side routing
│   │   ├── state.js      # State management
│   │   └── events.js     # Event system
│   │
│   ├── framework.js      # Main framework entry point
│   └── index.js          # Framework initialization
│
├── examples/
│   └── todo/             # TodoMVC example
│       ├── index.html
│       ├── app.js
│       └── styles.css
│
├── README.md
└── package.json
```

## Examples

Check out the [TodoMVC example](/examples/todo) to see a complete application built with Mini Framework.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- ES6+ compatible browsers

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
