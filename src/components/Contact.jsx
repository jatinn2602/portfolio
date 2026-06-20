import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const Contact = () => {
  const cardRef = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glareX, setGlareX] = useState(0);
  const [glareY, setGlareY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'Web Development',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Mouse tilt tracking
  const handleMouseMove = (e) => {
    if (!cardRef.current || isSuccess) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Calculate rotation (-6 to 6 degrees for a subtle tilt)
    const rX = ((mouseY / height) - 0.5) * -6;
    const rY = ((mouseX / width) - 0.5) * 6;

    setRotateX(rX);
    setRotateY(rY);
    setGlareX(mouseX);
    setGlareY(mouseY);
  };

  const handleMouseEnter = () => {
    if (isSuccess) return;
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setIsSuccess(true);
      } else {
        setErrorMsg(data.error || 'Failed to transmit message. Please try again.');
      }
    } catch (err) {
      setErrorMsg('Network error. Failed to reach transmission gateway.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      service: 'Web Development',
      message: ''
    });
    setIsSuccess(false);
    setErrorMsg('');
  };

  return (

    
    <section id="contact" className="relative w-full bg-transparent py-28 px-6 overflow-hidden">
      
      {/* CSS custom keyframe animations for floating background blobs */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes contact-blob-1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(40px, -60px) scale(1.15); }
        }
        @keyframes contact-blob-2 {
          0%, 100% { transform: translate(0, 0) scale(1.05); }
          50% { transform: translate(-50px, 40px) scale(0.9); }
        }
        @keyframes success-wave {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}} />

      {/* SVG gooey filter for background blobs */}
      <svg className="absolute w-0 h-0 hidden" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="contact-gooey">
            <feGaussianBlur in="SourceGraphic" stdDeviation="20" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -9" result="goo" />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="w-full h-full relative opacity-40" style={{ filter: 'url(#contact-gooey)' }}>
          <div
            className="absolute w-80 h-80 rounded-full bg-cyan-600/20 animate-[contact-blob-1_16s_infinite_alternate_ease-in-out]"
            style={{ top: '25%', left: '20%' }}
          />
          <div
            className="absolute w-96 h-96 rounded-full bg-indigo-600/20 animate-[contact-blob-2_20s_infinite_alternate_ease-in-out]"
            style={{ bottom: '15%', right: '20%' }}
          />
        </div>
      </div>

      {/* Section Header */}
      <div className="relative max-w-4xl mx-auto text-center mb-16 z-10">
        <h2 className="text-xs font-semibold tracking-widest text-[#06B6D4] uppercase mb-3">
          Get In Touch
        </h2>
        <h3 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
          Let's Build Together
        </h3>
        <div className="w-12 h-1 bg-gradient-to-r from-cyan-500 to-indigo-500 mx-auto mt-5 rounded-full" />
      </div>

      {/* Main Glass Form Container */}
      <div className="max-w-2xl mx-auto relative z-10">
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="w-full rounded-3xl border border-white/10 bg-neutral-950/20 backdrop-blur-3xl shadow-[0_12px_40px_rgba(0,0,0,0.5)] overflow-hidden transition-all duration-300"
          style={{
            transformStyle: 'preserve-3d',
            transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${isHovered ? 1.01 : 1}, ${isHovered ? 1.01 : 1}, 1)`,
            transition: isHovered ? 'none' : 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s',
            borderColor: isHovered ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)'
          }}
        >
          {/* Radial Hover Glare */}
          {!isSuccess && (
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10 border border-white/15 rounded-3xl"
              style={{
                background: `radial-gradient(280px circle at ${glareX}px ${glareY}px, rgba(255,255,255,0.06), transparent 60%)`,
              }}
            />
          )}

          {/* Ambient card color glow */}
          {!isSuccess && (
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-3xl"
              style={{
                background: `radial-gradient(350px circle at ${glareX}px ${glareY}px, rgba(6,182,212,0.12), transparent 80%)`,
              }}
            />
          )}

          <div className="p-8 md:p-12 relative z-20">
            <AnimatePresence mode="wait">
              {!isSuccess ? (
                <motion.form
                  key="contact-form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col gap-6"
                  style={{ transform: 'translateZ(10px)' }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name Input */}
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 ml-1">
                        Full Name
                      </label>
                      <input
                        required
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all duration-300 backdrop-blur-md"
                      />
                    </div>

                    {/* Email Input */}
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 ml-1">
                        Email Address
                      </label>
                      <input
                        required
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all duration-300 backdrop-blur-md"
                      />
                    </div>
                  </div>

                  {/* Dropdown Services */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 ml-1">
                      Project Category
                    </label>
                    <div className="relative w-full">
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 appearance-none transition-all duration-300 backdrop-blur-md cursor-pointer"
                      >
                        <option value="Web Development" className="bg-neutral-950 text-white">Web Development</option>
                        <option value="Mobile Application" className="bg-neutral-950 text-white">Mobile Application</option>
                        <option value="UI/UX Design" className="bg-neutral-950 text-white">UI/UX Design</option>
                        <option value="Other" className="bg-neutral-950 text-white">Other Project</option>
                      </select>
                      {/* Custom dropdown glass arrow */}
                      <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-neutral-500">
                        <svg className="w-4 h-4 fill-none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Message Input */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 ml-1">
                      Your Message
                    </label>
                    <textarea
                      required
                      rows={5}
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Hi, I would love to collaborate on a new project..."
                      className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all duration-300 backdrop-blur-md resize-none"
                    />
                  </div>

                  {errorMsg && (
                    <div className="text-red-400 text-xs font-semibold ml-1 bg-red-500/10 border border-red-500/20 px-4 py-2.5 rounded-xl text-center" style={{ transform: 'translateZ(10px)' }}>
                      {errorMsg}
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    disabled={isSubmitting}
                    type="submit"
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-bold text-xs tracking-widest uppercase shadow-[0_4px_20px_rgba(6,182,212,0.2)] hover:shadow-[0_4px_30px_rgba(6,182,212,0.35)] hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 relative overflow-hidden flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
                    style={{ transform: 'translateZ(10px)' }}
                  >
                    {/* Glass glare sweep on hover */}
                    <div className="absolute top-0 bottom-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-150%] group-hover:animate-[sweep_1.5s_infinite]" />

                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        <span>Transmitting Signal...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </>
                    )}
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="contact-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col items-center text-center py-10"
                >
                  {/* Floating Glass Success Indicator (Vial shape or liquid check) */}
                  <div className="w-20 h-20 rounded-full border border-white/10 bg-neutral-950/80 shadow-[inset_0_2px_10px_rgba(255,255,255,0.08),0_4px_20px_rgba(6,182,212,0.2)] flex items-center justify-center relative overflow-hidden mb-8">
                    
                    {/* Waving Cyan Liquid inside success sphere */}
                    <div className="absolute inset-x-0 bottom-0 h-[60%] bg-[#06B6D4]/30 pointer-events-none flex flex-col justify-end">
                      <div className="relative w-full h-[8px] overflow-hidden">
                        <div className="absolute inset-0 w-[200%] flex animate-[success-wave_2s_linear_infinite] text-[#06B6D4]/30 fill-current">
                          <svg className="w-1/2 h-full" viewBox="0 0 100 20" preserveAspectRatio="none">
                            <path d="M 0,10 Q 25,5 50,10 T 100,10 L 100,20 L 0,20 Z" />
                          </svg>
                          <svg className="w-1/2 h-full" viewBox="0 0 100 20" preserveAspectRatio="none">
                            <path d="M 0,10 Q 25,5 50,10 T 100,10 L 100,20 L 0,20 Z" />
                          </svg>
                        </div>
                      </div>
                      <div className="w-full flex-grow bg-[#06B6D4]/30" />
                    </div>

                    {/* Glowing Checkmark */}
                    <svg className="w-8 h-8 text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.8)] relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>

                  <h4 className="text-2xl font-bold text-white mb-3">
                    Transmission Successful
                  </h4>
                  <p className="text-sm text-neutral-400 max-w-sm leading-relaxed mb-8">
                    Thank you, <span className="text-white font-medium">{formData.name}</span>! Your message has been received. I will review it and get back to you shortly.
                  </p>

                  <button
                    onClick={handleReset}
                    className="px-6 py-2.5 rounded-full bg-white/[0.04] border border-white/10 text-xs text-neutral-300 font-semibold hover:bg-white/[0.08] hover:text-white transition-all duration-300 cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

    </section>
  );
};

export default Contact;
