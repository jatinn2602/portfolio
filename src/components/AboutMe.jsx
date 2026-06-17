import ScrollVelocity from "./ScrollVelocity"
import ScrollReveal from './ScrollReveal';
import model from '../assets/model.png';

const AboutMe = () => {
    return (
        <div id="about" className="w-screen">
            <ScrollVelocity
                texts={['  About  ', '  Me  ']}
                velocity={50}
                className="custom-scroll-text text-white "
                numCopies={15}
                damping={50}
                stiffness={400}
            />

            <div className="grid grid-cols-2 gap-5">
                <div className="col-start-1 col-span-1-1 w-3xl mt-52 ml-44 ">
                    <ScrollReveal
                        baseOpacity={0.1}
                        enableBlur
                        baseRotation={3}
                        blurStrength={4}
                    >
                        Hello, I'm Jatin.
                    </ScrollReveal>
                    <ScrollReveal
                        baseOpacity={0.1}
                        enableBlur
                        baseRotation={3}
                        blurStrength={4}
                    >I'm a Computer Science Engineering student and software developer who enjoys creating modern web experiences and exploring the intersection of software and AI.
                    </ScrollReveal>
                    <ScrollReveal
                        baseOpacity={0.1}
                        enableBlur
                        baseRotation={3}
                        blurStrength={4}
                    >For me, programming is more than writing code—it's a way to transform ideas into products and continuously challenge myself to learn and grow.

                        Currently, I'm focused on mastering full-stack development, diving deeper into AI/ML, and building projects that make a meaningful impact.
                    </ScrollReveal>
            
                </div>
                <div className="col-start-2  relative flex items-center">
                    <img src={model} alt="Jatin Raikwar" className="w-full " />
                </div>
            </div>

        </div>
    )
}

export default AboutMe