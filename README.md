# 🚀 Aditya Kumar | 3D Interactive Portfolio

A modern, highly interactive, and ultra-smooth 3D developer portfolio. Built to showcase projects, skills, and experience with a premium visual aesthetic and buttery-smooth animations.

## ✨ Features

- **3D Interactive Canvas**: Powered by React Three Fiber & Drei, featuring an interactive waving robot, a rotating circuit sphere, and responsive background particles.
- **Ultra-Smooth Scrolling**: Integrated **Lenis** smooth scroll for fluid, native-feeling continuous scrolling on both mobile and desktop.
- **Dynamic Animations**: Built with **Framer Motion** for elegant staggered text reveals, glassmorphism cards, and parallax section transitions.
- **Responsive Design**: Tailored experiences for desktop and mobile, ensuring 3D elements dynamically resize and position perfectly on any screen size.
- **Custom UI Elements**: Featuring a custom magnetic cursor, intelligent scroll progress indicator, and a sleek preloader.
- **Premium Glassmorphism**: Deep dark-mode aesthetic with frosted glass UI panels and a vibrant orange (`#f97316`) primary theme.

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **3D Rendering**: [Three.js](https://threejs.org/) + [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/) + [Drei](https://github.com/pmndrs/drei)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/) & [GSAP](https://gsap.com/)
- **Smooth Scroll**: [Lenis](https://lenis.studiofreight.com/)
- **Icons**: [Lucide React](https://lucide.dev/)

## 📂 Project Structure

```bash
portfolio/
├── public/                 # Static assets
│   ├── robot.glb           # 3D Robot Model
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── Canvas/         # R3F 3D Components
│   │   │   └── Scene.jsx   # Background Particles & Globe
│   │   ├── Sections/       # Main Page Sections
│   │   │   ├── Hero.jsx    # Hero with 3D Robot
│   │   │   ├── About.jsx   # About Me & Stats
│   │   │   ├── Skills.jsx
│   │   │   ├── Experience.jsx
│   │   │   ├── Projects.jsx
│   │   │   ├── Services.jsx
│   │   │   └── Contact.jsx
│   │   ├── CustomCursor.jsx
│   │   ├── Navbar.jsx
│   │   ├── Preloader.jsx
│   │   ├── ScrollProgress.jsx
│   │   └── SectionDivider.jsx
│   ├── utils/
│   │   └── data.js         # Centralized Portfolio Data
│   ├── App.jsx             # Main Application Logic
│   ├── index.css           # Global Styles & Animations
│   └── main.jsx            # React Entry Point
├── package.json
├── postcss.config.js
├── vite.config.js
└── README.md
```

## 🚀 Getting Started

To get this project up and running on your local machine:

### 1. Clone the repository
```bash
git clone https://github.com/AdityaKumar06/portfolio.git
cd portfolio
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start the development server
```bash
npm run dev
```

### 4. Build for production
```bash
npm run build
```

## 👨‍💻 Author

**Aditya Kumar**
- GitHub: [@AdityaKumar06](https://github.com/AdityaKumar06)
- Role: Full-Stack Developer
- Email: adityakumar.connect2@gmail.com

---
*It works on my machine — then we ship the machine 🚀*
