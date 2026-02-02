import { createContext, useState } from "react"
import {addBookingToDB,
       getAllBookingsFromDB,
       deleteBookingFromDB} from "../db/indexedDB.js"


export const BookingContext = createContext()

export const BookingProvider = ({ children }) => {
  const [selectedService, setSelectedService] = useState(null)
  const [bookings, setBookings] = useState([])

  const addBooking = async (booking) => {
    try {
      await addBookingToDB(booking)
      setBookings(prev => [...prev, booking])
    } catch (error) {
      console.error("Error adding booking:", error)
    }
  }
  const fetchBookings=async()=>{
    try{
      const allBookings=await getAllBookingsFromDB();
      setBookings(allBookings);

    }
    catch(error){
      console.error("Error fetching bookings:", error)
    }
  }
  const deleteBooking=async(id)=>{
    try{
      await deleteBookingFromDB(id);
      setBookings((prev)=>prev.filter(booking=>booking.id!==id));

    }
    catch(error){
      console.error("Error deleting booking:", error);
    }
  }


  return (
    <BookingContext.Provider
    
      value={{
        selectedService,
        setSelectedService,

        bookings,
        addBooking,
        fetchBookings,
        deleteBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  )
}
