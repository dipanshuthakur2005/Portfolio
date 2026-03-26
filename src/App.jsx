

import { useState, useEffect, useRef } from "react";

/* ─────────────────────────── DATA ─────────────────────────── */
const NAV_LINKS = ["Home","About","Skills","Projects","Training","Certificates","Education","Contact"];

const SKILLS = {
  Languages:  ["Python","C++","Java","C"],
  Libraries:  ["NumPy","Pandas","Scikit-Learn","TensorFlow"],
  Tools:      ["Jupyter Notebook","Tableau","Excel","Power BI"],
  "Soft Skills": ["Problem Solving","Teamwork","Adaptability","Communication"],
};

const PROJECTS = [
  {
    title: "3D Plagiarism Checker",
    tech:  ["HTML","CSS","JavaScript","Three.js","DSA"],
    desc:  "Built plagiarism detection using string-matching algorithms with an interactive 3D UI powered by Three.js. Reduced processing time by 30%.",
    icon:  "🧬",
    color: "#6c63ff",
  },
  {
    title: "COVID-19 Data Visualization",
    tech:  ["Python","Pandas","Matplotlib","Seaborn"],
    desc:  "Visualized global pandemic trends through heatmaps, regression plots, and data pipelines that transformed raw CSV datasets into actionable insights.",
    icon:  "📊",
    color: "#00d4aa",
  },
  {
    title: "E-commerce Sales Dashboard",
    tech:  ["Excel","Pivot Tables","Charts"],
    desc:  "Built an interactive Excel dashboard featuring YOY analysis, KPI cards, and business insight generation for a simulated retail dataset.",
    icon:  "🛒",
    color: "#ff6b6b",
  },
];

const CERTS = [
  { name: "Cloud Computing",               issuer: "NPTEL",         icon: "☁️" },
  { name: "TCP/IP and Advanced Topics",    issuer: "Coursera",      icon: "🌐" },
  { name: "Python towards ML/AI",          issuer: "CSE Pathshala", icon: "🤖" },
];

const EDUCATION = [
  { degree: "B.Tech — Computer Science & Engineering", school: "Lovely Professional University", year: "2022 – Present", score: "CGPA: 6.4", icon: "🎓" },
  { degree: "12th Grade",  school: "Senior Secondary School", year: "2021 – 2022", score: "66.7%", icon: "📘" },
  { degree: "10th Grade",  school: "Secondary School",        year: "2019 – 2020", score: "87%",   icon: "📗" },
];

const EMAIL = "dipanshuthakur003@gmail.com";
const GMAIL_COMPOSE = `https://mail.google.com/mail/?view=cm&fs=1&to=${EMAIL}`;

/* ─────────────────── INLINE GLOBAL STYLES ─────────────────── */
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg:       #05050f;
    --surface:  #0d0d1a;
    --glass:    rgba(255,255,255,0.04);
    --border:   rgba(255,255,255,0.08);
    --accent:   #6c63ff;
    --accent2:  #00d4aa;
    --accent3:  #ff6b6b;
    --text:     #e8e8f0;
    --muted:    #7a7a9a;
    --font-h:   'Syne', sans-serif;
    --font-b:   'DM Sans', sans-serif;
  }

  html { scroll-behavior: smooth; }
  body { background: var(--bg); color: var(--text); font-family: var(--font-b); overflow-x: hidden; }

  ::selection { background: var(--accent); color: #fff; }
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: var(--bg); }
  ::-webkit-scrollbar-thumb { background: var(--accent); border-radius: 2px; }

  /* Noise texture overlay */
  body::before {
    content: '';
    position: fixed; inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
    pointer-events: none; z-index: 9999; opacity: .4;
  }

  /* ── Scroll progress bar ── */
  #scroll-progress {
    position: fixed; top: 0; left: 0; height: 2px;
    background: linear-gradient(90deg, var(--accent), var(--accent2));
    z-index: 1000; transition: width .1s linear;
  }

  /* ── Navbar ── */
  .navbar {
    position: fixed; top: 0; left: 0; right: 0; z-index: 500;
    padding: 1rem 2rem;
    display: flex; align-items: center; justify-content: space-between;
    transition: background .3s, backdrop-filter .3s, box-shadow .3s;
  }
  .navbar.scrolled {
    background: rgba(5,5,15,0.85);
    backdrop-filter: blur(20px);
    box-shadow: 0 1px 0 var(--border);
  }
  .nav-logo {
    font-family: var(--font-h); font-size: 1.4rem; font-weight: 800;
    background: linear-gradient(135deg, var(--accent), var(--accent2));
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    cursor: pointer;
  }
  .nav-links { display: flex; gap: 1.8rem; list-style: none; }
  .nav-links a {
    font-size: .85rem; font-weight: 500; letter-spacing: .05em;
    color: var(--muted); text-decoration: none;
    transition: color .2s;
    position: relative;
  }
  .nav-links a::after {
    content: ''; position: absolute; bottom: -4px; left: 0; right: 0;
    height: 1px; background: var(--accent);
    transform: scaleX(0); transition: transform .2s;
  }
  .nav-links a:hover, .nav-links a.active { color: var(--text); }
  .nav-links a:hover::after, .nav-links a.active::after { transform: scaleX(1); }

  /* ── Sections ── */
  section { padding: 6rem 2rem; max-width: 1100px; margin: 0 auto; }
  .section-tag {
    display: inline-block; font-size: .75rem; letter-spacing: .15em; font-weight: 600;
    color: var(--accent2); text-transform: uppercase; margin-bottom: .6rem;
  }
  .section-title {
    font-family: var(--font-h); font-size: clamp(2rem,4vw,3rem); font-weight: 800;
    margin-bottom: 3rem; line-height: 1.1;
  }

  /* ── Reveal animation ── */
  .reveal { opacity: 0; transform: translateY(30px); transition: opacity .7s ease, transform .7s ease; }
  .reveal.visible { opacity: 1; transform: translateY(0); }

  /* ── Hero ── */
  #home { padding-top: 0; min-height: 100vh; display: flex; align-items: center; max-width: none; position: relative; overflow: hidden; }
  .hero-inner { max-width: 1100px; margin: 0 auto; padding: 0 2rem; position: relative; z-index: 2; }
  .hero-eyebrow {
    font-size: .8rem; letter-spacing: .2em; text-transform: uppercase;
    color: var(--accent2); margin-bottom: 1.2rem; font-weight: 600;
    display: flex; align-items: center; gap: .5rem;
  }
  .hero-eyebrow::before { content: ''; width: 32px; height: 1px; background: var(--accent2); }
  .hero-name {
    font-family: var(--font-h); font-size: clamp(3rem,8vw,6.5rem); font-weight: 800;
    line-height: 1; margin-bottom: .5rem;
    background: linear-gradient(135deg, #fff 0%, var(--accent) 50%, var(--accent2) 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  }
  .hero-title {
    font-family: var(--font-h); font-size: clamp(1.2rem,3vw,2rem); font-weight: 600;
    color: var(--muted); margin-bottom: 1.5rem; height: 2.4rem; overflow: hidden;
  }
  .cursor { display: inline-block; width: 2px; height: 1em; background: var(--accent); margin-left: 2px; animation: blink 1s step-end infinite; }
  @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
  .hero-tagline {
    font-size: 1.1rem; color: var(--muted); max-width: 520px; line-height: 1.7;
    margin-bottom: 2.5rem;
  }
  .hero-btns { display: flex; flex-wrap: wrap; gap: 1rem; }
  .btn-primary {
    padding: .75rem 1.8rem; border-radius: 50px;
    background: linear-gradient(135deg, var(--accent), #4a44cc);
    color: #fff; font-weight: 600; font-size: .9rem;
    border: none; cursor: pointer; text-decoration: none; display: inline-flex; align-items: center; gap: .4rem;
    transition: transform .2s, box-shadow .2s;
    box-shadow: 0 0 20px rgba(108,99,255,.3);
  }
  .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 0 35px rgba(108,99,255,.5); }
  .btn-outline {
    padding: .75rem 1.8rem; border-radius: 50px;
    background: transparent; color: var(--text); font-weight: 600; font-size: .9rem;
    border: 1px solid var(--border); cursor: pointer; text-decoration: none; display: inline-flex; align-items: center; gap: .4rem;
    transition: border-color .2s, color .2s, background .2s;
  }
  .btn-outline:hover { border-color: var(--accent); color: var(--accent); background: rgba(108,99,255,.05); }
  .scroll-indicator {
    position: absolute; bottom: 2.5rem; left: 50%; transform: translateX(-50%);
    display: flex; flex-direction: column; align-items: center; gap: .4rem; color: var(--muted);
    font-size: .75rem; letter-spacing: .1em; animation: bob 2s ease-in-out infinite;
  }
  .scroll-indicator .wheel {
    width: 22px; height: 36px; border: 1.5px solid var(--muted); border-radius: 12px;
    display: flex; justify-content: center; padding-top: 5px;
  }
  .scroll-indicator .dot { width: 3px; height: 6px; background: var(--accent); border-radius: 2px; animation: scroll-dot 2s ease-in-out infinite; }
  @keyframes scroll-dot { 0%,100%{transform:translateY(0);opacity:1} 50%{transform:translateY(8px);opacity:.3} }
  @keyframes bob { 0%,100%{transform:translateX(-50%) translateY(0)} 50%{transform:translateX(-50%) translateY(-6px)} }

  /* Hero BG blobs */
  .blob {
    position: absolute; border-radius: 50%; filter: blur(80px); pointer-events: none;
  }
  .blob-1 { width: 600px; height: 600px; background: rgba(108,99,255,.12); top: -150px; right: -150px; animation: float1 8s ease-in-out infinite; }
  .blob-2 { width: 400px; height: 400px; background: rgba(0,212,170,.08); bottom: 0; left: -100px; animation: float2 10s ease-in-out infinite; }
  .blob-3 { width: 300px; height: 300px; background: rgba(255,107,107,.06); top: 40%; right: 20%; animation: float3 12s ease-in-out infinite; }
  @keyframes float1 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-30px,30px)} }
  @keyframes float2 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(20px,-20px)} }
  @keyframes float3 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-15px,15px)} }

  /* Grid bg */
  .hero-grid {
    position: absolute; inset: 0;
    background-image: linear-gradient(rgba(108,99,255,.04) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(108,99,255,.04) 1px, transparent 1px);
    background-size: 60px 60px;
    -webkit-mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%);
  }

  /* ── About ── */
  .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: center; }
  .about-card {
    background: var(--glass); border: 1px solid var(--border); border-radius: 20px;
    padding: 2.5rem; backdrop-filter: blur(10px);
    position: relative; overflow: hidden;
  }
  .about-card::before {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(135deg, rgba(108,99,255,.05), transparent);
    pointer-events: none;
  }
  .about-text { font-size: 1.05rem; line-height: 1.85; color: var(--muted); }
  .about-text strong { color: var(--text); }
  .about-stats { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; }
  .stat-card {
    background: var(--glass); border: 1px solid var(--border); border-radius: 12px;
    padding: 1.2rem; text-align: center;
  }
  .stat-num { font-family: var(--font-h); font-size: 2rem; font-weight: 800; background: linear-gradient(135deg, var(--accent), var(--accent2)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
  .stat-label { font-size: .8rem; color: var(--muted); margin-top: .3rem; }

  /* ── Skills ── */
  .skills-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; }
  .skill-group {
    background: var(--glass); border: 1px solid var(--border); border-radius: 16px;
    padding: 1.8rem; backdrop-filter: blur(10px);
    transition: border-color .3s, transform .3s;
  }
  .skill-group:hover { border-color: rgba(108,99,255,.4); transform: translateY(-4px); }
  .skill-group-title { font-family: var(--font-h); font-size: 1rem; font-weight: 700; margin-bottom: 1.2rem; color: var(--accent2); }
  .skill-badges { display: flex; flex-wrap: wrap; gap: .6rem; }
  .badge {
    padding: .35rem .9rem; border-radius: 50px; font-size: .8rem; font-weight: 500;
    background: rgba(108,99,255,.12); border: 1px solid rgba(108,99,255,.25);
    color: var(--text); transition: background .2s, border-color .2s;
  }
  .badge:hover { background: rgba(108,99,255,.25); border-color: var(--accent); }

  /* ── Projects ── */
  .projects-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
  .project-card {
    background: var(--glass); border: 1px solid var(--border); border-radius: 20px;
    padding: 2rem; display: flex; flex-direction: column; gap: 1rem;
    transition: transform .3s, box-shadow .3s, border-color .3s;
    position: relative; overflow: hidden; cursor: pointer;
  }
  .project-card::before {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(135deg, var(--c,rgba(108,99,255,.06)), transparent);
    transition: opacity .3s;
  }
  .project-card:hover { transform: translateY(-8px); box-shadow: 0 20px 60px rgba(0,0,0,.4); border-color: var(--c2, rgba(108,99,255,.4)); }
  .project-icon { font-size: 2.5rem; }
  .project-title { font-family: var(--font-h); font-size: 1.15rem; font-weight: 700; }
  .project-desc { font-size: .88rem; color: var(--muted); line-height: 1.7; flex: 1; }
  .project-tech { display: flex; flex-wrap: wrap; gap: .4rem; }
  .tech-chip {
    padding: .2rem .65rem; border-radius: 50px; font-size: .72rem; font-weight: 600;
    border: 1px solid var(--border); color: var(--muted);
  }
  .project-footer { display: flex; gap: .8rem; margin-top: .5rem; }
  .proj-link {
    font-size: .8rem; font-weight: 600; color: var(--accent); text-decoration: none;
    display: flex; align-items: center; gap: .3rem; transition: color .2s;
  }
  .proj-link:hover { color: var(--accent2); }

  /* ── Training ── */
  .training-card {
    background: var(--glass); border: 1px solid var(--border); border-radius: 20px;
    padding: 2.5rem; backdrop-filter: blur(10px); max-width: 700px;
  }
  .training-title { font-family: var(--font-h); font-size: 1.4rem; font-weight: 700; margin-bottom: .5rem; }
  .training-list { list-style: none; margin-top: 1rem; display: flex; flex-direction: column; gap: .8rem; }
  .training-list li { display: flex; align-items: center; gap: .7rem; color: var(--muted); font-size: .95rem; }
  .training-list li::before { content: '▸'; color: var(--accent); font-size: .8rem; }

  /* ── Certificates ── */
  .certs-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.2rem; }
  .cert-card {
    background: var(--glass); border: 1px solid var(--border); border-radius: 16px;
    padding: 1.8rem; display: flex; flex-direction: column; gap: .6rem;
    transition: transform .3s, border-color .3s;
  }
  .cert-card:hover { transform: translateY(-4px); border-color: rgba(0,212,170,.4); }
  .cert-icon { font-size: 2rem; }
  .cert-name { font-family: var(--font-h); font-size: 1rem; font-weight: 700; }
  .cert-issuer { font-size: .82rem; color: var(--accent2); font-weight: 600; }

  /* ── Education ── */
  .edu-timeline { position: relative; padding-left: 2rem; display: flex; flex-direction: column; gap: 2rem; }
  .edu-timeline::before { content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 1px; background: linear-gradient(to bottom, var(--accent), var(--accent2), transparent); }
  .edu-item { position: relative; }
  .edu-item::before {
    content: ''; position: absolute; left: -2.3rem; top: .4rem;
    width: 12px; height: 12px; border-radius: 50%;
    background: var(--accent); box-shadow: 0 0 12px rgba(108,99,255,.6);
  }
  .edu-card {
    background: var(--glass); border: 1px solid var(--border); border-radius: 16px;
    padding: 1.5rem 1.8rem; transition: border-color .3s;
  }
  .edu-card:hover { border-color: rgba(108,99,255,.4); }
  .edu-degree { font-family: var(--font-h); font-size: 1.05rem; font-weight: 700; margin-bottom: .3rem; }
  .edu-school { color: var(--muted); font-size: .9rem; }
  .edu-meta { display: flex; gap: 1rem; margin-top: .7rem; }
  .edu-year { font-size: .8rem; color: var(--accent2); font-weight: 600; }
  .edu-score { font-size: .8rem; color: var(--accent); font-weight: 600; padding: .15rem .7rem; background: rgba(108,99,255,.1); border-radius: 50px; }

  /* ── Contact ── */
  .contact-wrapper { display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: start; }
  .contact-info { display: flex; flex-direction: column; gap: 1rem; }
  .contact-item {
    display: flex; align-items: center; gap: 1rem;
    background: var(--glass); border: 1px solid var(--border); border-radius: 14px;
    padding: 1.2rem 1.5rem; transition: border-color .3s, transform .3s;
    text-decoration: none; color: var(--text);
  }
  .contact-item:hover { border-color: rgba(108,99,255,.4); transform: translateX(6px); }
  .contact-ico { font-size: 1.3rem; width: 2.5rem; text-align: center; }
  .contact-label { font-size: .75rem; color: var(--muted); margin-bottom: .1rem; }
  .contact-val { font-size: .92rem; font-weight: 500; }
  .contact-cta {
    background: linear-gradient(135deg, rgba(108,99,255,.12), rgba(0,212,170,.06));
    border: 1px solid var(--border); border-radius: 20px;
    padding: 2.5rem; display: flex; flex-direction: column; gap: 1.5rem;
  }
  .contact-cta h3 { font-family: var(--font-h); font-size: 1.5rem; font-weight: 800; }
  .contact-cta p { color: var(--muted); line-height: 1.7; }

  /* ── Footer ── */
  footer {
    border-top: 1px solid var(--border); padding: 2rem;
    text-align: center; color: var(--muted); font-size: .82rem;
    max-width: 1100px; margin: 0 auto;
  }

  /* ── Mobile ── */
  @media (max-width: 768px) {
    .about-grid, .contact-wrapper { grid-template-columns: 1fr; }
    .skills-grid, .projects-grid, .certs-grid { grid-template-columns: 1fr; }
    .nav-links { display: none; }
    .hero-name { font-size: clamp(2.5rem,10vw,4rem); }
  }
`;

/* ─────────────────── TYPING ANIMATION HOOK ─────────────────── */
function useTyping(phrases, speed = 80, pause = 1800) {
  const [displayed, setDisplayed] = useState("");
  const [phase, setPhase]     = useState("typing"); // typing | pausing | deleting
  const [idx, setIdx]         = useState(0);
  const [charIdx, setCharIdx] = useState(0);

  useEffect(() => {
    let t;
    const phrase = phrases[idx];
    if (phase === "typing") {
      if (charIdx < phrase.length) {
        t = setTimeout(() => { setDisplayed(phrase.slice(0, charIdx + 1)); setCharIdx(c => c + 1); }, speed);
      } else {
        t = setTimeout(() => setPhase("pausing"), pause);
      }
    } else if (phase === "pausing") {
      t = setTimeout(() => setPhase("deleting"), 300);
    } else {
      if (charIdx > 0) {
        t = setTimeout(() => { setDisplayed(phrase.slice(0, charIdx - 1)); setCharIdx(c => c - 1); }, speed / 2);
      } else {
        setIdx(i => (i + 1) % phrases.length);
        setPhase("typing");
      }
    }
    return () => clearTimeout(t);
  }, [phase, charIdx, idx]);

  return displayed;
}

/* ─────────────────── REVEAL HOOK ─────────────────── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visible"); } });
    }, { threshold: 0.12 });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

/* ═══════════════════════ COMPONENTS ═══════════════════════ */

function Navbar({ active }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const scrollTo = id => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className={`navbar${scrolled ? " scrolled" : ""}`}>
      <div className="nav-logo" onClick={() => scrollTo("home")}>DT</div>
      <ul className="nav-links">
        {NAV_LINKS.map(n => (
          <li key={n}>
            <a href="#" className={active === n.toLowerCase() ? "active" : ""}
               onClick={e => { e.preventDefault(); scrollTo(n === "Home" ? "home" : n.toLowerCase()); }}>
              {n}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function Hero() {
  const typed = useTyping([
    "CSE Student @ LPU",
    "Data Science Enthusiast",
    "Machine Learning Explorer",
    "Problem Solver",
  ]);

  return (
    <section id="home">
      <div className="hero-grid" />
      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <div className="blob blob-3" />
      <div className="hero-inner">
        <div className="hero-eyebrow">Hello, World</div>
        <h1 className="hero-name">Dipanshu<br />Thakur</h1>
        <div className="hero-title">
          {typed}<span className="cursor" />
        </div>
        <p className="hero-tagline">
          Building data-driven solutions & intelligent interfaces.<br />
          Turning complex problems into elegant, impactful software.
        </p>
        <div className="hero-btns">
          <a href="https://www.linkedin.com/in/dipanshuthakur/" target="_blank" rel="noreferrer" className="btn-primary">
            <span>💼</span> LinkedIn
          </a>
          <a href="https://github.com/dipanshuthakur2005" target="_blank" rel="noreferrer" className="btn-outline">
            <span>🐙</span> GitHub
          </a>
          <a href={GMAIL_COMPOSE} target="_blank" rel="noopener noreferrer" className="btn-outline" onClick={e => {
            // try opening Gmail compose, fallback to mailto if pop-up blocked or not logged in
            const gmailHref = GMAIL_COMPOSE;
            const mailtoHref = `mailto:${EMAIL}`;
            window.open(gmailHref, "_blank") || window.open(mailtoHref, "_blank");
            navigator.clipboard?.writeText(EMAIL).catch(() => {});
            e.preventDefault();
          }}>
            <span>✉️</span> Email Me
          </a>
        </div>
      </div>
      <div className="scroll-indicator">
        <div className="wheel"><div className="dot" /></div>
        <span>Scroll</span>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about">
      <div className="reveal">
        <span className="section-tag">Who I Am</span>
        <h2 className="section-title">About Me</h2>
      </div>
      <div className="about-grid reveal">
        <div className="about-card">
          <p className="about-text">
            I am a <strong>Computer Science student</strong> passionate about <strong>Data Science</strong>,{" "}
            <strong>Machine Learning</strong>, and problem-solving. I enjoy building{" "}
            <strong>real-world projects</strong>, data-driven applications, and interactive user interfaces.<br /><br />
            I believe that the intersection of <strong>code and data</strong> holds the power to solve
            some of the world's most interesting challenges — and I'm here to be part of that.
          </p>
        </div>
        <div className="about-stats">
          {[
            { num: "3+", label: "Projects Built" },
            { num: "6+", label: "Skills Mastered" },
            { num: "3", label: "Certifications" },
            { num: "∞", label: "Curiosity" },
          ].map(s => (
            <div className="stat-card" key={s.label}>
              <div className="stat-num">{s.num}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills">
      <div className="reveal">
        <span className="section-tag">What I Know</span>
        <h2 className="section-title">Skills & Tech</h2>
      </div>
      <div className="skills-grid">
        {Object.entries(SKILLS).map(([group, skills], i) => (
          <div className="skill-group reveal" key={group} style={{ transitionDelay: `${i * 0.1}s` }}>
            <div className="skill-group-title">{group}</div>
            <div className="skill-badges">
              {skills.map(s => <span className="badge" key={s}>{s}</span>)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Projects() {
  const colors = ["#6c63ff", "#00d4aa", "#ff6b6b"];
  return (
    <section id="projects">
      <div className="reveal">
        <span className="section-tag">What I've Built</span>
        <h2 className="section-title">Projects</h2>
      </div>
      <div className="projects-grid">
        {PROJECTS.map((p, i) => (
          <div className="project-card reveal" key={p.title}
               style={{
                 "--c": `${colors[i]}10`,
                 "--c2": `${colors[i]}66`,
                 transitionDelay: `${i * 0.12}s`,
               }}>
            <div className="project-icon">{p.icon}</div>
            <div className="project-title">{p.title}</div>
            <div className="project-desc">{p.desc}</div>
            <div className="project-tech">
              {p.tech.map(t => <span className="tech-chip" key={t}>{t}</span>)}
            </div>
            <div className="project-footer">
              <a href="https://github.com/dipanshuthakur2005" target="_blank" rel="noreferrer" className="proj-link">
                🐙 View Code
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Training() {
  return (
    <section id="training">
      <div className="reveal">
        <span className="section-tag">Learning Journey</span>
        <h2 className="section-title">Training</h2>
      </div>
      <div className="training-card reveal">
        <div className="training-title">🧠 Logic Building, Programming & DSA</div>
        <div style={{ color: "var(--muted)", fontSize: ".9rem" }}>Core Foundations — Self-Paced</div>
        <ul className="training-list">
          <li>Learned core programming concepts in C, C++, Java and Python</li>
          <li>Implemented fundamental and advanced DSA structures from scratch</li>
          <li>Strengthened problem-solving skills through competitive practice</li>
        </ul>
      </div>
    </section>
  );
}

function Certificates() {
  return (
    <section id="certificates">
      <div className="reveal">
        <span className="section-tag">Credentials</span>
        <h2 className="section-title">Certificates</h2>
      </div>
      <div className="certs-grid">
        {CERTS.map((c, i) => (
          <div className="cert-card reveal" key={c.name} style={{ transitionDelay: `${i * 0.1}s` }}>
            <div className="cert-icon">{c.icon}</div>
            <div className="cert-name">{c.name}</div>
            <div className="cert-issuer">{c.issuer}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Education() {
  return (
    <section id="education">
      <div className="reveal">
        <span className="section-tag">Academic Path</span>
        <h2 className="section-title">Education</h2>
      </div>
      <div className="edu-timeline">
        {EDUCATION.map((e, i) => (
          <div className="edu-item reveal" key={e.degree} style={{ transitionDelay: `${i * 0.15}s` }}>
            <div className="edu-card">
              <div className="edu-degree">{e.icon} {e.degree}</div>
              <div className="edu-school">{e.school}</div>
              <div className="edu-meta">
                <span className="edu-year">{e.year}</span>
                <span className="edu-score">{e.score}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact">
      <div className="reveal">
        <span className="section-tag">Let's Connect</span>
        <h2 className="section-title">Get In Touch</h2>
      </div>
      <div className="contact-wrapper reveal">
        <div className="contact-info">
          {[
            { ico: "✉️",  label: "Email",   val: EMAIL, href: GMAIL_COMPOSE },
            { ico: "📱",  label: "Phone",   val: "+91-7876592157",              href: "tel:+917876592157" },
            { ico: "💼",  label: "LinkedIn",val: "linkedin.com/in/dipanshuthakur", href: "https://www.linkedin.com/in/dipanshuthakur/" },
            { ico: "🐙",  label: "GitHub",  val: "github.com/dipanshuthakur2005",  href: "https://github.com/dipanshuthakur2005" },
          ].map(c => (
            <a className="contact-item" href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" key={c.label}
               onClick={c.label === "Email" ? e => {
                 window.open(GMAIL_COMPOSE, "_blank") || window.open(`mailto:${EMAIL}`, "_blank");
                 navigator.clipboard?.writeText(EMAIL).catch(() => {});
                 e.preventDefault();
               } : undefined}
            >
              <span className="contact-ico">{c.ico}</span>
              <div>
                <div className="contact-label">{c.label}</div>
                <div className="contact-val">{c.val}</div>
              </div>
            </a>
          ))}
        </div>
        <div className="contact-cta">
          <h3>Open to Opportunities 🚀</h3>
          <p>
            I'm actively looking for internships and entry-level roles in Data Science,
            Machine Learning, and Software Development. Let's build something impactful together.
          </p>
          <a 
  href="/cv/Dipanshu_Thakur_CV.pdf" 
  download="Dipanshu_Thakur_CV.pdf"
  className="btn-primary"
>
  ⬇️ Download CV
</a>
          <p style={{ fontSize: ".8rem", color: "var(--muted)" }}>
            Response time: within 24 hours ⚡
          </p>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════ APP ═══════════════════════ */
export default function App() {
  const [active, setActive] = useState("home");
  const [scrollPct, setScrollPct] = useState(0);

  useReveal();

  useEffect(() => {
    const sections = NAV_LINKS.map(n => n.toLowerCase());
    const onScroll = () => {
      // Progress bar
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollPct(total > 0 ? (window.scrollY / total) * 100 : 0);

      // Active section
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i] === "home" ? "home" : sections[i]);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(sections[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <style>{GLOBAL_CSS}</style>
      <div id="scroll-progress" style={{ width: `${scrollPct}%` }} />
      <Navbar active={active} />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Training />
        <Certificates />
        <Education />
        <Contact />
      </main>
      <footer>
        <p>Crafted with ❤️ by <strong>Dipanshu Thakur</strong> · 2025</p>
      </footer>
    </>
  );
}
