# 🚀 How to Start the Development Server

## Quick Start Options

### **Option 1: Windows Batch File (Easiest)**
Double-click: **`start-dev.bat`**
- Automatically opens in Command Prompt
- Runs the development server
- Shows output in the console

### **Option 2: PowerShell Script**
Right-click **`start-dev.ps1`** → "Run with PowerShell"
- Modern PowerShell interface
- Better error reporting
- Colored output

### **Option 3: Manual Command (Terminal)**
Open PowerShell/CMD in this folder and run:
```powershell
npm run dev 2>&1
```

### **Option 4: Node Terminal**
Open any terminal and navigate to this folder, then type:
```bash
npm run dev
```

---

## What Happens When You Start

1. **Server starts** on `http://localhost:5174/`
2. **Auto-reload** enabled - changes reflect instantly
3. **Console output** shows:
   - Build status
   - URL to access the app
   - Any errors or warnings

---

## How to Stop the Server

Press `Ctrl + C` in the terminal/command prompt

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| "npm not found" | Install Node.js from nodejs.org |
| "Port 5173 in use" | It will use port 5174 instead (automatic) |
| "Module not found" | Run `npm install` first |
| "Permission denied" | Run PowerShell as Administrator |

---

## Available Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Check code quality
```

---

Happy coding! 🎉
