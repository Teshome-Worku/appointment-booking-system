import { useContext } from "react"
import { BookingContext } from "../context/BookingContext"
import { useNavigate } from "react-router-dom"

const ServiceCard = ({ service }) => {
  const { setSelectedService } = useContext(BookingContext)
  const navigate = useNavigate()

  const handleBook = () => {
    setSelectedService(service)
    navigate("/book")
  }

  const getServiceIcon = (name) => {
    if (name.includes("IT")) return "💻"
    if (name.includes("Consulting")) return "💼"
    if (name.includes("Setup")) return "⚙️"
    return "📋"
  }

  return (
    <div className="card p-5 sm:p-6 md:p-8 transform hover:scale-[1.02] active:scale-[0.99] sm:hover:scale-105 transition-all duration-300 border border-gray-100">
      <div className="flex items-start justify-between mb-3 sm:mb-4">
        <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center text-2xl sm:text-3xl shrink-0">
          {getServiceIcon(service.name)}
        </div>
        <span className="px-2.5 py-1 sm:px-3 bg-blue-100 text-blue-700 rounded-full text-xs sm:text-sm font-semibold">
          {service.duration} min
        </span>
      </div>

      <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 sm:mb-3">
        {service.name}
      </h3>

      <p className="text-gray-600 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
        {service.description}
      </p>

      <button
        onClick={handleBook}
        className="w-full btn-primary text-center min-h-[48px] sm:min-h-[44px]"
      >
        Book Now →
      </button>
    </div>
  )
}

export default ServiceCard
