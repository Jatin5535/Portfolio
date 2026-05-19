'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import dynamic from 'next/dynamic'

// Dynamically import the ThreeBackground to prevent Server-Side Rendering (SSR) issues
const ThreeBackground = dynamic(() => import('@/components/ThreeBackground'), { ssr: false })

const blogs = [
  {
    title: 'Architecting AI Contact Centers',
    date: 'May 12, 2026',
    desc: 'Challenges of voice-to-voice AI architectures using SIP telephony and LLMs for government-scale traffic.',
    readTime: '6 min read'
  },
  {
    title: 'Agentic Workflows in Cloud Ops',
    date: 'March 28, 2026',
    desc: 'Transitioning from static runbooks to conversational, autonomous agents for handling ITSM.',
    readTime: '5 min read'
  },
  {
    title: 'Beyond RAG: Bounded Execution',
    date: 'February 15, 2026',
    desc: 'Exploring self-correcting deterministic parsers and bounded execution loops.',
    readTime: '8 min read'
  }
]

const projects = [
  {
    client: 'National Gov Marketplace',
    name: 'AI Contact Centre',
    desc: 'Real-time voice-to-voice AI contact centre using SIP telephony, dynamic RAG-grounded knowledge base, and human-in-the-loop escalation.',
    tags: ['Voice AI', 'AWS', 'RAG', 'SIP'],
    metric: '1,000+ Calls/Sec Capacity'
  },
  {
    client: 'Global Automotive Leader',
    name: 'Agentic IT Operations',
    desc: 'Conversational agent capturing operations requests in plain English, validating infrastructure, and triggering deployment pipelines.',
    tags: ['Cloud', 'ITSM', 'CI/CD', 'Agentic AI'],
    metric: '92% Manual Tasks Reduced'
  },
  {
    client: 'Major Food Distributor',
    name: 'Agentic Document Parser',
    desc: 'Cloud-native unstructured data parser utilizing complex self-correction loops and golden-output validation schemas.',
    tags: ['Serverless', 'Agentic', 'Python'],
    metric: '99.4% Parsing Accuracy'
  },
  {
    client: 'UAE Aviation Catering',
    name: 'Intelligent Rostering',
    desc: 'AI-driven workforce planning covering scenario-based rostering, long-term forecasting, and dynamic real-time crew allocation.',
    tags: ['Machine Learning', 'Forecasting', 'ERP'],
    metric: '3-6 Mon Workforce Forecast'
  },
  {
    client: 'Internal GSI Super-App',
    name: 'Prompt-to-Product Platform',
    desc: 'Describe tools in plain language to deploy running full-stack applications. Utilizes multi-model orchestrator pipelines.',
    tags: ['LLMs', 'React', 'FastAPI', 'Multi-model'],
    metric: 'Deployed in < 2 Mins'
  },
  {
    client: 'Internal GSI Super-App',
    name: 'Enterprise Content Engine',
    desc: 'Scheduled AI content agents generating articles, audio podcasts, and market insights automatically for employee channels.',
    tags: ['Agents', 'Automation', 'Python'],
    metric: '15K+ Active Users Daily'
  }
]

const skillCategories = [
  {
    name: 'AI / ML & Orchestration',
    percentage: 95,
    items: ['LLM Orchestration', 'RAG & CAG Pipelines', 'Agentic Workflows', 'Voice AI & SIP Telephony', 'Demand Forecasting']
  },
  {
    name: 'Cloud & Infrastructure',
    percentage: 90,
    items: ['AWS (Bedrock, Lambda, Step Functions)', 'API Gateway, S3, OpenSearch', 'Amazon Connect', 'Azure DevOps & ML']
  },
  {
    name: 'Integrations & Enterprise',
    percentage: 88,
    items: ['ServiceNow ITSM', 'SAP Systems', 'AODB & BioStar API', 'WhatsApp Business APIs']
  },
  {
    name: 'Modern Development',
    percentage: 85,
    items: ['React, Next.js, Vite', 'FastAPI, Python', 'PySpark Big Data', 'TypeScript']
  }
]

const experience = [
  {
    period: 'Aug 2025 — Present',
    company: 'Global System Integrator',
    role: 'AI Architect',
    highlight: 'Led 50-member team building 15+ complex enterprise AI systems.'
  },
  {
    period: 'May 2025 — Aug 2025',
    company: 'Regional Healthcare Provider',
    role: 'Head of Patient Experience',
    highlight: 'Scaled communication systems to 1,000+ daily inquiries via WhatsApp.'
  },
  {
    period: 'May 2023 — Jul 2023',
    company: 'First Door Health',
    role: 'Full Stack Intern',
    highlight: 'Contributed to full-stack health-tech modules.'
  }
]

const sectionCoordinates: Record<string, string> = {
  home: 'COORD. [0.0, 0.0, 160.0]',
  about: 'COORD. [-60.0, 25.0, 45.0]',
  projects: 'COORD. [70.0, 30.0, -35.0]',
  skills: 'COORD. [-45.0, -40.0, -50.0]',
  writing: 'COORD. [55.0, -35.0, 45.0]',
  experience: 'COORD. [0.0, 60.0, -70.0]',
  contact: 'COORD. [0.0, -55.0, 15.0]'
}

export default function Home() {
  const [activeSection, setActiveSection] = useState('home')
  const [activeProject, setActiveProject] = useState(0)
  const [activeSkill, setActiveSkill] = useState(0)
  
  const cursorRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  // Sleek interactive custom cursor
  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return
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
      ringX += (mouseX - ringX) * 0.15
      ringY += (mouseY - ringY) * 0.15
      ring.style.left = ringX + 'px'
      ring.style.top = ringY + 'px'
      requestAnimationFrame(animate)
    }

    const onEnter = () => ring.classList.add('hovering')
    const onLeave = () => ring.classList.remove('hovering')

    document.addEventListener('mousemove', onMove)
    
    // Add hovering class to standard interactives
    const addListeners = () => {
      document.querySelectorAll('a, button, .interactive-card').forEach(el => {
        el.addEventListener('mouseenter', onEnter)
        el.addEventListener('mouseleave', onLeave)
      })
    }
    
    addListeners()
    animate()

    // Re-observe DOM changes to hook new elements entering screen
    const observer = new MutationObserver(addListeners)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      document.removeEventListener('mousemove', onMove)
      observer.disconnect()
    }
  }, [])

  const selectSection = (secId: string) => {
    setActiveSection(secId)
  }

  return (
    <>
      <div className="cursor hidden md:block" ref={cursorRef} />
      <div className="cursor-ring hidden md:block" ref={ringRef} />
      
      {/* Dynamic Cybernetic HUD Overlay Details */}
      <div className="scanlines" />
      <div className="noise-overlay" />
      <div className="hero-grid" />
      
      {/* 3D WebGL Canvas Layer */}
      <ThreeBackground 
        activeSection={activeSection} 
        activeProjectIndex={activeProject} 
        onNodeClick={selectSection}
      />

      {/* TOP HEADER HUD */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-5 flex justify-between items-center border-b border-white-faint backdrop-blur-md bg-navy/20 select-none">
        <div className="flex items-center gap-4">
          <button onClick={() => selectSection('home')} className="font-mono text-[0.72rem] tracking-[0.2em] uppercase text-gold hover:text-gold-light transition-colors flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-gold rounded-full animate-ping" />
            JA // CORE.01
          </button>
        </div>
        
        {/* Navigation overlay */}
        <nav>
          <ul className="flex items-center gap-4 md:gap-8">
            {['About', 'Projects', 'Skills', 'Writing', 'Experience', 'Contact'].map((item) => {
              const secId = item.toLowerCase()
              const isSelected = activeSection === secId
              return (
                <li key={item}>
                  <button 
                    onClick={() => selectSection(secId)} 
                    className={`font-mono text-[0.68rem] tracking-[0.15em] uppercase transition-all duration-300 ${isSelected ? 'text-gold text-glow border-b border-gold pb-1' : 'text-white-dim hover:text-white'}`}
                  >
                    {item}
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>
      </header>

      {/* BOTTOM CONTROL STATUS BAR */}
      <footer className="fixed bottom-0 left-0 right-0 z-50 px-6 md:px-12 py-4 flex justify-between items-center border-t border-white-faint backdrop-blur-md bg-navy/20 font-mono text-[0.62rem] text-white-dim select-none">
        <div className="flex items-center gap-3">
          <span className="text-gold font-semibold">{sectionCoordinates[activeSection] || 'COORD. [---]'}</span>
        </div>
        <div className="hidden md:flex gap-6">
          <span>SYS.STATUS: OPERATIONAL</span>
          <span>FPS: 60 // GL_RENDER</span>
        </div>
        <div>
          <span className="uppercase text-gold">SECTOR // {activeSection}</span>
        </div>
      </footer>

      {/* FLOATING GLASS UI PANELS (Dynamically Rendered depending on Active Section) */}
      <main className="absolute inset-0 w-full h-full flex items-center justify-start z-10 pointer-events-none px-6 md:px-16 pt-24 pb-16">
        <div className="w-full max-w-7xl mx-auto flex items-center justify-between">
          
          {/* LEFT INTERACTIVE PANEL */}
          <div className="w-full md:w-[480px] h-[520px] pointer-events-auto relative">
            
            {/* HERO SECTION VIEW */}
            <div className={`absolute inset-0 flex flex-col justify-center transition-all duration-500 ease-out ${activeSection === 'home' ? 'opacity-100 translate-x-0 scale-100 pointer-events-auto' : 'opacity-0 -translate-x-12 scale-95 pointer-events-none'}`}>
              <div className="font-mono text-[0.7rem] tracking-[0.25em] uppercase text-gold mb-3 flex items-center gap-2">
                <span>AI Engineer & Solutions Architect</span>
              </div>
              <h1 className="font-serif text-5xl md:text-7xl leading-[0.9] text-white mb-6">
                Jatin <br /><em className="italic text-gold font-normal">Agrawal</em>
              </h1>
              <p className="text-[0.92rem] text-white-dim leading-[1.6] mb-10 max-w-[360px] font-light">
                Engineering high-scale, production-grade AI architectures and autonomous agents for enterprise execution.
              </p>
              
              {/* Minimalist Grid Stat Cards */}
              <div className="grid grid-cols-3 gap-3 mb-8">
                {[
                  { num: '15+', label: 'AI Deployed' },
                  { num: '50+', label: 'Engineers Led' },
                  { num: '4+', label: 'Verticals' }
                ].map((stat, i) => (
                  <div key={i} className="bg-navy-mid/20 border border-white-faint p-3 rounded-lg flex flex-col justify-center cursor-default">
                    <span className="font-serif text-[1.5rem] text-gold leading-none">{stat.num}</span>
                    <span className="font-mono text-[0.52rem] uppercase tracking-wider text-white-dim mt-1.5">{stat.label}</span>
                  </div>
                ))}
              </div>
              
              <div className="flex gap-4">
                <button onClick={() => selectSection('projects')} className="glow-btn">
                  Explore Systems
                </button>
                <button onClick={() => selectSection('contact')} className="font-mono text-[0.68rem] tracking-[0.1em] text-white-dim hover:text-gold uppercase transition-colors">
                  Contact Engine
                </button>
              </div>
            </div>

            {/* ABOUT SECTION VIEW */}
            <div className={`absolute inset-0 glass-panel p-8 flex flex-col justify-between transition-all duration-500 ease-out ${activeSection === 'about' ? 'opacity-100 translate-x-0 scale-100 pointer-events-auto' : 'opacity-0 -translate-x-12 scale-95 pointer-events-none'}`}>
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <span className="font-mono text-[0.6rem] text-gold border border-gold/30 px-2 py-0.5 rounded">SEC_01</span>
                  <h2 className="font-serif text-2xl md:text-3xl text-white">Philosophy</h2>
                </div>
                <p className="text-[0.9rem] text-white-dim leading-[1.7] mb-8 font-light">
                  Bridging the gap between advanced models and real-world complexity. I specialize in turning complex agentic concepts into secure, self-correcting pipelines that run at scale.
                </p>
                
                <div className="space-y-4">
                  <div className="border-l-2 border-gold/50 pl-4 py-1">
                    <div className="font-mono text-[0.58rem] tracking-[0.1em] uppercase text-gold">Currently</div>
                    <div className="text-[0.78rem] text-white font-medium mt-0.5">AI Architect @ TCS Labs (India)</div>
                  </div>
                  <div className="border-l-2 border-gold/50 pl-4 py-1">
                    <div className="font-mono text-[0.58rem] tracking-[0.1em] uppercase text-gold">B.Tech Software Engineering</div>
                    <div className="text-[0.78rem] text-white-dim mt-0.5 font-light">Gyan Ganga College of Technology (2020 - 2024)</div>
                  </div>
                  <div className="border-l-2 border-gold/50 pl-4 py-1">
                    <div className="font-mono text-[0.58rem] tracking-[0.1em] uppercase text-gold">Certifications</div>
                    <div className="text-[0.78rem] text-white-dim mt-0.5 font-light">AWS Solutions Architect · AWS Machine Learning · Cisco Networking</div>
                  </div>
                </div>
              </div>
              
              <button onClick={() => selectSection('projects')} className="glow-btn mt-6 w-full text-center">
                System Artifacts →
              </button>
            </div>

            {/* PROJECTS SECTION VIEW (WITH DYNAMIC CAROUSEL LINKED TO 3D NODE) */}
            <div className={`absolute inset-0 glass-panel p-8 flex flex-col justify-between transition-all duration-500 ease-out ${activeSection === 'projects' ? 'opacity-100 translate-x-0 scale-100 pointer-events-auto' : 'opacity-0 -translate-x-12 scale-95 pointer-events-none'}`}>
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[0.6rem] text-gold border border-gold/30 px-2 py-0.5 rounded">SEC_02</span>
                    <h2 className="font-serif text-2xl md:text-3xl text-white">Systems</h2>
                  </div>
                  <span className="font-mono text-[0.62rem] text-gold tracking-widest bg-gold/10 px-2.5 py-1 rounded-full">
                    {activeProject + 1} / {projects.length}
                  </span>
                </div>

                <div className="mb-4">
                  <span className="font-mono text-[0.58rem] uppercase tracking-wider text-gold-light">{projects[activeProject].client}</span>
                  <h3 className="font-serif text-[1.4rem] text-white mt-0.5 leading-tight">{projects[activeProject].name}</h3>
                </div>

                <p className="text-[0.82rem] text-white-dim leading-[1.6] mb-5 font-light">
                  {projects[activeProject].desc}
                </p>

                {/* Key Accomplishment Metric Callout */}
                <div className="bg-gold/5 border border-gold/15 p-3 rounded-lg mb-4">
                  <div className="font-mono text-[0.52rem] uppercase tracking-wider text-gold">Key Metric Objective</div>
                  <div className="text-[0.88rem] text-white font-medium mt-0.5">{projects[activeProject].metric}</div>
                </div>

                {/* Tech Chips */}
                <div className="flex flex-wrap gap-1.5">
                  {projects[activeProject].tags.map(t => (
                    <span key={t} className="font-mono text-[0.52rem] bg-white-faint border border-white-faint px-2 py-1 rounded text-white-dim">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Slider Controller buttons */}
              <div className="flex gap-3 mt-6">
                <button 
                  onClick={() => setActiveProject(prev => (prev === 0 ? projects.length - 1 : prev - 1))}
                  className="flex-1 py-2 border border-gold/30 text-gold hover:border-gold hover:bg-gold/5 transition-all text-[0.68rem] font-mono uppercase tracking-widest rounded-lg"
                >
                  ◄ Previous
                </button>
                <button 
                  onClick={() => setActiveProject(prev => (prev === projects.length - 1 ? 0 : prev + 1))}
                  className="flex-1 py-2 bg-gold text-navy hover:bg-gold-light transition-all text-[0.68rem] font-mono uppercase tracking-widest font-bold rounded-lg"
                >
                  Next ►
                </button>
              </div>
            </div>

            {/* SKILLS SECTION VIEW */}
            <div className={`absolute inset-0 glass-panel p-8 flex flex-col justify-between transition-all duration-500 ease-out ${activeSection === 'skills' ? 'opacity-100 translate-x-0 scale-100 pointer-events-auto' : 'opacity-0 -translate-x-12 scale-95 pointer-events-none'}`}>
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <span className="font-mono text-[0.6rem] text-gold border border-gold/30 px-2 py-0.5 rounded">SEC_03</span>
                  <h2 className="font-serif text-2xl md:text-3xl text-white">Engine</h2>
                </div>

                {/* Skill selector icons */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {skillCategories.map((cat, idx) => {
                    const isSelected = activeSkill === idx
                    return (
                      <button 
                        key={idx}
                        onClick={() => setActiveSkill(idx)}
                        className={`p-3 rounded-lg border text-left flex items-center justify-between transition-all duration-300 ${isSelected ? 'border-gold bg-gold/5' : 'border-white-faint bg-white-faint hover:bg-navy-mid/20'}`}
                      >
                        <div className="max-w-[70%]">
                          <div className={`font-serif text-[0.75rem] leading-tight ${isSelected ? 'text-white' : 'text-white-dim'}`}>{cat.name.split(' & ')[0]}</div>
                        </div>
                        <div className="relative w-8 h-8 flex items-center justify-center flex-shrink-0">
                          {/* Circular SVG Ring */}
                          <svg className="progress-ring w-8 h-8 absolute inset-0">
                            <circle className="stroke-white-faint" strokeWidth="1.5" fill="transparent" r="12" cx="16" cy="16" />
                            <circle 
                              className="stroke-gold progress-ring-circle" 
                              strokeWidth="1.5" 
                              fill="transparent" 
                              r="12" 
                              cx="16" 
                              cy="16" 
                              strokeDasharray={`${2 * Math.PI * 12}`}
                              strokeDashoffset={`${2 * Math.PI * 12 * (1 - cat.percentage / 100)}`}
                            />
                          </svg>
                          <span className="font-mono text-[0.55rem] text-gold font-semibold">{cat.percentage}%</span>
                        </div>
                      </button>
                    )
                  })}
                </div>

                {/* Subskill list chips */}
                <div className="bg-navy-mid/10 border border-white-faint p-4 rounded-xl">
                  <div className="font-mono text-[0.52rem] uppercase tracking-wider text-gold mb-3">Core Modules Deployed</div>
                  <div className="flex flex-wrap gap-1.5">
                    {skillCategories[activeSkill].items.map((sub, i) => (
                      <span key={i} className="font-mono text-[0.55rem] text-white border border-gold/15 px-2.5 py-1 rounded bg-navy-mid/30">
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="font-mono text-[0.52rem] text-white-dim uppercase tracking-wider mt-4">
                * Built with high enterprise telemetry pipelines.
              </div>
            </div>

            {/* WRITING SECTION VIEW */}
            <div className={`absolute inset-0 glass-panel p-8 flex flex-col justify-between transition-all duration-500 ease-out ${activeSection === 'writing' ? 'opacity-100 translate-x-0 scale-100 pointer-events-auto' : 'opacity-0 -translate-x-12 scale-95 pointer-events-none'}`}>
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <span className="font-mono text-[0.6rem] text-gold border border-gold/30 px-2 py-0.5 rounded">SEC_04</span>
                  <h2 className="font-serif text-2xl md:text-3xl text-white">Insights</h2>
                </div>

                {/* Minimal micro-article list */}
                <div className="space-y-4">
                  {blogs.map((b, i) => (
                    <div key={i} className="group border-b border-white-faint pb-3.5 last:border-b-0 cursor-pointer">
                      <div className="flex items-center justify-between font-mono text-[0.52rem] text-gold mb-1">
                        <span>{b.date}</span>
                        <span>{b.readTime}</span>
                      </div>
                      <h3 className="font-serif text-[0.98rem] text-white group-hover:text-gold transition-colors leading-tight">{b.title}</h3>
                      <p className="text-[0.72rem] text-white-dim font-light mt-1 line-clamp-1">{b.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <button className="glow-btn w-full">
                Launch Feed ↗
              </button>
            </div>

            {/* EXPERIENCE SECTION VIEW */}
            <div className={`absolute inset-0 glass-panel p-8 flex flex-col justify-between transition-all duration-500 ease-out ${activeSection === 'experience' ? 'opacity-100 translate-x-0 scale-100 pointer-events-auto' : 'opacity-0 -translate-x-12 scale-95 pointer-events-none'}`}>
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <span className="font-mono text-[0.6rem] text-gold border border-gold/30 px-2 py-0.5 rounded">SEC_05</span>
                  <h2 className="font-serif text-2xl md:text-3xl text-white">Chronology</h2>
                </div>

                {/* Minimalist Timeline milestones */}
                <div className="relative border-l border-gold/20 pl-4 space-y-6 py-2">
                  {experience.map((exp, i) => (
                    <div key={i} className="relative">
                      {/* Timeline gold indicator */}
                      <span className="absolute -left-[21px] top-1.5 w-2 h-2 rounded-full bg-gold shadow-[0_0_8px_rgba(201,168,76,0.8)]" />
                      
                      <div className="font-mono text-[0.52rem] text-gold leading-none mb-1">{exp.period}</div>
                      <div className="flex items-baseline justify-between">
                        <span className="font-serif text-[0.95rem] text-white font-medium">{exp.company}</span>
                        <span className="font-mono text-[0.6rem] text-white-dim font-light">{exp.role}</span>
                      </div>
                      <p className="text-[0.75rem] text-white-dim font-light mt-1 pl-2 border-l border-white-faint">
                        {exp.highlight}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="font-mono text-[0.52rem] text-white-dim uppercase tracking-wider mt-4">
                * Track records validated and cryptographically verified.
              </div>
            </div>

            {/* CONTACT SECTION VIEW */}
            <div className={`absolute inset-0 glass-panel p-8 flex flex-col justify-between transition-all duration-500 ease-out ${activeSection === 'contact' ? 'opacity-100 translate-x-0 scale-100 pointer-events-auto' : 'opacity-0 -translate-x-12 scale-95 pointer-events-none'}`}>
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <span className="font-mono text-[0.6rem] text-gold border border-gold/30 px-2 py-0.5 rounded">SEC_06</span>
                  <h2 className="font-serif text-2xl md:text-3xl text-white">Beacon</h2>
                </div>

                <h3 className="font-serif text-3xl text-white mb-4 leading-tight">
                  Let's deploy <br /><em className="italic text-gold font-normal">something real.</em>
                </h3>
                <p className="text-[0.82rem] text-white-dim leading-[1.6] mb-8 font-light">
                  Open to enterprise AI architect opportunities, agentic automations, or voice systems. Reach out to hook up pipelines.
                </p>

                {/* Sleek cyber contacts */}
                <div className="grid grid-cols-1 gap-2.5">
                  <a 
                    href="mailto:jatinagrawal942@gmail.com" 
                    className="flex items-center justify-between px-4 py-3 bg-white-faint border border-white-faint rounded-lg font-mono text-[0.68rem] tracking-wider text-white-dim hover:text-gold hover:border-gold/30 hover:bg-navy-mid/20 transition-all"
                  >
                    <span>✉ EMAIL // SECURE</span>
                    <span className="text-gold">jatinagrawal942@gmail.com</span>
                  </a>
                  <a 
                    href="https://linkedin.com/in/jatin--agrawal" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center justify-between px-4 py-3 bg-white-faint border border-white-faint rounded-lg font-mono text-[0.68rem] tracking-wider text-white-dim hover:text-gold hover:border-gold/30 hover:bg-navy-mid/20 transition-all"
                  >
                    <span>↗ LINKEDIN // PUBLIC</span>
                    <span className="text-gold">jatin--agrawal</span>
                  </a>
                  <a 
                    href="tel:+917773066808" 
                    className="flex items-center justify-between px-4 py-3 bg-white-faint border border-white-faint rounded-lg font-mono text-[0.68rem] tracking-wider text-white-dim hover:text-gold hover:border-gold/30 hover:bg-navy-mid/20 transition-all"
                  >
                    <span>✆ TELEPHONY // VOICE</span>
                    <span className="text-gold">+91 7773066808</span>
                  </a>
                </div>
              </div>

              <div className="font-mono text-[0.52rem] text-white-dim uppercase text-center mt-6 tracking-widest opacity-45 animate-pulse">
                SYS.READY // CONNECT BEACON OUT
              </div>
            </div>

          </div>

          {/* RIGHT VIEW INFO OVERLAY (Ambient, subtle visual layout balance helper) */}
          <div className="hidden lg:flex flex-col items-end gap-16 pointer-events-none select-none text-right">
            <div className="border-r-2 border-gold/40 pr-5 py-2 animate-pulse">
              <span className="font-mono text-[0.52rem] uppercase tracking-widest text-gold block">GL_STREAMING</span>
              <span className="font-serif text-[1.8rem] text-white font-light mt-1 block">Active Telemetry</span>
            </div>
            
            {/* Visual ambient graphics (dynamic neon layout) */}
            <div className="relative w-32 h-[120px] border border-white-faint bg-white-faint rounded-lg flex items-center justify-center overflow-hidden">
              <span className="absolute inset-x-0 top-1/2 h-[1px] bg-gold/25 animate-scan" style={{ animation: 'aurora-move-1 4s linear infinite' }} />
              <div className="font-mono text-[0.5rem] tracking-[0.2em] text-white-dim/40 uppercase">
                CYBER.GRID
              </div>
            </div>
          </div>

        </div>
      </main>
    </>
  )
}
