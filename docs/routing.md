
# Router Documentation

## Overview
The Router class provides client-side routing functionality for single page applications. It manages navigation between different views without full page reloads.

## Features
- Simple route registration
- History API integration
- Automatic route handling
- URL path matching

## Usage

```javascript
import { createRouter } from 'cdn'; // you cane get it from the readme file

// Create router instance
const router = createRouter();
// Initialize router
router.init();

// Add routes
router.addRoute('/', homeComponent);
router.addRoute('/about', aboutComponent);
router.addRoute('/contact', contactComponent);

// Navigate programmatically 
router.navigate('/about');
```

## API Reference

### Constructor
```javascript
const router = new Router(); // don't forget to import the Router example: import {Router} from 'cdn';
```
Creates a new router instance and initializes route handling.

### Methods

#### addRoute(path, component)
- `path`: String - URL path to match
- `component`: Function - Component render function to call when route matches

Registers a new route and associated component.

#### navigate(path) 
- `path`: String - Path to navigate to

Programmatically navigate to a route.

#### handleRouteChange()
Internal method that handles route changes and renders appropriate component.

## Events
The router listens for `popstate` events to handle browser back/forward navigation.

## Browser Support
Works in all modern browsers that support the History API.
