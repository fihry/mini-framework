# Mini Framework Documentation

## Welcome

Welcome to the Mini Framework documentation. This lightweight framework provides powerful tools for building modern web applications.

## Quick Links

- [Getting Started](/getting-started/installation.md)
- [Core Concepts](/core-concepts/virtual-dom.md)
- [API Reference](/api-reference/dom.md)

## Features

- 🚀 Virtual DOM Manipulation
- 🗺️ Client-side Routing
- 🔄 State Management
- 🎉 Custom Event Handling

## Overview

Mini Framework is designed to provide a simple yet powerful approach to building web applications with minimal overhead.

```markdown
2. `docs/getting-started/installation.md`:
```
# Installation

## NPM Installation

You can install Mini Framework using npm:

```bash
npm install mini-framework
```

## CDN Usage

Include the framework directly in your HTML:

```html
<script src="https://cdn.example.com/mini-framework.js"></script>
```

## Basic Setup

After installation, import the framework in your JavaScript:

```javascript
import framework from 'mini-framework';
// Create your first element
const app = framework.createElement('div', { id: 'app' }, [
  framework.createElement('h1', {}, 'Hello, Mini Framework!')
]);

// Render the element
framework.render(app, document.body);
```

## Compatibility

- Modern Browsers (Chrome, Firefox, Safari, Edge)
- ES6+ Support Required
```markdown

3. `docs/core-concepts/virtual-dom.md`:
```
# Virtual DOM

## What is Virtual DOM?

Virtual DOM is a lightweight copy of the actual DOM that allows for efficient updates and rendering.

## How It Works

1. Create a virtual representation of the DOM
2. Compare changes between virtual and real DOM
3. Minimize actual DOM manipulations

## Example

```javascript
// Creating a virtual element
const element = framework.createElement('div', { class: 'container' }, [
  framework.createElement('p', {}, 'Hello World')
]);

// Rendering the element
framework.render(element, document.body);
```markdown

## Benefits

- Improved Performance
- Efficient Updates
- Simplified DOM Manipulation

4. `docs/api-reference/dom.md`:
```
# DOM API Reference

## createElement()

Creates a virtual DOM element.

### Signature
```javascript
framework.createElement(tag, attributes, children)
```

### Parameters
- `tag` (String): HTML tag name
- `attributes` (Object, optional): Element attributes
- `children` (Array, optional): Child elements

### Examples

```javascript
// Simple div
const div = framework.createElement('div');

// Div with attributes
const divWithClass = framework.createElement('div', { 
  class: 'container' 
});

// Div with children
const divWithChildren = framework.createElement('div', {}, [
  framework.createElement('p', {}, 'Child Element')
]);
```

## render()

Renders a virtual DOM element to the actual DOM.

### Signature
```javascript
framework.render(element, container)
```

### Parameters
- `element`: Virtual DOM element to render
- `container`: DOM element to append the rendered element
```markdown

5. `docs/examples/todo-app.md`:
```
# TodoMVC Example

## Overview

This example demonstrates building a complete Todo application using Mini Framework.

## Project Structure

```tree
todo-app/
├── index.html
├── app.js
└── styles.css
```

## Implementation

### HTML (index.html)
```html
<!DOCTYPE html>
<html>
<head>
  <title>Todo App</title>
</head>
<body>
  <div id="app"></div>
  <script type="module" src="app.js"></script>
</body>
</html>
```

### JavaScript (app.js)
```javascript
import framework from 'mini-framework';

class TodoApp {
  constructor() {
    this.state = new framework.State({
      todos: [],
      input: ''
    });
  }

  render() {
    const todoList = framework.createElement('ul', {}, 
      this.state.getState().todos.map(todo => 
        framework.createElement('li', {}, todo)
      )
    );

    const app = framework.createElement('div', {}, [
      framework.createElement('input', { 
        type: 'text', 
        value: this.state.getState().input 
      }),
      framework.createElement('button', {}, 'Add Todo'),
      todoList
    ]);

    framework.render(app, document.getElementById('app'));
  }
}
```

## Key Concepts Demonstrated

- State Management
- Event Handling
- Virtual DOM Rendering
