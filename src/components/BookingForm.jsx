import { useState, useContext } from "react"
import { BookingContext } from "../context/BookingContext"
import { useNavigate } from "react-router-dom"
import SuccessModal from "../modals/successModal"

const BookingForm = ({ service }) => {
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")

  const { addBooking } = useContext(BookingContext)
  const navigate = useNavigate()
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!date || !time) return

    addBooking({
      id: Date.now(),
      service: service.name,
      date,
      time,
    })
    setShowSuccessModal(true)
    // const timer = setTimeout(() => {
    //   setShowSuccessModal(false)
    //   navigate("/my-bookings")
    // }, 2000);
    // return () => clearTimeout(timer);
  }
  const handleClose = () => {
    setShowSuccessModal(false)
    navigate("/my-bookings")
  }

  return (
    <>
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-md"
    >
      <h2 className="text-2xl font-bold mb-6">
        Book {service.name}
      </h2>
      {/* Date */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          Date
        </label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Time */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-1">
          Time
        </label>
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
        Confirm Booking
      </button>
    </form>

    {showSuccessModal && (
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={handleClose}
        message="Booking confirmed successfully!"
      />
    )}
    </>

  );
}

export default BookingForm
