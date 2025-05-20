
# Virtual DOM Implementation Documentation

## Overview
The VirtualDOM class provides a lightweight implementation of a Virtual DOM system, which is used to efficiently update the actual DOM by minimizing direct manipulations. This implementation includes key features like element creation, diffing, and efficient DOM updates.

## Class: VirtualDOM

### Constructor
```javascript
constructor(eventManager)
```
- Initializes a new VirtualDOM instance
- Parameters:
  - `eventManager`: Handles event management for the virtual DOM
- Properties:
  - `tree`: Stores the current virtual DOM tree
  - `events`: Reference to the event manager

### Methods

#### createElement(tag, attrs = {}, children = [])
Creates a virtual DOM element
- Parameters:
  - `tag`: String representing HTML tag name
  - `attrs`: Object containing element attributes
  - `children`: Array of child elements or single child
- Returns: Virtual DOM node object

#### render(newTree, container)
Renders the virtual DOM to the actual DOM
- Parameters:
  - `newTree`: New virtual DOM tree to render
  - `container`: DOM element to render into
- Handles initial render and updates through diffing

#### createDOMElement(node)
Creates actual DOM elements from virtual nodes
- Parameters:
  - `node`: Virtual DOM node
- Returns: Real DOM element
- Handles:
  - Text nodes
  - Element attributes
  - Event listeners
  - Styles
  - Child elements

#### diff(oldNode, newNode, parent, index = 0)
Compares old and new virtual nodes to update DOM
- Parameters:
  - `oldNode`: Previous virtual node
  - `newNode`: New virtual node
  - `parent`: Parent DOM element
  - `index`: Child index in parent
- Performs:
  - Node addition
  - Node removal
  - Node replacement
  - Children updates

#### updateChildren(parentDom, oldChildren, newChildren)
Updates child elements efficiently using key matching
- Parameters:
  - `parentDom`: Parent DOM element
  - `oldChildren`: Previous child nodes
  - `newChildren`: New child nodes
- Features:
  - Key-based matching
  - Position tracking
  - Efficient reordering

#### hasChanged(oldNode, newNode)
Determines if a node needs updating
- Parameters:
  - `oldNode`: Previous virtual node
  - `newNode`: New virtual node
- Returns: Boolean indicating if update is needed
- Checks:
  - Node types
  - Text content
  - Tag names
  - Attributes

## Usage Example
```javascript
import {createElement,render} from 'cdn'; // you can get it from the readme file

const app = createElement('div',
  { class: 'container' },
  [
    createElement('h1', {}, ['Hello']),
    createElement('p', {class:"paragraphe",onclick:()=>{console.log("hello world")}}, 'Virtual DOM')
  ]
);
let container = document.getElementById('app')
render(app);
```

## Key Features
- Efficient DOM updates through diffing
- Key-based child reconciliation
- Event handling support
- Style object support
- Nested component rendering
