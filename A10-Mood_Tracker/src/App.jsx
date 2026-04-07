import { useState } from "react";
import "./App.css";

function App() {
  const [mood, setMood] = useState(null);
  const [history, setHistory] = useState([]);

  const moods = [
    { emoji: "😊", name: "Happy", color: "#FFD700", message: "Keep spreading that happiness! 🌟" },
    { emoji: "😢", name: "Sad", color: "#4169E1", message: "It's okay to feel sad. Things will get better! 💪" },
    { emoji: "😡", name: "Angry", color: "#FF6347", message: "Take a deep breath. You've got this! 🧘" },
    { emoji: "😴", name: "Tired", color: "#9370DB", message: "Rest is important. You deserve it! 🌙" },
    { emoji: "😌", name: "Calm", color: "#98FB98", message: "Enjoy this peaceful moment! 🌿" },
    { emoji: "😍", name: "Loved", color: "#FF1493", message: "Love is wonderful! 💖" },
  ];

  const handleMood = (selectedMood) => {
    setMood(selectedMood);
    setHistory([
      {
        mood: selectedMood,
        time: new Date().toLocaleTimeString(),
      },
      ...history.slice(0, 4),
    ]);
  };

  return (
    <div className="app-container">
      <div className="background-gradient"></div>
      
      <div className="content">
        <header className="header">
          <h1 className="title">🎭 Mood Tracker</h1>
          <p className="subtitle">Track your emotions throughout the day</p>
        </header>

        <div className="mood-display">
          {mood ? (
            <div className="mood-content">
              <div className="mood-emoji-large">{mood.emoji}</div>
              <h2 className="mood-name">{mood.name}</h2>
              <p className="mood-message">{mood.message}</p>
            </div>
          ) : (
            <div className="mood-placeholder">
              <p>How are you feeling today?</p>
            </div>
          )}
        </div>

        <div className="mood-buttons">
          {moods.map((m) => (
            <button
              key={m.name}
              className={`mood-btn ${mood?.name === m.name ? "active" : ""}`}
              onClick={() => handleMood(m)}
              style={{
                "--mood-color": m.color,
              }}
              title={m.name}
            >
              <span className="mood-emoji-btn">{m.emoji}</span>
              <span className="mood-label">{m.name}</span>
            </button>
          ))}
        </div>

        {history.length > 0 && (
          <div className="history-section">
            <h3>Recent Moods</h3>
            <div className="history-list">
              {history.map((item, index) => (
                <div key={index} className="history-item">
                  <span className="history-emoji">{item.mood.emoji}</span>
                  <span className="history-name">{item.mood.name}</span>
                  <span className="history-time">{item.time}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <footer className="footer">
          <p>✨ Remember: It's okay to feel different emotions. You're doing great! ✨</p>
        </footer>
      </div>
    </div>
  );
}

export default App;