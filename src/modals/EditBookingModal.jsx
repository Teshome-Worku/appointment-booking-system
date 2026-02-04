import { useContext, useState, useEffect, use } from "react"
import {  useNavigate } from "react-router-dom"
import { BookingContext } from "../context/BookingContext"

const EditBookingModal = ({onClose}) => {
  const {
    editingBooking,
    setEditingBooking,
    updateBooking
  } = useContext(BookingContext)
  const navigate=useNavigate();
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")

  // Prefill when modal opens
  useEffect(() => {
    if (editingBooking) {
      setDate(editingBooking.date)
      setTime(editingBooking.time)
    }
  }, [editingBooking])

  if (!editingBooking) return null

  const handleSave = () => {
    updateBooking({
      ...editingBooking,
      date,
      time,
    })
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-bold mb-4">
          Edit Booking
        </h2>

        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          className="w-full border p-2 rounded mb-3"
        />

        <input
          type="time"
          value={time}
          onChange={e => setTime(e.target.value)}
          className="w-full border p-2 rounded mb-4"
        />

        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition duration-200"
            onClick={()=>{setEditingBooking(null); onClose();}}
          >
            Cancel
          </button>

          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}

export default EditBookingModal
