import ScrollVelocity from "./ScrollVelocity"
import ScrollReveal from './ScrollReveal';
import model from '../assets/model.png';

const AboutMe = () => {
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
                    <ScrollReveal
                        baseOpacity={0.9}
                        enableBlur
                        baseRotation={3}
                        blurStrength={4}
                        textClassName="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-2"
                    >
                        Hello, I'm Jatin.
                    </ScrollReveal>
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
                    <img 
                        src={model} 
                        alt="Jatin Raikwar" 
                        className="w-full max-w-[280px] sm:max-w-[360px] md:max-w-[400px] lg:max-w-[480px] aspect-square object-cover rounded-full border border-white/10 shadow-[0_8px_32px_rgba(255,255,255,0.05)]" 
                    />
                </div>
            </div>

        </div>
    )
}

export default AboutMe