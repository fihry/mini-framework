class EventManager {
  constructor() {
    this.events = {};
  }

  on(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(callback);
  }

  emit(eventName, data) {
    const eventListeners = this.events[eventName];
    if (eventListeners) {
      eventListeners.forEach(callback => callback(data));
    }
  }

  off(eventName, callback) {
    const eventListeners = this.events[eventName];
    if (eventListeners) {
      this.events[eventName] = eventListeners.filter(cb => cb !== callback);
    }
  }
}

export default new EventManager();
