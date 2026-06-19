import AboutMe from "./components/AboutMe"
import Hero from "./components/Hero"
import Navbar from "./components/Navbar"
import Projects from "./components/Projects"
import Skills from "./components/Skills"


const App = () => {
  return (
    <>
      <Navbar/>
      <Hero/>
      <AboutMe/>
      <Skills/>
      <Projects/>
    </>
  )
}

export default App