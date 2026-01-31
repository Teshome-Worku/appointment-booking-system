import {BrowserRouter,Route,Routes} from 'react-router-dom';
import Navbar from "./components/Navbar";
import Book from "./pages/Book";
import Home from "./pages/Home";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="p-8">
        <h2 className="text-2xl font-semibold ">
          Welcome to the Booking System
        </h2>
      </div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/book" element={<Book />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
