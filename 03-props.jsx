import React from "react";

// ============================================
// PROPS - Component Properties
// ============================================

// 1. BASIC PROPS
function Greeting(props) {
  return <h1>Hello, {props.name}!</h1>;
}

// Usage: <Greeting name="Alice" />

// 2. DESTRUCTURING PROPS
function Card({ title, description, color }) {
  return (
    <div style={{ borderColor: color }} className="card">
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
}

// Usage: <Card title="My Card" description="Card content" color="blue" />

// 3. DEFAULT PROPS
function Button({ label = "Click me", type = "button", size = "md" }) {
  return (
    <button className={`btn btn-${type} btn-${size}`}>{label}</button>
  );
}

// OR using defaultProps property
function Alert({ message, type }) {
  return <div className={`alert alert-${type}`}>{message}</div>;
}
Alert.defaultProps = {
  message: "Default message",
  type: "info"
};

// 4. PROP TYPES (Runtime validation)
function User({ name, age, email }) {
  return (
    <div className="user-card">
      <p>Name: {name}</p>
      <p>Age: {age}</p>
      <p>Email: {email}</p>
    </div>
  );
}

// Note: PropTypes would be imported and defined here
// import PropTypes from 'prop-types';
// User.propTypes = {
//   name: PropTypes.string.isRequired,
//   age: PropTypes.number,
//   email: PropTypes.string.isRequired,
// };

// 5. PROPS WITH CHILDREN
function Container({ children, className = "" }) {
  return <div className={`container ${className}`}>{children}</div>;
}

// Usage:
// <Container className="main">
//   <p>Content here</p>
// </Container>

// 6. REST PROPS
function Link({ href, target = "_self", ...rest }) {
  return <a href={href} target={target} {...rest} />;
}

// Usage: <Link href="/home" rel="noopener" className="nav-link" />

// 7. SPREADING PROPS
const props = {
  name: "Bob",
  age: 30,
  email: "bob@example.com"
};

function SpreadExample() {
  return <User {...props} />;
}

// 8. CONDITIONAL PROPS
function Notification({ message, type = "info", dismissible = false }) {
  return (
    <div className={`notification notification-${type}`}>
      {message}
      {dismissible && <button>×</button>}
    </div>
  );
}

// 9. PROPS AS FUNCTION
function ButtonWithClick({ onClick, label }) {
  return <button onClick={onClick}>{label}</button>;
}

// Usage: <ButtonWithClick onClick={() => alert('Clicked!')} label="Click me" />

// 10. PROPS AS OBJECT
function Settings({ config }) {
  return (
    <div>
      <p>Theme: {config.theme}</p>
      <p>Language: {config.language}</p>
      <p>Notifications: {config.notifications ? "On" : "Off"}</p>
    </div>
  );
}

const configSettings = {
  theme: "dark",
  language: "en",
  notifications: true
};

// Usage: <Settings config={configSettings} />

// 11. PROPS AS ARRAY
function TodoList({ items }) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}

const todos = ["Learn React", "Build projects", "Master concepts"];

// Usage: <TodoList items={todos} />

// 12. IMMUTABLE PROPS UPDATE PATTERN
function ParentComponent() {
  const [user, setUser] = React.useState({ name: "Alice", age: 25 });

  const updateUser = (newData) => {
    setUser({ ...user, ...newData });
  };

  return (
    <ChildComponent
      user={user}
      onUpdate={updateUser}
    />
  );
}

function ChildComponent({ user, onUpdate }) {
  const handleNameChange = (newName) => {
    onUpdate({ name: newName });
  };

  return (
    <div>
      <p>{user.name}</p>
      <button onClick={() => handleNameChange("Bob")}>Change Name</button>
    </div>
  );
}

// 13. RENDER PROPS PATTERN
function MouseTracker({ render }) {
  const [position, setPosition] = React.useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    setPosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <div onMouseMove={handleMouseMove}>
      {render(position)}
    </div>
  );
}

// Usage:
// <MouseTracker render={(pos) => <p>X: {pos.x}, Y: {pos.y}</p>} />

// 14. VALIDATION EXAMPLE (manual)
function StrictInput({ value, onChange, type = "text", required = false }) {
  const handleChange = (e) => {
    const newValue = e.target.value;
    if (type === "number" && isNaN(newValue)) {
      console.warn("Input must be a number");
      return;
    }
    onChange(newValue);
  };

  return (
    <input
      type={type}
      value={value}
      onChange={handleChange}
      required={required}
    />
  );
}

// 15. FORWARDING PROPS
function CustomButton(props) {
  const { customProp, ...buttonProps } = props;
  return <button {...buttonProps} />;
}

export {
  Greeting,
  Card,
  Button,
  Alert,
  User,
  Container,
  Link,
  SpreadExample,
  Notification,
  ButtonWithClick,
  Settings,
  TodoList,
  ParentComponent,
  MouseTracker,
  StrictInput,
  CustomButton
};
