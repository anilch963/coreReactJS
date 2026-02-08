import React from "react";

// ============================================
// ADVANCED CONCEPTS
// ============================================

// 1. HIGHER-ORDER COMPONENT (HOC)
function withTheme(Component) {
  return function ThemedComponent(props) {
    const [theme, setTheme] = React.useState("light");

    return (
      <Component {...props} theme={theme} setTheme={setTheme} />
    );
  };
}

function Display({ theme, setTheme }) {
  return (
    <div style={{ background: theme === "dark" ? "#333" : "#fff" }}>
      <p>Current theme: {theme}</p>
      <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
        Toggle
      </button>
    </div>
  );
}

const ThemedDisplay = withTheme(Display);

// 2. RENDER PROPS PATTERN
function MouseTracker({ render }) {
  const [position, setPosition] = React.useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    setPosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <div onMouseMove={handleMouseMove} style={{ height: "300px", border: "1px solid" }}>
      {render(position)}
    </div>
  );
}

function MouseDisplay() {
  return (
    <MouseTracker
      render={(position) => (
        <p>
          Mouse Position: X={position.x}, Y={position.y}
        </p>
      )}
    />
  );
}

// 3. COMPOUND COMPONENTS
function Tabs() {
  const [activeTab, setActiveTab] = React.useState(0);

  return (
    <div>
      <TabList activeTab={activeTab} setActiveTab={setActiveTab}>
        <Tab>Tab 1</Tab>
        <Tab>Tab 2</Tab>
        <Tab>Tab 3</Tab>
      </TabList>
      <TabPanels activeTab={activeTab}>
        <TabPanel>Content 1</TabPanel>
        <TabPanel>Content 2</TabPanel>
        <TabPanel>Content 3</TabPanel>
      </TabPanels>
    </div>
  );
}

function TabList({ children, activeTab, setActiveTab }) {
  return (
    <div className="tab-list">
      {React.Children.map(children, (child, index) =>
        React.cloneElement(child, {
          isActive: index === activeTab,
          onClick: () => setActiveTab(index)
        })
      )}
    </div>
  );
}

function Tab({ children, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={isActive ? "tab active" : "tab"}
    >
      {children}
    </button>
  );
}

function TabPanels({ children, activeTab }) {
  return (
    <div className="tab-panels">
      {React.Children.toArray(children)[activeTab]}
    </div>
  );
}

function TabPanel({ children }) {
  return <div className="tab-panel">{children}</div>;
}

// 4. FORWARDING REFS
const CustomInput = React.forwardRef((props, ref) => {
  return <input ref={ref} {...props} />;
});

CustomInput.displayName = "CustomInput";

function RefForwarding() {
  const inputRef = React.useRef(null);

  return (
    <div>
      <CustomInput ref={inputRef} placeholder="Focus me" />
      <button onClick={() => inputRef.current.focus()}>Focus Input</button>
    </div>
  );
}

// 5. LAZY LOADING & CODE SPLITTING
const HeavyComponent = React.lazy(() =>
  import("./HeavyComponent").catch(() => {
    return { default: () => <div>Failed to load component</div> };
  })
);

function LazyLoadingExample() {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <HeavyComponent />
    </React.Suspense>
  );
}

// 6. ERROR BOUNDARIES
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.log("Error caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h1>Something went wrong</h1>
          <details>{this.state.error?.toString()}</details>
        </div>
      );
    }

    return this.props.children;
  }
}

function ProblematicComponent() {
  throw new Error("This component throws an error");
}

function ErrorBoundaryExample() {
  return (
    <ErrorBoundary>
      <ProblematicComponent />
    </ErrorBoundary>
  );
}

// 7. PORTALS - Render outside DOM hierarchy
function Modal({ onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Modal Content</h2>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

function PortalExample() {
  const [showModal, setShowModal] = React.useState(false);

  return (
    <div>
      <button onClick={() => setShowModal(true)}>Open Modal</button>
      {showModal &&
        ReactDOM.createPortal(
          <Modal onClose={() => setShowModal(false)},
          document.body
        )}
    </div>
  );
}

// 8. COMPOSITION OVER INHERITANCE
function Button({ variant = "primary", ...props }) {
  return <button className={`btn btn-${variant}`} {...props} />;
}

function PrimaryButton(props) {
  return <Button {...props} variant="primary" />;
}

function SecondaryButton(props) {
  return <Button {...props} variant="secondary" />;
}

// 9. CONTROLLED VS UNCONTROLLED COMPONENTS
function ControlledComponent() {
  const [value, setValue] = React.useState("");

  return (
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Controlled"
    />
  );
}

function UncontrolledComponent() {
  const inputRef = React.useRef(null);

  const handleClick = () => {
    alert("Input value: " + inputRef.current.value);
  };

  return (
    <div>
      <input ref={inputRef} defaultValue="Uncontrolled" />
      <button onClick={handleClick}>Get Value</button>
    </div>
  );
}

// 10. CLONING ELEMENTS - React.cloneElement
function Parent() {
  const [count, setCount] = React.useState(0);

  return (
    <div>
      <Child count={count} setCount={setCount} />
      <Sibling count={count} />
    </div>
  );
}

function Child({ count, setCount }) {
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

function Sibling({ count }) {
  return <p>Count: {count}</p>;
}

// 11. CHILDREN AS FUNCTIONS (Function as Child)
function Container({ children }) {
  const [count, setCount] = React.useState(0);

  if (typeof children === "function") {
    return children(count, setCount);
  }

  return <div>{children}</div>;
}

function FunctionChildExample() {
  return (
    <Container>
      {(count, setCount) => (
        <div>
          <p>Count: {count}</p>
          <button onClick={() => setCount(count + 1)}>+</button>
        </div>
      )}
    </Container>
  );
}

// 12. LIFTING STATE UP
function TemperatureCalculator() {
  const [celsius, setCelsius] = React.useState("");

  const fahrenheit = (celsius * 9) / 5 + 32;

  return (
    <div>
      <TemperatureInput
        scale="C"
        value={celsius}
        onChange={setCelsius}
      />
      <TemperatureInput
        scale="F"
        value={fahrenheit}
        onChange={(f) => setCelsius((f - 32) * 5) / 9}
      />
    </div>
  );
}

function TemperatureInput({ scale, value, onChange }) {
  return (
    <div>
      <label>Temperature in {scale}:</label>
      <input value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}

// 13. PERFORMANCE OPTIMIZATION - Memoization
const MemoizedComponent = React.memo(({ name, age }) => {
  console.log("MemoizedComponent rendered");
  return <div>{name} - {age}</div>;
});

// 14. PERFORMANCE OPTIMIZATION - useCallback
function OptimizedList() {
  const [items, setItems] = React.useState([]);

  const addItem = React.useCallback(() => {
    setItems((prev) => [...prev, `Item ${prev.length + 1}`]);
  }, []);

  return (
    <div>
      <button onClick={addItem}>Add Item</button>
      <ListComponent items={items} />
    </div>
  );
}

const ListComponent = React.memo(({ items }) => {
  return (
    <ul>
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
});

// 15. KEYS IN RECONCILIATION
function KeyImportance() {
  const [items, setItems] = React.useState([
    { id: 1, name: "Item 1" },
    { id: 2, name: "Item 2" }
  ]);

  const addItem = () => {
    setItems([{ id: Math.random(), name: "New Item" }, ...items]);
  };

  return (
    <div>
      <button onClick={addItem}>Add Item</button>
      <ul>
        {items.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

export {
  withTheme,
  ThemedDisplay,
  MouseTracker,
  MouseDisplay,
  Tabs,
  RefForwarding,
  CustomInput,
  LazyLoadingExample,
  ErrorBoundary,
  PortalExample,
  PrimaryButton,
  SecondaryButton,
  ControlledComponent,
  UncontrolledComponent,
  Parent,
  Container,
  FunctionChildExample,
  TemperatureCalculator,
  MemoizedComponent,
  OptimizedList,
  KeyImportance
};
