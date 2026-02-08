// ============================================
// JSX BASICS
// ============================================
// JSX is a syntax extension to JavaScript that produces React "elements"
// It looks similar to HTML/XML but is actually JavaScript

// 1. Basic JSX
const basicJSX = <h1>Hello, React!</h1>;

// 2. JSX with expressions
const name = "Alice";
const greeting = <h1>Hello, {name}!</h1>;

// 3. JSX as function return
function Welcome() {
  return <h1>Welcome to React</h1>;
}

// 4. JSX attributes
const element = (
  <div>
    <button className="btn" id="submit-btn" data-testid="button">
      Click me
    </button>
  </div>
);

// 5. JSX with children
const card = (
  <div className="card">
    <h2>Card Title</h2>
    <p>Card content goes here</p>
  </div>
);

// 6. JSX with JavaScript expressions
function Greeting({ user }) {
  return (
    <div>
      <h1>Hello, {user.name}!</h1>
      <p>Age: {user.age}</p>
      <p>Active: {user.isActive ? "Yes" : "No"}</p>
    </div>
  );
}

// 7. JSX with functions
function formatName(user) {
  return user.firstName + " " + user.lastName;
}

function App() {
  const user = {
    firstName: "John",
    lastName: "Doe"
  };
  return <h1>Hello, {formatName(user)}!</h1>;
}

// 8. JSX with array methods
function ItemList() {
  const items = ["Apple", "Banana", "Orange"];
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}

// 9. JSX fragments (no extra wrapper)
function FragmentExample() {
  return (
    <>
      <h1>Title</h1>
      <p>Content</p>
    </>
  );
}

// 10. Nested JSX
function NestedExample() {
  return (
    <div className="container">
      <header>
        <nav>
          <ul>
            <li>Home</li>
            <li>About</li>
          </ul>
        </nav>
      </header>
      <main>
        <section>Content</section>
      </main>
    </div>
  );
}

export { Welcome, Greeting, App, ItemList, FragmentExample, NestedExample };
