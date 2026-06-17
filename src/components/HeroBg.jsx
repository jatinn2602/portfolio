import Strands from "../utils/Strands"

const HeroBg = () => {
    return (

        <div style={{ width: '100%', height: '100vh' }}>
            <Strands
                colors={["#F97316", "#7C3AED", "#06B6D4"]}
                count={3}
                speed={0.5}
                amplitude={1}
                waviness={1}
                thickness={0.7}
                glow={2.6}
                taper={3}
                spread={1}
                intensity={0.6}
                saturation={2}
                opacity={1}
                scale={1.9}
                glass={false}
                refraction={1}
                dispersion={1}
                glassSize={1}
                hueShift={0}
            />
        </div>
    )
}

export default HeroBg