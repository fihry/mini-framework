
# StateManager Documentation

## Overview
StateManager is a simple state management class that allows you to manage application state and notify listeners of state changes.

## Installation
```javascript
import 
```

## Usage
```javascript
// Create a new instance with initial state
const stateManager = new StateManager({ count: 0 });

// Subscribe to state changes
const unsubscribe = stateManager.subscribe((state) => {
  console.log('State updated:', state);
});

// Update state
stateManager.setState({ count: 1 });

// Get current state
const currentState = stateManager.getState();

// Unsubscribe when done
unsubscribe();
```

## API Reference

### Constructor
```javascript
new StateManager(initialState = {})
```
Creates a new StateManager instance with optional initial state.

### Methods

#### setState(newState)
Updates the current state and notifies all listeners.
- `newState`: Object - The new state to set

#### getState()
Returns the current state.
- Returns: Object - The current state

#### subscribe(listener)
Adds a listener function to be called when state changes.
- `listener`: Function - Callback function that receives state as parameter
- Returns: Function - Unsubscribe function to remove the listener

## Example
```javascript
const stateManager = new StateManager({
  user: null,
  isLoading: false
});

stateManager.subscribe((state) => {
  if (state.isLoading) {
    showLoadingSpinner();
  } else {
    hideLoadingSpinner();
  }
});

// Update state
stateManager.setState({
  user: { id: 1, name: 'John' },
  isLoading: false
});
```

## Error Handling
- Throws an error if subscribe is called with a non-function parameter
- Listeners are safely removed when unsubscribe is called

## License
MIT License
