import VirtualDOM from './core/dom.js';
import Router from './core/router.js';
import StateManager from './core/state.js';
import EventManager from './core/events.js';

class MiniFramework {
  constructor() {
    this.DOM = VirtualDOM;
    this.Router = Router;
    this.State = StateManager;
    this.Events = EventManager;
  }

  createElement(tag, attrs, children) {
    return VirtualDOM.createElement(tag, attrs, children);
  }

  render(element, container) {
    VirtualDOM.render(element, container);
  }
  navigate(path) {
    this.Router.navigate(path);
  }
  addRoute(path, component) {
    this.Router.addRoute(path, component);
  }
  setState(state) {
    this.State.setState(state);
  }
  getState() {
    return this.State.getState();
  }
  subscribe(listener) {
    return this.State.subscribe(listener);
  }
  emit(event, data) {
    this.Events.emit(event, data);
  }
  on(event, callback) {
    this.Events.on(event, callback);
  }
  off(event, callback) {
    this.Events.off(event, callback);
  }
  createStore(initialState) {
    return new StateManager(initialState);
  }
  createRouter() {
    return new Router();
  }
  createEventManager() {
    return new EventManager();
  }
  createVirtualDOM() {
    return new VirtualDOM();
  }
}

export default new MiniFramework();
