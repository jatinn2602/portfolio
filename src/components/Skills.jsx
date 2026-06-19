import CurvedLoop from './CurvedLoop';
import CircularGallery from './CircularGallery'

const Skills = () => {

    // SKILLS IMAGES



    return (
        <div id='#skills'>

            <CurvedLoop marqueeText="Skill & Tech Stack ✦" />
            <div style={{ height: '700px', position: 'relative' }}>
                <CircularGallery
                    bend={4}
                    textColor="#ffffff"
                    borderRadius={0.18}
                    scrollEase={0.08}
                    // Optionally load a custom font for the labels.
                    // Accepts a stylesheet URL (e.g. Google Fonts) or a direct font file.
                    fontUrl=""
                    font="bold 30px Orbitron"
                    scrollSpeed={3.3}
                />
            </div>

        </div>
    )
}

export default Skills