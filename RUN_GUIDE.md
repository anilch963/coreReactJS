# How to Run the React.js Core Concepts App

## 🚀 Quick Start

### Option 1: Using npm (Recommended)

```bash
# Install dependencies
npm install

# Start development server
npm start
```

The app will open at `http://localhost:3000`

### Option 2: Using Yarn

```bash
# Install dependencies
yarn install

# Start development server
yarn start
```

### Option 3: Using Vite (Faster alternative)

```bash
# Install dependencies
npm install

# Start with Vite
npm run dev
```

---

## 📦 What You Need

- **Node.js** v14 or higher
- **npm** or **yarn**
- A modern web browser

---

## 📁 Project Structure

```
reactjsCoreConcepts/
├── package.json              # Project dependencies
├── index.html               # HTML entry point
├── index.jsx                # React entry point
├── App.jsx                  # Main React App
├── App.css                  # Styling
│
├── 01-jsx-basics.jsx        # Learning files
├── 02-components.jsx
├── ... (concept files)
│
├── README.md                # Full documentation
├── QUICK_REFERENCE.md       # Syntax reference
└── START_HERE.md            # Get started guide
```

---

## 🎯 What This App Does

The interactive demo app demonstrates:

1. **JSX** - Component structure and expressions
2. **Components** - Functional components
3. **Props** - Data passing
4. **State** - Using useState hook
5. **Context** - Using useContext hook
6. **Events** - Event handling
7. **Conditional Rendering** - If/ternary rendering
8. **Lists** - Rendering arrays with keys
9. **Forms** - Form handling and input
10. **Hooks** - useState, useContext

---

## 🖥️ Features of the Demo App

✅ **Theme Toggle** - Light/Dark mode
✅ **Todo Tracker** - Add, edit, delete, complete tasks
✅ **Statistics** - Live progress tracking
✅ **Filtering** - Filter todos by status
✅ **Responsive Design** - Works on mobile & desktop
✅ **Modern UI** - Beautiful gradient design

---

## 📚 After Running the App

1. **Explore** the running app in your browser
2. **Open DevTools** (F12) to see React in action
3. **Try interacting** with the todo tracker
4. **Toggle theme** to see state changes
5. **Then study** the concept files (01-11)

---

## 🔧 Available Scripts

```bash
# Start development server
npm start

# Build for production
npm build

# Run tests
npm test

# Eject configuration (not reversible)
npm eject
```

---

## 🐛 Troubleshooting

### Port 3000 is already in use
```bash
# Kill process on port 3000 (Mac/Linux)
lsof -ti:3000 | xargs kill -9

# On Windows, use a different port
PORT=3001 npm start
```

### Node modules not installing
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### React version issues
```bash
# Update React to latest
npm install react@latest react-dom@latest react-scripts@latest
```

---

## 🌐 Deployment

### Deploy to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Deploy to Netlify
```bash
# Build the app
npm build

# Drag 'build' folder to Netlify
```

---

## 📖 Next Steps After Running

1. ✅ Run the demo app
2. 📖 Read **START_HERE.md** for overview
3. 📚 Read **README.md** for full learning guide
4. 🔍 Use **QUICK_REFERENCE.md** for syntax lookups
5. 💻 Study **Files 01-11** in order
6. 🔨 Build your own projects

---

## 💡 Tips

- **Use React DevTools** - Browser extension for debugging
- **Use Chrome DevTools** - F12 to inspect elements
- **Check Console** - See errors and logs
- **Hot Reload** - App updates when you save files
- **Experiment** - Modify App.jsx and see changes instantly

---

## 🎓 Learning Path

```
1. Run this app → See React in action
2. Study 01-jsx-basics.jsx → Learn JSX
3. Study 02-components.jsx → Build components
4. Study 03-props.jsx → Pass data
5. Study 04-state.jsx → Manage state
6. ... continue through 05-11
7. Modify App.jsx → Practice coding
8. Build your own → Apply knowledge
```

---

## 📞 Help & Resources

- **Official Docs**: https://react.dev
- **React DevTools**: Install from Chrome Web Store
- **Stack Overflow**: Ask questions with [reactjs] tag
- **Community**: https://discord.gg/react

---

## ✨ Have Fun Learning React!

Enjoy your React learning journey! 🚀

---

**Last Updated**: January 2026
**Status**: Ready to Run ✅
