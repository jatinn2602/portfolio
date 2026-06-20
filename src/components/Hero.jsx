import { useState, useEffect } from 'react'
import HeroBg from '../utils/HeroBg'
import GradientText from '../utils/GradientText'

const Hero = () => {
    const words = ["Jatin Raikwar", "Software Engineer"];
    const [text, setText] = useState("Jatin Raikwar");
    const [isDeleting, setIsDeleting] = useState(false);
    const [loopNum, setLoopNum] = useState(0);
    const [typingSpeed, setTypingSpeed] = useState(150);

    useEffect(() => {
        let timer;
        const handleTyping = () => {
            const i = loopNum % words.length;
            const fullText = words[i];

            if (!isDeleting) {
                setText(fullText.substring(0, text.length + 1));
                setTypingSpeed(150);

                if (text === fullText) {
                    timer = setTimeout(() => {
                        setIsDeleting(true);
                    }, 2000);
                    return;
                }
            } else {
                setText(fullText.substring(0, text.length - 1));
                setTypingSpeed(75);

                if (text === "") {
                    setIsDeleting(false);
                    setLoopNum(loopNum + 1);
                    setTypingSpeed(500); // Pause before typing the next word
                    return;
                }
            }
        };

        timer = setTimeout(handleTyping, typingSpeed);
        return () => clearTimeout(timer);
    }, [text, isDeleting, loopNum, typingSpeed]);

    return (
        <>
            <div className='absolute w-full overflow-x-hidden -z-1'>
                <HeroBg />
            </div>

            <div className='flex flex-col justify-center items-center h-screen gap-8'>
                <h1 className='text-white px-5 py-2 text-4xl sm:text-5xl md:text-7xl flex flex-col md:flex-row gap-2 md:gap-6 text-center items-center justify-center'>
                    Hello, I'm
                    <span>
                        <GradientText
                            colors={["#5227FF", "#FF9FFC", "#B497CF"]}
                            animationSpeed={8}
                            showBorder={false}
                            className="custom-class px-5 py-2 md:py-4 inline-flex items-center"
                        >
                            {text || "\u00A0"}
                            <span className="animate-pulse ml-1 opacity-75">|</span>
                        </GradientText>
                    </span>
                </h1>
                <div className='text-center flex flex-col gap-1 md:gap-2'>
                    <p className='text-white text-2xl sm:text-3xl md:text-5xl'>Building Modern <span className='bg-gradient-to-br from-[#5227FF] via-[#B497CF] to-[#FF9FFC] bg-clip-text text-transparent'>Software</span></p>
                    <p className='text-white text-2xl sm:text-3xl md:text-5xl'>Intelligent <span className='bg-gradient-to-br from-[#5227FF] via-[#B497CF] to-[#FF9FFC] bg-clip-text text-transparent'>System</span></p>
                    <p className='text-white text-2xl sm:text-3xl md:text-5xl'>Digital <span className='bg-gradient-to-br from-[#5227FF] via-[#B497CF] to-[#FF9FFC] bg-clip-text text-transparent'>Experiences</span></p>
                </div>
                <div className='flex items-end absolute bottom-8 md:bottom-12 '>

                    {/* Scroll down Mouse Animation */}
                    <div className="absolute text-center inset-0 mb-14 md:mb-20 m-auto w-[18px] h-[28px] md:w-[24px] md:h-[35px]">
                        <div className="box-content w-[1px] h-[18px] md:h-[25px] px-[10px] py-[8px] md:px-[15px] md:py-[10px] border border-white md:border-2 rounded-[20px] md:rounded-[25px] opacity-75">
                            <div className="w-[2px] h-[8px] md:w-[3px] md:h-[10px] rounded-[25%] bg-white animate-scroll"></div>
                        </div>
                    </div>

                    {/* Workspace Text */}
                    <h1 className='text-white rounded-full border border-white px-4 py-1.5 md:px-5 md:py-2 text-[10px] md:text-xs tracking-wider uppercase opacity-35'>Enter My Workspace</h1>
                </div>
            </div>
        </>
    )
}

export default Hero


