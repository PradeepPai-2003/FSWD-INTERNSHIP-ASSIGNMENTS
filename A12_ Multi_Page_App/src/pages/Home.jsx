export default function Home() {
  return (
    <div className="page">
      <h1>🏠 Welcome Home</h1>
      <p>
        This is a Single Page Application (SPA) built with React and React Router.
        It demonstrates client-side routing without full page reloads.
      </p>

      <h2>Features</h2>
      <ul className="feature-list">
        <li>⚡ Fast page transitions</li>
        <li>🔗 Clean navigation</li>
        <li>📱 Responsive design</li>
        <li>🎨 Modern UI</li>
      </ul>

      <h2>Pages</h2>
      <div className="cards-grid">
        <div className="card">
          <h3>🏠 Home</h3>
          <p>You are here! Welcome to the home page.</p>
        </div>

        <div className="card">
          <h3>ℹ️ About</h3>
          <p>Learn more about this project and technologies used.</p>
        </div>

        <div className="card">
          <h3>� Contact</h3>
          <p>Send us a message or get in touch.</p>
        </div>
      </div>
    </div>
  );
}