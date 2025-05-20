# Mini-framework-z01

![Mini Framework](https://img.shields.io/badge/Mini-Framework--z01-blue)
![Version](https://img.shields.io/badge/version-1.7.0-green)
![License](https://img.shields.io/badge/license-MIT-orange)

A lightweight, powerful JavaScript framework for building modern web applications with minimal overhead.

---

## Features

- 🚀 **Virtual DOM** — Efficient virtual DOM creation and rendering  
- 🔄 **Reactive State Management** — Observable state with subscription-based updates  
- 🗺️ **Client-side Routing** — SPA navigation with route handlers and history management  
- 📡 **Event System** — Publish/subscribe event architecture  
- ⚡ **Performance Focused** — Minimal DOM operations for fast rendering  
- 🧩 **Component-Based** — Build reusable UI components  

---
### Documentation
- [virtual-dom.md](./docs/virtual-dom.md)
- [state-management.md](./docs/state-management.md)
- [routing.md](./docs/routing.md)
- [event-system.md](./docs/event-system.md)

## Installation

### CDN
```html
<script src="https://cdn.jsdelivr.net/npm/mini-framework-z01@1.0.7/dist/mini-framework-z01.min.js"></script>
```
## Quick Start
```js
import { createElement, render } from 'https://cdn.jsdelivr.net/npm/mini-framework-z01@1.0.7/dist/mini-framework-z01.min.js';

const app = createElement('div', { id: 'app' }, [
  createElement('h1', {}, ['Hello, World!']),
]);

render(app, document.body);
```
### Core Concepts
#### Virtual DOM & Rendering
Create virtual DOM nodes and render them to the real DOM:
```js
const element = createElement('div', { class: 'container' }, [
  createElement('p', {}, 'Hello World'),
]);

render(element, document.getElementById('app'));
```
##### Note: This framework does not provide an incremental update/diff method. Instead, you re-render the entire virtual DOM tree when your app state changes. The framework handles efficient DOM replacement behind the scenes.
#### State Management
The createStore provides a simple, observable state object:
```js
const state = createStore({ count: 0 });

// Subscribe to changes
state.subscribe(newState => {
  console.log('State updated:', newState);
  render(app(),container);
});

// Update state triggers subscribers
state.setState({ count: state.getState().count + 1 });
```
This lets you keep your UI in sync by re-rendering your app on every state change.

#### Routing
Use the built-in router for SPA navigation:
```js 
const router = createRouter();

router.addRoute('/', () => renderHome());
router.addRoute('/about', () => renderAbout());
router.init();

// Navigate programmatically
router.navigate('/about');
```
#### Event System
Communicate between components using events:
```js
events.on('user:login', user => {
  console.log('User logged in:', user);
});

events.emit('user:login', { id: 1, name: 'Jane' });

events.off('user:login', handler);
```
### Example Usage
you can find a simple Todo app example in the [examples](./examples) folder.

## Authors
- [Fihry](https://github.com/fihry)
- [oaitbenh-21](https://github.com/oaitbenh-21)
- [brahem01](https://www.linkedin.com/in/brahem01)
- [BenaliOssama](https://github.com/BenaliOssama)
- 
## Contributing
- Fork the repository
- Create a feature branch (git checkout -b feature/my-feature)
- Commit your changes (git commit -am 'Add some feature')
- Push to your branch (git push origin feature/my-feature)
- Create a pull request

## License
This project is licensed under the MIT License.