# Sakshi Kusmude — Portfolio

7 pages · Professional dark theme · Fully responsive

## File Structure

```
Portfolio/
├── index.html        # Home — hero with profile photo, quick navigation
├── about.html         # About — bio, coursework, education
├── experience.html    # Experience — internship timeline
├── projects.html       # Projects
├── skills.html         # Skills + certifications
├── gallery.html         # Gallery — photos + lightbox
├── contact.html          # Contact — form + social links
├── style.css              # Shared styles
├── script.js               # Shared JS
├── images/
│   └── profile.jpg          # Profile photo (used in hero + about page)
└── README.md
```

## Deploy to GitHub Pages

1. Push all files to this repository (or `YOUR-USERNAME.github.io` for a root domain).
2. Go to **Settings → Pages → Source: main / (root)** and save.
3. Your site will be live at `https://YOUR-USERNAME.github.io/Portfolio/` (or your custom domain) within a minute.

## Customizations

### Update your profile photo
Replace `images/profile.jpg` with a new image of the same name, or update the `src` in `index.html` and `about.html`.

### Enable real email on the Contact form
1. Sign up free at [formspree.io](https://formspree.io)
2. Create a form and copy your Form ID
3. In `contact.html`, replace `YOUR_FORM_ID` in the form's `action` attribute

### Add a resume PDF download
Add `resume.pdf` to the folder, then add a link in `about.html`:
```html
<a href="resume.pdf" download class="btn btn-secondary">Download Resume</a>
```

## Features
- 7-page multi-page portfolio with a clean, professional dark theme
- Profile photo in the hero section and about page
- Particle network canvas animation on the home page
- Typing effect cycling through roles
- Scroll-triggered fade-up animations
- Gallery with drag-and-drop upload and lightbox viewer
- Content sourced directly from resume — no placeholder or fabricated data
- Contact form (Formspree-ready)
- Mobile responsive with hamburger menu
