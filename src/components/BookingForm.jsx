import { useState, useContext } from "react"
import { BookingContext } from "../context/BookingContext"
import { useNavigate, Link } from "react-router-dom"
import SuccessModal from "../modals/successModal"

const generateConfirmationId = () => {
  return "BF-" + Date.now().toString(36).toUpperCase().slice(-6)
}

const BookingForm = ({ service }) => {
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [errors, setErrors] = useState({})
  const [lastConfirmationId, setLastConfirmationId] = useState(null)

  const { addBooking } = useContext(BookingContext)
  const navigate = useNavigate()
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  // Get minimum date (today)
  const getMinDate = () => {
    const today = new Date()
    return today.toISOString().split("T")[0]
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!date) {
      newErrors.date = "Please select a date"
    } else {
      const selectedDate = new Date(date)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      
      if (selectedDate < today) {
        newErrors.date = "Please select a future date"
      }
    }

    if (!time) {
      newErrors.time = "Please select a time"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    const confirmationId = generateConfirmationId()
    const booking = {
      id: Date.now(),
      confirmationId,
      service: service.name,
      date,
      time,
      duration: service.duration,
      status: "confirmed"
    }

    await addBooking(booking)
    setLastConfirmationId(confirmationId)
    setShowSuccessModal(true)
  }

  const handleClose = () => {
    setShowSuccessModal(false)
    navigate("/my-bookings")
  }

  return (
    <>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6 sm:py-10 md:py-12">
        <div className="card p-5 sm:p-6 md:p-8 lg:p-10">
          {/* Back link */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium mb-6 text-sm sm:text-base min-h-[44px] "
          >
            <span aria-hidden>←</span> Change service
          </Link>

          {/* Header */}
          <div className="mb-6 sm:mb-8">
            <div className="flex items-center gap-3 sm:gap-4 mb-4">
              <div className="w-11 h-11 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center text-xl sm:text-2xl shrink-0">
                📅
              </div>
              <div className="min-w-0">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 truncate">
                  Book {service.name}
                </h2>
                <p className="text-gray-600 mt-1 text-sm sm:text-base">
                  Duration: {service.duration} minutes
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Date Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Select Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={date}
                min={getMinDate()}
                onChange={(e) => {
                  setDate(e.target.value)
                  if (errors.date) setErrors({ ...errors, date: "" })
                }}
                className={`input-field ${errors.date ? "border-red-500 focus:ring-red-500" : ""}`}
              />
              {errors.date && (
                <p className="text-red-500 text-sm mt-1">{errors.date}</p>
              )}
            </div>

            {/* Time Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Select Time <span className="text-red-500">*</span>
              </label>
              <input
                type="time"
                value={time}
                onChange={(e) => {
                  setTime(e.target.value)
                  if (errors.time) setErrors({ ...errors, time: "" })
                }}
                className={`input-field ${errors.time ? "border-red-500 focus:ring-red-500" : ""}`}
              />
              {errors.time && (
                <p className="text-red-500 text-sm mt-1">{errors.time}</p>
              )}
            </div>

            {/* Summary */}
            {date && time && (
              <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-3 sm:p-4">
                <h3 className="font-semibold text-gray-800 mb-2 text-sm sm:text-base">Booking Summary</h3>
                <div className="space-y-1 text-xs sm:text-sm text-gray-700 break-words">
                  <p><span className="font-medium">Service:</span> {service.name}</p>
                  <p><span className="font-medium">Date:</span> {new Date(date).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</p>
                  <p><span className="font-medium">Time:</span> {new Date(`2000-01-01T${time}`).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}</p>
                  <p><span className="font-medium">Duration:</span> {service.duration} minutes</p>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full btn-primary text-base sm:text-lg py-3 sm:py-4 min-h-[48px]"
            >
              Confirm Booking
            </button>
          </form>
        </div>
      </div>

      {showSuccessModal && (
        <SuccessModal
          isOpen={showSuccessModal}
          onClose={handleClose}
          message="Booking confirmed successfully!"
          confirmationId={lastConfirmationId}
        />
      )}
    </>
  )
}

export default BookingForm
