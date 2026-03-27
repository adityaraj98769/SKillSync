import { useState } from "react";
import "./Sidebar.css";

export default function Sidebar({ activeView, setActiveView, isDark, toggleDark }) {
  const [isExpanded, setIsExpanded] = useState(true);

  const menuItems = [
    { id: "home",         icon: "⌂", label: "Home"              },
    { id: "resume",       icon: "≡", label: "Resume Analysis"   },
    { id: "cover-letter", icon: "✉", label: "Cover Letter"      },
    { id: "interview",    icon: "◉", label: "Interview Prep"    },
    { id: "salary",       icon: "◈", label: "Salary Negotiation"},
    { id: "jobs",         icon: "⊕", label: "Job Search"        },
    { id: "chat",         icon: "▷", label: "AI Chat"           },
  ];

  const handleNewChat = () => {
    setActiveView("chat");
    window.dispatchEvent(new CustomEvent("newChat"));
  };

  return (
    <aside className={`sidebar ${isExpanded ? "expanded" : "collapsed"}`}>

      {/* ── Header ── */}
      <div className="sidebar-header">
        <div className="logo">
          <span className="logo-icon" />
          {isExpanded && <span className="logo-text">SKILLSYNC : AI</span>}
        </div>
        <button
          className="toggle-btn"
          onClick={() => setIsExpanded(!isExpanded)}
          title={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
        >
          {isExpanded ? "◀" : "▶"}
        </button>
      </div>

      {/* ── New analysis ── */}
      <button
        className="new-chat-btn"
        onClick={handleNewChat}
        title="Start a new analysis session"
      >
        <span>+</span>
        {isExpanded && <span>New Analysis</span>}
      </button>

      {/* ── Nav ── */}
      <nav className="sidebar-nav">
        {menuItems.map(item => (
          <button
            key={item.id}
            className={`nav-item ${activeView === item.id ? "active" : ""}`}
            onClick={() => setActiveView(item.id)}
            title={item.label}
          >
            <span className="nav-icon nav-icon-text">{item.icon}</span>
            {isExpanded && <span className="nav-label">{item.label}</span>}
          </button>
        ))}
      </nav>

      {/* ── Footer ── */}
      <div className="sidebar-footer">

        {/* Dark / light toggle */}
        <button
          className="theme-toggle-btn"
          onClick={toggleDark}
          title={isDark ? "Switch to light mode" : "Switch to dark mode"}
        >
          <span className="theme-icon">{isDark ? "○" : "●"}</span>
          {isExpanded && (
            <span>{isDark ? "Light mode" : "Dark mode"}</span>
          )}
        </button>

        {/* AI badge */}
        <div className="ai-badge">
          <span className="ai-dot" />
          {isExpanded && (
            <div>
              <div className="ai-badge-title">Powered by</div>
              <div className="ai-badge-text">ML Model &amp; Advanced AI</div>
            </div>
          )}
        </div>

      </div>
    </aside>
  );
}
