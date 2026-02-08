import React, { useState, useContext } from 'react';
import './App.css';

// Create Theme Context
const ThemeContext = React.createContext();

function App() {
  const [theme, setTheme] = useState('light');
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn JSX Basics', done: true },
    { id: 2, text: 'Master React Components', done: true },
    { id: 3, text: 'Understand Props', done: true },
    { id: 4, text: 'Learn State Management', done: false },
    { id: 5, text: 'Master React Hooks', done: false }
  ]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className={`app ${theme}`}>
        <Header onToggleTheme={toggleTheme} />
        <main>
          <ConceptsShowcase />
          <TodoApp todos={todos} setTodos={setTodos} />
        </main>
        <Footer />
      </div>
    </ThemeContext.Provider>
  );
}

// Header Component
function Header({ onToggleTheme }) {
  const { theme } = useContext(ThemeContext);

  return (
    <header className="header">
      <h1>⚛️ React.js Core Concepts</h1>
      <p>Complete Learning Package with 150+ Examples</p>
      <button 
        onClick={onToggleTheme} 
        className="theme-toggle"
        aria-label="Toggle theme"
      >
        {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
      </button>
    </header>
  );
}

// Showcase of Concepts
function ConceptsShowcase() {
  const concepts = [
    { title: 'JSX Basics', icon: '📝', desc: 'JSX syntax and expressions' },
    { title: 'Components', icon: '🧩', desc: 'Functional & class components' },
    { title: 'Props', icon: '📦', desc: 'Data passing & validation' },
    { title: 'State', icon: '🔄', desc: 'Component state management' },
    { title: 'Hooks', icon: '🪝', desc: 'React hooks & custom hooks' },
    { title: 'Context', icon: '🌐', desc: 'State sharing with Context API' }
  ];

  return (
    <section className="concepts">
      <h2>Key Concepts</h2>
      <div className="concepts-grid">
        {concepts.map((concept, index) => (
          <ConceptCard key={index} concept={concept} />
        ))}
      </div>
    </section>
  );
}

function ConceptCard({ concept }) {
  return (
    <div className="concept-card">
      <div className="concept-icon">{concept.icon}</div>
      <h3>{concept.title}</h3>
      <p>{concept.desc}</p>
    </div>
  );
}

// Todo App - Demonstrates Multiple Concepts
function TodoApp({ todos, setTodos }) {
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState('all');

  const addTodo = () => {
    if (input.trim()) {
      setTodos([
        ...todos,
        { id: Date.now(), text: input, done: false }
      ]);
      setInput('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, done: !todo.done } : todo
    ));
  };

  const removeTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'done') return todo.done;
    if (filter === 'pending') return !todo.done;
    return true;
  });

  const stats = {
    total: todos.length,
    done: todos.filter(t => t.done).length,
    pending: todos.filter(t => !t.done).length
  };

  return (
    <section className="todo-app">
      <h2>📋 Learning Progress Tracker</h2>
      
      <div className="stats">
        <div className="stat">
          <span className="stat-number">{stats.total}</span>
          <span className="stat-label">Total</span>
        </div>
        <div className="stat">
          <span className="stat-number">{stats.done}</span>
          <span className="stat-label">Completed</span>
        </div>
        <div className="stat">
          <span className="stat-number">{stats.pending}</span>
          <span className="stat-label">To Learn</span>
        </div>
      </div>

      <div className="todo-input">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          placeholder="Add new concept to learn..."
          className="input-field"
        />
        <button onClick={addTodo} className="btn btn-primary">
          Add
        </button>
      </div>

      <div className="filter-buttons">
        {['all', 'pending', 'done'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`btn ${filter === f ? 'btn-active' : 'btn-secondary'}`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <div className="todo-list">
        {filteredTodos.length > 0 ? (
          filteredTodos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={toggleTodo}
              onRemove={removeTodo}
            />
          ))
        ) : (
          <p className="empty-message">
            {filter === 'all' && 'No concepts yet. Add one to get started!'}
            {filter === 'done' && 'No completed concepts yet.'}
            {filter === 'pending' && 'All concepts completed! 🎉'}
          </p>
        )}
      </div>
    </section>
  );
}

function TodoItem({ todo, onToggle, onRemove }) {
  return (
    <div className="todo-item">
      <input
        type="checkbox"
        checked={todo.done}
        onChange={() => onToggle(todo.id)}
        className="todo-checkbox"
      />
      <span className={`todo-text ${todo.done ? 'done' : ''}`}>
        {todo.text}
      </span>
      <button
        onClick={() => onRemove(todo.id)}
        className="btn-remove"
        aria-label="Remove todo"
      >
        ×
      </button>
    </div>
  );
}

// Footer Component
function Footer() {
  const { theme } = useContext(ThemeContext);
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <p>
        📚 Check out all {150}+ examples in the repository
      </p>
      <p>
        🚀 Start learning: README.md → QUICK_REFERENCE.md → Files 01-11
      </p>
      <p>
        © {year} React.js Core Concepts | Happy Learning!
      </p>
    </footer>
  );
}

export default App;
