import { useState, useEffect } from "react";
import Folder from "./components/Folder";
import data from "./data/data";
import "./App.css";

/**
 * App Component - Main application component
 * Displays a folder structure with loading state and messages
 */
function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");

  /**
   * Effect: Simulate data retrieval with a 3-second delay
   */
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  /**
   * Handle click during loading - display info message
   */
  const handleLoadingClick = () => {
    setMessage("📥 Retrieving data. Please wait a few seconds...");
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h2 className="app-title">📁 Folder Architect</h2>
        <p className="app-subtitle">Interactive folder structure viewer</p>
      </header>

      {message && (
        <div className="message-box" role="alert">
          {message}
        </div>
      )}

      <div className="folder-container">
        <Folder data={data} isLoading={isLoading} />
      </div>

      {isLoading && (
        <div 
          className="loading-overlay" 
          onClick={handleLoadingClick}
          role="status"
          aria-live="polite"
        >
          <div className="spinner" aria-label="Loading"></div>
          <p className="loading-text">Retrieving data...</p>
          <p className="loading-hint">Click to dismiss</p>
        </div>
      )}
    </div>
  );
}

export default App;