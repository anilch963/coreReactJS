# React.js Core Concepts - Complete Code Examples

This repository contains comprehensive code examples covering all essential React.js concepts. Perfect for learning, reference, and practice.

## 📚 Contents

### 1. [JSX Basics](01-jsx-basics.jsx)
- Basic JSX syntax
- JSX expressions
- JSX attributes and children
- Arrays and map functions
- Fragments
- Nested JSX

**Key Concepts:**
- JSX compiles to React.createElement()
- Curly braces for expressions
- Differences from HTML (className, htmlFor, etc.)

### 2. [Components](02-components.jsx)
- Functional components
- Arrow function components
- Class components
- Components with state (hooks)
- Component lifecycle
- useEffect hook
- Pure and memoized components
- Controlled vs Uncontrolled components
- Wrapper/Container components
- Compound components

**Key Concepts:**
- Components are JavaScript functions or classes
- Props are passed down from parent to child
- State is component-specific data
- Lifecycle methods in class components
- Hooks provide functionality in functional components

### 3. [Props](03-props.jsx)
- Basic props passing
- Destructuring props
- Default props
- Props validation
- Props with children
- Rest props (...rest)
- Spreading props
- Conditional props
- Props as functions, objects, and arrays
- Immutable updates
- Render props pattern
- Prop validation

**Key Concepts:**
- Props are read-only
- Props flow unidirectionally (parent to child)
- Destructuring makes code cleaner
- Props.children allows component composition

### 4. [State Management](04-state.jsx)
- Class component state
- Functional component state (useState)
- State with objects and arrays
- Multiple state variables
- Lazy initialization
- Conditional updates
- Batch updates
- State with timers
- Local storage persistence
- Derived state
- State based on props
- Complex state logic
- Race condition prevention

**Key Concepts:**
- State is mutable and component-specific
- setState is asynchronous
- Immutability is key to React
- Use state correctly to ensure proper re-renders

### 5. [Hooks](05-hooks.jsx)
- useState hook
- useEffect hook
- useContext hook
- useReducer hook
- useCallback hook
- useMemo hook
- useRef hook
- Custom hooks (useLocalStorage, useFetch, useToggle, useAsync)
- Multiple hooks combination
- Dependency arrays
- Cleanup functions

**Key Concepts:**
- Hooks allow you to use state and effects in functional components
- Custom hooks promote code reusability
- Dependencies affect when effects run
- useCallback and useMemo optimize performance

### 6. [Conditional Rendering](06-conditional-rendering.jsx)
- If/else patterns
- Ternary operator
- Logical AND (&&)
- Logical OR (||)
- Switch statements
- Element variables
- Multiple conditions
- Early return pattern
- Conditional className and styles
- Nullish coalescing (??)
- Optional chaining (?.)

**Key Concepts:**
- Render different content based on conditions
- Return null to render nothing
- Avoid rendering nothing without explicit checks

### 7. [Lists and Keys](07-lists-and-keys.jsx)
- Basic list rendering
- Lists with objects
- Importance of keys
- Why not to use index as key
- Filtering lists
- Lists with components
- Nested lists
- Dynamic lists (add/remove)
- Sorting lists
- Pagination
- Conditional lists
- Search functionality
- Memoized lists
- Empty list handling

**Key Concepts:**
- Keys help React identify which items have changed
- Use unique, stable IDs for keys
- Index as key causes issues when list changes
- Proper keys improve performance

### 8. [Forms and Events](08-forms-and-events.jsx)
- Basic form with state
- Multiple input fields
- Select dropdowns
- Checkboxes
- Radio buttons
- File input
- Form validation
- Form reset
- Event handling (onClick, onFocus, onBlur, onKeyDown, onMouseMove, etc.)
- Event delegation
- preventDefault
- stopPropagation

**Key Concepts:**
- Controlled components have React state as source of truth
- Form data flows through state
- Events are synthetic events (cross-browser compatible)
- Use preventDefault() and stopPropagation() carefully

### 9. [Context API](09-context-api.jsx)
- Creating context
- Context providers
- Consuming context (class and functional)
- Multiple contexts
- useContext hook
- Context with reducers
- Custom hooks for context
- Optimizing context (memoization)
- Avoiding unnecessary re-renders
- Context composition
- Context patterns

**Key Concepts:**
- Context avoids prop drilling
- Provider supplies values to consumers
- useContext hook simplifies consumption
- Memoize context values to prevent unnecessary re-renders

### 10. [Advanced Concepts](10-advanced-concepts.jsx)
- Higher-Order Components (HOC)
- Render Props pattern
- Compound Components
- Forwarding Refs
- Lazy loading & Code splitting
- Error Boundaries
- Portals
- Composition over Inheritance
- Controlled vs Uncontrolled components
- React.cloneElement
- Function as Child
- Lifting State Up
- Performance optimization
- Keys in reconciliation

**Key Concepts:**
- Multiple patterns solve different problems
- Composition is preferred over inheritance
- Error boundaries catch errors in the tree
- Portals render outside normal DOM hierarchy

## 🚀 Getting Started

### Prerequisites
- Node.js (v14+)
- npm or yarn
- Basic JavaScript knowledge

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to the project
cd reactjsCoreConcepts

# Install dependencies (if using Create React App)
npm install

# Start the development server
npm start
```

## 📖 How to Use These Files

1. **Learn**: Read through each file to understand the concept
2. **Experiment**: Copy examples and try modifying them
3. **Practice**: Try implementing concepts in your own projects
4. **Reference**: Use as a quick reference guide

## 💡 Tips for Learning React

1. **Start with basics**: Begin with JSX and Components before moving to advanced concepts
2. **Practice regularly**: Write code daily, even small examples
3. **Build projects**: Apply concepts to real-world projects
4. **Read official docs**: Refer to [React Documentation](https://react.dev)
5. **Understand reconciliation**: Learn how React updates the DOM
6. **Performance matters**: Use React DevTools to profile your app

## 🔗 Key Concepts Overview

```
React = Components + Props + State + Side Effects

Components (Functional/Class)
    ├── Receive Props (immutable)
    ├── Maintain State (mutable)
    ├── Handle Events
    ├── Render JSX
    └── Run Effects (side effects)

Patterns:
    ├── HOC (Higher-Order Components)
    ├── Render Props
    ├── Compound Components
    ├── Custom Hooks
    └── Context API
```

## ✅ Common React Best Practices

1. **Keep components small and focused**
2. **Use functional components with hooks**
3. **Props should be immutable**
4. **Extract components for reusability**
5. **Use proper keys in lists**
6. **Avoid premature optimization**
7. **Use meaningful variable names**
8. **Write testable code**
9. **Use error boundaries**
10. **Profile before optimizing**

## 🎯 Learning Path

```
1. JSX Basics → 2. Components → 3. Props → 4. State
    ↓
5. Hooks → 6. Conditional Rendering → 7. Lists → 8. Forms
    ↓
9. Context API → 10. Advanced Concepts
```

## 📚 Additional Resources

- [Official React Documentation](https://react.dev)
- [React Router](https://reactrouter.com)
- [Redux](https://redux.js.org) (State Management)
- [React Query](https://tanstack.com/query) (Data Fetching)
- [Next.js](https://nextjs.org) (Framework)
- [TypeScript + React](https://www.typescriptlang.org/docs/handbook/react.html)

## 🐛 Debugging Tips

1. Use React DevTools browser extension
2. Use `console.log()` to debug state and props
3. Check for duplicate keys in lists
4. Verify dependency arrays in useEffect
5. Look for missing return statements
6. Check event handlers are attached correctly

## 📝 Common Mistakes to Avoid

1. ❌ Modifying props directly
2. ❌ Using array index as key
3. ❌ Infinite loops in useEffect
4. ❌ Missing dependency arrays
5. ❌ Not handling async operations correctly
6. ❌ Creating components inside other components
7. ❌ Forgetting to clean up subscriptions
8. ❌ Updating state in loops

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

---

**Happy Learning! 🎉**

*Last Updated: January 2026*
