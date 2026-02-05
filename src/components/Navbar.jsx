import { useState } from "react"
import { NavLink } from "react-router-dom"

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  const navLinkClass = ({ isActive }) =>
    `block px-4 py-3 rounded-lg font-medium transition-all duration-200 min-h-[44px] flex items-center ${
      isActive
        ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md"
        : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
    }`

  return (
    <nav className="w-full bg-white/95 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
        {/* Logo */}
        <NavLink
          to="/"
          onClick={() => setMenuOpen(false)}
          className="flex items-center gap-2 group min-h-[44px] items-center"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300 shrink-0">
            <span className="text-white font-bold text-lg sm:text-xl">📅</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            BookFlow
          </h1>
        </NavLink>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-2">
          <li>
            <NavLink to="/" className={navLinkClass}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/book" className={navLinkClass}>
              Book Appointment
            </NavLink>
          </li>
          <li>
            <NavLink to="/my-bookings" className={navLinkClass}>
              My Bookings
            </NavLink>
          </li>
        </ul>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
          className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-blue-50 hover:text-blue-600 min-h-[44px] min-w-[44px] flex items-center justify-center"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <ul className="px-4 py-3 space-y-1">
            <li>
              <NavLink to="/" className={navLinkClass} onClick={() => setMenuOpen(false)}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/book" className={navLinkClass} onClick={() => setMenuOpen(false)}>
                Book Appointment
              </NavLink>
            </li>
            <li>
              <NavLink to="/my-bookings" className={navLinkClass} onClick={() => setMenuOpen(false)}>
                My Bookings
              </NavLink>
            </li>
          </ul>
        </div>
      )}
    </nav>
  )
}

export default Navbar
