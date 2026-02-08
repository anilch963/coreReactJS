import React, { useState } from "react";

// ============================================
// CONTEXT API - State Management
// ============================================

// 1. CREATING CONTEXT
const ThemeContext = React.createContext();
const UserContext = React.createContext();
const NotificationContext = React.createContext();

// 2. CONTEXT PROVIDER COMPONENT
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const value = { theme, toggleTheme };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

// 3. CONSUMING CONTEXT - CLASS COMPONENT
class ClassContextConsumer extends React.Component {
  static contextType = ThemeContext;

  render() {
    const { theme, toggleTheme } = this.context;
    return (
      <div style={{ background: theme === "dark" ? "#333" : "#fff" }}>
        <p>Theme: {theme}</p>
        <button onClick={toggleTheme}>Toggle Theme</button>
      </div>
    );
  }
}

// 4. CONSUMING CONTEXT - FUNCTIONAL COMPONENT WITH useContext
function FunctionalContextConsumer() {
  const { theme, toggleTheme } = React.useContext(ThemeContext);

  return (
    <div style={{ background: theme === "dark" ? "#333" : "#fff" }}>
      <p>Theme: {theme}</p>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
}

// 5. MULTIPLE CONTEXTS
function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  const value = { user, login, logout };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

function MultipleContextConsumer() {
  const { theme, toggleTheme } = React.useContext(ThemeContext);
  const { user, login, logout } = React.useContext(UserContext);

  return (
    <div style={{ background: theme === "dark" ? "#333" : "#fff", color: theme === "dark" ? "#fff" : "#000" }}>
      <p>Theme: {theme}</p>
      <p>User: {user ? user.name : "Not logged in"}</p>
      <button onClick={toggleTheme}>Toggle Theme</button>
      {!user ? (
        <button onClick={() => login({ name: "Alice", email: "alice@example.com" })}>
          Login
        </button>
      ) : (
        <button onClick={logout}>Logout</button>
      )}
    </div>
  );
}

// 6. CONTEXT WITH NESTED COMPONENTS
function Header() {
  const { user } = React.useContext(UserContext);

  return <header>{user ? `Hello, ${user.name}` : "Welcome"}</header>;
}

function Sidebar() {
  const { theme } = React.useContext(ThemeContext);

  return <aside style={{ background: theme === "dark" ? "#222" : "#f0f0f0" }}>Sidebar</aside>;
}

function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <Header />
        <Sidebar />
      </UserProvider>
    </ThemeProvider>
  );
}

// 7. CONTEXT WITH REDUCER
const InitialState = { notifications: [] };

function notificationReducer(state, action) {
  switch (action.type) {
    case "ADD_NOTIFICATION":
      return {
        ...state,
        notifications: [...state.notifications, action.payload]
      };
    case "REMOVE_NOTIFICATION":
      return {
        ...state,
        notifications: state.notifications.filter(
          (notif) => notif.id !== action.payload
        )
      };
    case "CLEAR_NOTIFICATIONS":
      return { ...state, notifications: [] };
    default:
      return state;
  }
}

function NotificationProvider({ children }) {
  const [state, dispatch] = React.useReducer(notificationReducer, InitialState);

  const addNotification = (message, type = "info") => {
    dispatch({
      type: "ADD_NOTIFICATION",
      payload: { id: Date.now(), message, type }
    });
  };

  const removeNotification = (id) => {
    dispatch({ type: "REMOVE_NOTIFICATION", payload: id });
  };

  const value = { state, addNotification, removeNotification };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}

function NotificationConsumer() {
  const { state, addNotification, removeNotification } = React.useContext(
    NotificationContext
  );

  return (
    <div>
      <button onClick={() => addNotification("Success!", "success")}>
        Add Notification
      </button>
      <div>
        {state.notifications.map((notif) => (
          <div key={notif.id} className={`notification notification-${notif.type}`}>
            {notif.message}
            <button onClick={() => removeNotification(notif.id)}>×</button>
          </div>
        ))}
      </div>
    </div>
  );
}

// 8. AVOIDING CONTEXT PITFALL - Unnecessary Re-renders
const OptimizedThemeContext = React.createContext();

function OptimizedThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  // Memoize the context value to avoid re-renders
  const value = React.useMemo(
    () => ({
      theme,
      toggleTheme: () => setTheme((t) => (t === "light" ? "dark" : "light"))
    }),
    [theme]
  );

  return (
    <OptimizedThemeContext.Provider value={value}>
      {children}
    </OptimizedThemeContext.Provider>
  );
}

// 9. CUSTOM HOOK FOR CONTEXT
function useTheme() {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}

function useNotifications() {
  const context = React.useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotifications must be used within NotificationProvider");
  }
  return context;
}

function CustomHookConsumer() {
  const { theme, toggleTheme } = useTheme();
  const { addNotification } = useNotifications();

  return (
    <div>
      <p>Theme: {theme}</p>
      <button onClick={toggleTheme}>Toggle</button>
      <button onClick={() => addNotification("Custom hook notification")}>
        Notify
      </button>
    </div>
  );
}

// 10. CONTEXT COMPOSITION PATTERN
function ComposedProvider({ children }) {
  return (
    <ThemeProvider>
      <UserProvider>
        <NotificationProvider>
          {children}
        </NotificationProvider>
      </UserProvider>
    </ThemeProvider>
  );
}

// 11. CONTEXT WITH DEFAULT VALUE
const ConfigContext = React.createContext({
  apiUrl: "http://localhost:3000",
  timeout: 5000
});

function ConfigConsumer() {
  const config = React.useContext(ConfigContext);
  return <div>API URL: {config.apiUrl}</div>;
}

// 12. PARTIAL CONTEXT UPDATE
function UserProfileContext() {
  const [profile, setProfile] = useState({
    name: "John",
    email: "john@example.com",
    age: 30
  });

  const updateProfile = (updates) => {
    setProfile((prev) => ({ ...prev, ...updates }));
  };

  return (
    <div>
      <p>Name: {profile.name}</p>
      <p>Email: {profile.email}</p>
      <button onClick={() => updateProfile({ name: "Jane" })}>
        Update Name
      </button>
    </div>
  );
}

// 13. CONTEXT SELECTOR PATTERN (to optimize performance)
function useContextSelector(context, selector) {
  const value = React.useContext(context);
  return React.useMemo(() => selector(value), [value, selector]);
}

function ContextSelectorExample() {
  const { theme } = useContextSelector(ThemeContext, (ctx) => ({
    theme: ctx.theme
  }));

  return <p>Theme: {theme}</p>;
}

// 14. CONTEXT WITH INITIAL STATE FROM PROPS
function DynamicThemeProvider({ initialTheme = "light", children }) {
  const [theme, setTheme] = useState(initialTheme);

  const value = {
    theme,
    toggleTheme: () => setTheme((t) => (t === "light" ? "dark" : "light"))
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

// 15. CONTEXT TESTING HELPER
function renderWithContext(component, providers = {}) {
  return (
    <ThemeProvider>
      <UserProvider>
        <NotificationProvider>
          {component}
        </NotificationProvider>
      </UserProvider>
    </ThemeProvider>
  );
}

export {
  ThemeContext,
  UserContext,
  NotificationContext,
  ThemeProvider,
  ClassContextConsumer,
  FunctionalContextConsumer,
  UserProvider,
  MultipleContextConsumer,
  Header,
  Sidebar,
  App,
  NotificationProvider,
  NotificationConsumer,
  OptimizedThemeProvider,
  useTheme,
  useNotifications,
  CustomHookConsumer,
  ComposedProvider,
  ConfigContext,
  ConfigConsumer,
  UserProfileContext,
  useContextSelector,
  ContextSelectorExample,
  DynamicThemeProvider,
  renderWithContext
};
