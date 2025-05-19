class EventManager {
  constructor() {
    this.customEvents = {};
  }
  on(eventName, callback) {
    if (!this.customEvents[eventName]) {
      this.customEvents[eventName] = [];
    }
    this.customEvents[eventName].push(callback);
  }
  off(eventName, callback) {
    if (!this.customEvents[eventName]) return;
    this.customEvents[eventName] = this.customEvents[eventName].filter(cb => cb !== callback);
  }
  emit(eventName, data) {
    const listeners = this.customEvents[eventName];
    if (listeners) {
      listeners.forEach(cb => cb(data));
    }
  }
}
export default EventManager;