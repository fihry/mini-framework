class EventManager {
  constructor(root = document) {
    this.root = root;
    //  that save all events that we need to listen
    this.events = {}; // { eventName: [{ selector, callback }] } 
  }
  // this event listener work with delegation
  on(eventName, selectorOrCallback, maybeCallback) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
      this.root.addEventListener(eventName, event => this.handleEvent(eventName, event));
    }
    if (typeof selectorOrCallback === 'function') {
      // Custom event without selector
      this.events[eventName].push({
        selector: null,
        callback: selectorOrCallback
      });
    } else if (typeof maybeCallback === 'function') {
      // Delegated event with selector
      this.events[eventName].push({
        selector: selectorOrCallback,
        callback: maybeCallback
      });
    }
  }

  // this event listener work with delegation
  off(eventName, selector, callback) {
    if (!this.events[eventName]) return;
    this.events[eventName] = this.events[eventName].filter(h => h.selector !== selector || h.callback !== callback);
  }
  handleEvent(eventName, event) {
    const handlers = this.events[eventName];
    if (!handlers) return;
    handlers.forEach(({
      selector,
      callback
    }) => {
      if (!selector) {
        // custom event: call callback with event (which is your data)
        callback(event);
      } else if (event.target.closest(selector)) {
        // delegated DOM event
        callback(event);
      }
    });
  }

  // this event listener work with direct call
  emit(eventName, data) {
    const eventListeners = this.events[eventName];
    if (eventListeners) {
      eventListeners.forEach(({
        callback
      }) => {
        if (typeof callback === 'function') {
          callback(data);
        }
      });
    }
  }
}
export default EventManager;