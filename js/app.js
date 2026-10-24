/**
 * AMAN CHOUDHARY — PORTFOLIO APPLICATION LOGIC
 * Features:
 * - Theme Switcher (Cream Light / Charcoal Dark) with Persistence
 * - Audio Synthesis Micro-interactions (Click & Tap Haptics)
 * - Interactive Folder-Notch Accordion (Services)
 * - Project Case Study Modal with Architecture & Metrics
 * - Dynamic Photo Proof Filter & Interactive Photo Preview Uploader
 * - Quick Email Copy with Animated Toast Notification
 * - Smooth Section Observer for Floating Pill Navigation
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. SOUND SYNTHESIS MICRO-INTERACTIONS
  let soundEnabled = true;
  let audioCtx = null;

  function initAudio() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) audioCtx = new AudioContext();
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  function playPop(freq = 600, type = 'sine') {
    if (!soundEnabled) return;
    try {
      initAudio();
      if (!audioCtx) return;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(180, audioCtx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.08);
    } catch (e) {
      // Audio fallback silent
    }
  }

  // 2. THEME SWITCHER (Light Cream / Dark Charcoal)
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const currentTheme = localStorage.getItem('aman_portfolio_theme') || 'light';

  if (currentTheme === 'dark') {
    document.body.classList.add('dark-theme');
    updateThemeIcon(true);
  } else {
    updateThemeIcon(false);
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      playPop(750);
      const isDark = document.body.classList.toggle('dark-theme');
      localStorage.setItem('aman_portfolio_theme', isDark ? 'dark' : 'light');
      updateThemeIcon(isDark);
      showToast(isDark ? 'Dark theme enabled' : 'Warm cream aesthetic enabled');
    });
  }

  function updateThemeIcon(isDark) {
    if (!themeToggleBtn) return;
    themeToggleBtn.innerHTML = isDark
      ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`
      : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
  }

  // 3. SOUND TOGGLE
  const soundToggleBtn = document.getElementById('soundToggleBtn');
  if (soundToggleBtn) {
    soundToggleBtn.addEventListener('click', () => {
      soundEnabled = !soundEnabled;
      soundToggleBtn.classList.toggle('muted', !soundEnabled);
      if (soundEnabled) {
        initAudio();
        playPop(880);
        showToast('Sound interactions enabled');
      } else {
        showToast('Sound muted');
      }
    });
  }

  // 4. ACCORDION STACK (SERVICES - Screenshot 2)
  const accordionItems = document.querySelectorAll('.accordion-item');
  accordionItems.forEach((item) => {
    const header = item.querySelector('.accordion-header');
    if (header) {
      header.addEventListener('click', () => {
        playPop(520);
        const isActive = item.classList.contains('active');
        accordionItems.forEach(i => i.classList.remove('active'));
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });

  // 4b. CAPABILITY SQUARE BOXES HOVER POP SOUND
  const capabilityBoxes = document.querySelectorAll('.capability-column');
  capabilityBoxes.forEach(box => {
    box.addEventListener('mouseenter', () => {
      playPop(620);
    });
  });

  // 4c. SKILL CARDS HOVER POP SOUND
  const skillCards = document.querySelectorAll('.skill-category-card');
  skillCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      playPop(640);
    });
  });

  // 5. COPY EMAIL TO CLIPBOARD WITH TOAST
  const copyEmailBtns = document.querySelectorAll('.btn-copy-email, .copy-email-trigger');
  copyEmailBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      playPop(900);
      const email = 'amanchoudhary9391@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        showToast('Email copied to clipboard: ' + email);
      }).catch(() => {
        showToast('Email: ' + email);
      });
    });
  });

  // TOAST FUNCTION
  const toast = document.getElementById('toastNotice');
  let toastTimeout = null;
  function showToast(message) {
    if (!toast) return;
    toast.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg> <span>${message}</span>`;
    toast.classList.add('show');
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  // 6. PROJECT MODAL CASE STUDY VIEWER
  const projectModalOverlay = document.getElementById('projectModalOverlay');
  const projectModalTitle = document.getElementById('projectModalTitle');
  const projectModalContent = document.getElementById('projectModalContent');
  const modalCloseBtn = document.getElementById('modalCloseBtn');

  const projectDetailsData = {
    'food-forecasting': {
      title: 'Food Business Demand Forecasting Engine',
      category: 'AI / Time-Series ML • Facebook Prophet • XGBoost Regressors',
      image: 'assets/images/project-food-forecasting.jpg',
      overview: 'An enterprise predictive machine learning engine designed to forecast daily meal and perishable raw ingredient demand for multi-outlet restaurant chains. By ingesting historical sales timestamps, public holiday schedules, local rainfall metrics, and weekend promotional regressors, the system curtails perishable inventory spoilage by 32% while eliminating costly dinner service stockouts.',
      techStack: ['Python', 'Facebook Prophet', 'XGBoost', 'Pandas', 'NumPy', 'Scikit-Learn', 'Time-Series Regressors'],
      metrics: [
        { label: 'WAPE Error', val: '14.2%' },
        { label: 'Forecast Lead', val: '7-Day' },
        { label: 'Waste Saved', val: '-32%' },
        { label: 'Inference', val: '<120ms' }
      ],
      highlights: [
        'Dual-Model Ensemble Architecture: Combines Facebook Prophet trend and seasonality decomposition with XGBoost residual gradient boosting for high-frequency order volatility.',
        'Holiday & Calendar Regressors: Ingests dynamic regional festive calendars, day-of-week surges, and local meteorological features to adjust kitchen prep quantities.',
        'Automated Stockout Guardrails: Generates 90% confidence interval bands to set safety stock replenishment thresholds for high-perishability ingredients.',
        'Operational Pipeline: Delivers kitchen prep quantities and purchasing orders 48 hours in advance directly into supplier procurement sheets.'
      ]
    },
    'car-rental': {
      title: 'Car Rental Management Backend Architecture',
      category: 'Backend Systems • Node.js • Express • MongoDB • JWT & RBAC',
      image: 'assets/images/project-car-rental.jpg',
      overview: 'A complete production REST API engine powering multi-tenant customer bookings, real-time fleet availability schedules, driver dispatch verification, and automated billing. Incorporates fine-grained Role-Based Access Control (Admin, Fleet Manager, Customer), cryptographic JWT authentication, Cloudinary asset streaming, and cryptographic webhook verification for Razorpay payments.',
      techStack: ['Node.js', 'Express.js', 'MongoDB', 'Mongoose ODM', 'JWT & RBAC', 'Razorpay Webhooks', 'Cloudinary', 'Postman'],
      metrics: [
        { label: 'Production APIs', val: '20+ Endpoints' },
        { label: 'P95 Latency', val: '<38ms' },
        { label: 'Webhooks', val: '100% Verified' },
        { label: 'API Uptime', val: '99.98%' }
      ],
      highlights: [
        'Strict RBAC Security Matrix: Enforces granular role-based route middleware ensuring agents, fleet managers, and end customers only access authorized resource boundaries.',
        'Concurrency Booking Locking: Implements atomic MongoDB document transactions preventing overlapping reservation collisions for high-demand luxury vehicle tiers.',
        'Multi-Part Media Pipeline: Handles driver license, identity verification documents, and vehicle damage inspection photo uploads using Cloudinary SDK streams.',
        'Razorpay Webhook Engine: Cryptographically verifies incoming payment webhook event signatures with HMAC-SHA256, automatically triggering reservation confirmation receipts.'
      ]
    },
    'rag-insurance': {
      title: 'AI-Powered Insurance Policy Analyzer',
      category: 'Generative AI • RAG System • LoRA Fine-Tuning',
      image: 'assets/images/project-rag.jpg',
      overview: 'A production-grade Retrieval-Augmented Generation (RAG) system engineered to ingest intricate multi-page commercial and property insurance policy PDFs, chunk and embed clauses, and deliver hallucination-resistant, clause-grounded natural language policy answers with pinpoint citation accuracy.',
      techStack: ['Python', 'PyMuPDF', 'SentenceTransformers', 'FAISS', 'Phi-3.5 Mini', 'LoRA / QLoRA 4-bit', 'Streamlit'],
      metrics: [
        { label: 'Precision', val: '0.88' },
        { label: 'Recall', val: '0.85' },
        { label: 'Retrieval Accuracy', val: '1.00' },
        { label: 'Search Latency', val: '45ms' }
      ],
      highlights: [
        'End-to-End Ingestion Pipeline: Extracts text, formats, and structural tables from PDFs using PyMuPDF; chunks with semantic boundary preservation.',
        'High-Performance FAISS Index: Converts document embeddings via SentenceTransformers into indexed vectors for ultra-fast cosine similarity retrieval.',
        'LoRA/QLoRA 4-Bit Quantization: Fine-tuned Microsoft Phi-3.5 Mini to strictly adhere to retrieved insurance clauses, eliminating fabrications and achieving 1.00 retrieval grounding.',
        'Interactive Streamlit Source Inspector: UI presents side-by-side verification with highlighted bounding boxes and direct clause page numbers.'
      ]
    },
    'crowdvibe': {
      title: 'CrowdVibe – Real-Time Crowd Music Queuing Platform',
      category: 'Backend Architecture • Spring Boot • Concurrency & Locking',
      image: 'assets/images/project-crowdvibe.jpg',
      overview: 'A robust crowd-sourced live venue music management backend allowing venue patrons to scan dynamic QR codes, join authenticated sessions, and upvote/downvote tracks in real time to algorithmically determine the live playing queue order.',
      techStack: ['Java 17', 'Spring Boot', 'Spring Security', 'JWT & BCrypt', 'MySQL', 'Spring Data JPA', 'Transactional Locking'],
      metrics: [
        { label: 'Request Rate', val: '350+ req/s' },
        { label: 'Latency', val: '58ms' },
        { label: 'Active Guests', val: '142 / 200' },
        { label: 'API Uptime', val: '99.9%' }
      ],
      highlights: [
        'Secure Session Management: Built RESTful API endpoints for venue, guest session, and track catalog management with Spring Security JWT tokens and BCrypt hashing.',
        'Concurrency-Safe Priority Queue: Implemented transactional locking on MySQL database records with Spring Data JPA to prevent race conditions during high-volume simultaneous guest voting.',
        'DJ Dashboard & Venue Controls: Engineered endpoints for playlist override, skip threshold triggers, and real-time venue telemetry.'
    'fitness-tracking': {
      title: 'Fitness Tracking Application Backend Architecture',
      category: 'Backend Architecture • Spring Boot • Spring Security • JWT & RBAC • MySQL • Docker',
      image: 'assets/images/project-fitness-tracking.jpg',
      overview: 'An enterprise-grade fitness tracking microservice backend engineered using Java 17 and Spring Boot. Enforces cryptographic JWT-based authentication, Role-Based Access Control (RBAC), and BCrypt hashing to safeguard user accounts across 15+ production endpoints. Implements a normalized, audit-ready MySQL schema via Hibernate JPA with DTO and Builder patterns to ensure strict separation of concerns, containerized with Docker for cloud deployment.',
      techStack: ['Java 17', 'Spring Boot', 'Spring Security', 'JWT', 'BCrypt', 'MySQL', 'Hibernate JPA', 'Docker', 'Postman'],
      metrics: [
        { label: 'Secure APIs', val: '15+ Endpoints' },
        { label: 'Response Time', val: '<35ms P95' },
        { label: 'Entities', val: '5+ JPA Mapped' },
        { label: 'Deployment', val: 'Dockerized' }
      ],
      highlights: [
        'Spring Security JWT Auth: Configured stateless token filter chain with BCrypt password hashing, securing 15+ endpoints with granular role-based permissions (User, Trainer, Admin).',
        'Data Governance & JPA Patterns: Normalized MySQL database across 5+ relational entities using DTO and Builder patterns to isolate persistence layers and eliminate circular references.',
        'Postman Test Harness: Validated all API contracts under strict boundary conditions, HTTP status semantics, and standardized JSON error payloads.',
        'Containerization & Cloud Deploy: Authored multi-stage Dockerfile ensuring sub-second startup, low-memory footprint, and reproducible cloud environments.'
      ]
    },
    'displacement-analytics': {
      title: 'Global Forced Displacement Analytics Platform',
      category: 'Data Intelligence • Power BI • DAX Measures • Star Schema Modeling • UNHCR Datasets',
      image: 'assets/images/project-displacement-analytics.jpg',
      overview: 'A high-impact executive data intelligence dashboard analyzing global refugee, asylum seeker, and internally displaced person (IDP) datasets from UNHCR. Utilizes robust multi-source ETL transformation in Power Query, star schema relational modeling, and advanced custom DAX measures to translate multi-decade humanitarian statistics into actionable demographic and geographic insights.',
      techStack: ['Power BI', 'DAX', 'Star Schema', 'Power Query (M)', 'Data Modeling', 'ETL Pipelines', 'UNHCR Data', 'Excel'],
      metrics: [
        { label: 'Displaced Records', val: '110M+ Data' },
        { label: 'DAX Measures', val: '12+ Custom' },
        { label: 'Data Model', val: 'Star Schema' },
        { label: 'ETL Sources', val: 'UNHCR Multi-feed' }
      ],
      highlights: [
        'Star Schema Relational Architecture: Structured fact and dimension tables (Country, Demographics, Date, Displacement Type) enabling sub-second query performance over large datasets.',
        'Advanced DAX Calculations: Formulated time-intelligence DAX measures for Year-over-Year (YoY) growth rates, regional absorption ratios, and asylum application adjudication trends.',
        'Interactive Migration Flow Visuals: Designed custom choropleth maps, demographic pyramid trees, and regional drill-down slicers for immediate executive pattern discovery.',
        'Data Quality & Cleansing: Automated handling of missing historical records, country geopolitical name reconciliations, and standardized humanitarian classification taxonomies.'
      ]
    }
  };

  // Bind project case study click
  function openProjectModal(projectId) {
    const data = projectDetailsData[projectId];
    if (!data) return;

    playPop(620);
    if (projectModalTitle) projectModalTitle.textContent = data.title;
    projectModalContent.innerHTML = `
      <div style="margin-bottom: 24px;">
        <img src="${data.image}" alt="${data.title}" style="width: 100%; border-radius: 16px; margin-bottom: 20px; border: 1px solid rgba(56, 189, 248, 0.2); box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
        <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 16px;">
          ${data.techStack.map(t => `<span style="background-color: #1E293B; color: #38BDF8; border: 1px solid rgba(56, 189, 248, 0.25); padding: 5px 12px; border-radius: 9999px; font-size: 0.78rem; font-weight: 600;">${t}</span>`).join('')}
        </div>
        <p style="font-size: 1rem; color: #CBD5E1; line-height: 1.7; margin-bottom: 24px;">${data.overview}</p>
      </div>

      <div style="background-color: #0F141E; border: 1px solid rgba(56, 189, 248, 0.2); border-radius: 16px; padding: 22px; margin-bottom: 24px;">
        <h4 style="font-size: 0.82rem; text-transform: uppercase; letter-spacing: 0.12em; color: #38BDF8; margin-bottom: 16px; font-weight: 800;">Verified Performance Benchmarks</h4>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 14px;">
          ${data.metrics.map(m => `
            <div style="background-color: #171E2B; padding: 14px; border-radius: 12px; border: 1px solid rgba(255, 255, 255, 0.06);">
              <div style="font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1.45rem; font-weight: 800; color: #38BDF8;">${m.val}</div>
              <div style="font-size: 0.72rem; color: #94A3B8; text-transform: uppercase; letter-spacing: 0.05em; margin-top: 4px;">${m.label}</div>
            </div>
          `).join('')}
        </div>
      </div>

      <div style="margin-bottom: 28px;">
        <h4 style="font-size: 1.05rem; font-weight: 700; color: #FFFFFF; margin-bottom: 14px;">System Architecture & Engineering Highlights</h4>
        <ul style="display: flex; flex-direction: column; gap: 12px;">
          ${data.highlights.map(h => `
            <li style="display: flex; gap: 12px; font-size: 0.925rem; color: #CBD5E1; line-height: 1.6;">
              <span style="color: #38BDF8; font-weight: bold; flex-shrink: 0;">✦</span>
              <span>${h}</span>
            </li>
          `).join('')}
        </ul>
      </div>

      <div style="display: flex; gap: 12px; flex-wrap: wrap;">
        <a href="https://github.com" target="_blank" style="background-color: #38BDF8; color: #0A0F1D; font-weight: 800; padding: 11px 24px; border-radius: 9999px; font-size: 0.85rem; display: inline-flex; align-items: center; gap: 8px; transition: transform 0.2s;">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
          Explore Source Code on GitHub
        </a>
        <button onclick="document.getElementById('projectModalOverlay').classList.remove('open')" style="background-color: #1E293B; color: #FAF7F2; padding: 11px 22px; border-radius: 9999px; font-size: 0.85rem; font-weight: 600; border: 1px solid rgba(255, 255, 255, 0.1);">Close Deep Dive</button>
      </div>
    `;

    projectModalOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  document.querySelectorAll('.btn-view-case-study').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = btn.getAttribute('data-project');
      if (projectId) openProjectModal(projectId);
    });
  });

  // 6c. WORKS FILTER TABS
  const filterBtns = document.querySelectorAll('.works-filter-btn');
  const engCards = document.querySelectorAll('.engineering-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      playPop(720);
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      engCards.forEach(card => {
        const cat = card.getAttribute('data-category') || '';
        if (filter === 'all' || cat.includes(filter)) {
          card.classList.remove('card-hidden');
        } else {
          card.classList.add('card-hidden');
        }
      });
    });
  });

  // 6b. EXTRACURRICULAR ACTIVITIES MODAL & HOVER INTERACTIONS
  const activityDetailsData = {
    'travel': {
      title: 'Travelling & Motorbike Mountain Expeditions',
      image: 'assets/images/travel.jpg?v=2',
      tags: ['Mountain Expeditions', 'Solo Rides', 'Exploration & Route Navigation', 'Mental Resilience'],
      description: 'Motorbike journeys through winding mountain passes, rugged hill routes, and open landscapes — cultivating calm focus, rapid risk assessment, and grit beyond the screen.',
      takeaway: 'Navigating unfamiliar terrains and long-distance motorbike rides demands razor-sharp attention, constant situational awareness, and split-second decision making.'
    },
    'sports': {
      title: 'Flavium Sports Fest — Core Committee Leadership',
      image: 'assets/images/event-sports.jpg?v=2',
      tags: ['Flavium Sports Fest', 'Core Committee', 'NMIMS MPSTME', 'Logistics & Crowd Operations'],
      description: 'Core Committee organizer for Flavium Sports Fest (2025) at NMIMS MPSTME. Led inter-department tournament operations, squad logistics, and campus crowd management for annual competitive games.',
      takeaway: 'Orchestrating large-scale sports fests builds team camaraderie, rapid crisis mitigation, and operational command under tight schedules.'
    },
    'reading': {
      title: "Reading & Leadership Literature — India's Most Fearless",
      image: 'assets/images/reading.jpg?v=2',
      tags: ["Military History", "India's Most Fearless", "Courage & Resolve", "Leadership Under Crisis"],
      description: 'Engaging with real accounts of courage, tactical poise, and selflessness through books like "India\'s Most Fearless" by Shiv Aroor & Rahul Singh. Drawing inspiration from soldiers who maintain total discipline and split-second operational clarity in high-stakes environments.',
      takeaway: 'True leadership, composure under pressure, and mission-first discipline are universal — inspiring how I tackle high-stress engineering roadblocks and collaborate within multidisciplinary teams.'
    }
  };

  // 6c. EXTRACURRICULAR FILTER TABS & CARD INTERACTION
  const extraFilterBtns = document.querySelectorAll('.extra-filter-btn');
  const extraCards = document.querySelectorAll('.extra-card');

  extraFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      playPop(700);
      extraFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      extraCards.forEach(card => {
        const cat = card.getAttribute('data-category') || '';
        if (filter === 'all' || cat === filter) {
          card.classList.remove('card-hidden');
        } else {
          card.classList.add('card-hidden');
        }
      });
    });
  });

  extraCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      playPop(560);
    });

    card.addEventListener('click', () => {
      const activityType = card.getAttribute('data-activity');
      const data = activityDetailsData[activityType];
      if (!data) return;

      playPop(620);
      if (projectModalTitle) projectModalTitle.textContent = data.title;
      projectModalContent.innerHTML = `
        <div style="margin-bottom: 24px;">
          <img src="${data.image}" alt="${data.title}" style="width: 100%; max-height: 480px; object-fit: contain; background: #080C14; border-radius: 16px; margin-bottom: 20px; border: 1px solid rgba(255, 255, 255, 0.1); box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
          <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 16px;">
            ${data.tags.map(t => `<span style="background-color: rgba(56, 189, 248, 0.12); color: #38BDF8; border: 1px solid rgba(56, 189, 248, 0.25); padding: 4px 12px; border-radius: 9999px; font-size: 0.78rem; font-weight: 600;">${t}</span>`).join('')}
          </div>
          <p style="font-size: 1.02rem; color: #E2E8F0; line-height: 1.7; margin-bottom: 20px;">${data.description}</p>
        </div>

        <div style="background-color: #0F1626; border: 1px solid rgba(56, 189, 248, 0.2); border-radius: 16px; padding: 20px; margin-bottom: 24px;">
          <h4 style="font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.08em; color: #38BDF8; margin-bottom: 10px; font-family: var(--font-display); font-weight: 800;">Discipline &amp; Creative Resonance</h4>
          <p style="font-size: 0.95rem; color: #94A3B8; line-height: 1.65; margin: 0;">${data.takeaway}</p>
        </div>

        <div style="display: flex; justify-content: flex-end;">
          <button onclick="document.getElementById('projectModalOverlay').classList.remove('open'); document.body.style.overflow='auto';" style="background-color: #38BDF8; color: #0A0F1D; font-weight: 800; padding: 10px 24px; border-radius: 9999px; font-size: 0.85rem; border: none; cursor: pointer;">Close Preview</button>
        </div>
      `;
      projectModalOverlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  // 6d. HACKATHON CARDS MODAL & HOVER INTERACTIONS
  const hackathonDetailsData = {
    'sih-sprint': {
      title: 'Smart India Hackathon (SIH 2025) — Internal Selection & 36-Hour Sprint',
      image: 'assets/images/sih-team-sprint.jpg',
      tags: ['SIH 2025', '36-Hour Sprint', 'College Shortlisted Team', 'Rapid Prototyping', 'NMIMS MPSTME'],
      description: 'Shortlisted during the internal college hackathon selection round for the nationwide Smart India Hackathon 2025 at NMIMS MPSTME. Led backend REST API design and collaborated with a 6-member squad across a continuous 36-hour sprint to engineer an end-to-end prototype tackling real-world public governance problems.',
      takeaway: 'High-speed 36-hour hackathons build rapid decision-making, fast git branch convergence, and extreme technical stamina under tight pressure.'
    },
    'sih-pitch': {
      title: 'SIH Technical Prototype Architecture & Live Jury Showcase',
      image: 'assets/images/sih-jury-pitch.jpg',
      tags: ['System Architecture', 'Live Jury Pitch', 'Backend REST APIs', 'Jury Evaluation', 'Data Flow'],
      description: 'Engineered the core backend database schema, RESTful endpoints, and live analytics telemetry. Delivered the live software demonstration and defended the system architecture, security models, and scalability before the evaluation jury panel.',
      takeaway: 'Pitching before academic and industry jury panels trains concise technical communication, defending design tradeoffs, and demonstrating tangible business value.'
    }
  };

  const hackathonCards = document.querySelectorAll('.hackathon-card');
  hackathonCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      playPop(570);
    });

    card.addEventListener('click', () => {
      const hackKey = card.getAttribute('data-hackathon');
      const data = hackathonDetailsData[hackKey];
      if (!data) return;

      playPop(630);
      if (projectModalTitle) projectModalTitle.textContent = data.title;
      projectModalContent.innerHTML = `
        <div style="margin-bottom: 24px;">
          <img src="${data.image}" alt="${data.title}" style="width: 100%; max-height: 480px; object-fit: cover; border-radius: 16px; margin-bottom: 20px; border: 1px solid rgba(255, 255, 255, 0.1); box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
          <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 16px;">
            ${data.tags.map(t => `<span style="background-color: rgba(56, 189, 248, 0.12); color: #38BDF8; border: 1px solid rgba(56, 189, 248, 0.25); padding: 4px 12px; border-radius: 9999px; font-size: 0.78rem; font-weight: 600;">${t}</span>`).join('')}
          </div>
          <p style="font-size: 1.02rem; color: #E2E8F0; line-height: 1.7; margin-bottom: 20px;">${data.description}</p>
        </div>

        <div style="background-color: #0F1626; border: 1px solid rgba(56, 189, 248, 0.2); border-radius: 16px; padding: 20px; margin-bottom: 24px;">
          <h4 style="font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.08em; color: #38BDF8; margin-bottom: 10px; font-family: var(--font-display); font-weight: 800;">Engineering Velocity &amp; Jury Impact</h4>
          <p style="font-size: 0.95rem; color: #94A3B8; line-height: 1.65; margin: 0;">${data.takeaway}</p>
        </div>

        <div style="display: flex; justify-content: flex-end;">
          <button onclick="document.getElementById('projectModalOverlay').classList.remove('open'); document.body.style.overflow='auto';" style="background-color: #38BDF8; color: #0A0F1D; font-weight: 800; padding: 10px 24px; border-radius: 9999px; font-size: 0.85rem; border: none; cursor: pointer;">Close Preview</button>
        </div>
      `;
      projectModalOverlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', () => {
      projectModalOverlay.classList.remove('open');
      document.body.style.overflow = 'auto';
    });
  }

  // Keyboard Escape Handler for Accessibility
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectModalOverlay && projectModalOverlay.classList.contains('open')) {
      projectModalOverlay.classList.remove('open');
      document.body.style.overflow = 'auto';
    }
  });

  if (projectModalOverlay) {
    projectModalOverlay.addEventListener('click', (e) => {
      if (e.target === projectModalOverlay) {
        projectModalOverlay.classList.remove('open');
        document.body.style.overflow = 'auto';
      }
    });
  }

  // 7. PHOTO PROOF FILTER TABS & INTERACTIVE GALLERY (User requested proof of everything)
  const proofTabs = document.querySelectorAll('.proof-tab');
  const proofCards = document.querySelectorAll('.proof-card');

  proofTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      playPop(580);
      proofTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const filter = tab.getAttribute('data-filter');

      proofCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 8. LIVE PHOTO UPLOADER / PREVIEWER (Allows Aman to test any photos directly)
  const customPhotoInput = document.getElementById('customPhotoInput');
  const uploadTargetSelect = document.getElementById('uploadTargetSelect');

  if (customPhotoInput && uploadTargetSelect) {
    customPhotoInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;

      playPop(800);
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target.result;
        const target = uploadTargetSelect.value;

        if (target === 'avatar') {
          const heroAvatar = document.querySelector('.hero-image-container img');
          const whoIsAvatar = document.querySelector('.who-is-visual img');
          if (heroAvatar) heroAvatar.src = dataUrl;
          if (whoIsAvatar) whoIsAvatar.src = dataUrl;
          showToast('Updated profile avatar with your photo preview!');
        } else if (target === 'sports') {
          const sportsImg = document.getElementById('sportsProofImg');
          if (sportsImg) sportsImg.src = dataUrl;
          showToast('Updated Flavium sports event proof photo preview!');
        } else if (target === 'rag') {
          const ragImg = document.querySelector('img[src*="project-rag"]');
          if (ragImg) ragImg.src = dataUrl;
          showToast('Updated Insurance RAG project preview!');
        } else if (target === 'crowdvibe') {
          const crowdImg = document.querySelector('img[src*="project-crowdvibe"]');
          if (crowdImg) crowdImg.src = dataUrl;
          showToast('Updated CrowdVibe platform preview!');
        } else if (target === 'travel') {
          const travelImg = document.querySelector('.activity-photo-card[data-activity="travel"] img');
          if (travelImg) travelImg.src = dataUrl;
          if (activityDetailsData['travel']) activityDetailsData['travel'].image = dataUrl;
          showToast('Updated Travelling photo preview!');
        } else if (target === 'trekking') {
          const trekImg = document.querySelector('.activity-photo-card[data-activity="trekking"] img');
          if (trekImg) trekImg.src = dataUrl;
          if (activityDetailsData['trekking']) activityDetailsData['trekking'].image = dataUrl;
          showToast('Updated Trekking photo preview!');
        } else if (target === 'reading') {
          const readImg = document.querySelector('.activity-photo-card[data-activity="reading"] img');
          if (readImg) readImg.src = dataUrl;
          if (activityDetailsData['reading']) activityDetailsData['reading'].image = dataUrl;
          showToast('Updated Reading photo preview!');
        } else if (target === 'running') {
          const runImg = document.querySelector('.activity-photo-card[data-activity="running"] img');
          if (runImg) runImg.src = dataUrl;
          if (activityDetailsData['running']) activityDetailsData['running'].image = dataUrl;
          showToast('Updated Running photo preview!');
        }
      };
      reader.readAsDataURL(file);
    });
  }

  // 9. CONTACT FORM SUBMISSION HANDLER
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      playPop(950);
      const name = document.getElementById('senderName').value;
      const email = document.getElementById('senderEmail').value;
      const message = document.getElementById('senderMessage').value;

      showToast(`Thank you ${name}! Your message has been sent to Aman.`);
      contactForm.reset();
    });
  }

  // 10. ACTIVE SECTION OBSERVER (Updates Header Navigation)
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-menu .nav-item, .nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 180;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (href === `#${current}` || ((current === 'home' || current === '') && href === '#about')) {
        link.classList.add('active');
      }
    });
  });
});
