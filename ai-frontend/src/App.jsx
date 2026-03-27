import { useState, useEffect, useRef } from "react";
import Sidebar from "./components/Sidebar";
import Chat from "./components/Chat";
import ResumeAnalysis from "./components/ResumeAnalysis";
import CoverLetter from "./components/CoverLetter";
import InterviewPrep from "./components/InterviewPrep";
import SalaryNegotiation from "./components/SalaryNegotiation";
import JobSearch from "./components/JobSearch";
import "./styles/theme.css";
import "./App.css";

/* ── Dark mode hook ── */
function useDarkMode() {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  return [isDark, () => setIsDark(d => !d)];
}

/* ── Root App ── */
function App() {
  const [activeView, setActiveView] = useState("home");
  const [chatHistory, setChatHistory] = useState([]);
  const [isDark, toggleDark] = useDarkMode();

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
      <Sidebar
        activeView={activeView}
        setActiveView={setActiveView}
        isDark={isDark}
        toggleDark={toggleDark}
      />
      <main className="main-content">
        {renderContent()}
      </main>
    </div>
  );
}

/* ── Scramble text hook ── */
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

function useScramble(target, { duration = 1200, delay = 0 } = {}) {
  const [display, setDisplay] = useState(() => target.replace(/\S/g, "█"));
  const frame = useRef(null);

  useEffect(() => {
    let start = null;
    let started = false;

    const tick = (ts) => {
      if (!started) { started = true; start = ts; }
      const elapsed = ts - start;
      const progress = Math.min(elapsed / duration, 1);

      const revealed = Math.floor(progress * target.length);
      let result = "";
      for (let i = 0; i < target.length; i++) {
        if (target[i] === " ") { result += " "; continue; }
        if (i < revealed) {
          result += target[i];
        } else {
          result += CHARS[Math.floor(Math.random() * CHARS.length)];
        }
      }
      setDisplay(result);
      if (progress < 1) frame.current = requestAnimationFrame(tick);
    };

    const timer = setTimeout(() => {
      frame.current = requestAnimationFrame(tick);
    }, delay);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(frame.current);
    };
  }, [target, duration, delay]);

  return display;
}

/* ── SlideWord: each word clips up into view ── */
function SlideWord({ word, delay, className = "" }) {
  return (
    <span
      className={`slide-word-wrap ${className}`}
      style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom" }}
    >
      <span
        className="slide-word-inner"
        style={{ animationDelay: `${delay}ms` }}
      >
        {word}
      </span>
    </span>
  );
}

/* ── Animated heading ── */
function AnimatedHeroHeading() {
  const line1 = ["Land", "the", "job"];
  const scrambled = useScramble("you actually want.", { duration: 1400, delay: 500 });

  return (
    <h1 className="hero-heading">
      {/* Line 1: staggered slide-up per word */}
      <span className="hero-line-1">
        {line1.map((w, i) => (
          <span key={i} style={{ display: "inline-block", marginRight: i < line1.length - 1 ? "0.28em" : 0 }}>
            <SlideWord word={w} delay={i * 120} />
          </span>
        ))}
      </span>

      {/* Line 2: scramble reveal */}
      <br />
      <span className="hero-heading-muted hero-scramble">
        {scrambled}
      </span>
    </h1>
  );
}

/* ── Home page cards ── */
const CARDS = [
  { key: "resume",       icon: "↗", label: "Resume",    title: "Analyze Resume",  desc: "ATS score, keyword gaps, instant feedback.",      accent: "#5b8dee" },
  { key: "cover-letter", icon: "✦", label: "Write",     title: "Cover Letter",    desc: "Personalized letters that actually get read.",     accent: "#a78bfa" },
  { key: "interview",    icon: "◎", label: "Practice",  title: "Interview Prep",  desc: "Real questions. Brutal feedback. No fluff.",      accent: "#f472b6" },
  { key: "salary",       icon: "⬡", label: "Negotiate", title: "Salary Strategy", desc: "Market data and scripts that win offers.",         accent: "#34d399" },
  { key: "jobs",         icon: "⊕", label: "Search",    title: "Job Search",      desc: "Targeted strategy matched to your skills.",       accent: "#fb923c" },
  { key: "chat",         icon: "→", label: "Advise",    title: "Career Advice",   desc: "Direct answers. No corporate speak.",             accent: "#38bdf8" },
];

/* ── Home view ── */
function HomeView({ setActiveView }) {
  return (
    <div className="home-view">

      <section className="hero">
        {/* Eyebrow fades in */}
        <div className="hero-eyebrow hero-fade-in" style={{ animationDelay: "1ms" }}>
          <span className="eyebrow-dot" />
          AI-powered career intelligence
        </div>

        {/* Animated heading */}
        <AnimatedHeroHeading />

        {/* Sub fades + slides up */}
        <p className="hero-sub hero-slide-up" style={{ animationDelay: "900ms" }}>
          Resume analysis, cover letters, interview coaching, salary
          negotiation — everything in one place, no templates, no BS.
        </p>

        {/* CTAs */}
        <div className="hero-cta-row hero-slide-up" style={{ animationDelay: "1100ms" }}>
          <button className="btn-primary" onClick={() => setActiveView("resume")}>
            Start with your resume
          </button>
          <button className="btn-ghost" onClick={() => setActiveView("chat")}>
            Ask anything →
          </button>
        </div>

        {/* Pills stagger in */}
        <div className="hero-pills">
          {["ATS Optimization", "Cover Letters", "Mock Interviews", "Salary Data", "Job Matching"].map((t, i) => (
            <span
              key={t}
              className="hero-pill hero-pill-in"
              style={{ animationDelay: `${1300 + i * 80}ms` }}
            >
              {t}
            </span>
          ))}
        </div>
      </section>

      <div className="section-divider">
        <span>Everything you need</span>
      </div>

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

      <section className="stats-bar">
        {[
          { n: "10K+", l: "Users helped" },
          { n: "95%",  l: "Satisfaction"  },
          { n: "24/7", l: "Always on"     },
          { n: "<10s", l: "Response time" },
        ].map(({ n, l }) => (
          <div key={l} className="stat-cell">
            <span className="stat-n">{n}</span>
            <span className="stat-l">{l}</span>
          </div>
        ))}
      </section>

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
