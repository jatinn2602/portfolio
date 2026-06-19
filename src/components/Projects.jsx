import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';
import ScrollFloat from './ScrollFloat';
import assets from '@/assets/assets';

const PROJECTS_DATA = [
  {
    title: 'Agentic-AI',
    summary: 'A fully responsive clone of a modern agency website, built using React and Tailwind CSS, featuring smooth layouts and a custom cursor ring for an enhanced user experience.',
    imageSrc: `${assets.agentic}`,
    tags: ['React','Tailwind CSS', 'GSAP'],
    githubUrl: 'https://github.com/jatinn2602/agentic-ai',
    liveUrl: 'https://demo.com',
  },
  {
    title: 'Stocus - Minimal Stopwatch',
    summary: 'A beautifully crafted stopwatch experience featuring fullscreen mode and customizable wallpapers for distraction-free focus.',
    imageSrc: `${assets.landing_page}`,
    tags: ['JavaScript', 'HTML', 'CSS'],
    githubUrl: 'https://github.com/jatinn2602/stocus-stopwatch',
    liveUrl: 'https://stocus.netlify.app',
  },
  {
    title: 'Nyay Sahayak ChatBot',
    summary: 'An AI-powered legal assistance chatbot designed to simplify legal information and provide accessible guidance through natural conversations.',
    imageSrc: `${assets.nyay}`,
    tags: ['React-Native', 'TailwindCSS'],
    githubUrl: 'https://github.com/jatinn2602/NyaySahayakBot-App',
  },
  {
    title: 'Internet Speed Test Checker',
    summary: 'A Python-based internet speed testing application featuring real-time gauge animations, live download and upload tracking, and an intuitive desktop interface built with Tkinter.',
    imageSrc: `${assets.internet_speed_test}`,
    tags: ['Python', 'Tkinter'],
    githubUrl: 'https://github.com/jatinn2602/internet-speed-check',
  }
];

const ProjectCard = ({ title, summary, imageSrc, tags = [], githubUrl, liveUrl, index }) => {
  const cardRef = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glareX, setGlareX] = useState(0);
  const [glareY, setGlareY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Calculate rotation (-8 to 8 degrees) for 3D tilt
    const rX = ((mouseY / height) - 0.5) * -8;
    const rY = ((mouseX / width) - 0.5) * 8;

    setRotateX(rX);
    setRotateY(rY);
    setGlareX(mouseX);
    setGlareY(mouseY);
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
        delay: index * 0.12
      }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      className="relative w-full h-full"
    >
      {/* Inner Card Frame */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative w-full rounded-[24px] md:rounded-[32px] overflow-hidden bg-neutral-950/25 border border-white/10 backdrop-blur-3xl shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] flex flex-col cursor-pointer group transition-colors duration-300 h-full min-h-[480px] sm:min-h-[520px]"
        style={{
          transformStyle: 'preserve-3d',
          transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${isHovered ? 1.01 : 1}, ${isHovered ? 1.01 : 1}, 1)`,
          transition: isHovered ? 'none' : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s, box-shadow 0.3s',
          borderColor: isHovered ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)',
          boxShadow: isHovered ? '0 16px 40px rgba(0,0,0,0.6), 0 0 20px rgba(255,255,255,0.03)' : '0 8px 32px rgba(0,0,0,0.5)'
        }}
      >
        {/* Spotlight hover glare reflection */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10 border border-white/15 rounded-[24px] md:rounded-[32px]"
          style={{
            background: `radial-gradient(280px circle at ${glareX}px ${glareY}px, rgba(255,255,255,0.05), transparent 60%)`,
          }}
        />

        {/* Ambient liquid blobs in bg */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-20">
          <div className="absolute w-56 h-56 rounded-full bg-cyan-500/10 blur-3xl animate-[project-grid-blob-1_10s_infinite_alternate_ease-in-out] -top-10 -left-10" />
          <div className="absolute w-56 h-56 rounded-full bg-indigo-500/10 blur-3xl animate-[project-grid-blob-2_12s_infinite_alternate_ease-in-out] -bottom-10 -right-10" />
        </div>

        {/* Inline styles for custom keyframe animations */}
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes project-grid-blob-1 {
            0%, 100% { transform: translate(0, 0) scale(1); }
            50% { transform: translate(25px, 20px) scale(1.1); }
          }
          @keyframes project-grid-blob-2 {
            0%, 100% { transform: translate(0, 0) scale(1); }
            50% { transform: translate(-20px, -25px) scale(0.9); }
          }
        `}} />

        {/* Image wrapper */}
        <div className="w-full aspect-[16/10] relative overflow-hidden shrink-0 border-b border-white/10" style={{ transform: 'translateZ(10px)' }}>
          <img
            src={imageSrc}
            alt={title}
            className="w-full h-full object-cover transform-gpu transition-transform duration-700 ease-out origin-center group-hover:scale-103"
          />
          {/* Subtle liquid glass reflection sheen */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
        </div>

        {/* Content Section */}
        <div className="flex-grow p-6 sm:p-8 flex flex-col text-left relative z-10" style={{ transform: 'translateZ(15px)' }}>
          {/* Project Title */}
          <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white mb-2 leading-tight group-hover:text-cyan-400 transition-colors duration-300">
            {title}
          </h3>

          {/* Tech Stack Pills */}
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-2.5 py-0.5 text-[9px] sm:text-[10px] rounded-full bg-white/[0.03] border border-white/10 text-neutral-300 font-medium tracking-wide shadow-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Summary Description */}
          <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed mb-6 flex-grow">
            {summary}
          </p>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 mt-auto">
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-full bg-white text-black font-semibold text-[11px] hover:bg-neutral-200 transition-all duration-300 flex items-center gap-1.5 shadow-[0_4px_16px_rgba(255,255,255,0.1)] hover:scale-[1.03] active:scale-[0.98]"
              >
                <span>Live Demo</span>
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            )}
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-full bg-white/5 border border-white/10 text-white font-semibold text-[11px] hover:bg-white/10 transition-all duration-300 flex items-center gap-1.5 hover:scale-[1.03] active:scale-[0.98]"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.479C19.138 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
                <span>GitHub</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  return (
    <section id="projects" className="relative py-28 w-full flex flex-col items-center overflow-x-hidden">
      <div className="mb-16 text-center">
        <ScrollFloat
          animationDuration={1.2}
          ease="back.out(1.7)"
          scrollStart="top bottom-=10%"
          scrollEnd="bottom bottom-=30%"
          stagger={0.08}
        >
          Projects
        </ScrollFloat>
      </div>

      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 w-full"
        >
          {PROJECTS_DATA.map((project, index) => (
            <ProjectCard key={index} {...project} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;