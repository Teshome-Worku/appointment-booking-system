import ServiceCard from "../components/ServiceCard"
import services from "../data/services"

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section - responsive typography & padding */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-10 sm:py-14 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 animate-fade-in">
            Book Your Appointment
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-blue-100 mb-6 sm:mb-8 max-w-2xl mx-auto px-2">
            Schedule your service with ease. Choose from our professional services and find the perfect time slot for you.
          </p>
        </div>
      </div>

      {/* Services Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14 md:py-16">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-3 sm:mb-4">
            Our Services
          </h2>
          <p className="text-gray-600 text-base sm:text-lg">
            Select a service to get started
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>

      {/* Features Section - responsive grid */}
      <div className="bg-white py-10 sm:py-14 md:py-16 mt-10 sm:mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 text-center">
            <div className="p-4 sm:p-6">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <span className="text-2xl sm:text-3xl">⚡</span>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Quick Booking</h3>
              <p className="text-gray-600 text-sm sm:text-base">Book your appointment in just a few clicks</p>
            </div>
            <div className="p-4 sm:p-6">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <span className="text-2xl sm:text-3xl">📅</span>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Flexible Scheduling</h3>
              <p className="text-gray-600 text-sm sm:text-base">Choose the date and time that works for you</p>
            </div>
            <div className="p-4 sm:p-6">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <span className="text-2xl sm:text-3xl">✅</span>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Easy Management</h3>
              <p className="text-gray-600 text-sm sm:text-base">View, edit, or cancel your bookings anytime</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
