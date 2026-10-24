# Aman Choudhary — Professional UI/UX & Software Engineering Portfolio

An award-winning, state-of-the-art developer portfolio designed for **Aman Choudhary** (B.Tech in Information Technology, 2027 Batch, MPSTME, NMIMS University).

This design faithfully adapts the signature layout, micro-interactions, and visual language of the **Jenny Scott** and **Remy Jouni** portfolios, creating a warm-cream and deep-charcoal contrast experience tailored for high academic grades in UI/UX subjects as well as real-world industry recruitment.

---

## 🌟 Key Features & UI/UX Design System

1. **Award-Winning Visual Language**:
   - **Primary Palette**: Warm parchment cream (`#FAF7F2`) with subtle dot-grid background texture, high-contrast dark espresso/charcoal containers (`#121110`), and vibrant saffron amber highlights (`#FF8800` / `#FF9800`).
   - **Theme Switcher**: Smooth toggle between the warm cream aesthetic and a deep dark mode with user preference stored in `localStorage`.
   - **Sound Feedback**: Built-in acoustic click synthesis using the native Web Audio API (toggleable, zero external audio asset dependencies).

2. **Hero Section**:
   - Signature **rotating circular stamp badge**: `"★ HIRE ME ★ AMAN CHOUDHARY ★ AI & BACKEND ★"` rotating continuously around a directional arrow.
   - Dual-pill action container (`[ View Projects ➔ ]` and `[ Hire Me / Contact ]`).
   - Cutout developer portrait with floating 3D/glassmorphic badges (`AI / RAG`, `Spring Boot REST`, `Phi-3.5 Mini LoRA`).
   - Social proof stats pill (`7.98 / 10.00 CGPA` at NMIMS MPSTME).
   - Bottom **infinite marquee ticker** banner with orange sparkles (`✦`).

3. **Domains & Interactive Services Stack**:
   - Unique **folder-notch accordion cards** with step numbers (`01.` through `05.`).
   - Sticky **"Who is Aman Choudhary?"** profile card with handwritten signature, bio, and avatar.

4. **Technical Arsenal & Skills**:
   - Folder-notched tool cards featuring Java/Spring Boot, Python, FAISS, MySQL, Phi-3.5/QLoRA, Postman, Git, and UI/UX design.
   - Animated percentage badges and warm saffron progress bars.

5. **Projects Bento Showcase**:
   - Chamfered-corner bento cards with metrics badges:
     - **AI-Powered Insurance Policy Analyzer**: RAG pipeline, FAISS similarity search, Phi-3.5 Mini, LoRA/QLoRA 4-bit, Streamlit, 0.88 Precision, 0.85 Recall, 1.00 Retrieval Accuracy.
     - **CrowdVibe**: Real-time venue music queuing platform, Spring Boot, Spring Security, MySQL transactional locking priority queue, 350+ req/s.
   - Interactive **Case Study Modal Dialog** displaying technical architecture, metrics grids, and GitHub links.

6. **Academic & Professional Journey + Leadership Awards**:
   - Chronological timeline cards for Maincrafts Technology internship, MPSTME NMIMS University, and Army Public School (HSC 87.0%, SSC 76.8%).
   - Golden laurel wreath achievement badges for Flavium Sports Fest Core Committee, Protsahan Organizing Committee, and University of Minnesota Software Testing Specialization.

7. **Hobbies, Interests & Professional Persona**:
   - Highlighting sports leadership, music acoustics & queuing algorithms, arXiv AI paper research, and UI/UX prototyping.

8. **Photo Proofs & Campus Moments Gallery**:
   - Visual evidence cards with filter tabs (`All Proofs`, `Sports & Fests`, `Projects & Tech`, `Specializations`).
   - **Live In-Browser Photo Uploader**: An interactive tool allowing Aman to select and preview his own photos instantly on the page without modifying code.

9. **Contact & Footer**:
   - One-click copy email button with animated toast alert (`amanchoudhary9391@gmail.com`).
   - Direct phone link (`+91 9682579833`), location metadata, and working contact form.

---

## 📁 File Structure

```
portfolio/
├── index.html                 # Semantic HTML5 with complete portfolio content
├── css/
│   └── style.css              # Custom Vanilla CSS styling, tokens & animations
├── js/
│   └── app.js                 # Theme switcher, modals, audio synthesis, photo uploader
├── assets/
│   └── images/
│       ├── avatar.jpg         # Profile portrait image
│       ├── project-rag.jpg    # AI Insurance Policy Analyzer UI mockup
│       ├── project-crowdvibe.jpg # CrowdVibe platform UI mockup
│       └── event-sports.jpg   # Campus sports event proof photo
├── copy_assets.js             # Asset setup helper script
└── README.md                  # Project documentation & UI/UX guide
```

---

## 🚀 How to Run Locally

You can open `index.html` directly in any modern browser:
- Double click on `index.html`, or
- Run a simple local server using Python or Node:
  ```bash
  # Using Node.js npx:
  npx serve .
  
  # Or using Python:
  python -m http.server 3000
  ```
Then visit `http://localhost:3000`.

---

## 📸 How to Add Your Own Photos Permanently

To permanently replace the images with your real photos, simply place your photo files into `assets/images/` using the following names:
1. `assets/images/avatar.jpg` — Your portrait for the hero and about section.
2. `assets/images/event-sports.jpg` — Your photo from the Flavium Sports Fest / campus event.
3. `assets/images/project-rag.jpg` — Screenshot or photo of your AI project.
4. `assets/images/project-crowdvibe.jpg` — Screenshot or photo of your CrowdVibe music platform.

You can also use the **"Preview Your Own Photos"** uploader box directly on the website to preview any image instantly!
