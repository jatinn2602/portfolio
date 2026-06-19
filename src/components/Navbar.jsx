import PillNav from '../utils/PillNav';


const Navbar = () => {
  return (
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
  baseColor="#000000"
  pillColor="#ffffff"
  hoveredPillTextColor="#ffffff"
  pillTextColor="#000000"
  theme="light"
  initialLoadAnimation={false}
/>
    </div>
  )
}

export default Navbar