import ScrollStack, { ScrollStackItem } from './ScrollStack';
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
          Projects
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