import React, { useState, useEffect, useContext, useReducer, useCallback, useMemo, useRef } from "react";

// ============================================
// HOOKS - React Hooks
// ============================================

// 1. USESTATE HOOK (already covered in state.jsx, but including basic example)
function StateHookExample() {
  const [count, setCount] = useState(0);
  const [input, setInput] = useState("");

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type"
      />
    </div>
  );
}

// 2. USEEFFECT HOOK - Side effects
function EffectHookExample() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState(null);

  // Run effect after every render
  useEffect(() => {
    console.log("Effect running - count changed to:", count);
  });

  // Run effect only on mount (empty dependency array)
  useEffect(() => {
    console.log("Component mounted");
    return () => console.log("Component unmounting");
  }, []);

  // Run effect only when count changes
  useEffect(() => {
    console.log("Count changed to:", count);
  }, [count]);

  // Fetch data with cleanup
  useEffect(() => {
    const timer = setTimeout(() => {
      setData("Fetched data");
    }, 1000);

    return () => clearTimeout(timer); // Cleanup
  }, []);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      <p>{data}</p>
    </div>
  );
}

// 3. USECONTEXT HOOK - Access context values
const ThemeContext = React.createContext("light");

function ContextProvider({ children }) {
  const [theme, setTheme] = useState("light");

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function ContextConsumer() {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <div style={{ background: theme === "dark" ? "#333" : "#fff" }}>
      <p>Current theme: {theme}</p>
      <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
        Toggle Theme
      </button>
    </div>
  );
}

// 4. USEREDUCER HOOK - Complex state logic
const initialState = { count: 0, message: "" };

function reducer(state, action) {
  switch (action.type) {
    case "INCREMENT":
      return { ...state, count: state.count + 1 };
    case "DECREMENT":
      return { ...state, count: state.count - 1 };
    case "SET_MESSAGE":
      return { ...state, message: action.payload };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

function ReducerHookExample() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <p>Count: {state.count}</p>
      <p>Message: {state.message}</p>
      <button onClick={() => dispatch({ type: "INCREMENT" })}>+</button>
      <button onClick={() => dispatch({ type: "DECREMENT" })}>-</button>
      <input
        onChange={(e) => dispatch({ type: "SET_MESSAGE", payload: e.target.value })}
        placeholder="Set message"
      />
      <button onClick={() => dispatch({ type: "RESET" })}>Reset</button>
    </div>
  );
}

// 5. USECALLBACK HOOK - Memoize callbacks
function CallbackExample() {
  const [count, setCount] = useState(0);
  const [multiplier, setMultiplier] = useState(1);

  // Without useCallback, this is recreated on every render
  const handleClick = useCallback(() => {
    setCount((prev) => prev + multiplier);
  }, [multiplier]); // Only recreate if multiplier changes

  return (
    <div>
      <p>Count: {count}</p>
      <ChildComponent onButtonClick={handleClick} />
      <input
        type="number"
        value={multiplier}
        onChange={(e) => setMultiplier(parseInt(e.target.value))}
      />
    </div>
  );
}

function ChildComponent({ onButtonClick }) {
  console.log("ChildComponent rendered");
  return <button onClick={onButtonClick}>Increment</button>;
}

// 6. USEMEMO HOOK - Memoize expensive computations
function MemoExample() {
  const [count, setCount] = useState(0);
  const [multiplier, setMultiplier] = useState(1);

  const expensiveValue = useMemo(() => {
    console.log("Computing expensive value");
    let result = 0;
    for (let i = 0; i < 1000000; i++) {
      result += i;
    }
    return result * multiplier;
  }, [multiplier]); // Only recompute if multiplier changes

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      <p>Expensive Value: {expensiveValue}</p>
      <input
        type="number"
        value={multiplier}
        onChange={(e) => setMultiplier(parseInt(e.target.value))}
      />
    </div>
  );
}

// 7. USEREF HOOK - Persistent mutable value
function RefExample() {
  const [count, setCount] = useState(0);
  const renderCount = useRef(0);

  useEffect(() => {
    renderCount.current++;
  });

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Increment: {count}</button>
      <p>Total renders: {renderCount.current}</p>
    </div>
  );
}

// 8. USEREF FOR DOM ACCESS
function FocusExample() {
  const inputRef = useRef(null);

  const handleFocus = () => {
    inputRef.current.focus();
  };

  return (
    <div>
      <input ref={inputRef} placeholder="Click button to focus" />
      <button onClick={handleFocus}>Focus Input</button>
    </div>
  );
}

// 9. MULTIPLE HOOKS
function CombinedHooks() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);
  const searchCount = useRef(0);

  const handleSearch = useCallback((query) => {
    searchCount.current++;
    // Simulate search
    setResults([`Result for "${query}"`, "Another result"]);
  }, []);

  useEffect(() => {
    if (input.trim()) {
      const timer = setTimeout(() => {
        handleSearch(input);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [input, handleSearch]);

  return (
    <div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Search"
      />
      <p>Searches: {searchCount.current}</p>
      <ul>
        {results.map((result, i) => (
          <li key={i}>{result}</li>
        ))}
      </ul>
    </div>
  );
}

// 10. CUSTOM HOOK - useLocalStorage
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = useCallback((value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  }, [key, storedValue]);

  return [storedValue, setValue];
}

function CustomHookExample() {
  const [name, setName] = useLocalStorage("name", "");

  return (
    <div>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter name (saved to localStorage)"
      />
      <p>Stored name: {name}</p>
    </div>
  );
}

// 11. CUSTOM HOOK - useFetch
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch");
        const json = await response.json();
        setData(json);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
}

function FetchHookExample({ url }) {
  const { data, loading, error } = useFetch(url);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return <div>{JSON.stringify(data)}</div>;
}

// 12. CUSTOM HOOK - useToggle
function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);
  const toggle = useCallback(() => setValue((v) => !v), []);
  return [value, toggle];
}

function ToggleHookExample() {
  const [isVisible, toggle] = useToggle(true);

  return (
    <div>
      <button onClick={toggle}>{isVisible ? "Hide" : "Show"}</button>
      {isVisible && <p>Content is visible</p>}
    </div>
  );
}

// 13. CUSTOM HOOK - useAsync
function useAsync(asyncFunction, immediate = true) {
  const [status, setStatus] = useState("idle");
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const execute = useCallback(async () => {
    setStatus("pending");
    setData(null);
    setError(null);
    try {
      const response = await asyncFunction();
      setData(response);
      setStatus("success");
      return response;
    } catch (error) {
      setError(error);
      setStatus("error");
    }
  }, [asyncFunction]);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return { execute, status, data, error };
}

// 14. DEPENDENCIES WARNING
function DependenciesTip() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState(null);

  // ❌ WRONG: If dependency array is missing, effect runs every render
  useEffect(() => {
    console.log("This runs every render!");
  }); // No dependency array

  // ✅ CORRECT: Runs once on mount
  useEffect(() => {
    console.log("Runs once on mount");
  }, []);

  // ✅ CORRECT: Runs when count changes
  useEffect(() => {
    console.log("Runs when count changes");
  }, [count]);

  return <button onClick={() => setCount(count + 1)}>Count: {count}</button>;
}

// 15. CLEANUP FUNCTION
function CleanupExample() {
  const [isSubscribed, setIsSubscribed] = useState(true);

  useEffect(() => {
    const subscription = {
      unsubscribe: () => console.log("Unsubscribed")
    };

    // Subscribe
    console.log("Subscribed");

    // Cleanup function
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <button onClick={() => setIsSubscribed(!isSubscribed)}>
      Subscription: {isSubscribed ? "Active" : "Inactive"}
    </button>
  );
}

export {
  StateHookExample,
  EffectHookExample,
  ContextProvider,
  ContextConsumer,
  ReducerHookExample,
  CallbackExample,
  MemoExample,
  RefExample,
  FocusExample,
  CombinedHooks,
  useLocalStorage,
  CustomHookExample,
  useFetch,
  FetchHookExample,
  useToggle,
  ToggleHookExample,
  useAsync,
  DependenciesTip,
  CleanupExample
};
