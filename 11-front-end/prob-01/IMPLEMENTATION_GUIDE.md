# Virtual DOM Implementation Guide

## 🎯 Implementation Challenge (90 minutes max)

You need to implement **3 CORE METHODS** to complete this Virtual DOM system aligned with the study plan.

## 📋 Implementation Checklist

### ✅ Already Complete
- [x] VNode interface with type, props, children, key, dom
- [x] createElement (h function) for VNode creation  
- [x] isSameVNode for node comparison
- [x] Component base class with lifecycle hooks
- [x] Redux-like store for state management
- [x] Comprehensive test suite
- [x] Utility functions (deepClone, debounce, throttle)

### 🔥 YOUR IMPLEMENTATION (90min)

#### 1. `render()` function (30 minutes)
**Location**: `problem.ts` line 133
**Purpose**: Core DOM creation from VNode (mount functionality)

```typescript
export function render(vnode: VNode | string, container: HTMLElement): HTMLElement | Text {
  // TODO: IMPLEMENT THIS METHOD
}
```

**Implementation Steps**:
1. **Handle text nodes**: 
   ```typescript
   if (typeof vnode === 'string') {
     const textNode = document.createTextNode(vnode);
     container.appendChild(textNode);
     return textNode;
   }
   ```

2. **Handle functional components**:
   ```typescript
   if (typeof vnode.type === 'function') {
     const componentVNode = vnode.type(vnode.props);
     return render(componentVNode, container);
   }
   ```

3. **Handle class components**:
   ```typescript
   // Create instance, call render(), mount result, call componentDidMount
   ```

4. **Handle HTML elements**:
   ```typescript
   const element = document.createElement(vnode.type as string);
   
   // Set props (attributes, event listeners, className)
   Object.keys(vnode.props).forEach(key => {
     if (key === 'children') return;
     
     if (key.startsWith('on') && typeof vnode.props[key] === 'function') {
       const eventType = key.slice(2).toLowerCase();
       element.addEventListener(eventType, vnode.props[key]);
     } else if (key === 'className') {
       element.className = vnode.props[key];
     } else {
       element.setAttribute(key, vnode.props[key]);
     }
   });
   
   // Recursively render children
   vnode.children.forEach(child => {
     if (typeof child === 'string') {
       element.appendChild(document.createTextNode(child));
     } else {
       render(child, element);
     }
   });
   
   container.appendChild(element);
   vnode.dom = element;
   return element;
   ```

#### 2. `patch()` function (45 minutes)
**Location**: `problem.ts` line 181
**Purpose**: Efficient diff/patch with children reconciliation

```typescript
export function patch(oldVNode: VNode | null, newVNode: VNode, container: HTMLElement): void {
  // TODO: IMPLEMENT THIS METHOD
}
```

**Implementation Steps**:
1. **Handle null old node**:
   ```typescript
   if (!oldVNode) {
     render(newVNode, container);
     return;
   }
   ```

2. **Handle different node types**:
   ```typescript
   if (!isSameVNode(oldVNode, newVNode)) {
     // Replace entire node
     if (oldVNode.dom && oldVNode.dom.parentNode) {
       const newElement = render(newVNode, document.createElement('div'));
       oldVNode.dom.parentNode.replaceChild(newElement, oldVNode.dom);
     }
     return;
   }
   ```

3. **Handle same node types**:
   ```typescript
   // Update props and event listeners
   if (oldVNode.dom && oldVNode.dom instanceof HTMLElement) {
     const element = oldVNode.dom;
     
     // Remove old event listeners
     Object.keys(oldVNode.props).forEach(key => {
       if (key.startsWith('on')) {
         const eventType = key.slice(2).toLowerCase();
         element.removeEventListener(eventType, oldVNode.props[key]);
       }
     });
     
     // Add new props and event listeners
     Object.keys(newVNode.props).forEach(key => {
       if (key === 'children') return;
       
       if (key.startsWith('on') && typeof newVNode.props[key] === 'function') {
         const eventType = key.slice(2).toLowerCase();
         element.addEventListener(eventType, newVNode.props[key]);
       } else if (key === 'className') {
         element.className = newVNode.props[key];
       } else {
         element.setAttribute(key, newVNode.props[key]);
       }
     });
     
     newVNode.dom = element;
   }
   ```

4. **Reconcile children** (Advanced - implement if time allows):
   ```typescript
   // Basic index-based reconciliation
   const oldChildren = oldVNode.children;
   const newChildren = newVNode.children;
   
   const max = Math.max(oldChildren.length, newChildren.length);
   for (let i = 0; i < max; i++) {
     patch(oldChildren[i] || null, newChildren[i], element);
   }
   ```

#### 3. `setState()` method (15 minutes)
**Location**: `problem.ts` line 230
**Purpose**: Component lifecycle integration

```typescript
setState(newState: Partial<Record<string, any>>): void {
  // TODO: IMPLEMENT THIS METHOD
}
```

**Implementation Steps**:
```typescript
setState(newState: Partial<Record<string, any>>): void {
  const prevState = { ...this.state };
  const prevProps = { ...this.props };
  
  // Update state
  this.state = { ...this.state, ...newState };
  
  // Re-render component
  const newVNode = this.render();
  
  // Patch the DOM if component is mounted
  if (this._dom && this._dom.parentElement) {
    patch(this._vnode, newVNode, this._dom.parentElement);
  }
  
  // Update references
  this._vnode = newVNode;
  
  // Call lifecycle method
  if (this.componentDidUpdate) {
    this.componentDidUpdate(prevProps, prevState);
  }
}
```

## 🧪 Testing Your Implementation

Run the tests to validate your implementation:

```bash
npm test
```

**Key test scenarios**:
- ✅ Text node rendering
- ✅ HTML element creation with attributes
- ✅ Event listener attachment
- ✅ Component rendering and state updates
- ✅ DOM patching and updates
- ✅ Key-based reconciliation

## 🎯 Success Criteria

When complete, you should have:
- ✅ Working Virtual DOM renderer
- ✅ Efficient diff/patch algorithm  
- ✅ Component lifecycle management
- ✅ State management integration
- ✅ Event handling
- ✅ All tests passing

## 🚀 Advanced Features (If Time Allows)

1. **Key-based reconciliation** in patch()
2. **Class component support** in render()
3. **componentDidMount** lifecycle integration
4. **Error boundaries** for component errors
5. **Performance optimizations** for large lists

## 📚 Study Plan Alignment

This implementation follows the Virtual DOM study plan:
- ✅ VNode as lightweight tree of JS objects
- ✅ Reconciliation with minimal DOM changes
- ✅ Component lifecycle management
- ✅ Efficient DOM updates with batching
- ✅ Event handling strategies
- ✅ State management integration

Good luck with your implementation! 🚀
