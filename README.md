# Sakshi Kusmude — Portfolio (v2 Multi-Page)

7 pages · Dark data-engineering aesthetic · Fully responsive

## 📁 File Structure
```
portfolio_v2/
├── index.html        # Home — hero, marquee, navigation cards
├── about.html        # About — bio, coursework, education
├── experience.html   # Experience — 3 internships timeline
├── projects.html     # Projects — 4 projects with filter
├── skills.html       # Skills + 14 certifications with credentials
├── gallery.html      # Gallery — photo upload + lightbox
├── contact.html      # Contact — form + social links
├── style.css         # Shared styles
├── script.js         # Shared JS
└── README.md
```

## 🚀 Deploy to GitHub Pages

### Step 1: Create your repo
1. Go to [github.com/new](https://github.com/new)
2. Name it: `YOUR-USERNAME.github.io`  
   (e.g., `sakshikusmude.github.io`)
3. Set **Public** → **Create repository**

### Step 2: Upload all files
**Via GitHub web UI:**
1. Click **"uploading an existing file"**
2. Drag & drop ALL files (index.html, about.html, experience.html, projects.html, skills.html, gallery.html, contact.html, style.css, script.js)
3. Commit changes

**Via Git CLI:**
```bash
git init
git add .
git commit -m "Launch portfolio v2"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-USERNAME.github.io.git
git push -u origin main
```

### Step 3: Enable Pages
Repo → **Settings → Pages → Source: main / (root)** → Save

### Step 4: Live!
`https://YOUR-USERNAME.github.io` — live in ~1 minute ✅

---

## ✏️ Customizations

### Add your profile photo (About page)
Replace the initials avatar in `about.html`:
```html
<!-- Find .avatar div and replace with: -->
<img src="photo.jpg" alt="Sakshi" class="avatar-photo">
```

### Add your real GitHub URL
Search for `https://github.com` in all HTML files and replace with your actual GitHub profile URL.

### Add real photos to Gallery
Open `gallery.html` and replace `<div class="gallery-item ph-card">` placeholders with:
```html
<div class="gallery-item">
  <img src="your-photo.jpg" alt="Caption here">
  <div class="gallery-overlay"><span class="gallery-caption">Caption</span></div>
</div>
```
Or just use the **upload button** on the gallery page (photos persist during session only).

### Enable real email on Contact form
1. Sign up free at [formspree.io](https://formspree.io)
2. Create a form → copy your Form ID
3. In `contact.html`, replace `YOUR_FORM_ID` in the form action

### Add Resume PDF download
Add `resume.pdf` to the folder, then add in `about.html`:
```html
<a href="resume.pdf" download class="btn btn-secondary">Download Resume</a>
```

### Update project GitHub links
In `projects.html`, replace `href="https://github.com"` on each project card with the actual repo URL.

---

## ✨ Features
- 7-page multi-page portfolio
- Particle network canvas animation
- Typing effect cycling through roles
- Custom cursor with ring follower
- Scroll-triggered fade-up animations
- Project filter (All / ML·AI / Data Science / Applications)
- Gallery with drag-drop upload + lightbox viewer
- 14+ certifications with credential IDs
- All 3 internships (Colgate, Xact, JAASN)
- Contact form (Formspree-ready)
- Mobile responsive with hamburger menu
