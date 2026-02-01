import { useContext } from "react"
import { BookingContext } from "../context/BookingContext"
import { openDB } from "../db/indexedDB"

const MyBookings = () => {
  const { bookings } = useContext(BookingContext)
  openDB().then(() => {
    console.log("Database is ready")
  })

  if (bookings.length === 0) {
    return (
      <p className="text-center mt-10 text-gray-500">
        No bookings yet.
      </p>
    )
  }
  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold mb-6">
        My Bookings
      </h2>

      <div className="space-y-4">
        {bookings.map(booking => (
          <div
            key={booking.id}
            className="bg-white p-4 rounded-lg shadow flex justify-between items-center"
          >
            <div>
              <h3 className="font-semibold">
                {booking.service}
              </h3>
              <p className="text-sm text-gray-600">
                {booking.date} at {booking.time}
              </p>
              <span className="text-xs text-gray-500"> id:{booking.id}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
export default MyBookings
