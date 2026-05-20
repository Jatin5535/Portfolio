'use client'

import { useEffect, useState, useRef } from 'react'
import dynamic from 'next/dynamic'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Server, ArrowUpRight, Cpu, Layers, GitBranch, Shield, Zap, Mail, 
  MapPin, FileText, ChevronDown, ChevronUp, Users, Award, 
  Code, Globe, Database, Network, ChevronRight, Terminal 
} from 'lucide-react'

// Dynamically import the ThreeBackground to prevent hydration mismatches and ensure client-only execution
const ThreeBackground = dynamic(() => import('@/components/ThreeBackground'), { ssr: false })

// 1. Data Definitions matching the Master Prompt
const metrics = [
  { value: '15+', label: 'Enterprise AI Systems', desc: 'Production-grade agentic frameworks and telephony pipelines.' },
  { value: '50+', label: 'AI Delivery Team', desc: 'Engineers led globally across major corporate initiatives.' },
  { value: 'Gov + Ent', label: 'Scale Experience', desc: 'Successfully deployed inside high-security telecommunication environments.' },
  { value: 'Voice + Agent', label: 'Deep Focus', desc: 'Core specializations in SIP routing, LangGraph, and multi-agent loops.' },
  { value: 'Multi-Cloud', label: 'Infra Architecture', desc: 'Architected with AWS Bedrock, Amazon Connect, and Azure DevOps.' }
]

const caseStudies = [
  {
    id: 'ai-contact-centre',
    title: 'AI Contact Centre',
    client: 'National Gov Marketplace & Top Telecom',
    challenge: 'Legacy government voice channels suffered from high latency, hallucination vulnerability, and severe spikes in call volumes, causing critical operational strain.',
    approach: 'Architected an end-to-end voice-to-voice system starting at the telephony carrier level. Routed carrier trunks via Amazon Connect SIP gateways, establishing streaming pipelines through PySpark telemetry nodes to AWS Bedrock. Grounded queries using a low-latency caching Vector DB, and established secure dynamic routing to humans upon guardrail triggers.',
    impact: 'Processes 1,000+ voice streams concurrently at sub-120ms execution speeds with zero hallucinations recorded.',
    technologies: ['Voice AI', 'AWS Bedrock', 'RAG Caching', 'SIP Telephony', 'PySpark'],
    pipeline: [
      { name: 'SIP Trunk', type: 'Ingress' },
      { name: 'Amazon Connect', type: 'Gateway' },
      { name: 'PySpark Telemetry', type: 'Queue' },
      { name: 'Bedrock Engine', type: 'Orchestrator' },
      { name: 'Vector RAG', type: 'Grounding' },
      { name: 'Human Route', type: 'Fail-safe' }
    ]
  },
  {
    id: 'bridge-ai',
    title: 'BridgeAI Orchestrator',
    client: 'Internal GSI Division',
    challenge: 'Non-technical business divisions struggled to construct and run secure, stateful multi-agent pipelines, creating custom development bottlenecks.',
    approach: 'Designed a modular, low-code visual canvas enabling drag-and-drop workflow modeling. The frontend translates visual logic into a strict state machine schema, executed by a serverless FastAPI executor running LangGraph orchestrator nodes with OpenSearch persistent memory stores.',
    impact: 'Reduced custom LLM agent setup time from three weeks to under 12 minutes across 4 business divisions.',
    technologies: ['LangGraph', 'React Visual Canvas', 'FastAPI', 'OpenSearch', 'Stateful Memory'],
    pipeline: [
      { name: 'UI Drag-Drop', type: 'Ingress' },
      { name: 'State Compiler', type: 'Validation' },
      { name: 'FastAPI Node', type: 'Serverless' },
      { name: 'LangGraph Pool', type: 'Orchestration' },
      { name: 'OpenSearch DB', type: 'Memory' }
    ]
  },
  {
    id: 'unfi-monarch-parser',
    title: 'UNFI Monarch Parser',
    client: 'Major US Food Distributor',
    challenge: 'Supplier document onboarding relied on manual transcription of highly unstructured, inconsistent spreadsheets, yielding an 8% error rate.',
    approach: 'Replaced a legacy desktop parsing program with a modern serverless pipeline. Raw spreadsheets trigger AWS Lambda classification nodes, which apply unstructured parsing models and self-correction loops. Outputs validate against golden schemas, auto-correcting values that violate structural parameters.',
    impact: 'Achieved 99.4% parsing accuracy while boosting daily document processing capacity by 12x.',
    technologies: ['Serverless', 'AWS Lambda', 'Parser Loops', 'Golden Output Schema', 'Self-Correction'],
    pipeline: [
      { name: 'Unstructured File', type: 'Ingress' },
      { name: 'AWS Lambda', type: 'Classification' },
      { name: 'Golden Schema', type: 'Validation' },
      { name: 'Self-Correction', type: 'Optimization' },
      { name: 'SQL Warehouse', type: 'Destination' }
    ]
  },
  {
    id: 'aura-ai',
    title: 'Aura AI Workforce Scheduler',
    client: 'UAE Aviation Catering',
    challenge: 'Predicting and allocating labor schedules for 1,000+ caterers across shifting airline timetables resulted in labor imbalances and costly overages.',
    approach: 'Built a dual-layer optimization engine. First, a PySpark neural forecasting module ingests real-time flight demand tables. Second, a Mixed-Integer Linear Programming (MILP) scheduler outputs optimal crew rostering, integrated directly into core enterprise ERP platforms.',
    impact: 'Automated 3-6 month forecasts and cut schedule adjustment times down to under 2 minutes.',
    technologies: ['Machine Learning', 'PySpark Forecasting', 'MILP Solver', 'Crew Rostering', 'ERP Integration'],
    pipeline: [
      { name: 'Flight Demands', type: 'Ingress' },
      { name: 'PySpark Model', type: 'Forecasting' },
      { name: 'MILP Solver', type: 'Scheduler' },
      { name: 'ERP Bridge', type: 'Integration' },
      { name: 'Crew Roster', type: 'Destination' }
    ]
  },
  {
    id: 'ai-engagement-center',
    title: 'AI Engagement Center',
    client: 'Internal Enterprise Super-App',
    challenge: 'Generating, translating, and dispersing verified corporate podcasts, blogs, and insights to 15,000+ employees required manual media cycles.',
    approach: 'Created an autonomous publishing suite. Scheduled Python agents draft, translate, and verify materials. An orchestration network selects matching targets based on employee telemetry and logs activity indicators to audit and verify sentiment indexes.',
    impact: 'Successfully drove daily adoption rates to over 15K active employees, increasing digital interaction metrics by 88%.',
    technologies: ['Python Agents', 'Scheduled Workflows', 'Metadata Tagging', 'Adoption Analytics', 'Translation Pipeline'],
    pipeline: [
      { name: 'Agent Gen', type: 'Orchestration' },
      { name: 'Translation', type: 'Processing' },
      { name: 'Telemetry Log', type: 'Audit' },
      { name: 'Suggestion Engine', type: 'Grounded Output' },
      { name: 'Employee App', type: 'Destination' }
    ]
  },
  {
    id: 'irms-workforce-intelligence',
    title: 'IRMS Workforce Intelligence',
    client: 'Global Logistics Hub',
    challenge: 'Forecasting long-term hiring demands was highly reactive, relying on lagging indicators that caused severe peak-season staffing bottlenecks.',
    approach: 'Developed a predictive analytics module built on Prophet and XGBoost. The system ingests historical labor tables, models seasonal logistics volumes, and simulates multi-scenario workforce rosters, feeding directly into resource databases.',
    impact: 'Reduced overhead costs by 14% while ensuring 100% capacity matching during high-demand logistics cycles.',
    technologies: ['XGBoost / Prophet', 'Predictive Modeling', 'Scenario Management', 'Data Warehousing', 'Staffing Optimization'],
    pipeline: [
      { name: 'Hiring Demands', type: 'Ingress' },
      { name: 'Prophet Engine', type: 'Seasonal Model' },
      { name: 'XGBoost Simulator', type: 'Scenarios' },
      { name: 'Staffing Plan', type: 'Destination' }
    ]
  }
]

const philosophies = [
  {
    title: 'Human-in-the-loop fallback',
    desc: 'Intelligent routing mechanisms that monitor LLM output metrics (confidence indexes, semantic drift, guardrail hits) and execute clean handoffs to manual operators before errors propagate.',
    icon: Users
  },
  {
    title: 'Validation & Evaluation Pipelines',
    desc: 'Every LLM output undergoes multi-stage structural validation. Unstructured output is parsed deterministically against strict JSON/TypeScript schemas with bounded recovery loops.',
    icon: Shield
  },
  {
    title: 'Governance-first AI',
    desc: 'Complete data lineage tracking, prompt versioning systems, and audit logging layers to guarantee compliance, security, and traceability inside corporate environments.',
    icon: GitBranch
  },
  {
    title: 'Operational Reliability',
    desc: 'Engineering systems with high fault-tolerance, dynamic fallback models, distributed queue structures, and comprehensive metric telemetry mapping every node.',
    icon: Server
  },
  {
    title: 'AI Orchestration & Tool-use',
    desc: 'Designing agents that operate with stateful memory, bounded decision loops, and standard API integrations to execute real work, rather than just basic chats.',
    icon: Cpu
  },
  {
    title: 'Enterprise API Integrations',
    desc: 'Connecting models directly to core transactional infrastructure like ServiceNow, SAP, Azure DevOps, and WhatsApp to ensure direct product-level utility.',
    icon: Network
  }
]

const capabilities = [
  { category: 'AI Systems', skills: ['LLM Orchestration', 'LangGraph Stateful Agents', 'RAG / CAG Pipelines', 'Self-Correcting Parsers', 'Semantic Guardrails'] },
  { category: 'Workflow Orchestration', skills: ['LangGraph', 'LangChain', 'AWS Step Functions', 'Python Prefect', 'Stateful Memory Networks'] },
  { category: 'Voice Systems', skills: ['SIP Trunk Telephony', 'Amazon Connect PSTN', 'Voice-to-Voice Latency Optimization', 'Real-time Streaming Transcripts'] },
  { category: 'Enterprise Automation', skills: ['ServiceNow Integrations', 'SAP Transaction Bridges', 'Azure DevOps API', 'ITSM Automated Ticket Agents'] },
  { category: 'Cloud Infrastructure', skills: ['AWS Bedrock / Lambda / S3', 'API Gateway / OpenSearch', 'Amazon Connect voice routing', 'Azure Cognitive / ML Services'] },
  { category: 'Backend Systems', skills: ['FastAPI / Python', 'PySpark Big Data Analytics', 'SQL/NoSQL Data Warehouses', 'Data Validation Schemas'] },
  { category: 'Frontend Layers', skills: ['React / Next.js (App Router)', 'TypeScript', 'Tailwind CSS UI systems', 'Framer Motion custom transitions'] }
]

const timeline = [
  {
    year: '2025 — Present',
    title: 'AI Architect & Solutions Lead',
    organization: 'TCS Digital Labs (India)',
    details: 'Owns end-to-end design of client-facing enterprise AI orchestrations. Formed the internal AI Delivery Community covering over 50 software engineers. Leads solutioning, pre-sales architecture, and technical pitches for AWS voice integrations, serverless document parsing pipelines, and predictive aviation workforce schedulers.'
  },
  {
    year: '2025',
    title: 'Founder & Architect',
    organization: 'TCS Trivandrum AI Club',
    details: 'Initiated the internal AI innovation and learning center. Mentors junior engineers on dynamic prompt engineering, LangGraph architectures, and multi-model agent systems. Organized cross-division hackathons and spearheaded the flagship Decode technical symposium.'
  },
  {
    year: '2025',
    title: 'Head of Patient Experience',
    organization: 'Regional Healthcare Group',
    details: 'Built and scaled patient reception and support channels from scratch. Managed communication systems routing over 1,000 daily inquiries via WhatsApp Business and phone interfaces, and optimized regional SEO and campaign reach.'
  },
  {
    year: '2023',
    title: 'Full Stack Development Intern',
    organization: 'First Door Health',
    details: 'Contributed to front-end and back-end integration modules of a cloud healthcare communication platform.'
  }
]

export default function Home() {
  const [activeSection, setActiveSection] = useState('home')
  const [activeProjectIdx, setActiveProjectIdx] = useState(0)
  const [expandedProject, setExpandedProject] = useState<string | null>(null)
  
  const sectionRefs: Record<string, React.RefObject<HTMLDivElement>> = {
    home: useRef<HTMLDivElement>(null),
    about: useRef<HTMLDivElement>(null),
    projects: useRef<HTMLDivElement>(null),
    philosophy: useRef<HTMLDivElement>(null),
    skills: useRef<HTMLDivElement>(null),
    leadership: useRef<HTMLDivElement>(null),
    contact: useRef<HTMLDivElement>(null)
  }

  // Hook Scroll Intersection Observer to automatically pan 3D Camera coordinates
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -40% 0px',
      threshold: 0.05
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.getAttribute('id')
          if (sectionId) {
            setActiveSection(sectionId)
          }
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)
    
    Object.values(sectionRefs).forEach((ref) => {
      if (ref.current) observer.observe(ref.current)
    })

    return () => observer.disconnect()
  }, [])

  const handleNavClick = (sectionId: string) => {
    setActiveSection(sectionId)
    const target = sectionRefs[sectionId]?.current
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: 'smooth'
      })
    }
  }

  return (
    <div className="min-h-screen bg-[#030712] text-white selection:bg-gold/30 selection:text-white font-sans relative">
      
      {/* Dynamic 3D Systems Blueprint Background */}
      <ThreeBackground activeSection={activeSection} activeProjectIndex={activeProjectIdx} />

      {/* Grid HUD lines */}
      <div className="blueprint-grid" />
      <div className="noise-overlay" />

      {/* PREMIUM HUD HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 md:px-16 py-6 border-b border-white/[0.04] backdrop-blur-md bg-[#030712]/30 flex justify-between items-center select-none font-mono">
        <button onClick={() => handleNavClick('home')} className="text-[0.72rem] uppercase tracking-[0.25em] text-white hover:text-gold transition-colors flex items-center gap-2 font-bold">
          <span className="w-1.5 h-1.5 bg-gold rounded-full animate-pulse" />
          JA // SYSTEM.MAP
        </button>

        <nav className="hidden md:block">
          <ul className="flex items-center gap-8">
            {['About', 'Projects', 'Philosophy', 'Skills', 'Leadership', 'Contact'].map((item) => {
              const secId = item.toLowerCase()
              const isSelected = activeSection === secId
              return (
                <li key={item}>
                  <button 
                    onClick={() => handleNavClick(secId)}
                    className={`text-[0.68rem] uppercase tracking-[0.18em] transition-all duration-300 ${isSelected ? 'text-gold' : 'text-white-dim hover:text-white'}`}
                  >
                    {item}
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>
      </header>

      {/* SECTION 1: HERO SECTION */}
      <section 
        id="home" 
        ref={sectionRefs.home}
        className="min-h-screen flex flex-col justify-center px-6 md:px-16 relative pt-32 pb-16 max-w-7xl mx-auto z-10"
      >
        <div className="gold-glow-mesh top-[10%] left-[-10%]" />
        <div className="blue-glow-mesh bottom-[10%] right-[-10%]" />

        <div className="max-w-3xl">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-mono text-[0.72rem] tracking-[0.3em] uppercase text-gold mb-6 flex items-center gap-3 before:content-[''] before:w-6 before:h-[1px] before:bg-gold/50"
          >
            AI Engineer & Solutions Architect
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="font-serif text-5xl md:text-8xl tracking-tight leading-[0.9] text-white mb-6"
          >
            Jatin Agrawal
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-xl md:text-[2.2rem] leading-tight text-white/90 font-light tracking-tight mb-8"
          >
            Designing enterprise AI systems, agentic workflows, and operational intelligence platforms.
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="text-controlled mb-12 text-white-dim/80"
          >
            AI Engineer at TCS Digital Labs building voice AI systems, enterprise automation, and large-scale AI orchestration platforms across government and enterprise environments.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="flex flex-wrap gap-4"
          >
            <button onClick={() => handleNavClick('projects')} className="btn-primary">
              Explore Work <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
            <button onClick={() => handleNavClick('contact')} className="btn-secondary">
              Contact Me
            </button>
            <a 
              href="/resume.pdf" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-secondary"
            >
              Download Resume <FileText className="w-3.5 h-3.5" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: METRICS STRIP */}
      <section className="border-y border-white/[0.04] bg-[#050912]/40 backdrop-blur-sm relative z-10 py-12 px-6 md:px-16 select-none">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-6">
          {metrics.map((m, idx) => (
            <div key={idx} className="border-l border-white/[0.04] pl-6 first:border-l-0 group hover:border-gold/30 transition-all duration-350">
              <div className="font-serif text-3xl md:text-[2.5rem] leading-none text-gold font-normal mb-2 group-hover:scale-105 transition-transform duration-300 origin-left">
                {m.value}
              </div>
              <div className="font-mono text-[0.62rem] uppercase tracking-wider text-white mb-1.5">
                {m.label}
              </div>
              <div className="text-[0.72rem] text-white-dim leading-relaxed font-light">
                {m.desc}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3: ABOUT SECTION */}
      <section 
        id="about" 
        ref={sectionRefs.about}
        className="py-32 px-6 md:px-16 max-w-7xl mx-auto z-10 relative"
      >
        <div className="grid grid-cols-1 lg:grid-cols-[1.25fr_1.75fr] gap-12 lg:gap-24 items-start">
          <div>
            <span className="font-mono text-[0.65rem] text-gold uppercase tracking-[0.2em] mb-4 block">01 // IDENTITY</span>
            <h2 className="font-serif text-4xl md:text-[3.8rem] leading-none text-white tracking-tight">
              Systems-first<br />thinking.
            </h2>
          </div>

          <div className="space-y-8 text-controlled text-[0.98rem] text-white-dim/90 max-w-2xl font-light">
            <p>
              AI models are powerful, but models alone do not solve enterprise complexity. I design AI systems built to operate within strict boundary controls, dynamic integration environments, and real-world compliance criteria.
            </p>
            <p>
              My experience at TCS Digital Labs centers on moving models <span className="text-white font-medium">beyond simple demos</span> into production-grade infrastructure. I construct resilient validation loops, clean programmatic parser fallback structures, and robust telemetry mappings to guarantee security and performance.
            </p>
            <p>
              From SIP carrier configurations in dynamic voice call centers to multi-agent state machines, I establish systems that balance model autonomy with deterministic human-in-the-loop audit checkpoints.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 4: FEATURED CASE STUDIES */}
      <section 
        id="projects" 
        ref={sectionRefs.projects}
        className="bg-[#050912]/30 border-y border-white/[0.04] py-32 px-6 md:px-16 relative z-10"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-16 gap-4">
            <div>
              <span className="font-mono text-[0.65rem] text-gold uppercase tracking-[0.2em] mb-4 block">02 // ARTIFACTS</span>
              <h2 className="font-serif text-4xl md:text-[3.8rem] leading-none text-white tracking-tight">Case Studies</h2>
            </div>
            <p className="font-mono text-[0.68rem] text-white-dim uppercase tracking-wider max-w-xs">
              * Curated production architectures representing real-world deliverables.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8">
            {caseStudies.map((cs, idx) => {
              const isExpanded = expandedProject === cs.id
              return (
                <div 
                  key={cs.id}
                  className="architect-card p-8 md:p-12 relative overflow-hidden transition-all duration-350 cursor-pointer"
                  onClick={() => {
                    setExpandedProject(isExpanded ? null : cs.id)
                    setActiveProjectIdx(idx)
                  }}
                  onMouseEnter={() => setActiveProjectIdx(idx)}
                >
                  {/* Subtle index tracker */}
                  <div className="absolute top-8 right-8 font-mono text-[0.65rem] text-white-dim/40 border border-white-faint px-2.5 py-1 rounded">
                    CASE_0{idx + 1}
                  </div>

                  <div className="max-w-4xl">
                    <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-gold block mb-2">{cs.client}</span>
                    <h3 className="font-serif text-2xl md:text-[2.2rem] text-white tracking-tight mb-6">{cs.title}</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                      <div>
                        <h4 className="font-mono text-[0.58rem] uppercase tracking-wider text-gold-light mb-2">The Operational Challenge</h4>
                        <p className="text-[0.88rem] text-white-dim font-light leading-relaxed">{cs.challenge}</p>
                      </div>
                      <div>
                        <h4 className="font-mono text-[0.58rem] uppercase tracking-wider text-gold-light mb-2">Architectural Accomplishment</h4>
                        <p className="text-[0.88rem] text-gold font-normal leading-relaxed">{cs.impact}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {cs.technologies.map(tech => (
                        <span key={tech} className="font-mono text-[0.52rem] uppercase tracking-wider bg-white-faint border border-white-faint text-white-dim px-2.5 py-1 rounded">
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Collapsible Architecture Details Toggle */}
                    <div className="flex items-center gap-2 font-mono text-[0.62rem] text-gold uppercase tracking-widest mt-4">
                      {isExpanded ? (
                        <>Collapse System Blueprint <ChevronUp className="w-3.5 h-3.5" /></>
                      ) : (
                        <>Expand System Blueprint <ChevronDown className="w-3.5 h-3.5" /></>
                      )}
                    </div>
                  </div>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.4, ease: 'easeInOut' }}
                        className="mt-8 pt-8 border-t border-white/[0.04]"
                        onClick={(e) => e.stopPropagation()} // Prevent close on expand card click
                      >
                        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-8">
                          
                          {/* Left: Approach details */}
                          <div className="space-y-4">
                            <h4 className="font-mono text-[0.58rem] uppercase tracking-wider text-gold-light">Execution & Architecture Approach</h4>
                            <p className="text-[0.85rem] text-white-dim font-light leading-relaxed">{cs.approach}</p>
                          </div>

                          {/* Right: Beautiful system workflow blueprint block */}
                          <div className="bg-[#030712]/50 border border-white/[0.04] p-6 rounded-lg font-mono">
                            <div className="flex items-center justify-between mb-4 border-b border-white/[0.04] pb-2">
                              <span className="text-[0.55rem] text-gold tracking-widest flex items-center gap-1.5">
                                <Terminal className="w-3.5 h-3.5 text-gold" /> PIPELINE.DIAGRAM
                              </span>
                              <span className="text-[0.52rem] text-white-dim/40">SYS.MAP // e26f9b0</span>
                            </div>

                            {/* HTML/CSS schematic flow */}
                            <div className="flex flex-col gap-2">
                              {cs.pipeline.map((p, pIdx) => (
                                <div key={pIdx} className="flex items-center gap-2">
                                  <div className="w-4 h-4 rounded-full border border-gold/40 flex items-center justify-center text-[0.52rem] text-gold flex-shrink-0">
                                    {pIdx + 1}
                                  </div>
                                  <div className="flex-1 bg-white-faint border border-white-faint px-3 py-1.5 rounded flex items-center justify-between">
                                    <span className="text-[0.6rem] text-white">{p.name}</span>
                                    <span className="text-[0.5rem] text-white-dim/40 font-light">{p.type}</span>
                                  </div>
                                  {pIdx < cs.pipeline.length - 1 && (
                                    <div className="h-4 flex items-center justify-center text-gold/30">
                                      <ChevronRight className="w-3 h-3 rotate-90" />
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>

                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* SECTION 5: ARCHITECTURE PHILOSOPHY */}
      <section 
        id="philosophy" 
        ref={sectionRefs.philosophy}
        className="py-32 px-6 md:px-16 max-w-7xl mx-auto relative z-10"
      >
        <div className="mb-16">
          <span className="font-mono text-[0.65rem] text-gold uppercase tracking-[0.2em] mb-4 block">03 // STRATEGY</span>
          <h2 className="font-serif text-4xl md:text-[3.8rem] leading-none text-white tracking-tight">Architecture Philosophy</h2>
          <p className="text-controlled text-white-dim/70 mt-4">
            How I design and implement reliable intelligence layers inside production environments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {philosophies.map((p, idx) => {
            const Icon = p.icon
            return (
              <div key={idx} className="architect-card p-6 flex flex-col justify-between cursor-default">
                <div>
                  <div className="w-10 h-10 rounded-lg bg-gold/5 border border-gold/25 flex items-center justify-center mb-6 text-gold">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif text-xl text-white mb-3">{p.title}</h3>
                  <p className="text-[0.8rem] text-white-dim font-light leading-relaxed">{p.desc}</p>
                </div>
                <div className="font-mono text-[0.52rem] text-gold tracking-widest mt-6 border-t border-white-faint pt-3">
                  STABILITY_CHECK // OK
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* SECTION 6: CAPABILITY STACK */}
      <section 
        id="skills" 
        ref={sectionRefs.skills}
        className="bg-[#050912]/30 border-y border-white/[0.04] py-32 px-6 md:px-16 relative z-10"
      >
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <span className="font-mono text-[0.65rem] text-gold uppercase tracking-[0.2em] mb-4 block">04 // CAPABILITIES</span>
            <h2 className="font-serif text-4xl md:text-[3.8rem] leading-none text-white tracking-tight">Capability Stack</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {capabilities.map((c, idx) => (
              <div key={idx} className="architect-card p-8 flex flex-col justify-between cursor-default">
                <div>
                  <h3 className="font-mono text-[0.62rem] uppercase tracking-widest text-gold mb-5 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-gold rounded-full" /> {c.category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {c.skills.map(sk => (
                      <span key={sk} className="font-mono text-[0.55rem] text-white border border-white-faint px-3 py-1.5 rounded bg-white-faint/5 hover:border-gold/30 hover:bg-[#0b1422]/60 transition-colors">
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: LEADERSHIP & COMMUNITY */}
      <section 
        id="leadership" 
        ref={sectionRefs.leadership}
        className="py-32 px-6 md:px-16 max-w-7xl mx-auto relative z-10 animate-fade-up"
      >
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-12 lg:gap-24 items-start">
          <div>
            <span className="font-mono text-[0.65rem] text-gold uppercase tracking-[0.2em] mb-4 block">05 // COMMUNITY</span>
            <h2 className="font-serif text-4xl md:text-[3.8rem] leading-none text-white tracking-tight mb-6">Leadership</h2>
            <p className="text-[0.88rem] text-white-dim leading-relaxed font-light mb-4">
              Building systems is only half the mandate. I drive corporate education, speak on engineering best practices, and lead internal tech symposia to empower core developer divisions.
            </p>
            <div className="bg-[#080d16] border border-white/[0.04] p-4 rounded-lg flex items-center gap-3">
              <Award className="w-6 h-6 text-gold flex-shrink-0" />
              <div className="font-mono text-[0.58rem] tracking-wider uppercase text-white-dim">
                Organizer of <span className="text-gold font-bold">Decode Symposia</span> & TCS Trivandrum AI division hackathons.
              </div>
            </div>
          </div>

          {/* Senior interactive milestone timeline */}
          <div className="relative border-l border-white-faint pl-6 space-y-12">
            {timeline.map((item, idx) => (
              <div key={idx} className="relative">
                {/* Custom timeline circle */}
                <span className="absolute -left-[30px] top-1.5 w-2 h-2 rounded-full bg-gold border border-[#030712] shadow-[0_0_8px_rgba(201,168,76,0.8)]" />
                
                <div className="font-mono text-[0.58rem] text-gold uppercase tracking-widest mb-1">{item.year}</div>
                <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-3 gap-1">
                  <h3 className="font-serif text-xl text-white font-normal">{item.title}</h3>
                  <span className="font-mono text-[0.65rem] text-white-dim/60 font-light">{item.organization}</span>
                </div>
                <p className="text-[0.82rem] text-white-dim leading-relaxed font-light">
                  {item.details}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 8: CONTACT SECTION */}
      <section 
        id="contact" 
        ref={sectionRefs.contact}
        className="bg-[#050912]/50 border-t border-white/[0.04] py-32 px-6 md:px-16 relative z-10"
      >
        <div className="max-w-[700px] mx-auto text-center">
          <span className="font-mono text-[0.65rem] text-gold uppercase tracking-[0.25em] mb-4 block">06 // CONNECT</span>
          <h2 className="font-serif text-4xl md:text-[3.8rem] leading-none text-white mb-6">
            Let's build <br /><em className="italic text-gold font-normal">something real.</em>
          </h2>
          <p className="text-controlled mx-auto text-[0.92rem] text-white-dim/80 mb-12 font-light">
            I am always open to exploring enterprise-grade solutions architecture opportunities, workflow orchestrations, or voice systems integrations. Let's establish secure pipelines.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <a 
              href="mailto:jatinagrawal942@gmail.com" 
              className="flex flex-col items-center justify-center p-6 bg-[#080d16]/80 border border-white-faint hover:border-gold/30 hover:bg-[#0b1422]/60 rounded-xl transition-all group"
            >
              <Mail className="w-5 h-5 text-gold mb-3 group-hover:scale-115 transition-transform" />
              <span className="font-mono text-[0.55rem] text-white-dim uppercase tracking-wider mb-1">EMAIL // SECURE</span>
              <span className="text-[0.68rem] text-white font-medium">jatinagrawal942@gmail.com</span>
            </a>
            <a 
              href="https://linkedin.com/in/jatin--agrawal" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex flex-col items-center justify-center p-6 bg-[#080d16]/80 border border-white-faint hover:border-gold/30 hover:bg-[#0b1422]/60 rounded-xl transition-all group"
            >
              <svg className="w-5 h-5 text-gold mb-3 group-hover:scale-115 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
              <span className="font-mono text-[0.55rem] text-white-dim uppercase tracking-wider mb-1">LINKEDIN // PUBLIC</span>
              <span className="text-[0.68rem] text-white font-medium">jatin--agrawal</span>
            </a>
            <div 
              className="flex flex-col items-center justify-center p-6 bg-[#080d16]/80 border border-white-faint hover:border-gold/30 rounded-xl transition-all group cursor-default"
            >
              <MapPin className="w-5 h-5 text-gold mb-3 group-hover:scale-115 transition-transform" />
              <span className="font-mono text-[0.55rem] text-white-dim uppercase tracking-wider mb-1">LOCATION // SYNC</span>
              <span className="text-[0.68rem] text-white font-medium">India (TCS Digital Labs)</span>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 px-6 md:px-16 border-t border-white-faint select-none font-mono text-[0.55rem] text-white-dim/40 flex flex-col md:flex-row justify-between items-center gap-2">
        <p>© 2026 Jatin Agrawal. All metrics and system specifications cryptographically logged.</p>
        <p>AI ENGINEER & SOLUTIONS ARCHITECT // master.e26f9b0</p>
      </footer>

    </div>
  )
}
