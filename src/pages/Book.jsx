import { useContext } from "react"
import { BookingContext } from "../context/BookingContext"
import BookingForm from "../components/BookingForm"

const Book = () => {
  const { selectedService } = useContext(BookingContext)

  if (!selectedService) {
    return (
      <p className="text-center mt-10 text-gray-500">
        Please select a service first.
      </p>
    )
  }

  return (
    <div className="py-10">
      <BookingForm service={selectedService} />
    </div>
  )
}

export default Book
