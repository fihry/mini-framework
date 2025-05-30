export function createSignal(initialValue) {
  let value = initialValue;
  const subscribers = new Set();

  function get() {
    if (Signal._currentEffect) {
      subscribers.add(Signal._currentEffect);
    }
    return value;
  }

  function set(newValue) {
    value = newValue;
    subscribers.forEach((fn) => fn());
  }

  return { get, set };
}

export function effect(fn) {
  Signal._currentEffect = fn;
  fn();
  Signal._currentEffect = null;
}

const Signal = {
  _currentEffect: null
};
