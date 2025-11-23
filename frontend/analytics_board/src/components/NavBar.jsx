import { useState } from "react"
import { RiMenu3Line, RiCloseLine } from "react-icons/ri"

// Link labels + targets
const NAVIGATION_LINKS = [
  { label: "Google", href: "#experience" },
  { label: "Instagram",     href: "#education" },
]

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen)

  const handleLinkClick = (e, href) => {
    e.preventDefault()
    const targetElement = document.querySelector(href)
    if (targetElement) {
      const offset = -85
      const elementPosition = targetElement.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.scrollY + offset
      window.scrollTo({ top: offsetPosition, behavior: "smooth" })
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <nav className="fixed inset-x-0 z-50 lg:top-4">
      {/* ───────── Desktop menu ───────── */}
      <div className="mx-auto hidden max-w-xl items-center justify-center rounded-full
                      border border-white/30 py-2 backdrop-blur-lg lg:flex">
        <div className="flex items-center justify-between gap-6">
          <a href="/" className="uppercase">Data Boards</a>

          <ul className="flex items-center gap-4">
            {NAVIGATION_LINKS.map(({ label, href }) => (
              <li key={href}>
                <a
                  className="text-sm hover:text-stone-300"
                  href={href}
                  onClick={(e) => handleLinkClick(e, href)}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ───────── Mobile menu ───────── */}
      <div className="py-2 backdrop-blur-lg lg:hidden">
        <div className="flex items-center justify-between px-2">
          <a href="/" className="uppercase">Tony Chen</a>

          <button
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? "Close Menu" : "Open Menu"}
            className="p-1 focus:outline-none">
            {isMobileMenuOpen ? <RiCloseLine size={24}/> : <RiMenu3Line size={24}/>}
          </button>
        </div>

        {isMobileMenuOpen && (
          <ul className="mt-4 flex flex-col gap-6 px-4">
            {NAVIGATION_LINKS.map(({ label, href }) => (
              <li key={href}>
                <a
                  href={href}
                  className="block text-lg"
                  onClick={(e) => handleLinkClick(e, href)}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </nav>
  )
}

export default Navbar