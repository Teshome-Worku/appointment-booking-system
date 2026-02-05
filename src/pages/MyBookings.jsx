import { useContext, useEffect, useState, useMemo } from "react"
import { Link } from "react-router-dom"
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
  const [search, setSearch] = useState("")
  const [sortBy, setSortBy] = useState("date-asc") // date-asc | date-desc | service

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
    if (!timeString) return ""
    const [hours, minutes] = timeString.split(":")
    const date = new Date()
    date.setHours(parseInt(hours, 10), parseInt(minutes || 0, 10))
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const filteredAndSortedBookings = useMemo(() => {
    let list = [...bookings]
    const q = search.trim().toLowerCase()
    if (q) {
      list = list.filter(
        (b) =>
          b.service?.toLowerCase().includes(q) ||
          b.date?.toLowerCase().includes(q) ||
          b.time?.toLowerCase().includes(q) ||
          b.confirmationId?.toLowerCase().includes(q)
      )
    }
    if (sortBy === "date-asc") {
      list.sort((a, b) => new Date(a.date + "T" + (a.time || "00:00")) - new Date(b.date + "T" + (b.time || "00:00")))
    } else if (sortBy === "date-desc") {
      list.sort((a, b) => new Date(b.date + "T" + (b.time || "00:00")) - new Date(a.date + "T" + (a.time || "00:00")))
    } else if (sortBy === "service") {
      list.sort((a, b) => (a.service || "").localeCompare(b.service || ""))
    }
    return list
  }, [bookings, search, sortBy])

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="flex items-center justify-center min-h-[300px] sm:min-h-[400px]">
          <div className="text-center">
            <div className="w-14 h-14 sm:w-16 sm:h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600 text-sm sm:text-base">Loading your bookings...</p>
          </div>
        </div>
      </div>
    )
  }

  if (bookings.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 text-gray-800">My Bookings</h2>
        <div className="card p-8 sm:p-12 md:p-16 text-center">
          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
            <span className="text-4xl sm:text-5xl">📅</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2">
            No bookings yet
          </h3>
          <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base">
            Start by booking your first appointment
          </p>
          <Link to="/" className="btn-primary inline-block">
            Book Now
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <div className="mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-2">My Bookings</h2>
        <p className="text-gray-600 text-sm sm:text-base">
          You have {bookings.length} {bookings.length === 1 ? "booking" : "bookings"}
        </p>
      </div>

      {/* Search & Sort */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6">
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden>🔍</span>
          <input
            type="search"
            placeholder="Search by service, date, time or ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-field pl-10 min-h-[44px]"
          />
        </div>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="input-field min-h-[44px] sm:w-auto w-full"
          aria-label="Sort bookings"
        >
          <option value="date-asc">Date (earliest first)</option>
          <option value="date-desc">Date (latest first)</option>
          <option value="service">Service (A–Z)</option>
        </select>
      </div>

      {filteredAndSortedBookings.length === 0 ? (
        <div className="card p-8 text-center">
          <p className="text-gray-600">No bookings match your search. Try a different term or clear the search.</p>
          <button
            type="button"
            onClick={() => setSearch("")}
            className="btn-secondary mt-4"
          >
            Clear search
          </button>
        </div>
      ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {filteredAndSortedBookings.map((booking) => (
          <div
            key={booking.id}
            className="card p-4 sm:p-6 hover:shadow-xl transition-all duration-300 border-l-4 border-l-blue-600"
          >
            <div className="flex items-start justify-between mb-3 sm:mb-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2 flex-wrap">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center text-white font-bold shrink-0">
                    {booking.service?.charAt(0) || "?"}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-800 truncate">
                      {booking.service}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2">
                      {booking.confirmationId && (
                        <span className="text-xs font-mono text-gray-500">{booking.confirmationId}</span>
                      )}
                      {booking.status && (
                        <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                          {booking.status}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2 mb-4 sm:mb-6">
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

            <div className="flex gap-2 sm:gap-3 pt-4 border-t border-gray-100">
              <button
                onClick={() => handleEdit(booking)}
                className="flex-1 btn-secondary py-2.5 sm:py-2 text-sm min-h-[44px]"
              >
                ✏️ Edit
              </button>
              <button
                onClick={() => handleDelete(booking.id)}
                className="flex-1 bg-red-50 text-red-600 px-4 py-2.5 sm:py-2 rounded-lg font-semibold border-2 border-red-200 hover:bg-red-100 active:scale-[0.98] transition-all duration-200 text-sm min-h-[44px]"
              >
                🗑️ Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      )}

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
