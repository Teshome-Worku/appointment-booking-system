import { useContext,useEffect,useState } from "react"
import { BookingContext } from "../context/BookingContext"
import DeleteConfirm from "../modals/deleteConfirm";

const MyBookings = () => {
  const { bookings,fetchBookings,deleteBooking } = useContext(BookingContext);
  const [showDeleteConfirm,setShowDeleteConfirm]=useState(false);
  const [bookingToDelete,setBookingToDelete]=useState(null);

  // Fetch bookings when component mounts
  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);
 
  if (bookings.length === 0) {
    return (
      <p className="text-center mt-10 text-gray-500">
        No bookings yet.
      </p>
    )
  }

  const handleDelete=(id)=>{
    setBookingToDelete(id);
    setShowDeleteConfirm(true);
  }
  const onClose=()=>{
    setShowDeleteConfirm(false);
    setBookingToDelete(null);
  }
  const handleConfirmDelete=async()=>{
    await deleteBooking(bookingToDelete);
    setShowDeleteConfirm(false);
    setBookingToDelete(null);
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
              <button className=" bg-red-500 text-white hover:bg-red-700 px-4 py-2 rounded mt-2" 
              onClick={() => handleDelete(booking.id)}>Delete</button>
           
            </div>
          </div>
        ))}
      </div>
      {showDeleteConfirm && (
        <DeleteConfirm 
        onConfirm={handleConfirmDelete} 
        onClose={onClose}/>)}
    </div>
  )
}
export default MyBookings
