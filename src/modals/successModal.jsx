const SuccessModal=({ isOpen, onClose, message }) => {
  if (!isOpen) return null; 
    return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="justify-center text-center bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className=" text-2xl text-green-600 font-bold mb-4">✔Success</h2>
            <p className="mb-6 " >{message}</p>
            <button
                onClick={onClose}
                className=" bg-blue-600 text-white justify-center text-center px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-300"
                >
                Close
            </button>
        </div>
    </div>
  );
}
export default SuccessModal;