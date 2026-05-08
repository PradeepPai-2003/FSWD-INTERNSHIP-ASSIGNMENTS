# Assignment: Secure Login (MERN Stack)

## Approach & Technology Analysis

To build a secure signup/login system with hashed passwords and JWT, **a Full-Stack approach is strictly required**. Here's why:

- **Can we use only HTML/CSS/JavaScript?** **No.** Pure HTML/CSS/JS runs only in the browser (frontend). You cannot securely store user data, hash passwords, or generate JWTs in the browser. Anyone could see your secret keys and database credentials.
- **Why the MERN Stack (MongoDB, Express, React, Node.js)?**
  - **Node.js & Express (Backend):** This is where the magic happens. The backend receives the password, uses a library like `bcryptjs` to securely hash it, and stores it in the database. When logging in, it verifies the hash and generates a JSON Web Token (`JWT`) using a secret key.
  - **MongoDB:** A NoSQL database perfect for storing user documents flexibly.
  - **React (Frontend):** While you *could* use basic HTML/JS for the frontend, React is the industry standard. It makes managing UI state (like switching between Login and Signup forms instantly) and handling API requests much cleaner.

---

## 📂 Project Folder Structure

I have already created the files for you in your workspace (`A22_Secure_Login` folder). The structure looks like this:

```text
A22_Secure_Login/
├── backend/                  <-- Express & Node.js Server
│   ├── .env                  <-- Environment variables (Secret keys)
│   ├── package.json          <-- Backend dependencies
│   ├── server.js             <-- Main server file (API routes)
│   └── models/
│       └── User.js           <-- MongoDB User Schema
│
└── frontend/                 <-- React & Vite User Interface
    ├── index.html
    ├── package.json          <-- Frontend dependencies
    ├── vite.config.js
    └── src/
        ├── App.jsx           <-- Main React Component (Login/Signup logic)
        ├── main.jsx          
        └── index.css         <-- Modern Styling (Dark mode, glassmorphism)
```

---

## 🛠️ Required Tools & Setup Instructions

To run this project, you need a few tools installed on your computer.

1. **Node.js**: Required to run the backend and the React build tools. (Download from [nodejs.org](https://nodejs.org/)).
2. **MongoDB**: Required to store user data. You can install **MongoDB Community Server** locally or use MongoDB Atlas (cloud). For this guide, we assume a local MongoDB running on `mongodb://127.0.0.1:27017`.
3. **VS Code**: Your code editor.

---

## 🚀 Step-by-Step: How to Run and Test the Project

Now that the code is ready in your folder, follow these steps strictly in VS Code to get it running.

### Step 1: Start the Backend Server

1. Open a new Terminal in VS Code (`Ctrl + ~` or `Terminal -> New Terminal`).
2. Navigate to the backend folder:
   ```bash
   cd backend
   ```
3. Install the required backend packages (`express`, `mongoose`, `bcryptjs`, `jsonwebtoken`, etc.):
   ```bash
   npm install
   ```
4. Start the server:
   ```bash
   npm run dev
   ```
   **Expected Output:** You should see `🚀 Server running on http://localhost:5000` and `✅ Connected to MongoDB`.

### Step 2: Start the Frontend React App

1. Open a **SECOND** Terminal in VS Code (Keep the backend terminal running!).
2. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```
3. Install the React dependencies (`vite`, `react`, `axios`):
   ```bash
   npm install
   ```
4. Start the Vite development server:
   ```bash
   npm run dev
   ```
   **Expected Output:** You will get a local link, usually `http://localhost:5173`. `Ctrl + Click` it to open it in your browser.

### Step 3: Test the Application

1. **Sign Up:** On the webpage, click "Sign up". Enter a Name, Email, and Password. Click "Sign Up". 
   - *What happens:* The React app sends this to the Node.js backend. Node hashes the password using `bcrypt` and saves it in MongoDB.
2. **Login:** You will automatically be switched to the Login screen. Enter the same Email and Password.
   - *What happens:* Node.js verifies the password. If it matches, it creates a JWT and sends it back to React.
3. **Dashboard:** You will see a Welcome dashboard proving you are securely logged in.

---

## 🧠 Simple Code Explanation (No fluff)

### The Backend (`server.js` & `User.js`)
- **`bcrypt.hash(password, salt)`**: Takes the plain text password (e.g., "123456") and scrambles it into an unreadable string before saving to the database. Even if someone hacks the database, they cannot read the passwords.
- **`jwt.sign()`**: When a user logs in correctly, the server creates a digital "VIP Pass" called a JWT. This pass proves the user is logged in for the next hour.
- **`User.js`**: Defines the blueprint for our database. Every user *must* have a name, a unique email, and a password.

### The Frontend (`App.jsx`)
- **`useState`**: React uses this to remember what the user types into the form inputs.
- **`axios.post()`**: This is the messenger. It takes the form data and physically sends it over to `http://localhost:5000/api/login` (our backend).
- **`localStorage`**: When the backend sends the JWT back after a successful login, React saves it in `localStorage` so the user stays logged in even if they refresh the page.

---

## ⚠️ Common Errors and How to Fix Them

1. **Error: `MongoServerError: connect ECONNREFUSED 127.0.0.1:27017`**
   - **Cause:** Your local MongoDB server is not running.
   - **Fix:** Open your Windows Services (search "Services" in the start menu), find "MongoDB", and click "Start". Alternatively, change the `MONGO_URI` in `backend/.env` to a cloud MongoDB Atlas link.

2. **Error: `CORS Policy: No 'Access-Control-Allow-Origin' header is present`**
   - **Cause:** The backend is rejecting the frontend's request for security reasons.
   - **Fix:** We already added `app.use(cors())` in `server.js` to fix this! If you see it, make sure the backend is fully restarted.

3. **Error: React says `vite is not recognized as an internal or external command`**
   - **Cause:** You didn't run `npm install` inside the frontend folder before running `npm run dev`.
   - **Fix:** Run `npm install` in the frontend terminal.

---

## 🌟 Extra Improvements (To score more marks!)

If you want to impress your lab instructor, you can explain that you added these premium features:
1. **Modern UI Design:** Added a beautiful glassmorphism dark-mode UI with smooth transitions instead of basic unstyled HTML.
2. **JWT LocalStorage Persistance:** Implemented an `useEffect` hook in React so that if the user refreshes the page, they don't get logged out automatically. 
3. **Environment Variables:** Kept sensitive data like `JWT_SECRET` hidden in a `.env` file instead of hardcoding it. (Best practice for security!).
