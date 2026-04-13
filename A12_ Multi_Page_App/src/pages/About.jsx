export default function About() {
  return (
    <div className="page">
      <h1>ℹ️ About This Project</h1>
      <p>
        This is a Multi-Page Single Page Application built with React and React Router.
        It demonstrates client-side routing and navigation best practices.
      </p>

      <h2>Technologies Used</h2>
      <div className="cards-grid">
        <div className="card">
          <h3>⚛️ React</h3>
          <p>JavaScript library for building user interfaces with components.</p>
        </div>

        <div className="card">
          <h3>🛣️ React Router</h3>
          <p>Enables client-side routing for multi-page navigation without reloads.</p>
        </div>

        <div className="card">
          <h3>⚡ Vite</h3>
          <p>Fast build tool with instant HMR for development.</p>
        </div>

        <div className="card">
          <h3>🎨 CSS3</h3>
          <p>Modern styling with gradients, animations, and responsive design.</p>
        </div>
      </div>

      <h2>Project Structure</h2>
      <ul className="feature-list">
        <li><strong>App.jsx</strong> - Main component with routing</li>
        <li><strong>pages/Home.jsx</strong> - Home page</li>
        <li><strong>pages/About.jsx</strong> - About page (this page)</li>
        <li><strong>pages/Contact.jsx</strong> - Contact page with form</li>
      </ul>
    </div>
  );
}