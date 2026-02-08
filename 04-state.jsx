import React, { useState } from "react";

// ============================================
// STATE MANAGEMENT
// ============================================

// 1. CLASS COMPONENT STATE
class CounterClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      message: "Initial"
    };
  }

  increment = () => {
    this.setState({ count: this.state.count + 1 });
  };

  decrement = () => {
    this.setState({ count: this.state.count - 1 });
  };

  render() {
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <p>{this.state.message}</p>
        <button onClick={this.increment}>+</button>
        <button onClick={this.decrement}>-</button>
      </div>
    );
  }
}

// 2. FUNCTIONAL COMPONENT STATE (useState Hook)
function CounterFunction() {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState("Initial");

  return (
    <div>
      <p>Count: {count}</p>
      <p>{message}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => setCount(count - 1)}>-</button>
      <button onClick={() => setMessage("Updated!")}>Update Message</button>
    </div>
  );
}

// 3. STATE WITH OBJECT
function FormState() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  return (
    <div>
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
      />
      <input
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <input
        name="age"
        value={formData.age}
        onChange={handleChange}
        placeholder="Age"
      />
      <p>Form Data: {JSON.stringify(formData)}</p>
    </div>
  );
}

// 4. STATE WITH ARRAY
function TodoApp() {
  const [todos, setTodos] = useState(["Learn React", "Build app"]);
  const [input, setInput] = useState("");

  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, input]);
      setInput("");
    }
  };

  const removeTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  return (
    <div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add todo"
      />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            {todo}
            <button onClick={() => removeTodo(index)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

// 5. MULTIPLE STATE VARIABLES
function MultipleStates() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const [count, setCount] = useState(0);

  return (
    <div>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <input value={email} onChange={(e) => setEmail(e.target.value)} />
      <button onClick={() => setIsVisible(!isVisible)}>Toggle</button>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
    </div>
  );
}

// 6. LAZY INITIALIZATION
function ExpensiveState() {
  const [data, setData] = useState(() => {
    // This function runs only once on mount
    console.log("Expensive computation");
    return expensiveOperation();
  });

  const expensiveOperation = () => {
    // Simulate expensive operation
    return Array.from({ length: 1000 }, (_, i) => i);
  };

  return <div>Data loaded: {data.length} items</div>;
}

// 7. CONDITIONAL STATE UPDATE
function ConditionalUpdate() {
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    // Update based on previous state
    setCount((prevCount) => {
      if (prevCount < 10) {
        return prevCount + 1;
      }
      return prevCount; // Don't increment if >= 10
    });
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={handleIncrement}>Increment (max 10)</button>
    </div>
  );
}

// 8. BATCH STATE UPDATES
function BatchUpdate() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    // In React 18+, these are automatically batched
    setName("");
    setEmail("");
    setSubmitted(true);
  };

  return (
    <div>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <input value={email} onChange={(e) => setEmail(e.target.value)} />
      <button onClick={handleSubmit}>Submit</button>
      {submitted && <p>Form submitted!</p>}
    </div>
  );
}

// 9. STATE WITH TIMER
function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  React.useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  return (
    <div>
      <p>Time: {seconds}s</p>
      <button onClick={() => setIsRunning(!isRunning)}>
        {isRunning ? "Stop" : "Start"}
      </button>
      <button onClick={() => setSeconds(0)}>Reset</button>
    </div>
  );
}

// 10. STATE WITH LOCAL STORAGE
function PersistentCounter() {
  const [count, setCount] = useState(() => {
    const saved = localStorage.getItem("counter");
    return saved ? parseInt(saved) : 0;
  });

  React.useEffect(() => {
    localStorage.setItem("counter", count);
  }, [count]);

  return (
    <div>
      <p>Persistent Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
}

// 11. STATE DERIVATION (Computed state)
function DerivedState() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  // Don't store derived state, calculate it
  const fullName = `${firstName} ${lastName}`.trim();

  return (
    <div>
      <input
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        placeholder="First name"
      />
      <input
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        placeholder="Last name"
      />
      <p>Full Name: {fullName}</p>
    </div>
  );
}

// 12. STATE BASED ON PROPS
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);

  React.useEffect(() => {
    // Reset state when prop changes
    setUser(null);
    // Fetch user data
    fetchUser(userId).then(setUser);
  }, [userId]);

  const fetchUser = async (id) => {
    // Simulate API call
    return { id, name: `User ${id}` };
  };

  return <div>{user ? `User: ${user.name}` : "Loading..."}</div>;
}

// 13. COMPLEX STATE LOGIC (useReducer alternative)
function ComplexStateExample() {
  const [state, setState] = useState({
    count: 0,
    message: "",
    loading: false,
    error: null
  });

  const updateState = (updates) => {
    setState((prevState) => ({
      ...prevState,
      ...updates
    }));
  };

  return (
    <div>
      <button onClick={() => updateState({ count: state.count + 1 })}>
        Count: {state.count}
      </button>
      <input
        value={state.message}
        onChange={(e) => updateState({ message: e.target.value })}
      />
    </div>
  );
}

// 14. RACE CONDITION PREVENTION
function FetchData({ url }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      setLoading(true);
      const result = await fetch(url);
      const json = await result.json();
      
      if (isMounted) {
        setData(json);
        setLoading(false);
      }
    };

    loadData();

    return () => {
      isMounted = false; // Cleanup to prevent state update on unmounted component
    };
  }, [url]);

  return <div>{loading ? "Loading..." : JSON.stringify(data)}</div>;
}

export {
  CounterClass,
  CounterFunction,
  FormState,
  TodoApp,
  MultipleStates,
  ExpensiveState,
  ConditionalUpdate,
  BatchUpdate,
  Timer,
  PersistentCounter,
  DerivedState,
  UserProfile,
  ComplexStateExample,
  FetchData
};
