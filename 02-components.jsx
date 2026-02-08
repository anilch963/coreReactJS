import React from "react";

// ============================================
// COMPONENTS
// ============================================

// 1. FUNCTIONAL COMPONENTS (Modern approach)
function FunctionalComponent() {
  return <div>I'm a functional component</div>;
}

// 2. ARROW FUNCTION COMPONENT
const ArrowComponent = () => {
  return <div>I'm an arrow function component</div>;
};

// 3. CLASS COMPONENT (Legacy but still used)
class ClassComponent extends React.Component {
  render() {
    return <div>I'm a class component</div>;
  }
}

// 4. COMPONENT WITH STATE (Function + Hooks)
function Counter() {
  const [count, setCount] = React.useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

// 5. COMPONENT WITH LIFECYCLE (Class Component)
class LifecycleComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { message: "Initial" };
  }

  componentDidMount() {
    console.log("Component mounted");
    // Fetch data, set up subscriptions here
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("Component updated");
  }

  componentWillUnmount() {
    console.log("Component unmounting");
    // Clean up subscriptions, timers
  }

  render() {
    return <div>{this.state.message}</div>;
  }
}

// 6. COMPONENT WITH USEEFFECT (Function Hook version)
function EffectComponent() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    // This runs after render
    console.log("Effect running");
    // Simulate fetching data
    const timer = setTimeout(() => {
      setData("Fetched data");
    }, 1000);

    // Cleanup function (like componentWillUnmount)
    return () => {
      clearTimeout(timer);
    };
  }, []); // Empty dependency array = runs once on mount

  return <div>{data || "Loading..."}</div>;
}

// 7. PURE COMPONENT (Class - memoized)
class PureComponent extends React.PureComponent {
  render() {
    return <div>I only re-render if props/state change</div>;
  }
}

// 8. MEMO COMPONENT (Function - memoized)
const MemoComponent = React.memo(({ name }) => {
  console.log("Rendering MemoComponent");
  return <div>Hello, {name}!</div>;
});

// 9. CONTROLLED COMPONENT
function ControlledComponent() {
  const [value, setValue] = React.useState("");

  return (
    <div>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Type here"
      />
      <p>You typed: {value}</p>
    </div>
  );
}

// 10. UNCONTROLLED COMPONENT (using ref)
function UncontrolledComponent() {
  const inputRef = React.useRef(null);

  const handleSubmit = () => {
    alert("Input value: " + inputRef.current.value);
  };

  return (
    <div>
      <input ref={inputRef} />
      <button onClick={handleSubmit}>Get Value</button>
    </div>
  );
}

// 11. WRAPPER/CONTAINER COMPONENT
function WrapperComponent({ children, title }) {
  return (
    <div className="wrapper">
      <h2>{title}</h2>
      <div className="content">{children}</div>
    </div>
  );
}

// 12. COMPOUND COMPONENT
function Accordion() {
  const [activeIndex, setActiveIndex] = React.useState(null);

  return (
    <div>
      <AccordionItem
        title="Item 1"
        index={0}
        isActive={activeIndex === 0}
        onClick={() => setActiveIndex(0)}
      >
        Content 1
      </AccordionItem>
      <AccordionItem
        title="Item 2"
        index={1}
        isActive={activeIndex === 1}
        onClick={() => setActiveIndex(1)}
      >
        Content 2
      </AccordionItem>
    </div>
  );
}

function AccordionItem({ title, index, isActive, onClick, children }) {
  return (
    <div className="accordion-item">
      <button onClick={onClick}>{title}</button>
      {isActive && <div className="accordion-content">{children}</div>}
    </div>
  );
}

export {
  FunctionalComponent,
  ArrowComponent,
  ClassComponent,
  Counter,
  LifecycleComponent,
  EffectComponent,
  PureComponent,
  MemoComponent,
  ControlledComponent,
  UncontrolledComponent,
  WrapperComponent,
  Accordion,
  AccordionItem
};
