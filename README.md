# Inside My Workspace — Personal Portfolio

This is my personal portfolio website built to showcase my projects, skills, and interactive UI experiments. The goal was to build a clean, dark-mode digital experience with premium animations, fluid scrolling, and glassmorphism elements.

Live Link: [Insert Link Here]

## Core Features
*   **Liquid Glass UI**: Glassmorphic components using backdrop blur filters, thin border layers, and subtle radial hover glows.
*   **3D Tilt Cards**: Interactive project and skill cards that tilt in 3D space based on mouse position.
*   **Smooth Scrolling**: Viewport-wide smooth scroll using Lenis, synchronized with GSAP ScrollTrigger.
*   **Responsive Typography**: Text layouts and fluid font scaling designed to adapt cleanly between desktop screens and mobile viewports.
*   **Scroll-Driven Parallax**: Profile section images that scale, rotate, and float dynamically as you scroll.
*   **Interactive Typing Loop**: Custom typing effect in the hero section displaying roles and name in a continuous state-machine loop.

## Tech Stack
*   **Frontend**: React (Vite)
*   **Styling**: Tailwind CSS
*   **Animations**: Framer Motion (for components & scroll parallax), GSAP & ScrollTrigger (for float reveals)
*   **Scroller**: Lenis

## Project Structure
*   `src/components/`: Primary page sections (Hero, About Me, Skills, Projects, Contact).
*   `src/utils/`: Shared helper components (PillNav, GradientText, ScrollVelocity).
*   `src/assets/`: Images, logos, and vector assets.

## Running Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/jatinn2602/portfolio.git
   cd portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the local development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```
