import React, { useState } from "react";

// ============================================
// CONDITIONAL RENDERING
// ============================================

// 1. IF/ELSE PATTERN
function IfElseExample({ isLoggedIn }) {
  if (isLoggedIn) {
    return <h1>Welcome Back!</h1>;
  } else {
    return <h1>Please Log In</h1>;
  }
}

// 2. TERNARY OPERATOR (most common)
function TernaryExample({ isLoggedIn }) {
  return (
    <div>
      <h1>{isLoggedIn ? "Welcome Back!" : "Please Log In"}</h1>
      <p>{isLoggedIn ? "You have access" : "Access denied"}</p>
    </div>
  );
}

// 3. LOGICAL AND (&&) - render only if true
function LogicalAndExample({ itemCount }) {
  return (
    <div>
      {itemCount > 0 && <p>You have {itemCount} items</p>}
      {itemCount === 0 && <p>No items found</p>}
    </div>
  );
}

// 4. LOGICAL OR (||) - fallback rendering
function LogicalOrExample({ username }) {
  return (
    <div>
      <p>Welcome, {username || "Guest"}!</p>
    </div>
  );
}

// 5. SWITCH STATEMENT
function SwitchExample({ status }) {
  let message;
  
  switch (status) {
    case "loading":
      message = "Loading...";
      break;
    case "success":
      message = "Success!";
      break;
    case "error":
      message = "Error occurred";
      break;
    default:
      message = "Unknown status";
  }

  return <p>{message}</p>;
}

// 6. SWITCH WITH JSX (using object)
function SwitchJSXExample({ status }) {
  const statusMessages = {
    loading: <div className="spinner">Loading...</div>,
    success: <div className="success">Success!</div>,
    error: <div className="error">Error occurred</div>,
    default: <div>Unknown status</div>
  };

  return statusMessages[status] || statusMessages.default;
}

// 7. CONDITIONAL COMPONENT RENDERING
function ConditionalComponent({ showDetails, data }) {
  return (
    <div>
      <h2>Main Content</h2>
      {showDetails && (
        <Details data={data} />
      )}
    </div>
  );
}

function Details({ data }) {
  return <p>Details: {JSON.stringify(data)}</p>;
}

// 8. MULTIPLE CONDITIONAL RENDERING
function MultipleConditions({ user }) {
  return (
    <div>
      {user.isAdmin && <AdminPanel />}
      {user.isPremium && <PremiumFeatures />}
      {!user.isVerified && <VerificationPrompt />}
    </div>
  );
}

function AdminPanel() {
  return <div className="admin">Admin Panel</div>;
}

function PremiumFeatures() {
  return <div className="premium">Premium Features</div>;
}

function VerificationPrompt() {
  return <div className="verification">Please verify your email</div>;
}

// 9. CONDITIONAL RENDERING WITH STATE
function ConditionalWithState() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div>
      <button onClick={() => setIsExpanded(!isExpanded)}>
        {isExpanded ? "Collapse" : "Expand"}
      </button>
      {isExpanded && (
        <div className="expanded-content">
          <p>Expanded content goes here</p>
        </div>
      )}
    </div>
  );
}

// 10. CONDITIONAL CLASS NAME
function ConditionalClassName({ isActive, isDisabled }) {
  const className = `button ${isActive ? "active" : ""} ${isDisabled ? "disabled" : ""}`;
  
  return <button className={className}>Click me</button>;
}

// 11. CONDITIONAL STYLE
function ConditionalStyle({ theme }) {
  const style = {
    backgroundColor: theme === "dark" ? "#333" : "#fff",
    color: theme === "dark" ? "#fff" : "#000",
    padding: "10px"
  };

  return <div style={style}>Themed Content</div>;
}

// 12. EARLY RETURN PATTERN
function EarlyReturnExample({ user, isLoading, error }) {
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!user) {
    return <div>No user found</div>;
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
}

// 13. ELEMENT VARIABLE
function ElementVariable({ status }) {
  let content;

  if (status === "loading") {
    content = <div className="spinner">Loading...</div>;
  } else if (status === "success") {
    content = <div className="success">Success!</div>;
  } else if (status === "error") {
    content = <div className="error">Error!</div>;
  }

  return (
    <div>
      <h2>Status</h2>
      {content}
    </div>
  );
}

// 14. CONDITIONAL RENDERING IN LISTS
function ConditionalInLists() {
  const items = [
    { id: 1, name: "Item 1", active: true },
    { id: 2, name: "Item 2", active: false },
    { id: 3, name: "Item 3", active: true }
  ];

  return (
    <ul>
      {items.map((item) => (
        <li key={item.id} className={item.active ? "active" : "inactive"}>
          {item.name}
          {item.active && <span className="badge">Active</span>}
        </li>
      ))}
    </ul>
  );
}

// 15. CONDITIONAL RENDERING HELPER
function ConditionalRender({ condition, children, fallback = null }) {
  return condition ? children : fallback;
}

// Usage: <ConditionalRender condition={isVisible}><div>Visible</div></ConditionalRender>

// 16. RENDER NOTHING
function RenderNothing({ shouldRender }) {
  // Return null to render nothing
  if (!shouldRender) {
    return null;
  }

  return <div>This is rendered conditionally</div>;
}

// 17. CONDITIONAL FRAGMENT
function ConditionalFragment({ showHeader, showFooter }) {
  return (
    <>
      {showHeader && (
        <>
          <header>Header</header>
        </>
      )}
      <main>Main content</main>
      {showFooter && (
        <>
          <footer>Footer</footer>
        </>
      )}
    </>
  );
}

// 18. NULLISH COALESCING
function NullishCoalescing({ user }) {
  return (
    <div>
      <p>Name: {user?.name ?? "Unknown"}</p>
      <p>Email: {user?.email ?? "Not provided"}</p>
    </div>
  );
}

// 19. OPTIONAL CHAINING WITH RENDERING
function OptionalChaining({ data }) {
  return (
    <div>
      {data?.user?.profile?.avatar && (
        <img src={data.user.profile.avatar} alt="Avatar" />
      )}
      <p>{data?.user?.name ?? "No user"}</p>
    </div>
  );
}

// 20. COMPLEX CONDITIONAL LOGIC
function ComplexConditional({ user, isLoading, error, itemCount }) {
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  if (!user) {
    return <div className="login-prompt">Please log in</div>;
  }

  if (!user.isVerified) {
    return <div className="warning">Please verify your account</div>;
  }

  if (itemCount === 0) {
    return <div className="empty">No items available</div>;
  }

  return (
    <div>
      <h2>Welcome, {user.name}!</h2>
      <p>You have {itemCount} items</p>
    </div>
  );
}

export {
  IfElseExample,
  TernaryExample,
  LogicalAndExample,
  LogicalOrExample,
  SwitchExample,
  SwitchJSXExample,
  ConditionalComponent,
  MultipleConditions,
  ConditionalWithState,
  ConditionalClassName,
  ConditionalStyle,
  EarlyReturnExample,
  ElementVariable,
  ConditionalInLists,
  ConditionalRender,
  RenderNothing,
  ConditionalFragment,
  NullishCoalescing,
  OptionalChaining,
  ComplexConditional
};
