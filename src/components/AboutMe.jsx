import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import ScrollVelocity from "./ScrollVelocity"
import ScrollReveal from './ScrollReveal';
import model from '../assets/model.png';

const AboutMe = () => {
    const imageRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: imageRef,
        offset: ["start end", "end start"]
    });

    // Parallax translations, scaling, and subtle rotation as viewport scrolls past
    const y = useTransform(scrollYProgress, [0, 1], [60, -60]);
    const rotate = useTransform(scrollYProgress, [0, 1], [-8, 8]);
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);

    return (
        <div id="about" className="w-full overflow-x-hidden">
            <ScrollVelocity
                texts={['  About  ', '  Me  ']}
                velocity={50}
                className="custom-scroll-text text-white "
                numCopies={15}
                damping={50}
                stiffness={400}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 px-6 md:px-12 lg:px-24 py-16 md:py-32 max-w-7xl mx-auto items-center">
                <div className="flex flex-col gap-6 md:gap-8 order-2 md:order-1">
                    <div className="flex flex-wrap gap-x-2 md:gap-x-3 items-center text-3xl md:text-5xl font-extrabold tracking-tight mb-2">
                        <ScrollReveal
                            baseOpacity={0.9}
                            enableBlur
                            baseRotation={3}
                            blurStrength={4}
                            containerClassName="inline-block"
                            textClassName="text-white text-3xl md:text-5xl font-extrabold"
                        >
                            Hello, I'm
                        </ScrollReveal>
                        <ScrollReveal
                            baseOpacity={0.9}
                            enableBlur
                            baseRotation={3}
                            blurStrength={4}
                            containerClassName="inline-block"
                            textClassName="bg-gradient-to-br from-[#5227FF] via-[#B497CF] to-[#FF9FFC] bg-clip-text text-transparent pb-2 text-3xl md:text-5xl font-extrabold"
                        >
                            Jatin.
                        </ScrollReveal>
                    </div>
                    <ScrollReveal
                        baseOpacity={0.9}
                        enableBlur
                        baseRotation={3}
                        blurStrength={4}
                        textClassName="text-base md:text-lg text-neutral-300 leading-relaxed font-light"
                    >
                        I'm a Computer Science Engineering student and software developer who enjoys creating modern web experiences and exploring the intersection of software and AI.
                    </ScrollReveal>
                    <ScrollReveal
                        baseOpacity={0.9}
                        enableBlur
                        baseRotation={3}
                        blurStrength={4}
                        textClassName="text-base md:text-lg text-neutral-300 leading-relaxed font-light"
                    >
                        For me, programming is more than writing code—it's a way to transform ideas into products and continuously challenge myself to learn and grow.
                    </ScrollReveal>
                    <ScrollReveal
                        baseOpacity={0.9}
                        enableBlur
                        baseRotation={3}
                        blurStrength={4}
                        textClassName="text-base md:text-lg text-neutral-300 leading-relaxed font-light"
                    >
                        Currently, I'm focused on mastering full-stack development, diving deeper into AI/ML, and building projects that make a meaningful impact.
                    </ScrollReveal>
                </div>
                <div className="flex justify-center items-center order-1 md:order-2">
                    <motion.div
                        ref={imageRef}
                        style={{ y, rotate, scale }}
                        className="relative group"
                    >
                        {/* Interactive background glow on hover */}
                        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#5227FF] via-[#FF9FFC] to-[#B497CF] opacity-0 group-hover:opacity-35 blur-3xl transition-opacity duration-700 pointer-events-none" />

                        <img 
                            src={model} 
                            alt="Jatin Raikwar" 
                            className="w-full max-w-[280px] sm:max-w-[360px] md:max-w-[400px] lg:max-w-[480px] aspect-square object-cover rounded-full border border-white/10 shadow-[0_8px_32px_rgba(255,255,255,0.05)] transition-all duration-500 group-hover:shadow-[0_0_50px_rgba(82,39,255,0.25)] group-hover:border-white/20" 
                        />
                    </motion.div>
                </div>
            </div>

        </div>
    )
}

export default AboutMe