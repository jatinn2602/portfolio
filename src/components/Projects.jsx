import React from 'react';
import ScrollStack, { ScrollStackItem } from './ScrollStack';
import ScrollFloat from './ScrollFloat';

const PROJECTS_DATA = [
  {
    title: 'Aether OS',
    summary: 'A futuristic spatial computing operating system featuring holographic widgets, real-time system metrics, gesture mappings, and fluid window management.',
    imageSrc: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    tags: ['React', 'Three.js', 'GSAP', 'WebGL', 'Tailwind CSS'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://demo.com',
  },
  {
    title: 'Nexus Pay',
    summary: 'A premium finance platform inspired by Stripe. Features real-time transaction streams, multi-currency ledger management, fraud metrics, and highly responsive interactive charts.',
    imageSrc: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    tags: ['Next.js', 'Radix UI', 'Recharts', 'PostgreSQL', 'Tailwind CSS'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://demo.com',
  },
  {
    title: 'Vortex AI',
    summary: 'An interactive neural network builder and playground allowing developers to train and visualize machine learning algorithms directly in the browser with real-time feedback.',
    imageSrc: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=1200&q=80',
    tags: ['React', 'TensorFlow.js', 'Framer Motion', 'Vite', 'CSS Gradients'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://demo.com',
  },
  {
    title: 'Helios Digital',
    summary: 'A high-end design portfolio showcase built for creative studios, featuring immersive WebGL distortion grids, fluid interactive typography, and custom liquid page transitions.',
    imageSrc: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
    tags: ['React', 'OGL', 'GSAP Shaders', 'Web Audio API', 'Tailwind CSS'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://demo.com',
  }
];

const Projects = () => {
  return (
    <section id="projects" className="relative py-32 w-full flex flex-col items-center overflow-x-hidden">
      <div className="mb-20 text-center">
        <ScrollFloat
          animationDuration={1.2}
          ease="back.out(1.7)"
          scrollStart="top bottom-=10%"
          scrollEnd="bottom bottom-=30%"
          stagger={0.08}
        >
          Selected Work
        </ScrollFloat>
      </div>

      <ScrollStack className="w-full">
        {PROJECTS_DATA.map((project, index) => (
          <ScrollStackItem
            key={index}
            title={project.title}
            summary={project.summary}
            imageSrc={project.imageSrc}
            tags={project.tags}
            githubUrl={project.githubUrl}
            liveUrl={project.liveUrl}
          />
        ))}
      </ScrollStack>
    </section>
  );
};

export default Projects;