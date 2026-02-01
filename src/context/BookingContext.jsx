import { createContext, useState } from "react"

export const BookingContext = createContext()

export const BookingProvider = ({ children }) => {
  const [selectedService, setSelectedService] = useState(null)
  const [bookings, setBookings] = useState([])

  const addBooking = (booking) => {
    setBookings(prev => [...prev, booking])
  }

  return (
    <BookingContext.Provider
    
      value={{
        selectedService,
        setSelectedService,

        bookings,
        addBooking
      }}
    >
      {children}
    </BookingContext.Provider>
  )
}
