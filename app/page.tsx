'use client'

import { useEffect, useRef } from 'react'

const projects = [
  {
    client: 'National Gov Marketplace & Top Telecom',
    name: 'AI Contact Centre',
    desc: 'Real-time voice-to-voice AI contact centre for a national government marketplace and a leading telecom provider. SIP telephony, RAG-grounded knowledge base, multimodal LLM, and human escalation.',
    tags: ['Voice AI', 'AWS', 'RAG', 'Contact Centre', 'SIP'],
    featured: true,
  },
  {
    client: 'Global Automotive Manufacturer',
    name: 'Agentic IT Operations',
    desc: 'Conversational agent that captures cloud ops requests in plain English, validates against enterprise knowledge, creates support tickets, and auto-triggers deployment pipelines.',
    tags: ['Cloud', 'ITSM', 'CI/CD', 'Agentic AI'],
  },
  {
    client: 'Major Food Distributor',
    name: 'Agentic Document Parser',
    desc: 'Replaced a legacy unsupported desktop tool with an agentic cloud platform. Unstructured data → structured rules → deterministic parser → golden-output validation → bounded self-correction loop.',
    tags: ['Cloud AI', 'Serverless', 'Agentic'],
  },
  {
    client: 'UAE Aviation Catering',
    name: 'Intelligent Rostering System',
    desc: 'AI-driven workforce management covering long-term forecasting (3–6 months), scenario-based rostering, and real-time dynamic allocation. Integrated with core enterprise systems.',
    tags: ['Machine Learning', 'Forecasting', 'Rostering', 'ERP'],
  },
  {
    client: 'Global System Integrator (Internal)',
    name: 'Prompt-to-Product Platform',
    desc: 'Internal prompt-to-product platform for enterprise employees. Describe what you want in natural language — get a deployed full-stack app. Multi-model approach for code generation, design, and planning.',
    tags: ['LLMs', 'React', 'FastAPI', 'Multi-model'],
  },
  {
    client: 'Global System Integrator (Internal)',
    name: 'Enterprise Content Engine',
    desc: 'Suite of scheduled AI agents producing blogs, audio podcasts, news, and community content for an enterprise employee super-app. High adoption with robust daily active usage.',
    tags: ['Content Agents', 'Automation', 'LLM', 'Python'],
  },
]

const skills = [
  {
    name: 'Cloud & Infra',
    items: ['AWS Bedrock, Lambda, Step Functions', 'API Gateway, S3, OpenSearch', 'Amazon Connect', 'Azure ML, Cognitive Services', 'Azure DevOps'],
  },
  {
    name: 'AI / ML',
    items: ['LLM Orchestration', 'RAG / CAG Pipelines', 'Agentic Workflows', 'Voice AI & SIP Telephony', 'Demand Forecasting'],
  },
  {
    name: 'Integrations',
    items: ['ServiceNow', 'Azure DevOps', 'SAP', 'AODB, BioStar', 'WhatsApp Business API'],
  },
  {
    name: 'Development',
    items: ['React, Next.js, Vite', 'FastAPI, Python', 'PySpark', 'TypeScript'],
  },
  {
    name: 'Models',
    items: ['GPT-5', 'Gemini', 'Claude', 'Open-source LLMs', 'Multimodal AI'],
  },
  {
    name: 'Leadership',
    items: ['Solution Architecture', 'Pre-sales Solutioning', 'Stakeholder Management', 'Team of 50 members', 'Community of 15K+'],
  },
]

export default function Home() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const ring = ringRef.current
    if (!cursor || !ring) return

    let mouseX = 0, mouseY = 0
    let ringX = 0, ringY = 0

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      cursor.style.left = mouseX + 'px'
      cursor.style.top = mouseY + 'px'
    }

    const animate = () => {
      ringX += (mouseX - ringX) * 0.12
      ringY += (mouseY - ringY) * 0.12
      ring.style.left = ringX + 'px'
      ring.style.top = ringY + 'px'
      requestAnimationFrame(animate)
    }

    const onEnter = () => ring.classList.add('hovering')
    const onLeave = () => ring.classList.remove('hovering')

    document.addEventListener('mousemove', onMove)
    document.querySelectorAll('a, button, .project-card').forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    animate()
    return () => document.removeEventListener('mousemove', onMove)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.05 }
    )
    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <div className="cursor" ref={cursorRef} />
      <div className="cursor-ring" ref={ringRef} />

      {/* NAV */}
      <nav className="nav">
        <a href="#" className="nav-logo mono">JA</a>
        <ul className="nav-links">
          <li><a href="#about">About</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#skills">Skills</a></li>
          <li><a href="#experience">Experience</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>

      {/* HERO */}
      <section className="hero" id="home">
        <div className="hero-grid" />
        <div className="hero-glow" />
        <div className="hero-content">
          <div className="hero-tag mono">AI Engineer · Solutions Architect</div>
          <h1 className="hero-name display">
            Jatin<br /><em>Agrawal</em>
          </h1>
          <p className="hero-title display">Building enterprise AI that works in the real world.</p>
          <p className="hero-desc">
            At a leading Enterprise Innovation Lab, I architect and ship AI systems across voice, automation, and GenAI — from government-scale contact centres to agentic cloud platforms.
          </p>
          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-num display">15+</div>
              <div className="stat-label mono">Projects Shipped</div>
            </div>
            <div className="stat-item">
              <div className="stat-num display">Multi-Million</div>
              <div className="stat-label mono">Revenue Pipeline</div>
            </div>
            <div className="stat-item">
              <div className="stat-num display">15K+</div>
              <div className="stat-label mono">Community Members</div>
            </div>
          </div>
          <div className="hero-cta">
            <a href="#projects" className="btn-primary">View Work</a>
            <a href="#contact" className="btn-ghost">Get In Touch</a>
          </div>
        </div>
        <div className="hero-scroll">
          <div className="scroll-line" />
          <span className="mono">Scroll</span>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about">
        <div className="section-header fade-up">
          <span className="section-num mono">01</span>
          <h2 className="section-title display">About</h2>
          <div className="section-line" />
        </div>
        <div className="about-grid">
          <div className="about-text fade-up fade-up-delay-1">
            <p>
              I'm a final-year-to-first-year story that skipped the usual script. Most people at my designation are doing ticket work. I ended up leading the architecture on a <em>government-scale AI contact centre</em>, scoping a workforce planning system for UAE aviation, and building an internal prompt-to-product platform — all in the first 10 months.
            </p>
            <p>
              I'm drawn to the intersection of <strong>AI and real operational complexity</strong> — where the interesting challenge isn't the model, it's the system around it. The validation loops, the human handoffs, the governance, the integration with messy enterprise reality.
            </p>
            <p>
              I lead an <strong>Enterprise AI Delivery Team</strong> — a 50-member delivery unit inside a 15,000+ member innovation community — running hackathons, client PoCs, and annual flagship events with 5,000+ participants.
            </p>
            <p>
              Outside of my current role, I'm interested in getting closer to product thinking. I want to shape what gets built and why — not just execute on what's already scoped.
            </p>
          </div>
          <div className="about-sidebar fade-up fade-up-delay-2">
            <div className="sidebar-block">
              <div className="sidebar-label mono">Currently</div>
              <div className="sidebar-content">AI Engineer at a Global System Integrator. Leading an AI delivery community across 4+ sectors.</div>
            </div>
            <div className="sidebar-block">
              <div className="sidebar-label mono">Education</div>
              <div className="sidebar-content">B.Tech — Computer Software Engineering<br />Gyan Ganga College of Technology<br />2020 – 2024</div>
            </div>
            <div className="sidebar-block">
              <div className="sidebar-label mono">Certifications</div>
              <div className="sidebar-content">
                AWS Cloud Architecting<br />
                AWS ML Foundations<br />
                AWS Cloud Foundations<br />
                CCNA: Intro to Networks<br />
                Cisco Cybersecurity
              </div>
            </div>
            <div className="sidebar-block">
              <div className="sidebar-label mono">Looking For</div>
              <div className="sidebar-content">End-to-end ownership. Fast team. Agentic AI, voice AI, or enterprise automation. Close to the product.</div>
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="projects-bg">
        <div className="section-header fade-up">
          <span className="section-num mono">02</span>
          <h2 className="section-title display">Projects</h2>
          <div className="section-line" />
        </div>
        <div className="projects-grid">
          {projects.map((p, i) => (
            <div key={i} className={`project-card fade-up${p.featured ? ' project-featured' : ''}`} style={{ transitionDelay: `${i * 0.05}s` }}>
              <div className="project-client mono">{p.client}</div>
              <div className="project-name display">{p.name}</div>
              <div className="project-desc">{p.desc}</div>
              <div className="project-tags">
                {p.tags.map(t => <span key={t} className="tag mono">{t}</span>)}
              </div>
              <span className="project-arrow">↗</span>
            </div>
          ))}
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills">
        <div className="section-header fade-up">
          <span className="section-num mono">03</span>
          <h2 className="section-title display">Skills</h2>
          <div className="section-line" />
        </div>
        <div className="skills-grid">
          {skills.map((s, i) => (
            <div key={i} className="skill-category fade-up" data-num={`0${i + 1}`} style={{ transitionDelay: `${i * 0.08}s` }}>
              <div className="skill-cat-name mono">{s.name}</div>
              <ul className="skill-list">
                {s.items.map(item => <li key={item}>{item}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience">
        <div className="section-header fade-up">
          <span className="section-num mono">04</span>
          <h2 className="section-title display">Experience</h2>
          <div className="section-line" />
        </div>
        <div className="experience-list">
          <div className="exp-item fade-up">
            <div className="exp-meta">
              <div className="exp-period mono">Aug 2025 — Present</div>
              <div className="exp-company">Global System Integrator</div>
              <div className="exp-location">India</div>
            </div>
            <div className="exp-content">
              <div className="exp-role display">AI Engineer & Solutions Architect</div>
              <ul className="exp-bullets">
                <li>Led an internal AI delivery team of 50 members within a 15,000+ member community — contributing to a multi-million dollar revenue pipeline across 15+ AI solutions.</li>
                <li>Designed AI contact centre architectures for a national government marketplace and a leading telecom — integrating SIP telephony, multimodal LLMs, and RAG pipelines at government scale.</li>
                <li>Built agentic cloud ops automation for a global automotive manufacturer and an AWS-native document parser platform for a major food distributor.</li>
                <li>Architected workforce planning systems for UAE aviation: AI forecasting, scenario rostering, and real-time dynamic allocation integrated with core enterprise ERPs.</li>
                <li>Led pre-sales solutioning and pitch delivery across government, hospitality, healthcare, and gaming sectors.</li>
              </ul>
            </div>
          </div>
          <div className="exp-item fade-up fade-up-delay-1">
            <div className="exp-meta">
              <div className="exp-period mono">May 2025 — Aug 2025</div>
              <div className="exp-company">Regional Healthcare Provider</div>
              <div className="exp-location">India</div>
            </div>
            <div className="exp-content">
              <div className="exp-role display">Head of Patient Experience</div>
              <ul className="exp-bullets">
                <li>Built end-to-end call centre and patient communication system from scratch; scaled to 1,000+ daily inquiries via phone and WhatsApp.</li>
                <li>Implemented WhatsApp Business automation, reducing query resolution time by 40%.</li>
                <li>Led launch SEO and Meta Ads strategy, driving a 60% uplift in appointment bookings during peak campaigns.</li>
              </ul>
            </div>
          </div>
          <div className="exp-item fade-up fade-up-delay-2">
            <div className="exp-meta">
              <div className="exp-period mono">May 2023 — Jul 2023</div>
              <div className="exp-company">First Door Health</div>
              <div className="exp-location">Jabalpur, India</div>
            </div>
            <div className="exp-content">
              <div className="exp-role display">Full Stack Developer Intern</div>
              <ul className="exp-bullets">
                <li>Contributed to full-stack development of a health-tech platform.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="contact-bg">
        <div className="contact-inner">
          <div className="contact-pre mono fade-up">Get In Touch</div>
          <h2 className="contact-heading display fade-up fade-up-delay-1">
            Let's build something <em>real.</em>
          </h2>
          <p className="contact-sub fade-up fade-up-delay-2">
            I'm open to roles where I own problems end-to-end — agentic AI, voice AI, enterprise automation. If that resonates, reach out.
          </p>
          <div className="contact-links fade-up fade-up-delay-3">
            <a href="mailto:jatinagrawal942@gmail.com" className="contact-link mono">
              ✉ Email
            </a>
            <a href="https://linkedin.com/in/jatin--agrawal" target="_blank" rel="noopener noreferrer" className="contact-link mono">
              ↗ LinkedIn
            </a>
            <a href="tel:+917773066808" className="contact-link mono">
              ✆ Call
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <p className="mono">© 2025 Jatin Agrawal</p>
        <p className="mono">AI Engineer & Solutions Architect</p>
      </footer>
    </>
  )
}
