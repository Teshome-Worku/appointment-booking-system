import { NavLink } from "react-router-dom"
const Navbar = () => {
    return (
      <nav className="w-full bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <h1 className="text-xl font-bold text-blue-600 hover:text-blue-800 cursor-pointer transition-colors duration-300">
            BookingSystem
          </h1>
  
          {/* Menu */}
          <ul className="flex items-center gap-6 text-gray-600 " >
        
            <NavLink to="/" className={({ isActive }) => 
              isActive 
              ? "text-blue-600 font-medium border-b-2 border-blue-600" 
              : "hover:text-blue-600 cursor-pointer transition"}>
              Home
            </NavLink>

            <NavLink to="/book" className={({ isActive }) => isActive 
            ? "text-blue-600 font-medium border-b-2 border-blue-600" 
            : "hover:text-blue-600 cursor-pointer transition"}>
              Book
            </NavLink>

            <NavLink to="/my-bookings" className={({ isActive }) => isActive 
            ? "text-blue-600 font-medium border-b-2 border-blue-600" 
            : "hover:text-blue-600 cursor-pointer transition"}>
              My Bookings
            </NavLink>
          
          </ul>
        </div>
      </nav>
    )
  }
  
  export default Navbar
  