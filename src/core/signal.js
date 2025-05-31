class Signal {
  static currentEffect = null;

  constructor(initialValue) {
    this.value = initialValue;
    this.subscribers = new Set();
    this.isSignal = true;
  }

  get() {
    if (Signal.currentEffect) {
      this.subscribers.add(Signal.currentEffect);
    }
    return this.value;
  }

  set(newValue) {
    if (this.value !== newValue) {
      this.value = newValue;
      this.subscribers.forEach((fn) => fn());
    }
  }
  get value() {
    return this.get();
  }
  set value(newValue) {
    this.set(newValue);
  }
}

export default Signal;
