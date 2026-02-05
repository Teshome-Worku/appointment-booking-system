import { useContext } from "react"
import { BookingContext } from "../context/BookingContext"
import BookingForm from "../components/BookingForm"
import { Link } from "react-router-dom"

const Book = () => {
  const { selectedService } = useContext(BookingContext)

  if (!selectedService) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-20">
        <div className="card p-12 text-center">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-5xl">📋</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            No Service Selected
          </h2>
          <p className="text-gray-600 mb-8 text-lg">
            Please select a service from the home page to continue booking.
          </p>
          <Link to="/" className="btn-primary inline-block">
            Browse Services
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8">
      <BookingForm service={selectedService} />
    </div>
  )
}

export default Book
