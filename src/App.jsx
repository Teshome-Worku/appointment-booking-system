import { Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import Book from "./pages/Book"
import Home from "./pages/Home"
import MyBookings from "./pages/MyBookings"

const App = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book" element={<Book />} />
        <Route path="/my-bookings" element={<MyBookings />} />
      </Routes>
    </div>
  )
}

export default App
