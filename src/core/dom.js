class VirtualDOM {
  constructor() {
    this.tree = null;
  }

  createElement(tag, attrs = {}, children = []) {
    return {
      tag,
      attrs,
      children
    };
  }
  removeElement(element) {
    if (element.parentNode) {
      element.parentNode.removeChild(element);
    }
  }

  replaceElement(newElement, oldElement) {
    const parentElement = oldElement.parentNode;
    parentElement.replaceChild(newElement, oldElement);
  }

  render(element, container) {
    const domElement = this.createDOMElement(element);
    container.appendChild(domElement);
    this.tree = element;
  }

  createDOMElement(node) {
    if (typeof node === 'string') {
      return document.createTextNode(node);
    }

    const element = document.createElement(node.tag);

    // Set attributes
    Object.keys(node.attrs || {}).forEach(attr => {
      element.setAttribute(attr, node.attrs[attr]);
    });

    // Render children
    (node.children || []).forEach(child => {
      const childElement = this.createDOMElement(child);
      element.appendChild(childElement);
    });

    return element;
  }

  update(newTree, container) {
    const oldTree = this.tree;
    this.tree = newTree;
    this.diff(oldTree, newTree, container, 0);
  }


  diff(oldNode, newNode, parent, index = 0) {
    const existingDom = parent.childNodes[index];

    if (!oldNode) {
      // New node added
      const newDom = this.createDOMElement(newNode);
      parent.appendChild(newDom);
    } else if (!newNode) {
      // Node removed
      parent.removeChild(existingDom);
    } else if (this.hasChanged(oldNode, newNode)) {
      // Node replaced
      const newDom = this.createDOMElement(newNode);
      parent.replaceChild(newDom, existingDom);
    } else if (newNode.tag) {
      // Same tag, update children
      const oldChildren = oldNode.children || [];
      const newChildren = newNode.children || [];
      const max = Math.max(oldChildren.length, newChildren.length);

      for (let i = 0; i < max; i++) {
        this.diff(oldChildren[i], newChildren[i], existingDom, i);
      }
    }
  }


  hasChanged(oldNode, newNode) {
    return typeof oldNode !== typeof newNode ||
      (typeof oldNode === 'string' && oldNode !== newNode) ||
      (oldNode.tag !== newNode.tag) ||
      (JSON.stringify(oldNode.attrs) !== JSON.stringify(newNode.attrs));
  }
}





export default VirtualDOM;
