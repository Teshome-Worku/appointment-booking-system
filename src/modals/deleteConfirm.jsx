const DeleteConfirm = ({ onConfirm, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm z-50 p-0 sm:p-4">
      <div className="bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto animate-scale-in">
        <div className="p-6 sm:p-8">
          {/* Warning Icon */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
            <svg
              className="w-12 h-12 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>

          {/* Content */}
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 sm:mb-3 text-center">
            Confirm Deletion
          </h2>
          <p className="text-gray-600 mb-6 sm:mb-8 text-center text-sm sm:text-base">
            Are you sure you want to delete this booking? This action cannot be undone.
          </p>

          {/* Buttons */}
          <div className="flex flex-col-reverse sm:flex-row gap-3">
            <button
              onClick={onClose}
              className="flex-1 btn-secondary py-3 min-h-[48px] sm:min-h-[44px]"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl active:scale-[0.98] transition-all duration-200 min-h-[48px] sm:min-h-[44px] flex items-center justify-center"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeleteConfirm