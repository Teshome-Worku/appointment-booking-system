import { useContext, useState, useEffect } from "react"
import { BookingContext } from "../context/BookingContext"

const EditBookingModal = ({ onClose }) => {
  const { editingBooking, setEditingBooking, updateBooking } =
    useContext(BookingContext)
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [errors, setErrors] = useState({})

  // Prefill when modal opens
  useEffect(() => {
    if (editingBooking) {
      setDate(editingBooking.date)
      setTime(editingBooking.time)
    }
  }, [editingBooking])

  if (!editingBooking) return null

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

  const handleSave = async () => {
    if (!validateForm()) return

    await updateBooking({
      ...editingBooking,
      date,
      time,
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 transform scale-100 animate-scale-in">
        <div className="p-8">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center text-2xl">
              ✏️
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Edit Booking</h2>
          </div>

          {/* Form */}
          <div className="space-y-4">
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
          </div>

          {/* Buttons */}
          <div className="flex gap-3 mt-8">
            <button
              className="flex-1 btn-secondary py-3"
              onClick={() => {
                setEditingBooking(null)
                onClose()
              }}
            >
              Cancel
            </button>
            <button
              className="flex-1 btn-primary py-3"
              onClick={handleSave}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditBookingModal
