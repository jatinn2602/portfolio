import PillNav from './PillNav';


const Navbar = () => {
  return (
    <>
      <div className='flex justify-center'>
        <PillNav
          items={[
            { label: 'Home', href: '#' },
            { label: 'About', href: '#about' },
            { label: 'Skills', href: '#skills' },
            { label: 'Projects', href: '#projects' },
            { label: 'Contact', href: '#contact' }
          ]}
          activeHref="/"
          className="custom-nav"
          ease="power2.easeOut"
          baseColor="#ffffff"
          pillColor="transparent"
          hoveredPillTextColor="#000000"
          pillTextColor="#ffffff"
          theme="dark"
          initialLoadAnimation={false}
        />
      </div>

      {/* Floating Liquid Glass Download CV Button */}
      <div className="fixed right-4 md:right-8 top-[1.25em] z-[1001]">
        <a
          href="/Jatin_Raikwar_Resume.pdf"
          download="Jatin_Raikwar_Resume.pdf"
          className="relative inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-neutral-950/25 backdrop-blur-xl border border-white/10 hover:border-white/20 rounded-full transition-all duration-300 shadow-[0_4px_16px_rgba(0,0,0,0.4)] hover:scale-[1.03] active:scale-[0.97] group select-none cursor-pointer"
        >
          {/* Subtle liquid glass ambient glow */}
          <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-r from-cyan-500/10 to-indigo-500/10" />
          
          <span>Download CV</span>
          <svg className="w-3.5 h-3.5 text-neutral-400 group-hover:text-white transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
        </a>
      </div>
    </>
  )
}

export default Navbar