class VirtualDOM {
  constructor(eventManager) {
    this.tree = null;
    this.events = eventManager;
  }

  createElement(tag, attrs = {}, children = []) {
    if (!Array.isArray(children)) {
      children = [children];
    }

    children = children.filter(
      child => child !== null && child !== undefined && child !== false
    );

    return {
      tag,
      attrs,
      children,
      key: attrs.key ?? null,
    };
  }

  render(newTree, container) {
    if (this.tree === null) {
      const domElement = this.createDOMElement(newTree);
      container.innerHTML = '';
      container.appendChild(domElement);
    } else {
      this.diff(this.tree, newTree, container, 0);
    }

    this.tree = newTree;
  }

  createDOMElement(node) {
    if (typeof node === 'string') return document.createTextNode(node);

    const element = document.createElement(node.tag);

    for (const [attr, value] of Object.entries(node.attrs || {})) {
      if (attr.startsWith('on') && typeof value === 'function') {
        const eventName = attr.slice(2).toLowerCase();

        this.events.on(eventName, value);  // Register the event through EventManager
        // Attach an event listener to the DOM element via EventManager
        element.addEventListener(eventName, (e) => this.events.emit(eventName, e));

      } else if (attr === 'style' && typeof value === 'object') {
        Object.assign(element.style, value);
      } else {
        element.setAttribute(attr, value);
      }
    }

    for (const child of node.children) {
      const childEl = this.createDOMElement(child);
      element.appendChild(childEl);
    }

    return element;
  }

  diff(oldNode, newNode, parent, index = 0) {
    const existingDom = parent.childNodes[index];

    if (!oldNode) {
      const newDom = this.createDOMElement(newNode);
      parent.appendChild(newDom);
    } else if (!newNode) {
      if (existingDom) parent.removeChild(existingDom);
    } else if (this.hasChanged(oldNode, newNode)) {
      const newDom = this.createDOMElement(newNode);
      parent.replaceChild(newDom, existingDom);
    } else if (newNode.tag) {
      this.updateChildren(existingDom, oldNode.children || [], newNode.children || []);
    }
  }

  updateChildren(parentDom, oldChildren, newChildren) {
    const oldKeyed = new Map();
    const usedIndices = new Set();

    oldChildren.forEach((child, i) => {
      if (child.key != null) {
        oldKeyed.set(child.key, { node: child, index: i });
      }
    });

    for (let i = 0; i < newChildren.length; i++) {
      const newChild = newChildren[i];
      let matchedOld = null;
      let oldIndex = i;

      if (newChild.key != null && oldKeyed.has(newChild.key)) {
        const match = oldKeyed.get(newChild.key);
        matchedOld = match.node;
        oldIndex = match.index;
        usedIndices.add(oldIndex);
        oldKeyed.delete(newChild.key);
      } else if (!newChild.key) {
        matchedOld = oldChildren[i];
        usedIndices.add(i);
      }

      this.diff(matchedOld, newChild, parentDom, oldIndex);
    }

    for (let i = oldChildren.length - 1; i >= 0; i--) {
      if (!usedIndices.has(i)) {
        const domNode = parentDom.childNodes[i];
        if (domNode) parentDom.removeChild(domNode);
      }
    }
  }

  hasChanged(oldNode, newNode) {
    if (typeof oldNode !== typeof newNode) return true;

    if (typeof oldNode === 'string') {
      return oldNode !== newNode;
    }

    if (oldNode.tag !== newNode.tag) return true;

    const oldAttrs = oldNode.attrs || {};
    const newAttrs = newNode.attrs || {};

    const oldKeys = Object.keys(oldAttrs);
    const newKeys = Object.keys(newAttrs);

    if (oldKeys.length !== newKeys.length) return true;

    for (const key of oldKeys) {
      if (oldAttrs[key] !== newAttrs[key]) return true;
    }

    return false;
  }
}

export default VirtualDOM;
