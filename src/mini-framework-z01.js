// src/mini-framework-z01.js
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
    return this.Events;
  }

  createVirtualDOM() {
    return this.DOM;
  }
}

const miniFramework = new MiniFramework(document.getElementById('app')); // root container

export default miniFramework;

export const createElement = (...args) => miniFramework.DOM.createElement(...args);
export const removeElement = (...args) => miniFramework.DOM.removeElement(...args);
export const replaceElement = (...args) => miniFramework.DOM.replaceElement(...args);
export const render = (...args) => miniFramework.DOM.render(...args); // this function used for rerender the whole container by passing the container element and the new element
export const update = (...args) => miniFramework.DOM.update(...args); // this function for update the element by passing the element and the new element and the container element
export const createStore = (...args) => miniFramework.createStore(...args);
export const createRouter = (...args) => miniFramework.createRouter(...args);
export const createEventManager = () => miniFramework.createEventManager();

export const events = miniFramework.Events;
export const router = miniFramework.Router;
export const state = miniFramework.State;
export const dom = miniFramework.DOM;
