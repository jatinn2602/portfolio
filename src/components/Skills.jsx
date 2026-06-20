import { useState, useRef, useMemo } from 'react';
import { motion } from 'motion/react';
import CurvedLoop from '../utils/CurvedLoop';
import { logos } from '@/assets/assets';

// Individual Skill Card component with self-contained 3D tilt state
const SkillCard = ({ skill, index }) => {
  const cardRef = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glareX, setGlareX] = useState(0);
  const [glareY, setGlareY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Generate static properties for bubbles once so they don't jump when state updates
  const bubbles = useMemo(() => {
    return [...Array(6)].map((_, i) => ({
      size: Math.random() * 4 + 2, // 2px to 6px
      delay: i * 0.5,
      baseDuration: 2.0 + Math.random() * 1.0, // 2.0s to 3.0s
      left: 10 + Math.random() * 80 // 10% to 90%
    }));
  }, []);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Calculate rotation (-10 to 10 degrees)
    const rX = ((mouseY / height) - 0.5) * -12;
    const rY = ((mouseX / width) - 0.5) * 12;

    setRotateX(rX);
    setRotateY(rY);
    setGlareX(mouseX);
    setGlareY(mouseY);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  // Staggered reveal animation
  const cardVariants = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1], // easeOutExpo
        delay: index * 0.08
      }
    }
  };

  return (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative flex items-center justify-between p-6 rounded-2xl border border-white/10 bg-neutral-950/20 backdrop-blur-xl shadow-2xl overflow-hidden cursor-pointer"
      style={{
        transformStyle: 'preserve-3d',
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${isHovered ? 1.03 : 1}, ${isHovered ? 1.03 : 1}, 1)`,
        transition: isHovered ? 'none' : 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s, box-shadow 0.3s'
      }}
    >
      {/* Sleek radial glare reflection */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl border border-white/15"
        style={{
          background: `radial-gradient(180px circle at ${glareX}px ${glareY}px, rgba(255,255,255,0.08), transparent 60%)`,
        }}
      />

      {/* Brand color ambient background glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-2xl"
        style={{
          background: `radial-gradient(400px circle at ${glareX}px ${glareY}px, ${skill.color}15, transparent 80%)`,
        }}
      />

      {/* Left side content (Icon, Name, details) */}
      <div className="flex flex-col flex-grow pr-4 z-10" style={{ transform: 'translateZ(15px)' }}>
        {/* Header row: Logo and category badge */}
        <div className="flex items-center gap-3">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center p-2 bg-neutral-900/60 border border-white/10 shadow-lg group-hover:scale-110 transition-all duration-300"
            style={{
              boxShadow: isHovered ? `0 0 15px ${skill.color}25` : 'none',
              borderColor: isHovered ? `${skill.color}40` : 'rgba(255,255,255,0.1)'
            }}
          >
            <img src={skill.icon} alt={skill.name} className="w-full h-full object-contain" />
          </div>
          <span
            className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-white/5 border border-white/10 text-neutral-400 group-hover:text-white group-hover:border-white/20 transition-all duration-300"
          >
            {skill.category}
          </span>
        </div>

        {/* Skill Title */}
        <h3 className="text-xl font-bold tracking-tight text-white mt-4">
          {skill.name}
        </h3>

        {/* Short Description */}
        <p className="text-xs text-neutral-400 mt-2 max-w-[200px] leading-relaxed group-hover:text-neutral-200 transition-colors duration-300">
          {skill.description}
        </p>
      </div>

      {/* Right side content: The Liquid Glass Vial */}
      <div
        className="w-14 h-32 rounded-2xl border border-white/10 relative overflow-hidden bg-neutral-950/70 shadow-[inset_0_4px_16px_rgba(0,0,0,0.8)] flex items-end shrink-0 z-10 transition-all duration-300"
        style={{
          borderColor: isHovered ? `${skill.color}50` : 'rgba(255,255,255,0.1)',
          boxShadow: isHovered
            ? `inset 0 4px 16px rgba(0,0,0,0.8), 0 0 15px ${skill.color}20`
            : 'inset 0 4px 16px rgba(0,0,0,0.8)',
          transform: 'translateZ(25px)'
        }}
      >
        {/* Glow behind liquid */}
        <div
          className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-300 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 50% 100%, ${skill.color}, transparent 70%)`
          }}
        />

        {/* Glass reflection line */}
        <div className="absolute top-0 bottom-0 left-[3px] w-[2px] bg-gradient-to-b from-white/20 via-white/5 to-transparent z-20 pointer-events-none" />

        {/* Liquid Container */}
        <div
          className="absolute inset-x-0 bottom-0 flex flex-col justify-end pointer-events-none"
          style={{
            height: `${skill.proficiency}%`,
            color: skill.color
          }}
        >
          {/* Waves */}
          <div className="relative w-full h-[12px] shrink-0 overflow-hidden">
            {/* Primary wave */}
            <div className="absolute inset-0 w-[200%] flex animate-[wave-flow-1_2.5s_linear_infinite]">
              <svg className="w-1/2 h-full fill-current" viewBox="0 0 100 20" preserveAspectRatio="none">
                <path d="M 0,10 Q 25,5 50,10 T 100,10 L 100,20 L 0,20 Z" />
              </svg>
              <svg className="w-1/2 h-full fill-current" viewBox="0 0 100 20" preserveAspectRatio="none">
                <path d="M 0,10 Q 25,5 50,10 T 100,10 L 100,20 L 0,20 Z" />
              </svg>
            </div>
            {/* Secondary wave (provides depth) */}
            <div className="absolute inset-0 w-[200%] flex opacity-40 animate-[wave-flow-2_3.8s_linear_infinite]">
              <svg className="w-1/2 h-full fill-current" viewBox="0 0 100 20" preserveAspectRatio="none">
                <path d="M 0,10 Q 25,15 50,10 T 100,10 L 100,20 L 0,20 Z" />
              </svg>
              <svg className="w-1/2 h-full fill-current" viewBox="0 0 100 20" preserveAspectRatio="none">
                <path d="M 0,10 Q 25,15 50,10 T 100,10 L 100,20 L 0,20 Z" />
              </svg>
            </div>
          </div>
          {/* Solid color fill base */}
          <div className="w-full flex-grow bg-current" />
        </div>

        {/* Rising bubbles (clipped to current liquid level) */}
        <div
          className="absolute inset-x-0 bottom-0 pointer-events-none overflow-hidden rounded-b-2xl"
          style={{ height: `${skill.proficiency}%` }}
        >
          {bubbles.map((bubble, i) => {
            // Speed up bubbles when card is hovered for a boiling/agitated liquid feel
            const duration = isHovered ? bubble.baseDuration * 0.5 : bubble.baseDuration;
            return (
              <span
                key={i}
                className="absolute bottom-0 rounded-full bg-white/40 shadow-[0_0_4px_rgba(255,255,255,0.4)]"
                style={{
                  width: `${bubble.size}px`,
                  height: `${bubble.size}px`,
                  left: `${bubble.left}%`,
                  animation: `float-bubble ${duration}s infinite linear`,
                  animationDelay: `${bubble.delay}s`
                }}
              />
            );
          })}
        </div>

        {/* percentage vessel */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
          <span
            className="text-[10px] font-black tracking-wider text-white bg-black/40 px-1.5 py-0.5 rounded backdrop-blur-[2px] border border-white/5 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"
            style={{
              textShadow: '0 2px 4px rgba(0,0,0,0.8)'
            }}
          >
            {skill.proficiency}%
          </span>
        </div>
      </div>
    </motion.div>
  );
};

const Skills = () => {
  // skills listt with color and description and proficiency and icon and category 
  const skillsList = [
    {
      name: 'HTML5',
      category: 'Frontend',
      proficiency: 95,
      icon: logos.html,
      description: 'Semantic markup, SEO optimization, and web accessibility standards.',
      color: '#E34F26'
    },
    {
      name: 'CSS3',
      category: 'Design',
      proficiency: 90,
      icon: logos.css,
      description: 'Responsive styling, Flexbox/Grid, variables, and custom CSS animations.',
      color: '#1572B6'
    },
    {
      name: 'JavaScript',
      category: 'Language',
      proficiency: 88,
      icon: logos.js,
      description: 'Modern ES6+, asynchronous programming, and functional business logic.',
      color: '#F7DF1E'
    },
    {
      name: 'React.js',
      category: 'Framework',
      proficiency: 85,
      icon: logos.react,
      description: 'Component lifecycle architecture, State hooks, and Virtual DOM.',
      color: '#61DAFB'
    },
    {
      name: 'Tailwind CSS',
      category: 'Styling',
      proficiency: 92,
      icon: logos.tail,
      description: 'Rapid utility-first interfaces, responsive configs, and design tokens.',
      color: '#06B6D4'
    },
    {
      name: 'Java',
      category: 'Language',
      proficiency: 78,
      icon: logos.java,
      description: 'Object-Oriented Programming principles, MVC architectures, and APIs.',
      color: '#E76F51'
    },
    {
      name: 'Python',
      category: 'Language',
      proficiency: 82,
      icon: logos.python,
      description: 'Automation scripting, web crawlers, data analysis, and tooling.',
      color: '#3776AB'
    },
    {
      name: 'Git/Github',
      category: 'Version Control System',
      proficiency: 79,
      icon: logos.git,
      description: 'Remote hosting services to facilitate sharing and collaborative workflows.',
      color: '#3776AB'
    }
  ];

  // grid list animations
  const gridVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  return (
    <div id="skills" className="relative w-full bg-transparent overflow-hidden py-10">
      
      {/* Inline styles for custom animations */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes wave-flow-1 {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes wave-flow-2 {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        @keyframes float-bubble {
          0% {
            transform: translateY(0) scale(0.8);
            opacity: 0;
          }
          10% {
            opacity: 0.7;
          }
          90% {
            opacity: 0.7;
          }
          100% {
            transform: translateY(-135px) scale(1.3);
            opacity: 0;
          }
        }
        @keyframes blob-shift-1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(60px, -90px) scale(1.2); }
          66% { transform: translate(-40px, 40px) scale(0.8); }
        }
        @keyframes blob-shift-2 {
          0%, 100% { transform: translate(0, 0) scale(1.1); }
          50% { transform: translate(-70px, 60px) scale(0.9); }
        }
        @keyframes blob-shift-3 {
          0%, 100% { transform: translate(0, 0) scale(0.9); }
          40% { transform: translate(50px, 70px) scale(1.15); }
        }
      `}} />

      {/* SVG gooey liquid filter (invisible but applied to the bg container) */}
      <svg className="absolute w-0 h-0 hidden" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="liquid-goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="22" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -10" result="goo" />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      {/* Liquid background blobs using SVG gooey filter */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="w-full h-full relative opacity-50" style={{ filter: 'url(#liquid-goo)' }}>
          {/* Blob 1 */}
          <div
            className="absolute w-80 h-80 rounded-full bg-indigo-600/30 animate-[blob-shift-1_15s_infinite_alternate_ease-in-out]"
            style={{
              top: '15%',
              left: '10%',
            }}
          />
          {/* Blob 2 */}
          <div
            className="absolute w-96 h-96 rounded-full bg-cyan-600/25 animate-[blob-shift-2_18s_infinite_alternate_ease-in-out]"
            style={{
              bottom: '20%',
              right: '8%',
            }}
          />
          {/* Blob 3 */}
          <div
            className="absolute w-[360px] h-[360px] rounded-full bg-purple-600/20 animate-[blob-shift-3_20s_infinite_alternate_ease-in-out]"
            style={{
              top: '45%',
              left: '40%',
            }}
          />
        </div>
      </div>

      {/* Curving Loop text marquee at the top */}
      <div className="w-full max-w-full h-48 overflow-hidden relative flex items-center justify-center mt-6 mb-2 z-20 select-none [&>div]:!h-full [&>div]:!min-h-0 [&>div]:!py-0">
        <CurvedLoop marqueeText="Skill & Tech Stack ✦" curveAmount={150} />
      </div>

      {/* Core Section Header */}
      <div className="relative max-w-7xl mx-auto px-6 text-center mb-16 mt-8 z-10">
        <h2 className="text-xs font-semibold tracking-widest text-[#06B6D4] uppercase mb-3">
          Technologies & Competence
        </h2>
        <h3 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
            Skills
        </h3>
        <div className="w-16 h-1 bg-gradient-to-r from-cyan-500 to-indigo-500 mx-auto mt-6 rounded-full" />
      </div>

      {/* Skills Grid */}
      <div className="relative max-w-7xl mx-auto px-6 pb-20 z-10">
        <motion.div
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {skillsList.map((skill, index) => (
            <SkillCard key={skill.name} skill={skill} index={index} />
          ))}
        </motion.div>
      </div>

    </div>
  );
};

export default Skills;