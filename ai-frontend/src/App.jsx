import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Chat from "./components/Chat";
import ResumeAnalysis from "./components/ResumeAnalysis";
import CoverLetter from "./components/CoverLetter";
import InterviewPrep from "./components/InterviewPrep";
import SalaryNegotiation from "./components/SalaryNegotiation";
import JobSearch from "./components/JobSearch";
import "./styles/theme.css";
import "./App.css";

function App() {
  const [activeView, setActiveView] = useState("home");
  const [chatHistory, setChatHistory] = useState([]);

  const renderContent = () => {
    switch (activeView) {
      case "chat":
        return <Chat chatHistory={chatHistory} setChatHistory={setChatHistory} />;
      case "resume":
        return <ResumeAnalysis />;
      case "cover-letter":
        return <CoverLetter />;
      case "interview":
        return <InterviewPrep />;
      case "salary":
        return <SalaryNegotiation />;
      case "jobs":
        return <JobSearch />;
      default:
        return <HomeView setActiveView={setActiveView} />;
    }
  };

  return (
    <div className="app-container">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      <main className="main-content">
        {renderContent()}
      </main>
    </div>
  );
}

const CARDS = [
  {
    key: "resume",
    icon: "↗",
    label: "Resume",
    title: "Analyze Resume",
    desc: "ATS score, keyword gaps, instant feedback.",
    accent: "#5b8dee",
  },
  {
    key: "cover-letter",
    icon: "✦",
    label: "Write",
    title: "Cover Letter",
    desc: "Personalized letters that actually get read.",
    accent: "#a78bfa",
  },
  {
    key: "interview",
    icon: "◎",
    label: "Practice",
    title: "Interview Prep",
    desc: "Real questions. Brutal feedback. No fluff.",
    accent: "#f472b6",
  },
  {
    key: "salary",
    icon: "⬡",
    label: "Negotiate",
    title: "Salary Strategy",
    desc: "Market data and scripts that win offers.",
    accent: "#34d399",
  },
  {
    key: "jobs",
    icon: "⊕",
    label: "Search",
    title: "Job Search",
    desc: "Targeted strategy matched to your skills.",
    accent: "#fb923c",
  },
  {
    key: "chat",
    icon: "→",
    label: "Advise",
    title: "Career Advice",
    desc: "Direct answers. No corporate speak.",
    accent: "#38bdf8",
  },
];

function HomeView({ setActiveView }) {
  return (
    <div className="home-view">

      {/* ── Hero ── */}
      <section className="hero">
        <div className="hero-eyebrow">
          <span className="eyebrow-dot" />
          AI-powered career intelligence
        </div>
        <h1 className="hero-heading">
          Land the job<br />
          <span className="hero-heading-muted">you actually want.</span>
        </h1>
        <p className="hero-sub">
          Resume analysis, cover letters, interview coaching, salary
          negotiation — everything in one place, no templates, no BS.
        </p>
        <div className="hero-cta-row">
          <button
            className="btn-primary"
            onClick={() => setActiveView("resume")}
          >
            Start with your resume
          </button>
          <button
            className="btn-ghost"
            onClick={() => setActiveView("chat")}
          >
            Ask anything →
          </button>
        </div>
        <div className="hero-pills">
          {["ATS Optimization", "Cover Letters", "Mock Interviews", "Salary Data", "Job Matching"].map(t => (
            <span key={t} className="hero-pill">{t}</span>
          ))}
        </div>
      </section>

      {/* ── Divider ── */}
      <div className="section-divider">
        <span>Everything you need</span>
      </div>

      {/* ── Cards ── */}
      <section className="cards-grid">
        {CARDS.map((card) => (
          <button
            key={card.key}
            className="feature-card"
            onClick={() => setActiveView(card.key)}
            style={{ "--card-accent": card.accent }}
          >
            <div className="card-top">
              <span className="card-label">{card.label}</span>
              <span className="card-glyph">{card.icon}</span>
            </div>
            <h3 className="card-title">{card.title}</h3>
            <p className="card-desc">{card.desc}</p>
            <div className="card-footer">
              <span className="card-cta">Get started</span>
              <span className="card-arrow">↗</span>
            </div>
          </button>
        ))}
      </section>

      {/* ── Stats bar ── */}
      <section className="stats-bar">
        {[
          { n: "10K+", l: "Users helped" },
          { n: "95%", l: "Satisfaction" },
          { n: "24 / 7", l: "Always on" },
          { n: "< 10s", l: "Response time" },
        ].map(({ n, l }) => (
          <div key={l} className="stat-cell">
            <span className="stat-n">{n}</span>
            <span className="stat-l">{l}</span>
          </div>
        ))}
      </section>

      {/* ── Bottom CTA ── */}
      <section className="bottom-cta">
        <p className="bottom-cta-label">Ready when you are.</p>
        <h2 className="bottom-cta-heading">Your next role starts here.</h2>
        <button className="btn-primary" onClick={() => setActiveView("resume")}>
          Analyze my resume →
        </button>
      </section>

    </div>
  );
}

export default App;
