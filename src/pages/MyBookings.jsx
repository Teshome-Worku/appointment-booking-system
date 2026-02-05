import { useContext, useEffect, useState } from "react"
import { BookingContext } from "../context/BookingContext"
import DeleteConfirm from "../modals/deleteConfirm"
import EditBookingModal from "../modals/EditBookingModal"

const MyBookings = () => {
  const {
    bookings,
    fetchBookings,
    deleteBooking,
    setEditingBooking,
  } = useContext(BookingContext)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [bookingToDelete, setBookingToDelete] = useState(null)
  const [showEditModal, setShowEditModal] = useState(false)
  const [loading, setLoading] = useState(true)

  // Fetch bookings when component mounts
  useEffect(() => {
    const loadBookings = async () => {
      setLoading(true)
      await fetchBookings()
      setLoading(false)
    }
    loadBookings()
  }, [fetchBookings])

  const handleDelete = (id) => {
    setBookingToDelete(id)
    setShowDeleteConfirm(true)
  }

  const onClose = () => {
    setShowDeleteConfirm(false)
    setBookingToDelete(null)
  }

  const handleConfirmDelete = async () => {
    await deleteBooking(bookingToDelete)
    setShowDeleteConfirm(false)
    setBookingToDelete(null)
  }

  const handleEdit = (booking) => {
    setShowEditModal(true)
    setEditingBooking(booking)
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(":")
    const date = new Date()
    date.setHours(parseInt(hours), parseInt(minutes))
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading your bookings...</p>
          </div>
        </div>
      </div>
    )
  }

  if (bookings.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-4xl font-bold mb-8 text-gray-800">My Bookings</h2>
        <div className="card p-16 text-center">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-5xl">📅</span>
          </div>
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">
            No bookings yet
          </h3>
          <p className="text-gray-600 mb-8">
            Start by booking your first appointment
          </p>
          <a
            href="/"
            className="btn-primary inline-block"
          >
            Book Now
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="mb-8">
        <h2 className="text-4xl font-bold text-gray-800 mb-2">My Bookings</h2>
        <p className="text-gray-600">
          You have {bookings.length} {bookings.length === 1 ? "booking" : "bookings"}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {bookings.map((booking) => (
          <div
            key={booking.id}
            className="card p-6 hover:shadow-xl transition-all duration-300 border-l-4 border-l-blue-600"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center text-white font-bold">
                    {booking.service.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">
                      {booking.service}
                    </h3>
                    {booking.status && (
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                        {booking.status}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2 mb-6">
              <div className="flex items-center gap-2 text-gray-600">
                <span className="text-lg">📅</span>
                <span className="font-medium">{formatDate(booking.date)}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <span className="text-lg">🕐</span>
                <span className="font-medium">{formatTime(booking.time)}</span>
              </div>
              {booking.duration && (
                <div className="flex items-center gap-2 text-gray-600">
                  <span className="text-lg">⏱</span>
                  <span className="font-medium">{booking.duration} minutes</span>
                </div>
              )}
            </div>

            <div className="flex gap-3 pt-4 border-t border-gray-100">
              <button
                onClick={() => handleEdit(booking)}
                className="flex-1 btn-secondary py-2 text-sm"
              >
                ✏️ Edit
              </button>
              <button
                onClick={() => handleDelete(booking.id)}
                className="flex-1 bg-red-50 text-red-600 px-4 py-2 rounded-lg font-semibold border-2 border-red-200 hover:bg-red-100 transition-all duration-200 text-sm"
              >
                🗑️ Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {showDeleteConfirm && (
        <DeleteConfirm onConfirm={handleConfirmDelete} onClose={onClose} />
      )}
      {showEditModal && (
        <EditBookingModal
          onClose={() => {
            setShowEditModal(false)
            setEditingBooking(null)
          }}
        />
      )}
    </div>
  )
}

export default MyBookings
