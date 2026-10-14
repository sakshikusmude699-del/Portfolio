# Sakshi Kusmude — Professional Portfolio

> **Live Portfolio Website for Sakshi Kusmude** — Data Engineer & B.Tech IT Graduate (VIIT Pune).  
> Designed with multi-page architecture, seamless Light & Dark theme toggle, interactive surprise elements, and a dedicated continuous learning roadmap.

---

## 🌟 Key Features

1. **Light & Dark Theme Switcher**:
   - One-click persistent toggle with Sun & Moon icons in the navigation bar on every page.
   - Automatically respects system preferences (`prefers-color-scheme`) and persists user preference in `localStorage`.
   - Polished color palette in both modes with smooth transitions.

2. **Surprise Element #1: Interactive Live Data Pipeline Simulator**:
   - Built right into `index.html`.
   - Allows recruiters and visitors to click **"▶ Trigger DAG Run"** to simulate an enterprise ELT pipeline.
   - Watch animated data flow through 5 DAG stages:
     1. Ingest Data (PostgreSQL & REST API)
     2. Orchestration (Apache Airflow)
     3. Transformations (PySpark & DBT)
     4. Data Quality Gate (Great Expectations)
     5. Load Warehouse (Snowflake DW)
   - Real-time row processing counter, latency counter, and streaming log console, followed by a victory confetti burst!

3. **Surprise Element #2: Floating Interactive Developer Terminal (`sakshi@cloud-shell:~#`)**:
   - Accessible via the floating **`Terminal (Press \`)`** pill on any page, or keyboard shortcut `` ` `` (backtick) or `Ctrl + K`.
   - Interactive bash-like CLI supporting commands:
     - `help`, `whoami`, `skills`, `learning`, `experience`, `projects`, `pipeline`, `contact`, `theme`, `confetti`, `clear`, and `sudo`.

4. **"Currently Learning & Upskilling" Section**:
   - **Apache Spark (40%)**: PySpark, RDDs, DataFrames, Memory Optimization, Spark SQL.
   - **Databricks (60%)**: Lakehouse Architecture, Delta Lake (ACID, time travel), Unity Catalog, DLT pipelines.
   - **Generative AI & LLMs (30%)**: RAG pipelines, Vector Databases, LangChain, semantic embeddings.

5. **Multi-Page Architecture (7 Pages)**:
   - `index.html` — Hero with updated profile portrait, typing role animation, quick stats, marquee, currently learning highlight, live pipeline simulator, quick navigation cards.
   - `about.html` — Bio, academic background (VIIT CGPA 8.48, Residential Junior College 84.5%), coursework, soft skills, spoken languages.
   - `experience.html` — Detailed internship experience at **Colgate Global Business Services** and **JAASN Consultants**.
   - `projects.html` — Filterable projects including **Enterprise Sales Data Pipeline**, **AI Resume Analyzer & ATS Checker**, and **SunoX**.
   - `skills.html` — Complete technical stack, learning roadmaps, and **AWS & IBM Certifications**.
   - `gallery.html` — Photo gallery of Colgate Interns Day, hackathons, college events, and treks with full-screen Lightbox mode.
   - `contact.html` — Direct email, phone, location, LinkedIn link, and functional Formspree contact form.

---

## 🚀 How to Host & Deploy for Free on GitHub Pages

This portfolio is built with pure, high-performance static HTML, modern CSS, and vanilla JavaScript—making it **100% free to host** on GitHub Pages with zero build dependencies!

### Step 1: Push Changes to GitHub
Open your terminal in the portfolio directory and run:
```bash
git add .
git commit -m "feat: complete professional portfolio with light/dark theme, surprise elements, and currently learning section"
git push origin main
```

### Step 2: Enable GitHub Pages
1. Go to your repository on GitHub:  
   👉 **`https://github.com/sakshikusmude699-del/Portfolio`**
2. Click on the **Settings** tab (gear icon at the top right of the repo).
3. In the left sidebar, click on **Pages** (under the "Code and automation" section).
4. Under **Build and deployment**:
   - **Source**: Select `Deploy from a branch`
   - **Branch**: Select `main`
   - **Folder**: Select `/ (root)`
5. Click **Save**.

### Step 3: Access Your Live Site!
Within 1–2 minutes, GitHub Pages will deploy your website at:
🔗 **`https://sakshikusmude699-del.github.io/Portfolio/`**

*(If you ever rename your repository to `sakshikusmude699-del.github.io`, your site will be served directly at `https://sakshikusmude699-del.github.io/`)*

---

## 📁 Repository Directory Structure

```text
Portfolio/
├── index.html        # Home — hero, marquee, currently learning, DAG simulator
├── about.html        # Bio, VIIT education, coursework, soft skills
├── experience.html   # Colgate & JAASN internship timeline
├── projects.html     # Filterable project showcase
├── skills.html       # Tech skills, learning roadmap (40/60/30), certifications
├── gallery.html      # College, hackathons & trekking gallery + lightbox
├── contact.html      # Contact cards + message form
├── style.css         # Complete responsive styles & light/dark CSS variables
├── script.js         # Theme toggle, DAG simulator, developer CLI, confetti
├── images/
│   ├── profile.jpg   # Portrait photo
│   └── ...           # Hackathon and event photographs
└── README.md         # Documentation & deployment guide
```

---

## 📬 Contact & Links
- **LinkedIn**: [linkedin.com/in/sakshi-kusmude](https://www.linkedin.com/in/sakshi-kusmude/)
- **GitHub**: [github.com/sakshikusmude699-del](https://github.com/sakshikusmude699-del)
- **Email**: [sakshikusmude699@gmail.com](mailto:sakshikusmude699@gmail.com)
- **Phone**: +91-8080613066
