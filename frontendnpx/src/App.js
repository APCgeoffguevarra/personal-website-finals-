import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

// ⬇️ After you deploy the backend, paste that URL here
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3001';

function App() {
  const [messages, setMessages] = useState([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // GET - load messages when page opens
  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BACKEND_URL}/guestbook`);
      setMessages(res.data);
    } catch (err) {
      console.error('Error fetching messages:', err);
    }
    setLoading(false);
  };

  // POST - submit a new message
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !message) return;
    setSubmitting(true);
    try {
      await axios.post(`${BACKEND_URL}/guestbook`, { name, message });
      setName('');
      setMessage('');
      fetchMessages(); // refresh the list
    } catch (err) {
      console.error('Error posting message:', err);
    }
    setSubmitting(false);
  };

  return (
    <div className="app">
      {/* HERO SECTION */}
      <header className="hero">
        <div className="hero-content">
          <img src="/profile.jpg" alt="Profile" className="avatar-img" />
          <h1>Geoff Guevarra</h1>
          <p className="tagline">IT Student | WEBPROG FINALS</p>
          <div className="social-links">
            <a href="https://github.com/APCgeoffguevarra">GitHub</a>
            
          </div>
        </div>
      </header>

      <main>
        {/* ABOUT SECTION */}
        <section className="section" id="about">
          <h2>About Me</h2>
          <p>
            bio to be edited
          </p>
        </section>

        {/* SKILLS SECTION */}
        <section className="section" id="skills">
          <h2>Skills</h2>
          <div className="skills-grid">
            {['React', 'NestJS', 'JavaScript', 'TypeScript', 'Supabase', 'Git', 'HTML/CSS', 'Node.js'].map(skill => (
              <span key={skill} className="skill-badge">{skill}</span>
            ))}
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section className="section" id="projects">
          <h2>Projects</h2>
          <div className="projects-grid">
            <div className="project-card">
              <h3>Personal Website</h3>
              <p>This portfolio site built with React and NestJS, deployed on Vercel with Supabase database.</p>
              <span className="tech-tag">React</span>
              <span className="tech-tag">NestJS</span>
              <span className="tech-tag">Supabase</span>
            </div>
            <div className="project-card">
              <h3>Project Two</h3>
              <p>Used Azure machine learning to predit NBA outcomes we called it NBA ORACLE</p>
              <span className="tech-tag">JavaScript</span>
              <span className="tech-tag">Node.js</span>
            </div>
          </div>
        </section>

        {/* GUESTBOOK SECTION */}
        <section className="section" id="guestbook">
          <h2>Guestbook</h2>
          <p>Leave a message for me!</p>

          <form className="guestbook-form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
            <textarea
              placeholder="Leave a message..."
              value={message}
              onChange={e => setMessage(e.target.value)}
              required
              rows={4}
            />
            <button type="submit" disabled={submitting}>
              {submitting ? 'Sending...' : 'Sign Guestbook ✉️'}
            </button>
          </form>

          <div className="messages-list">
            {loading ? (
              <p className="loading">Loading messages...</p>
            ) : messages.length === 0 ? (
              <p className="empty">No messages yet. Be the first!</p>
            ) : (
              messages.map((msg, index) => (
                <div key={index} className="message-card">
                  <div className="message-header">
                    <strong>{msg.name}</strong>
                    <span className="message-date">
                      {new Date(msg.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <p>{msg.message}</p>
                </div>
              ))
            )}
          </div>
        </section>
      </main>

      <footer>
        <p>© 2025 Your Name Here. Built with React + NestJS + Supabase.</p>
      </footer>
    </div>
  );
}

export default App;