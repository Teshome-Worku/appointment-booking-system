import { createContext, useState } from "react"

export const BookingContext = createContext()

export const BookingProvider = ({ children }) => {
  const [selectedService, setSelectedService] = useState(null)

  return (
    <BookingContext.Provider value={{ selectedService, setSelectedService }}>
      {children}
    </BookingContext.Provider>
  )
}
