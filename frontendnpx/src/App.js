import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3001';

function App() {
  const [messages, setMessages] = useState([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !message) return;
    setSubmitting(true);
    try {
      await axios.post(`${BACKEND_URL}/guestbook`, { name, message });
      setName('');
      setMessage('');
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
      fetchMessages();
    } catch (err) {
      console.error('Error posting message:', err);
    }
    setSubmitting(false);
  };

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <div className="app">

      {/* FLOATING NAV */}
      <nav className="navbar">
        <div className="nav-logo">✦ Geoff</div>
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? '✕' : '☰'}
        </button>
        <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
          {['about', 'skills', 'projects', 'guestbook'].map(s => (
            <li key={s}>
              <button onClick={() => scrollTo(s)}>
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* HERO */}
      <header className="hero">
        <div className="hero-blob blob1" />
        <div className="hero-blob blob2" />
        <div className="hero-blob blob3" />
        <div className="hero-content">
          <div className="hero-badge">👋 Welcome to my portfolio</div>
          <div className="avatar-wrap">
            <div className="avatar-ring" />
            <div className="avatar">👨‍💻</div>
          </div>
          <h1>Your Name Here</h1>
          <p className="tagline">Computer Science Student &nbsp;·&nbsp; Web Developer &nbsp;·&nbsp; Creator</p>
          <div className="social-links">
            <a href="https://github.com/APCgeoffguevarra" target="_blank" rel="noreferrer" className="social-btn github">
              <span>⬡</span> GitHub
            </a>
            
            
            <a href="grguevarra@student.apc.edu.ph" className="social-btn email">
              <span>✉</span> Email
            </a>
          </div>
          <button className="scroll-down" onClick={() => scrollTo('about')}>
            scroll down ↓
          </button>
        </div>
      </header>

      <main>

        {/* ABOUT */}
        <section className="section" id="about">
          <div className="section-inner">
            <div className="section-label">01 — About</div>
            <h2>Hey there! <span className="wave">👋</span></h2>
            <div className="about-grid">
              <div className="about-text">
                <p>
                 IT student/Athlete in Asia Pacific College
                </p>
                <p>
                  I love exploring the world and experiencing different cultures and perspectives
                </p>
              </div>
              <div className="about-cards">
                <div className="info-card pink">
                  <div className="info-icon">🎓</div>
                  <div>
                    <strong>Education</strong>
                    <span>Undergraduate BSIT Asia Pacific College</span>
                  </div>
                </div>
                <div className="info-card mint">
                  <div className="info-icon">📍</div>
                  <div>
                    <strong>Location</strong>
                    <span>Philippines</span>
                  </div>
                </div>
                <div className="info-card lavender">
                  <div className="info-icon">💼</div>
                  <div>
                    <strong>Status</strong>
                    <span>Open to Work</span>
                  </div>
                </div>
                <div className="info-card peach">
                  <div className="info-icon">✨</div>
                  <div>
                    <strong>Interests</strong>
                    <span>Fullstack Dev</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SKILLS */}
        <section className="section alt" id="skills">
          <div className="section-inner">
            <div className="section-label">02 — Skills</div>
            <h2>What I Work With</h2>
            <div className="skills-grid">
              {[
                { name: 'React', icon: '⚛️', color: 'pink' },
                { name: 'NestJS', icon: '🔴', color: 'mint' },
                { name: 'JavaScript', icon: '🟡', color: 'peach' },
                { name: 'TypeScript', icon: '🔷', color: 'lavender' },
                { name: 'Supabase', icon: '🟢', color: 'mint' },
                { name: 'Git', icon: '🐙', color: 'pink' },
                { name: 'HTML / CSS', icon: '🎨', color: 'peach' },
                { name: 'Node.js', icon: '🟩', color: 'lavender' },
              ].map(skill => (
                <div key={skill.name} className={`skill-card ${skill.color}`}>
                  <span className="skill-icon">{skill.icon}</span>
                  <span className="skill-name">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PROJECTS */}
        <section className="section" id="projects">
          <div className="section-inner">
            <div className="section-label">03 — Projects</div>
            <h2>Things I've Built</h2>
            <div className="projects-grid">
              <div className="project-card pink-card">
                <div className="project-header">
                  <div className="project-icon">🌐</div>
                  <div className="project-links">
                    <a href="#!" className="proj-link">↗ Live</a>
                    <a href="#!" className="proj-link">⬡ Code</a>
                  </div>
                </div>
                <h3>Personal Portfolio</h3>
                <p>This portfolio site built with React and NestJS, deployed on Vercel with a Supabase guestbook.</p>
                
                <div className="tag-row">
                  <span className="tag">React</span>
                  <span className="tag">NestJS</span>
                  <span className="tag">Supabase</span>
                </div>
              </div>

              <div className="project-card mint-card">
                <div className="project-header">
                  <div className="project-icon">📱</div>
                  <div className="project-links">
                    <a href="#!" className="proj-link">↗ Live</a>
                    <a href="#!" className="proj-link">⬡ Code</a>
                  </div>
                </div>
                <h3>Project Two</h3>
                <p>Used Azure Machine Learning to predict Nba Playoff Contenders</p>
                <div className="tag-row">
                  <span className="tag">Azure</span>
                  <span className="tag">Azure Machine Learning</span>
                </div>
              </div>

              <div className="project-card lavender-card">
                <div className="project-header">
                  <div className="project-icon">🛠️</div>
                  <div className="project-links">
                    <a href="#!" className="proj-link">↗ Live</a>
                    <a href="#!" className="proj-link">⬡ Code</a>
                  </div>
                </div>
                <h3>Project Three</h3>
                <p>Created a small scale speed detector using Arduino R3 kit</p>
                <div className="tag-row">
                  <span className="tag">Arduino</span>
                  <span className="tag">Java</span>
                  <span className="tag">PEMBEDS</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* GUESTBOOK */}
        <section className="section alt" id="guestbook">
          <div className="section-inner">
            <div className="section-label">04 — Guestbook</div>
            <h2>Leave a Message 💌</h2>
            <p className="section-sub">Say hi, leave feedback, or just drop a note!</p>

            <div className="guestbook-layout">
              <form className="guestbook-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Your Name</label>
                  <input
                    type="text"
                    placeholder="e.g. John Doe"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Message</label>
                  <textarea
                    placeholder="Write something nice..."
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    required
                    rows={5}
                  />
                </div>
                <button type="submit" disabled={submitting} className="submit-btn">
                  {submitting ? '✦ Sending...' : submitted ? '✓ Sent!' : '✦ Sign Guestbook'}
                </button>
                {submitted && <p className="success-msg">🎉 Thanks for signing!</p>}
              </form>

              <div className="messages-list">
                {loading ? (
                  <div className="loading-state">
                    <div className="spinner" />
                    <p>Loading messages...</p>
                  </div>
                ) : messages.length === 0 ? (
                  <div className="empty-state">
                    <span>📭</span>
                    <p>No messages yet — be the first!</p>
                  </div>
                ) : (
                  messages.map((msg, index) => (
                    <div key={index} className={`message-card msg-color-${index % 4}`}>
                      <div className="msg-top">
                        <div className="msg-avatar">
                          {msg.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <strong>{msg.name}</strong>
                          <span className="msg-date">
                            {new Date(msg.created_at).toLocaleDateString('en-US', {
                              month: 'short', day: 'numeric', year: 'numeric'
                            })}
                          </span>
                        </div>
                      </div>
                      <p className="msg-body">{msg.message}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-logo">✦ Guevarra</div>
          <p>Built with React · NestJS · Supabase · Vercel</p>
          <p className="footer-copy">© 2025 All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
}

export default App;