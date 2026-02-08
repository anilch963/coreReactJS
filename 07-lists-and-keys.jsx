import React from "react";

// ============================================
// LISTS AND KEYS
// ============================================

// 1. BASIC LIST RENDERING
function BasicList() {
  const items = ["Apple", "Banana", "Orange"];

  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}

// 2. LIST WITH OBJECTS
function ObjectList() {
  const users = [
    { id: 1, name: "Alice", age: 25 },
    { id: 2, name: "Bob", age: 30 },
    { id: 3, name: "Charlie", age: 28 }
  ];

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>
          {user.name} - {user.age} years old
        </li>
      ))}
    </ul>
  );
}

// 3. IMPORTANCE OF KEYS - ✅ CORRECT (use unique ID)
function ListWithCorrectKeys() {
  const items = [
    { id: 1, name: "Item 1" },
    { id: 2, name: "Item 2" },
    { id: 3, name: "Item 3" }
  ];

  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}

// 4. WHY NOT TO USE INDEX AS KEY - ❌ PROBLEMATIC
function ListWithIndexKeys() {
  const [items, setItems] = React.useState([
    { id: 1, name: "Item 1" },
    { id: 2, name: "Item 2" }
  ]);

  // If you add/remove items, index-based keys cause problems
  const addItem = () => {
    setItems([{ id: Math.random(), name: "New Item" }, ...items]);
  };

  return (
    <div>
      <button onClick={addItem}>Add Item</button>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item.name}</li> {/* ❌ Problematic if list changes */}
        ))}
      </ul>
    </div>
  );
}

// 5. KEY WITH FILTERING
function FilteredList() {
  const [filter, setFilter] = React.useState("");
  const items = [
    { id: 1, name: "Apple" },
    { id: 2, name: "Apricot" },
    { id: 3, name: "Banana" },
    { id: 4, name: "Blueberry" }
  ];

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <input
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Filter items"
      />
      <ul>
        {filteredItems.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

// 6. LIST WITH COMPONENTS
function UserCard({ user }) {
  return (
    <div className="user-card">
      <h3>{user.name}</h3>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
    </div>
  );
}

function UserList() {
  const users = [
    { id: 1, name: "Alice", email: "alice@example.com", role: "Admin" },
    { id: 2, name: "Bob", email: "bob@example.com", role: "User" },
    { id: 3, name: "Charlie", email: "charlie@example.com", role: "User" }
  ];

  return (
    <div>
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
}

// 7. NESTED LISTS
function NestedList() {
  const categories = [
    {
      id: 1,
      name: "Fruits",
      items: ["Apple", "Banana", "Orange"]
    },
    {
      id: 2,
      name: "Vegetables",
      items: ["Carrot", "Potato", "Tomato"]
    }
  ];

  return (
    <div>
      {categories.map((category) => (
        <div key={category.id}>
          <h3>{category.name}</h3>
          <ul>
            {category.items.map((item, index) => (
              <li key={`${category.id}-${index}`}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

// 8. DYNAMIC LIST WITH ADD/REMOVE
function DynamicList() {
  const [items, setItems] = React.useState([
    { id: 1, name: "Item 1" },
    { id: 2, name: "Item 2" }
  ]);

  const addItem = () => {
    const newItem = {
      id: Math.max(...items.map((i) => i.id), 0) + 1,
      name: `Item ${Math.max(...items.map((i) => i.id), 0) + 1}`
    };
    setItems([...items, newItem]);
  };

  const removeItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <div>
      <button onClick={addItem}>Add Item</button>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name}
            <button onClick={() => removeItem(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

// 9. LIST WITH SORTING
function SortedList() {
  const [items, setItems] = React.useState([
    { id: 1, name: "Zebra", age: 5 },
    { id: 2, name: "Apple", age: 3 },
    { id: 3, name: "Mango", age: 4 }
  ]);

  const [sortBy, setSortBy] = React.useState("name");

  const sortedItems = [...items].sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    } else if (sortBy === "age") {
      return a.age - b.age;
    }
    return 0;
  });

  return (
    <div>
      <button onClick={() => setSortBy("name")}>Sort by Name</button>
      <button onClick={() => setSortBy("age")}>Sort by Age</button>
      <ul>
        {sortedItems.map((item) => (
          <li key={item.id}>
            {item.name} - {item.age} years
          </li>
        ))}
      </ul>
    </div>
  );
}

// 10. LIST WITH PAGINATION
function PaginatedList() {
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 5;

  const items = Array.from({ length: 25 }, (_, i) => ({
    id: i + 1,
    name: `Item ${i + 1}`
  }));

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = items.slice(startIndex, endIndex);
  const totalPages = Math.ceil(items.length / itemsPerPage);

  return (
    <div>
      <ul>
        {currentItems.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
      <div>
        <button onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}>
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}>
          Next
        </button>
      </div>
    </div>
  );
}

// 11. LIST WITH UNIQUE KEY GENERATION
function ListWithUniqueKeys() {
  const items = [
    { timestamp: Date.now(), name: "Item 1" },
    { timestamp: Date.now() + 1, name: "Item 2" }
  ];

  return (
    <ul>
      {items.map((item) => (
        <li key={`${item.timestamp}-${item.name}`}>{item.name}</li>
      ))}
    </ul>
  );
}

// 12. LIST WITH CONDITIONAL RENDERING
function ConditionalList({ showInactive }) {
  const items = [
    { id: 1, name: "Item 1", active: true },
    { id: 2, name: "Item 2", active: false },
    { id: 3, name: "Item 3", active: true },
    { id: 4, name: "Item 4", active: false }
  ];

  const filteredItems = showInactive
    ? items
    : items.filter((item) => item.active);

  return (
    <ul>
      {filteredItems.map((item) => (
        <li key={item.id} className={item.active ? "active" : "inactive"}>
          {item.name}
        </li>
      ))}
    </ul>
  );
}

// 13. LIST WITH SEARCH
function SearchableList() {
  const [search, setSearch] = React.useState("");
  const items = [
    { id: 1, name: "React" },
    { id: 2, name: "Vue" },
    { id: 3, name: "Angular" },
    { id: 4, name: "Svelte" }
  ];

  const filtered = items.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search frameworks"
      />
      <ul>
        {filtered.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

// 14. LIST PERFORMANCE WITH MEMOIZATION
const ListItem = React.memo(({ item, onRemove }) => {
  console.log("Rendering:", item.name);
  return (
    <li>
      {item.name}
      <button onClick={() => onRemove(item.id)}>Remove</button>
    </li>
  );
});

function MemoizedList() {
  const [items, setItems] = React.useState([
    { id: 1, name: "Item 1" },
    { id: 2, name: "Item 2" }
  ]);

  const handleRemove = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <ul>
      {items.map((item) => (
        <ListItem key={item.id} item={item} onRemove={handleRemove} />
      ))}
    </ul>
  );
}

// 15. EMPTY LIST HANDLING
function ListWithEmpty() {
  const [items, setItems] = React.useState([]);

  return (
    <div>
      {items.length > 0 ? (
        <ul>
          {items.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      ) : (
        <p>No items available</p>
      )}
    </div>
  );
}

export {
  BasicList,
  ObjectList,
  ListWithCorrectKeys,
  ListWithIndexKeys,
  FilteredList,
  UserList,
  NestedList,
  DynamicList,
  SortedList,
  PaginatedList,
  ListWithUniqueKeys,
  ConditionalList,
  SearchableList,
  MemoizedList,
  ListWithEmpty
};
