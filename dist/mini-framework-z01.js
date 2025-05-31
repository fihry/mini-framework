import VirtualDOM from './core/dom.js';
import Router from './core/router.js';
import StateManager from './core/state.js';
import EventManager from './core/events.js';
import Signal from './core/signal.js';
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
  createSignal(initialValue) {
    return new Signal(initialValue);
  }
}
const miniFramework = new MiniFramework();
export default miniFramework;

// === Public API Exports ===

export const createElement = (...args) => miniFramework.DOM.createElement(...args);
export const render = (...args) => miniFramework.DOM.render(...args);
export const createStore = (...args) => miniFramework.createStore(...args);
export const createRouter = (...args) => miniFramework.createRouter(...args);
export const createEventManager = () => miniFramework.createEventManager();
export const setRef = (key, value) => miniFramework.State.setRef(key, value);
export const getRef = key => miniFramework.State.getRef(key);
export const removeRef = key => miniFramework.State.removeRef(key);
export const createRef = initialValue => miniFramework.State.createRef(initialValue);
export const createSignal = initialValue => new Signal(initialValue);
export const effect = fn => {
  Signal.currentEffect = fn;
  fn();
  Signal.currentEffect = null;
};

// Direct access to core singletons if needed 
export const dom = miniFramework.DOM;
export const router = miniFramework.Router;
export const state = miniFramework.State;
export const events = miniFramework.Events;