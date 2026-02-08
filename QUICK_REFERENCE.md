# React.js Quick Reference Guide

## Core Concepts at a Glance

### JSX Syntax
```jsx
// Elements
const element = <h1>Hello, {name}!</h1>;

// Expressions in JSX
const jsx = <div>{2 + 2}</div>; // 4

// Attributes
<div className="container" id="main" style={{ color: 'red' }}>

// Children
<div>
  <p>Child 1</p>
  <p>Child 2</p>
</div>

// Fragments (no wrapper)
<>
  <Header />
  <Content />
</>
```

### Components
```jsx
// Functional Component
function MyComponent(props) {
  return <div>Hello {props.name}</div>;
}

// Arrow Function
const MyComponent = (props) => <div>Hello {props.name}</div>;

// Class Component
class MyComponent extends React.Component {
  render() {
    return <div>Hello {this.props.name}</div>;
  }
}
```

### Props
```jsx
// Passing props
<Component name="Alice" age={25} />

// Destructuring
function Component({ name, age }) {
  return <div>{name} - {age}</div>;
}

// Default props
Component.defaultProps = { age: 18 };

// Children prop
<Container>
  <p>This is children</p>
</Container>

function Container({ children }) {
  return <div>{children}</div>;
}
```

### State (Functional)
```jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}
```

### State (Class)
```jsx
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  render() {
    return (
      <button onClick={() => this.setState({ count: this.state.count + 1 })}>
        Count: {this.state.count}
      </button>
    );
  }
}
```

### Effects (useEffect)
```jsx
import { useEffect, useState } from 'react';

function Component() {
  const [data, setData] = useState(null);

  // Run after every render
  useEffect(() => {
    console.log('Effect ran');
  });

  // Run only on mount (empty dependency array)
  useEffect(() => {
    console.log('Component mounted');
  }, []);

  // Run when `data` changes
  useEffect(() => {
    console.log('Data changed:', data);
  }, [data]);

  // Cleanup function
  useEffect(() => {
    const subscription = subscribe();
    return () => subscription.unsubscribe();
  }, []);

  return <div>{data}</div>;
}
```

### Hooks Quick Reference
```jsx
// useState - State
const [count, setCount] = useState(0);

// useEffect - Side effects
useEffect(() => { /* ... */ }, []);

// useContext - Share context
const theme = useContext(ThemeContext);

// useReducer - Complex state
const [state, dispatch] = useReducer(reducer, initialState);

// useCallback - Memoize function
const memoFunc = useCallback(() => { /* ... */ }, [dep]);

// useMemo - Memoize value
const memoValue = useMemo(() => expensiveCalc(), [dep]);

// useRef - Persistent value
const ref = useRef(null);

// useLayoutEffect - After render but before paint
useLayoutEffect(() => { /* ... */ }, []);
```

### Conditional Rendering
```jsx
// If/Else
if (isValid) return <Valid />;
return <Invalid />;

// Ternary
{isValid ? <Valid /> : <Invalid />}

// Logical AND
{isValid && <Valid />}

// Logical OR
{data || <Loading />}

// Element Variable
const content = isValid ? <Valid /> : <Invalid />;
return <div>{content}</div>;
```

### Lists & Keys
```jsx
// Rendering lists
const items = ['Apple', 'Banana', 'Orange'];
const listItems = items.map((item, index) => (
  <li key={index}>{item}</li>
));

// With object array (better - use ID as key)
const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' }
];
users.map(user => <li key={user.id}>{user.name}</li>)
```

### Forms
```jsx
// Controlled component
function Form() {
  const [name, setName] = useState('');

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      console.log(name);
    }}>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
}

// Uncontrolled component with ref
function Form() {
  const inputRef = useRef(null);

  return (
    <form onSubmit={() => alert(inputRef.current.value)}>
      <input ref={inputRef} />
      <button type="submit">Submit</button>
    </form>
  );
}
```

### Context API
```jsx
// Create context
const MyContext = React.createContext();

// Provider
function Provider({ children }) {
  const [value, setValue] = useState('initial');
  return (
    <MyContext.Provider value={{ value, setValue }}>
      {children}
    </MyContext.Provider>
  );
}

// Consumer
function Consumer() {
  const { value, setValue } = useContext(MyContext);
  return <div>{value}</div>;
}
```

### Performance Optimization
```jsx
// React.memo - prevent re-render if props unchanged
const MyComponent = React.memo(({ name }) => {
  return <div>{name}</div>;
});

// useMemo - memoize expensive calculation
const value = useMemo(() => expensiveCalc(a), [a]);

// useCallback - memoize function
const func = useCallback(() => doSomething(a), [a]);

// React.lazy & Suspense - code splitting
const Component = React.lazy(() => import('./Component'));

<Suspense fallback={<Loading />}>
  <Component />
</Suspense>
```

### Common Patterns

#### Higher-Order Component (HOC)
```jsx
function withTheme(Component) {
  return function WrappedComponent(props) {
    return <Component {...props} theme="dark" />;
  };
}
```

#### Render Props
```jsx
<MouseTracker render={(position) => (
  <p>X: {position.x}, Y: {position.y}</p>
)} />
```

#### Compound Components
```jsx
<Tabs>
  <Tab>Tab 1</Tab>
  <Tab>Tab 2</Tab>
  <TabPanel>Content 1</TabPanel>
  <TabPanel>Content 2</TabPanel>
</Tabs>
```

#### Custom Hook
```jsx
function useCustom(initialValue) {
  const [value, setValue] = useState(initialValue);
  
  useEffect(() => {
    // Setup
    return () => {
      // Cleanup
    };
  }, []);
  
  return { value, setValue };
}
```

### Error Boundaries
```jsx
class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) return <div>Error</div>;
    return this.props.children;
  }
}
```

### Event Handling
```jsx
// Click
<button onClick={() => handleClick()}>Click</button>
<button onClick={handleClick}>Click</button>

// Form events
<input onChange={(e) => setName(e.target.value)} />
<input onFocus={() => setFocused(true)} />
<input onBlur={() => setFocused(false)} />

// Keyboard events
<input onKeyDown={(e) => {
  if (e.key === 'Enter') handleSubmit();
}} />

// Mouse events
<div onMouseEnter={() => {}} onMouseLeave={() => {}} />

// Prevent default
const handleClick = (e) => {
  e.preventDefault();
};

// Stop propagation
const handleClick = (e) => {
  e.stopPropagation();
};
```

### Component Lifecycle (Class)
```jsx
class Component extends React.Component {
  // Before render
  constructor(props) {}
  
  componentWillMount() {} // deprecated
  
  // After render
  componentDidMount() {}
  
  // Before update
  componentWillReceiveProps(nextProps) {} // deprecated
  
  shouldComponentUpdate(nextProps, nextState) {
    return true; // or false to skip re-render
  }
  
  componentWillUpdate(nextProps, nextState) {} // deprecated
  
  // After update
  componentDidUpdate(prevProps, prevState) {}
  
  // Before unmount
  componentWillUnmount() {}
  
  render() {}
}
```

### Best Practices Checklist

- ✅ Use functional components with hooks
- ✅ Keep components small and focused
- ✅ Use meaningful names
- ✅ Lift state to nearest common ancestor
- ✅ Use proper keys in lists
- ✅ Memoize expensive operations
- ✅ Handle errors with Error Boundaries
- ✅ Clean up effects (timers, subscriptions)
- ✅ Use dependency arrays correctly
- ✅ Avoid prop drilling (use Context)
- ✅ Test your components
- ✅ Use TypeScript for type safety
- ✅ Profile before optimizing

### Common Mistakes
```jsx
// ❌ Modifying state directly
this.state.count = 5;

// ✅ Using setState
this.setState({ count: 5 });

// ❌ Using index as key
items.map((item, i) => <li key={i}>{item}</li>)

// ✅ Using unique ID as key
items.map(item => <li key={item.id}>{item}</li>)

// ❌ Missing dependency array
useEffect(() => {
  // Runs every render!
});

// ✅ Empty dependency for mount only
useEffect(() => {
  // Runs once on mount
}, []);

// ❌ Setting state in render
render() {
  this.setState({ /* ... */ }); // infinite loop!
}

// ✅ Set state in event handler or effect
handleClick = () => {
  this.setState({ /* ... */ });
}
```

---

## File Structure Reference

```
src/
├── components/
│   ├── Header.jsx
│   ├── Footer.jsx
│   └── ...
├── hooks/
│   ├── useCustom.js
│   └── ...
├── context/
│   └── ThemeContext.js
├── styles/
│   └── App.css
├── App.jsx
└── index.js
```

---

**Quick Tip**: Use `npx create-react-app my-app` to scaffold a new React project quickly!

---

*For more details, refer to the main README.md and individual concept files.*
