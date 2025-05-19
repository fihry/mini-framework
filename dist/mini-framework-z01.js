import VirtualDOM from './core/dom.js';
import Router from './core/router.js';
import StateManager from './core/state.js';
import EventManager from './core/events.js';
class MiniFramework {
  constructor(root = document) {
    this.DOM = new VirtualDOM();
    this.Router = new Router();
    this.State = new StateManager();
    this.Events = new EventManager(root);
  }
  createStore(initialState) {
    return new StateManager(initialState);
  }
  createRouter() {
    return new Router();
  }
  createEventManager() {
    return new EventManager(document);
  }
  createVirtualDOM() {
    return new VirtualDOM();
  }
}
const miniFramework = new MiniFramework();
export default miniFramework;

// === Public API Exports ===

/**
 * Create virtual DOM elements.
 */
export const createElement = (...args) => miniFramework.DOM.createElement(...args);
export const render = (...args) => miniFramework.DOM.render(...args);
export const createStore = (...args) => miniFramework.createStore(...args);

/**
 * Create a new Router instance.
 */
export const createRouter = (...args) => miniFramework.createRouter(...args);

/**
 * Create a new EventManager instance.
 */
export const createEventManager = () => miniFramework.createEventManager();

// Direct access to core singletons (optional)
export const dom = miniFramework.DOM;
export const router = miniFramework.Router;
export const state = miniFramework.State;
export const events = miniFramework.Events;