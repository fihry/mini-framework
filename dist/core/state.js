class StateManager {
  constructor(initialState = {}) {
    this.state = initialState;
    this.listeners = [];
  }
  setState(newState) {
    this.state = newState;
    this.notify();
  }
  getState() {
    return this.state;
  }
  subscribe(listener) {
    if (typeof listener !== 'function') {
      throw new Error('Listener must be a function');
    }
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }
  notify() {
    this.listeners.forEach(listener => listener(this.state));
  }
}
export default StateManager;