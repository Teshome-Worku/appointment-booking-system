const SuccessModal = ({ isOpen, onClose, message }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 transform scale-100 animate-scale-in">
        <div className="p-8 text-center">
          {/* Success Icon */}
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
            <svg
              className="w-12 h-12 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          {/* Message */}
          <h2 className="text-3xl font-bold text-gray-800 mb-3">Success!</h2>
          <p className="text-gray-600 mb-8 text-lg">{message}</p>

          {/* Button */}
          <button
            onClick={onClose}
            className="w-full btn-primary py-3 text-lg"
          >
            View My Bookings
          </button>
        </div>
      </div>
    </div>
  )
}

export default SuccessModal