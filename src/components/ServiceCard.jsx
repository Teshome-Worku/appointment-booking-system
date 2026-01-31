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

  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
      <h3 className="text-xl font-semibold mb-2">
        {service.name}
      </h3>

      <p className="text-gray-600 mb-4">
        {service.description}
      </p>

      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500">
          ⏱ {service.duration} mins
        </span>

        <button
          onClick={handleBook}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Book Now
        </button>
      </div>
    </div>
  )
}

export default ServiceCard
