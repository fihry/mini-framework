
# Event Manager Documentation

The EventManager class provides a simple event handling system that allows you to implement the publisher-subscriber (pub/sub) pattern in your applications.

## Installation

```javascript
import { createEventManager } from 'cdn'; //you can get it from the readme file
```

## Usage

```javascript
const events = ;createEventManager() // Create a new store instance with initial state 
```

## API Reference

### Constructor

Creates a new instance of EventManager with an empty events collection.

### Methods

#### on(eventName, callback)
Subscribes to an event with the given name and callback function.

- `eventName`: String - The name of the event to subscribe to
- `callback`: Function - The function to be called when the event is emitted

```javascript
events.on('click', (user) => {
  console.log(`User ${user.name} clicked`);
});
```

#### off(eventName, callback)
Unsubscribes a specific callback function from an event.

- `eventName`: String - The name of the event to unsubscribe from
- `callback`: Function - The callback function to remove

```javascript
const printUserCallback = (user) => {
      console.log(`User ${user.name} clicked`);
}
events.off('click', printUserCallback);
```

#### emit(eventName, data)
Triggers an event, calling all subscribed callbacks with the provided data.

- `eventName`: String - The name of the event to emit
- `data`: Any - The data to pass to the callback functions

```javascript
events.emit('click', { id: 2, name: 'yassine' });
```

## Example

```javascript
const events = new EventManager();

// Subscribe to an event
const handleUserLogin = (user) => {
  console.log(`Welcome ${user.name}!`);
};
events.on('login', handleUserLogin);

// Emit an event
events.emit('login', { name: 'John Doe' });

// Unsubscribe from an event
events.off('login', handleUserLogin);
```

## Notes

- Multiple callbacks can be registered for the same event
- If an event has no callbacks registered, emitting it will have no effect
- Unsubscribing a callback that wasn't registered will have no effect
