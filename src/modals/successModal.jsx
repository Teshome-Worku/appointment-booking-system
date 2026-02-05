const SuccessModal = ({ isOpen, onClose, message, confirmationId }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm z-50 animate-fade-in p-0 sm:p-4">
      <div className="bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto animate-scale-in">
        <div className="p-6 sm:p-8 text-center">
          {/* Success Icon */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 animate-bounce">
            <svg
              className="w-10 h-10 sm:w-12 sm:h-12 text-green-600"
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
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2 sm:mb-3">Success!</h2>
          <p className="text-gray-600 mb-4 sm:mb-6 text-base sm:text-lg">{message}</p>
          {confirmationId && (
            <p className="text-sm text-gray-500 mb-4 sm:mb-6">
              Confirmation ID: <span className="font-mono font-semibold text-gray-700">{confirmationId}</span>
            </p>
          )}

          {/* Button */}
          <button
            onClick={onClose}
            className="w-full btn-primary py-3 text-base sm:text-lg min-h-[48px]"
          >
            View My Bookings
          </button>
        </div>
      </div>
    </div>
  )
}

export default SuccessModal