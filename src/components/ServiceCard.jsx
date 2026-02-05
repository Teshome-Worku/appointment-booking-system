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
    <div className="card p-8 transform hover:scale-105 transition-all duration-300 border border-gray-100">
      <div className="flex items-start justify-between mb-4">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center text-3xl mb-4">
          {getServiceIcon(service.name)}
        </div>
        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
          {service.duration} min
        </span>
      </div>

      <h3 className="text-2xl font-bold text-gray-800 mb-3">
        {service.name}
      </h3>

      <p className="text-gray-600 mb-6 leading-relaxed">
        {service.description}
      </p>

      <button
        onClick={handleBook}
        className="w-full btn-primary text-center"
      >
        Book Now →
      </button>
    </div>
  )
}

export default ServiceCard
